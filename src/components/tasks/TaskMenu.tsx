import React, {useContext, useEffect, useState} from "react";
import TabPanel from "../Tabs/TabPanel";
import SimpleTabs from "../Tabs/Tabs";
import TaskList from "./TaskList";
import {AuthContext} from "../../util/Auth";
import {Grid} from "@material-ui/core";
import CreatableTaskList from "./CreatableTaskList";
import axios from "../../util/Axios";
import {tasksUrl} from "../../config/Urls";


const TaskMenu = (props: any) => {
    const {currentUser} = useContext(AuthContext)
    const [value, setValue] = useState(0);
    const [selectableTasks, setSelectableTasks] = useState([])
    const [completeTasks, setCompleteTasks] = useState([])
    const [openTasks, setOpenTasks] = useState([])

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        axios.get(`${tasksUrl}user_selectable/`)
            .then(res => res.data)
            .then(res => setSelectableTasks(res))

        axios.get(`${tasksUrl}user_relevant/?complete=${true}`)
            .then(res => res.data)
            .then(res => setCompleteTasks(res))

        axios.get(`${tasksUrl}user_relevant/?complete=${false}`)
            .then(res => res.data)
            .then(res => setOpenTasks(res))
    }, [])

    return (
        currentUser && currentUser.uid &&
        <Grid>
            <CreatableTaskList username={currentUser.uid} complete={false}/>
            <SimpleTabs value={value} handleChange={handleChange} showSelectable={selectableTasks.length > 0}>
                <TabPanel value={value} index={0}>
                    <TaskList username={currentUser.uid} complete={false} tasks={openTasks}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TaskList username={currentUser.uid} complete={true} tasks={completeTasks}/>
                </TabPanel>
                {selectableTasks.length > 0 &&
                <TabPanel value={value} index={2}>
                    <TaskList username={currentUser.uid} complete={false} selectable={true} tasks={selectableTasks}/>
                </TabPanel>}
            </SimpleTabs>
        </Grid>
    )
}

export default TaskMenu