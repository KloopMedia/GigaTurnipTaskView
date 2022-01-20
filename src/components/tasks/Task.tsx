import React, {useContext, useEffect, useState} from "react";
import Form from "@rjsf/bootstrap-4";
import {Prompt, useHistory, useParams} from "react-router-dom";
import axios from "../../util/Axios";
import {tasksUrl} from '../../config/Urls'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "react-bootstrap";
import {Box, CircularProgress, Grid, Typography} from "@mui/material";
import {AuthContext} from "../../util/Auth";
import TextViewer from "../text-editor/TextViewer";
import {getPreviousTasks, getTask, WIDGETS} from "../../util/Util";

type RouterParams = { id: string, campaignId: string }
type dataForStoragePathParams = { campaignId: number, chainId: number, stageId: number, userId: string, taskId: number }

const Task = () => {
    const {id, campaignId} = useParams<RouterParams>();

    const history = useHistory()
    const {currentUser} = useContext(AuthContext)
    const path = `/campaign/${campaignId}/tasks`

    const [schema, setSchema] = useState({})
    const [uiSchema, setUiSchema] = useState({})
    const [formResponses, setFormResponses] = useState<any>({})
    const [complete, setComplete] = useState(false)
    const [prevTasks, setPrevTasks] = useState<any>([])
    const [dataForStoragePath, setDataForStoragePath] = useState<dataForStoragePathParams | {}>({})
    const [editorData, setEditorData] = useState("")
    const [loader, setLoader] = useState(false)
    const [ready, setReady] = useState(false)
    const [reopened, setReopened] = useState(false)
    const [allowGoBack, setAllowGoBack] = useState(false)
    const [allowRelease, setAllowRelease] = useState(false)

    const widgets = WIDGETS

    const setData = async () => {
            let task = await getTask(id)
            let stage = task.stage

            console.log(task)

            if (stage && stage.rich_text) {
                setEditorData(stage.rich_text)
            }

            setDataForStoragePath({
                campaignId: campaignId.toString(),
                chainId: stage.chain.id.toString(),
                stageId: stage.id.toString(),
                userId: currentUser.uid,
                taskId: task.id.toString()
            })

            let parsed_schema = stage.json_schema ? JSON.parse(stage.json_schema) : {}
            let parsed_ui = stage.ui_schema ? JSON.parse(stage.ui_schema) : {}

            const previousTasks = await getPreviousTasks(id).then(res => res.map((task: any) => ({
                responses: task.responses,
                json_schema: task.stage.json_schema ? JSON.parse(task.stage.json_schema) : {},
                ui_schema: task.stage.ui_schema ? JSON.parse(task.stage.ui_schema) : {}
            })))

            setPrevTasks(previousTasks)
            setFormResponses(task.responses)
            setSchema(parsed_schema)
            setUiSchema(parsed_ui)
            setComplete(task.complete)
            setReopened(task.reopened)
            setAllowGoBack(stage.allow_go_back)
            setAllowRelease(stage.allow_release)
            setReady(true)
        }

    useEffect(() => {
        if (id && currentUser) {
            setData()
        }
    }, [id, currentUser])

    const handleSubmit = () => {
        console.log("submit")
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
                    if (res.data.next_direct_id === parseInt(id)) {
                        setData()
                    }
                    history.push(`${path}/${res.data.next_direct_id}`)
                } else {
                    history.push(path)
                }
            })
            .catch((err) => {
                setLoader(false)
                history.push(path)
            })
    }

    const handleRelease = () => {
        axios.post(tasksUrl + id + '/release_assignment/')
            .then(() => history.push(path))
    }

    const handleChange = (e: any) => {
        setFormResponses(e.formData)
    }

    const handleBlur = () => {
        const data = {responses: formResponses}
        console.log("Saving data", data)
        axios.patch(tasksUrl + id + '/', data)
            .catch((err) => {
                // alert("Изменения не доступны.")
                // history.push(path)
                console.log(err)
            })
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
        <Box p={2}>
            <Prompt
                message={(location, action) => {
                    console.log("Backing up...")
                    const data = {responses: formResponses}
                    if (!complete) {
                        axios.patch(tasksUrl + id + '/', data).then(() => console.log("Data Saved"))
                    }
                    return true
                }}
            />

            {reopened && <Typography variant={"h6"} color={"red"}>Это задание было возвращено</Typography>}

            {editorData !== "" && <div style={{paddingBottom: 20}}>
                <TextViewer data={editorData}/>
            </div>}

            {prevTasks.length > 0 &&
            <Grid>
                {prevTasks.map((task: any, i: number) =>
                    <Form
                        key={`prev_task_${i}`}
                        schema={task.json_schema ?? {}}
                        uiSchema={task.ui_schema ?? {}}
                        formData={task.responses ?? {}}
                        widgets={widgets}
                        disabled={true}
                        children={" "}
                    />
                )}
            </Grid>
            }
            <Grid>
                <Form
                    schema={schema}
                    uiSchema={uiSchema}
                    formData={formResponses}
                    formContext={dataForStoragePath}
                    liveOmit={true}
                    omitExtraData={true}
                    widgets={widgets}
                    disabled={complete}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                >
                    <Box display={"flex"}>
                        <Button type="submit" style={{marginRight: "8px"}} disabled={complete || loader || !ready}>Отправить</Button>
                        {allowGoBack && <Button style={{margin: "0 8px"}} disabled={complete || loader || !ready} onClick={handleOpenPrevious}>К предыдущему таску</Button>}
                        {allowRelease && <Button variant="danger" disabled={complete || loader || !ready} style={{margin: "0 8px"}}
                                 onClick={handleRelease}>Освободить</Button>}
                        {loader && <Box paddingLeft={2}><CircularProgress/></Box>}
                    </Box>
                </Form>
            </Grid>
        </Box>
    )
}


export default Task
