import React, {useContext, useEffect, useState} from "react";
import TabPanel from "../Tabs/TabPanel";
import SimpleTabs from "../Tabs/Tabs";
import TaskList from "./TaskList";
import {AuthContext} from "../../util/Auth";
import {Grid} from "@material-ui/core";
import axios from "../../util/Axios";
import {taskstagesUrl, tasksUrl} from "../../config/Urls";
import {useParams} from "react-router-dom";
import {
    getCompleteTasks,
    getCreatableTasks,
    getOpenTasks,
    getSelectableTasks,
    requestTaskAssignment
} from "../../util/Util";


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
        getSelectableTasks(campaignId).then(res => setSelectableTasks(res))
        getCompleteTasks(campaignId).then(res => setCompleteTasks(res))
        getOpenTasks(campaignId).then(res => setOpenTasks(res))
        getCreatableTasks(campaignId).then(res => setCreatableTasks(res))
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