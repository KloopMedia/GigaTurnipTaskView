import React from "react";
import {Grid} from "@mui/material";
import TaskCard from "./TaskCard";


type TaskListProps = {
    complete?: boolean,
    selectable?: boolean,
    creatable?: boolean,
    tasks: any[]
}

const TaskList = (props: TaskListProps) => {
    const {complete, selectable, tasks, creatable} = props;

    const listTasks = () => {
        return tasks.map((task: any) => {
                let id, name, description;
                if (creatable) {
                    id = task.id
                    name = task.name
                    description = task.description
                }
                else {
                    id = task.id
                    name = task.stage.name
                    description = task.stage.description
                }

                return (
                    <Grid item key={task.id} style={{padding: 10}}>
                        <TaskCard
                            id={id}
                            name={name}
                            description={description}
                            complete={complete}
                            selectable={selectable}
                            creatable={creatable}
                        />
                    </Grid>
                )
            }
        )
    }

    return (
        <Grid
            container
            direction={creatable ? "row" : "column"}
            alignItems={"center"}
            justifyContent={creatable ? "flex-start" : "center"}
        >
            {listTasks()}
        </Grid>
    )
}

export default TaskList