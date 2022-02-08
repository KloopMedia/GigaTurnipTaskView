import React, {useEffect, useState} from 'react';
import {Box} from "@mui/material";
import List from "../../components/list/List";
import useAxios from "../../services/api/useAxios";
import {useNavigate, useParams} from "react-router-dom";
import Tabs from "../../components/tabs/Tabs";
import useHelpers from "../../utils/hooks/UseHelpers";


const Tasks = () => {
    const {
        getOpenTasks,
        getCompleteTasks,
        getCreatableTasks,
        requestTaskCreation,
        getSelectableTasks,
        requestTaskAssignment
    } = useAxios();

    const navigate = useNavigate();
    const {campaignId} = useParams();
    const {parseId} = useHelpers();
    const parsedCampaignId = parseId(campaignId);

    const [data, setData] = useState([]);
    const [creatableTasks, setCreatableTasks] = useState([]);
    const [selectableTasks, setSelectableTasks] = useState<any>([]);
    const [tab, setTab] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    const handleOpen = (id: number) => {
        navigate(`/campaign/${campaignId}/tasks/${id}`)
    }

    const handleCreate = (id: number) => {
        requestTaskCreation(id).then((res) => handleOpen(res.id))
    }

    const handleSelect = (id: number) => {
        requestTaskAssignment(id)
            .then(() => handleOpen(id))
            .catch(err => alert(err))
    }

    const formatData = (data: any[]) => {
        return data.map((item: { id: number, stage: { name: string, description: string } }) => ({
            id: item.id,
            name: item.stage.name,
            description: item.stage.description
        })) as any;
    }

    const TAB_DATA = [
        {
            label: 'Открытые',
            component: <List id={"open_tasks"} data={data} onSelect={handleOpen} hideCreateButton={true}/>
        },
        {
            label: 'Завершенные',
            component: <List id={"complete_tasks"} data={data} onSelect={handleOpen} hideCreateButton={true}/>
        },
    ];

    if (selectableTasks.count > 0) {
        const d = formatData(selectableTasks.results)

        TAB_DATA.push({
            label: 'Доступные',
            component: <List id={"selectable_tasks"} data={d} onSelect={handleSelect}
                             hideCreateButton={true}/>
        })
    }

    useEffect(() => {
        const getData = (tab: number) => {
            switch (tab) {
                case 0:
                    return getOpenTasks(parsedCampaignId);
                case 1:
                    return getCompleteTasks(parsedCampaignId);
                default:
                    return getOpenTasks(parsedCampaignId);
            }
        }

        getData(tab)
            .then(res => formatData(res))
            .then(res => setData(res));
        getCreatableTasks(parsedCampaignId).then(res => setCreatableTasks(res));
        getSelectableTasks(parsedCampaignId).then(res => setSelectableTasks(res));
    }, [parsedCampaignId, tab])

    return (
        <Box px={3}>
            <List id={"creatable_tasks"} data={creatableTasks} onSelect={handleCreate} hideViewButton={true}
                  hideCreateButton={true}/>
            <Tabs data={TAB_DATA} value={tab} onChange={handleTabChange} variant="fullWidth"/>
        </Box>
    );
};

export default Tasks