import React, {useContext, useEffect, useState} from "react";
import TabPanel from "../Tabs/TabPanel";
import SimpleTabs from "../Tabs/Tabs";
import TaskList from "./TaskList";
import {AuthContext} from "../../util/Auth";
import {Box, Grid, Pagination} from "@mui/material";
import {useParams} from "react-router-dom";
import {
    getCompleteTasks,
    getCreatableTasks,
    getOpenTasks,
    getSelectableTasks,
    paginatedDataHandler
} from "../../util/Util";


type RouterParams = { campaignId: string }

const TaskMenu = (props: any) => {
    const {campaignId} = useParams<RouterParams>();
    const {currentUser} = useContext(AuthContext)

    const [tab, setTab] = useState(0);
    const [selectableTasks, setSelectableTasks] = useState([])
    const [completeTasks, setCompleteTasks] = useState([])
    const [openTasks, setOpenTasks] = useState([])
    const [creatableTasks, setCreatableTasks] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = React.useState(1);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        if (value) {
            if (tab === 0) {
                getOpenTasks(campaignId).then(res => setOpenTasks(res))
            } else if (tab === 1) {
                getCompleteTasks(campaignId).then(res => setCompleteTasks(res))
            } else if (tab === 2) {
                getSelectableTasks(campaignId, value).then(res => paginatedDataHandler(res, setSelectableTasks, setTotalPages))
            }
        }
    };

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTab(newValue);
    };

    const refreshTasks = () => {
        getSelectableTasks(campaignId).then(res => paginatedDataHandler(res, setSelectableTasks, setTotalPages))
        getCompleteTasks(campaignId).then(res => setCompleteTasks(res))
        getOpenTasks(campaignId).then(res => setOpenTasks(res))
        getCreatableTasks(campaignId).then(res => setCreatableTasks(res))
    };

    useEffect(() => {
        refreshTasks()
    }, [campaignId]);


    return (
        currentUser && currentUser.uid &&
        <Grid>
            <TaskList creatable={true} tasks={creatableTasks}/>
            <SimpleTabs value={tab} handleChange={handleTabChange} showSelectable={selectableTasks.length > 0}>
                <TabPanel value={tab} index={0}>
                    <TaskList complete={false} tasks={openTasks}/>
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <TaskList complete={true} tasks={completeTasks}/>
                </TabPanel>
                {selectableTasks.length > 0 &&
                <TabPanel value={tab} index={2}>
                    <TaskList selectable={true} tasks={selectableTasks} refreshTasks={refreshTasks}/>
                    <Box pb={2} display={"flex"} justifyContent={"center"}>
                        <Pagination count={totalPages} page={page} onChange={handlePageChange} showFirstButton
                                    showLastButton/>
                    </Box>
                </TabPanel>}
            </SimpleTabs>
        </Grid>
    )
}

export default TaskMenu