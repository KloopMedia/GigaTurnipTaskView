import React, {useContext, useEffect, useState} from "react";
import axios from "../../util/Axios";
import Axios from "../../util/Axios";
import QuickTask from "./QuickTask";
import {Box, Chip, CircularProgress, Divider, Grid} from "@mui/material";
import {Button} from "react-bootstrap";
import Form from "@rjsf/bootstrap-4";
import {useHistory, useParams} from "react-router-dom";
import {AuthContext} from "../../util/Auth";
import {tasksUrl} from "../../config/Urls";
import {RouterParams} from "../../util/Types";
import {getTask, WIDGETS} from "../../util/Util";
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';


const IntegratedTask = () => {
    const {id, campaignId} = useParams<RouterParams>();

    const history = useHistory()
    const {currentUser} = useContext(AuthContext)
    const path = `/campaign/${campaignId}/tasks`

    const [schema, setSchema] = useState({})
    const [uiSchema, setUiSchema] = useState({})
    const [formResponses, setFormResponses] = useState<any>({})
    const [complete, setComplete] = useState(false)
    const [loader, setLoader] = useState(false)
    const [taskList, setTaskList] = useState<any>([])
    const [taskActionId, setTaskActionId] = useState<number | null>(null)
    const [listOfExcludedTasks, setListOfExcludedTasks] = useState<number[]>([])
    const [ready, setReady] = useState(false)
    const [allowGoBack, setAllowGoBack] = useState(false)

    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [removalReason, setRemovalReason] = useState("")

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setRemovalReason("")
        setTaskActionId(null)
    };

    const widgets = WIDGETS

    const getTaskData = async () => {
        const task = await getTask(id)
        const stage = task.stage
        console.log("TASK", task)

        const parsed_schema = stage.json_schema ? JSON.parse(stage.json_schema) : {}
        const parsed_ui = stage.ui_schema ? JSON.parse(stage.ui_schema) : {}
        // const goBack = stage.

        setFormResponses(task.responses)
        setSchema(parsed_schema)
        setUiSchema(parsed_ui)
        setComplete(task.complete)
        setAllowGoBack(stage.allow_go_back)
        setReady(true)
    }

    const getIntegratedData = () => {
        Axios.get(`${tasksUrl + id}/get_integrated_tasks/`).then(res => setTaskList(res.data))
    }

    useEffect(() => {
        if (id && currentUser) {
            getIntegratedData()
            getTaskData()
        }
    }, [id, currentUser])

    console.log("INTEGRATED LIST", taskList)

    const handleSubmit = () => {
        setLoader(true)
        let data = {responses: formResponses, complete: true}
        axios.patch(tasksUrl + id + '/', data)
            .then((res) => {
                console.log(res)
                setLoader(false)
                if (res.data.next_direct_id) {
                    setSchema({})
                    setUiSchema({})
                    setFormResponses({})
                    history.push(`${path}/${res.data.next_direct_id}`)
                } else {
                    history.push(path)
                }
            })
    }

    const handleRelease = () => {
        axios.post(tasksUrl + id + '/release_assignment/')
            .then(() => alert("Released"))
            .then(() => history.push(path))
    }

    const handleChange = (e: any) => {
        setFormResponses(e.formData)
        let data = {responses: e.formData}
        axios.patch(tasksUrl + id + '/', data)
    }

    const handleActionClick = (taskId: number, excluded: boolean) => {
        setTaskActionId(taskId)
        if (excluded) {
            includeTask(taskId)
        } else {
            handleDialogOpen()
        }
    }

    const handleRemovalReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRemovalReason(event.target.value)
    }

    const excludeTask = () => {
        if (taskActionId !== null) {
            const newList = [...listOfExcludedTasks]
            newList.push(taskActionId)
            const parsedList = Array.from(new Set(newList))
            setListOfExcludedTasks(parsedList)
            alert(removalReason)
        }
        handleDialogClose()
    }

    const includeTask = (taskId: number) => {
        if (taskId !== null) {
            const newList = [...listOfExcludedTasks]
            const index = newList.indexOf(taskId);
            if (index > -1) {
                newList.splice(index, 1);
            }
            const parsedList = Array.from(new Set(newList))
            setListOfExcludedTasks(parsedList)
        }
    }

    const triggerWebhook = () => {
        Axios.get(`${tasksUrl + id}/trigger_webhook/`)
            .then(res => getTaskData())
    }

    const handleOpenPrevious = () => {
        axios.get(tasksUrl + id + '/open_previous/')
            .then(res => {
                setSchema({})
                setUiSchema({})
                setFormResponses({})
                history.push(`${path}/${res.data.id}`)
            })
    };

    return (
        <Grid m={2}>
            {/*<IntegratedTaskDialog*/}
            {/*    open={dialogOpen}*/}
            {/*    handleExclude={excludeTask}*/}
            {/*    handleClose={handleDialogClose}*/}
            {/*    handleReasonChange={handleRemovalReasonChange}*/}
            {/*    reason={removalReason}*/}
            {/*/>*/}
            {taskList.map((task: any) =>
                <Grid key={task.id} py={1}>
                    <QuickTask
                        integrated={true}
                        excluded={listOfExcludedTasks.includes(task.id)}
                        task={task}
                        expand={false}
                        id={task.id}
                        name={task.name}
                        handleAction={handleActionClick}
                        refreshTasks={getIntegratedData}
                    />
                </Grid>
            )}
            <Divider sx={{py: 1}}>
                <Chip icon={<ArrowCircleDownIcon/>} label="Обобщающая форма"/>
            </Divider>
            <Button onClick={triggerWebhook}>Сгенерировать форму</Button>
            <Grid py={1}>
                <Form
                    schema={schema ?? {}}
                    uiSchema={uiSchema ?? {}}
                    formData={formResponses ?? {}}
                    liveOmit={true}
                    omitExtraData={true}
                    widgets={widgets}
                    disabled={complete}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                >
                    <Box display={"flex"}>
                        <Button type="submit" disabled={complete || loader || !ready}>Отправить</Button>
                        {loader && <Box paddingLeft={2}><CircularProgress/></Box>}
                        {allowGoBack && <Button style={{margin: "0 16px"}} onClick={handleOpenPrevious}>К предыдущему таску</Button>}
                    </Box>
                </Form>
            </Grid>
        </Grid>
    )
}

export default IntegratedTask