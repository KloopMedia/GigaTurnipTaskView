import React, {useEffect, useState} from "react";
import {Grid} from "@material-ui/core";
import axios from "../../util/Axios";
import {taskstagesUrl, tasksUrl} from "../../config/Urls";
import TaskCard from "./TaskCard";


type TaskListProps = { stage?: number, assignee?: number, complete: boolean, username: string }

const TaskList = (props: TaskListProps) => {
    const {stage, assignee, complete, username} = props;
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        axios.get(taskstagesUrl + 'user_relevant/')
            .then(res => res.data)
            .then(res => {
                setTasks(res)
                console.log(res)
            })
    }, [])

    return (
        <Grid container>
            {tasks.map((task: any) =>
                <Grid item key={task.id} style={{padding: 12}}>
                    <TaskCard
                        id={task.id}
                        name={task.name}
                        description={task.description}
                        complete={false}
                        creatable={true}
                    />
                </Grid>
            )}
        </Grid>
    )
}

export default TaskList