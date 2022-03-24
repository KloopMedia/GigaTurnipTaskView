import React, {useCallback, useEffect, useState} from 'react';
import {Box, Grid, Pagination, Tab} from "@mui/material";
import List from "../../components/list/List";
import useAxios from "../../services/api/useAxios";
import {useNavigate, useParams} from "react-router-dom";
import useHelpers from "../../utils/hooks/UseHelpers";
import Task from "./task/Task";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import TaskFilter from "./TaskFilter";
import Notifications from '../notifications/Notifications';
import {useTranslation} from "react-i18next";

const Tasks = () => {
    const {
        getOpenTasks,
        getCompleteTasks,
        getCreatableTasks,
        requestTaskCreation,
        getSelectableTasks,
    } = useAxios();

    const navigate = useNavigate();
    const {campaignId} = useParams();
    const {parseId} = useHelpers();
    const parsedCampaignId = parseId(campaignId);
    const {t} = useTranslation();

    const [openTasks, setOpenTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [creatableTasks, setCreatableTasks] = useState([]);
    const [selectableTasks, setSelectableTasks] = useState<any>([]);
    const [tab, setTab] = useState("1");
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [filterFormData, setFilterFormData] = useState<any>();

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
        setFilterFormData(null);
    };

    const handleOpen = (id: number) => {
        navigate(`/campaign/${campaignId}/tasks/${id}`)
    }

    const handleCreate = (id: number) => {
        requestTaskCreation(id).then((res) => handleOpen(res.id))
    }

    const formatData = (data: any[]) => {
        return data.map((item: { id: number, reopened?: boolean, stage: { name: string, description: string } }) => ({
            id: item.id,
            name: item.stage.name,
            description: item.stage.description,
            reopened: item.reopened ? item.reopened : false
        })) as any;
    }

    const getSelectable = useCallback(() => {
        return getSelectableTasks(parsedCampaignId, page, filterFormData).then(res => {
            setTotalPages(Math.ceil(res.count / 10))
            return res.results;
        })
    }, [parsedCampaignId, page, filterFormData]);

    const getData = (id: number, tab: string) => {
        if (tab === "1") {
            getOpenTasks(id).then(res => formatData(res)).then(res => setOpenTasks(res));
        } else if (tab === "2") {
            getCompleteTasks(id).then(res => formatData(res)).then(res => setCompletedTasks(res));
        }
    }

    useEffect(() => {
        getData(parsedCampaignId, tab);

        getSelectable()
            .then(res => setSelectableTasks(res));
    }, [tab, page])

    useEffect(() => {
        getCreatableTasks(parsedCampaignId)
            .then(res => setCreatableTasks(res));
    }, [])

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const getFilteredData = (query?: string, stage?: string) => {
        const filter = query || stage ? {query: query, stage: stage} : null
        getSelectableTasks(parsedCampaignId, 1, filter).then(res => {
            if (res.count > 0) {
                setFilterFormData(filter)
                setPage(1)
                setTotalPages(Math.ceil(res.count / 10))
                setSelectableTasks(res.results)
            } else {
                setFilterFormData(null)
                alert("Нет похожих тасков")
            }
        })
    }

    return (
        <Box px={3}>
            <Notifications importance={0} onlyNew={true}/>
            <List id={"creatable_tasks"} data={creatableTasks} onSelect={handleCreate} hideViewButton={true}
                  hideCreateButton={true}/>
            <TabContext value={tab}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleTabChange} aria-label="lab API tabs example" variant="fullWidth">
                        <Tab label={t("tasks.uncompleted")} value="1"/>
                        <Tab label={t("tasks.completed")} value="2"/>
                        <Tab label={t("tasks.available")} value="3" hidden={selectableTasks.length === 0}/>
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <List id={"open_tasks"} data={openTasks} onSelect={handleOpen} hideCreateButton={true}/>
                </TabPanel>
                <TabPanel value="2">
                    <List id={"complete_tasks"} data={completedTasks} onSelect={handleOpen} hideCreateButton={true}/>
                </TabPanel>
                <TabPanel value="3">
                    <TaskFilter onFilter={getFilteredData} campaign={parsedCampaignId}/>
                    <Grid container py={2} spacing={2}>
                        {selectableTasks.length > 0 && selectableTasks.map((item: any, index: number) =>
                            <Grid item xs={12} key={index}>
                                <Task id={item.id} view={"split"} updateState={() => getData(parsedCampaignId, tab)}
                                      hidePrompt={true}
                                      variant={"quick"}/>
                            </Grid>
                        )}
                    </Grid>
                    <Box pb={2} display={"flex"} justifyContent={"center"}>
                        <Pagination count={totalPages} page={page} onChange={handlePageChange} showFirstButton
                                    showLastButton/>
                    </Box>
                </TabPanel>
            </TabContext>
        </Box>
    );
};

export default Tasks