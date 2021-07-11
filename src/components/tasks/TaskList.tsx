import React, {useEffect, useState} from "react";
import {Grid} from "@material-ui/core";
import axios from "../../util/Axios";
import {tasksUrl} from "../../config/Urls";
import TaskCard from "./TaskCard";


type TaskListProps = { stage?: number, assignee?: number, complete: boolean, username: string, selectable?: boolean, tasks: any[] }

const TaskList = (props: TaskListProps) => {
    const {stage, assignee, complete, username, selectable, tasks} = props;
    // const [tasks, setTasks] = useState([])

    // useEffect(() => {
    //     if (selectable) {
    //         console.log('selectable')
    //         axios.get(`${tasksUrl}user_selectable/`)
    //             .then(res => res.data)
    //             .then((res) => res.map((task:any) => ({...task, selectable: true})))
    //             .then(res => setTasks(res))
    //     } else {
    //         axios.get(`${tasksUrl}user_relevant/?complete=${complete}`)
    //             .then(res => res.data)
    //             .then(res => setTasks(res))
    //     }
    // }, [])

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
                        selectable={selectable}
                    />
                </Grid>
            )}
        </Grid>
    )
}

export default TaskList