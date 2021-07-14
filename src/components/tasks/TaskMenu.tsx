import React, {useContext, useEffect, useState} from "react";
import TabPanel from "../Tabs/TabPanel";
import SimpleTabs from "../Tabs/Tabs";
import TaskList from "./TaskList";
import {AuthContext} from "../../util/Auth";
import {Grid} from "@material-ui/core";
import axios from "../../util/Axios";
import {taskstagesUrl, tasksUrl} from "../../config/Urls";
import {useParams} from "react-router-dom";


type RouterParams = { campaignId: string }

const TaskMenu = (props: any) => {
    const {campaignId} = useParams<RouterParams>();
    const {currentUser} = useContext(AuthContext)

    const [value, setValue] = useState(0);
    const [selectableTasks, setSelectableTasks] = useState([])
    const [completeTasks, setCompleteTasks] = useState([])
    const [openTasks, setOpenTasks] = useState([])
    const [creatableTasks, setCreatableTasks] = useState([])

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        axios.get(`${tasksUrl}user_selectable/?stage__chain__campaign=${campaignId}`)
            .then(res => res.data)
            .then(res => setSelectableTasks(res))

        axios.get(`${tasksUrl}user_relevant/?complete=${true}&stage__chain__campaign=${campaignId}`)
            .then(res => res.data)
            .then(res => setCompleteTasks(res))

        axios.get(`${tasksUrl}user_relevant/?complete=${false}&stage__chain__campaign=${campaignId}`)
            .then(res => res.data)
            .then(res => setOpenTasks(res))

        axios.get(taskstagesUrl + `user_relevant/?chain__campaign=${campaignId}`)
            .then(res => res.data)
            .then(res => setCreatableTasks(res))
    }, [campaignId])

    return (
        currentUser && currentUser.uid &&
        <Grid>
            <TaskList creatable={true} tasks={creatableTasks}/>
            <SimpleTabs value={value} handleChange={handleChange} showSelectable={selectableTasks.length > 0}>
                <TabPanel value={value} index={0}>
                    <TaskList complete={false} tasks={openTasks}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TaskList complete={true} tasks={completeTasks}/>
                </TabPanel>
                {selectableTasks.length > 0 &&
                <TabPanel value={value} index={2}>
                    <TaskList selectable={true} tasks={selectableTasks}/>
                </TabPanel>}
            </SimpleTabs>
        </Grid>
    )
}

export default TaskMenu