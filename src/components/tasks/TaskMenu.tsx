import React, {useContext, useState} from "react";
import TabPanel from "../Tabs/TabPanel";
import SimpleTabs from "../Tabs/Tabs";
import TaskList from "./TaskList";
import {AuthContext} from "../../util/Auth";
import {Grid} from "@material-ui/core";
import CreatableTaskList from "./CreatableTaskList";


const TaskMenu = (props: any) => {
    const {currentUser} = useContext(AuthContext)
    const [value, setValue] = useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        currentUser && currentUser.uid &&
        <Grid>
            <CreatableTaskList username={currentUser.uid} complete={false}/>
            <SimpleTabs value={value} handleChange={handleChange}>
                <TabPanel value={value} index={0}>
                    <TaskList username={currentUser.uid} complete={false}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TaskList username={currentUser.uid} complete={true}/>
                </TabPanel>
            </SimpleTabs>
        </Grid>
    )
}

export default TaskMenu