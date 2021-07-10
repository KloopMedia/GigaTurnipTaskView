import React, {useEffect, useState} from "react";
import {Grid} from "@material-ui/core";
import axios from "../../util/Axios";
import {tasksUrl} from "../../config/Urls";
import TaskCard from "./TaskCard";


type TaskListProps = { stage?: number, assignee?: number, complete: boolean, username: string }

const TaskList = (props: TaskListProps) => {
    const {stage, assignee, complete, username} = props;
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        // const userRelevant = `?complete=${complete}&assignee__username=${username}`
        // console.log(userRelevant)
        axios.get(`${tasksUrl}user_relevant/?complete=${complete}`)
            .then(res => res.data)
            .then(res => setTasks(res))
    }, [])

    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
        >
            {tasks.map((task: any) =>
                <Grid item key={task.id} style={{padding: 12}}>
                    <TaskCard
                        id={task.id}
                        name={task.stage.name}
                        description={task.stage.description}
                        complete={task.complete}
                    />
                </Grid>
            )}
        </Grid>
    )
}

export default TaskList