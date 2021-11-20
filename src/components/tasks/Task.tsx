import React, {useContext, useEffect, useState} from "react";
import Form from "@rjsf/bootstrap-4";
import {Prompt, useHistory, useParams} from "react-router-dom";
import axios from "../../util/Axios";
import {tasksUrl} from '../../config/Urls'
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomFileWidget from "../custom-widgets/file-widget/CustomFileWidget";
import {Button} from "react-bootstrap";
import {Box, CircularProgress, Grid} from "@mui/material";
import {AuthContext} from "../../util/Auth";
import TextViewer from "../text-editor/TextViewer";
import {getPreviousTasks, getTask} from "../../util/Util";
import AutoCompleteWidget from "../custom-widgets/autocomplete/AutoCompleteWidget";
import FixedRadioWidget from "../custom-widgets/fixed-radio-widget/FixedRadioWidget";

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
    const [changeCount, setChangeCount] = useState(0)

    const widgets = {
        customfile: CustomFileWidget,
        autocomplete: AutoCompleteWidget,
        RadioWidget: FixedRadioWidget
    };

    useEffect(() => {
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
                json_schema: JSON.parse(task.stage.json_schema),
                ui_schema: JSON.parse(task.stage.ui_schema)
            })))

            setPrevTasks(previousTasks)
            setFormResponses(task.responses)
            setSchema(parsed_schema)
            setUiSchema(parsed_ui)
            setComplete(task.complete)
            setReady(true)
        }
        if (id && currentUser) {
            setData()
        }
    }, [id, currentUser])

    const handleSubmit = () => {
        setLoader(true)
        let data = {responses: formResponses, complete: true}
        axios.patch(tasksUrl + id + '/', data)
            .then(() => setLoader(false))
            .then(() => history.push(path))
            .catch((err) => {
                setLoader(false)
                history.push(path)
            })
    }

    const handleRelease = () => {
        axios.post(tasksUrl + id + '/release_assignment/')
            .then(() => alert("Released"))
            .then(() => history.push(path))
    }

    const handleChange = (e: any) => {
        setFormResponses(e.formData)
        // const data = {responses: e.formData}
        // if (changeCount === 5) {
        //     axios.patch(tasksUrl + id + '/', data).catch((err) => {
        //         alert("Изменения не доступны.")
        //         history.push(path)
        //     })
        //     setChangeCount(0)
        //     console.log("SEND CHANGE")
        // } else {
        //     setChangeCount(changeCount + 1)
        // }
    }

    const handleBlur = () => {
        const data = {responses: formResponses}
        console.log("Saving data", data)
        axios.patch(tasksUrl + id + '/', data)
            .catch((err) => {
                alert("Изменения не доступны.")
                history.push(path)
            })
    }

    return (
        <div style={{width: '70%', minWidth: '400px', margin: '0 auto', display: 'block', padding: 10}}>
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
                        <Button type="submit" disabled={complete || loader || !ready}>Submit</Button>
                        {loader && <Box paddingLeft={2}><CircularProgress/></Box>}
                    </Box>
                    {/*<Button variant="danger" disabled={complete} style={{marginLeft: 7}} onClick={handleRelease}>Release</Button>*/}
                </Form>
            </Grid>
        </div>
    )
}


export default Task
