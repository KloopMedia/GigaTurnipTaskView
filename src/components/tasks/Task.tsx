import React, {useContext, useEffect, useState} from "react";
import Form from "@rjsf/bootstrap-4";
import {useHistory, useParams} from "react-router-dom";
import axios from "../../util/Axios";
import {tasksUrl} from '../../config/Urls'
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomFileWidget from "../custom-widgets/file-widget/CustomFileWidget";
import {Button} from "react-bootstrap";
import {Grid, Typography} from "@material-ui/core";
import {AuthContext} from "../../util/Auth";
import {Editor} from "@tinymce/tinymce-react";

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

    const widgets = {
        customfile: CustomFileWidget
    };

    useEffect(() => {
        const getTask = (stageId?: string | number, caseId?: string | number) => {
            if (stageId && caseId) {
                return axios.get(`${tasksUrl}?stage=${stageId}&case=${caseId}`).then((res: any) => res.data)
            }
            return axios.get(tasksUrl + id + '/').then((res: any) => res.data)
        }
        const setData = async () => {
            let task = await getTask()
            let stage = task.stage

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

            let parsed_schema = JSON.parse(stage.json_schema) ?? {}
            let parsed_ui = JSON.parse(stage.ui_schema) ?? {}
            let caseId = task.case
            let prevStages = stage.displayed_prev_stages
            console.log(prevStages)
            let inTasksPromise = prevStages.map((stageId: number | string) => getTask(stageId, caseId))
            let inTasks = await Promise.all(inTasksPromise)
                .then(res => {
                    console.log(res)
                    return res.map((t: any) => {
                        return t.map((tt: any) => {
                            let brokenUi = JSON.parse(tt.stage.ui_schema)
                            let {file, ...r} = brokenUi
                            if (file && file["ui:widget"] !== "customfile") {
                                file = {"ui:widget": "customfile"}
                            }
                            let fixedUi = {file, ...r}
                            return {
                                responses: tt.responses,
                                json_schema: JSON.parse(tt.stage.json_schema),
                                ui_schema: fixedUi
                            }
                        })
                    }).flat()
                })

            setPrevTasks(inTasks)
            setFormResponses(task.responses)
            setSchema(parsed_schema)
            setUiSchema(parsed_ui)
            setComplete(task.complete)
        }
        if (id && currentUser) {
            setData()
        }
    }, [id, currentUser])

    const handleSubmit = () => {
        let data = {responses: formResponses, complete: true}
        axios.patch(tasksUrl + id + '/', data)
            .then(() => alert("Saved"))
            .then(() => history.push(path))
    }

    const handleRelease = () => {
        axios.post(tasksUrl + id + '/release_assignment/')
            .then(() => alert("Released"))
            .then(() => history.push(path))
    }

    const handleChange = (e: any) => {
        setFormResponses(e.formData)
    }

    return (
        <div style={{width: '70%', minWidth: '400px', margin: '0 auto', display: 'block', padding: 10}}>
            {editorData !== "" && <div style={{paddingBottom: 20}}>
                <Editor
                    id={"ViewerTinyMCE"}
                    value={editorData}
                    toolbar={false}
                    inline={false}
                    disabled={true}
                    tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
                    init={{
                        plugins: 'autoresize',
                        menubar: false,
                        image_advtab: true,
                        importcss_append: true,
                    }}
                />
            </div>}

            {prevTasks.length > 0 &&
            <Grid>
                <Typography variant={"h4"} align="center" style={{padding: 10}}>Previous Tasks</Typography>
                {prevTasks.map((task: any, i: number) =>
                    <Form
                        key={`prev_task_${i}`}
                        schema={task.json_schema}
                        uiSchema={task.ui_schema}
                        formData={task.responses}
                        widgets={widgets}
                        disabled={true}
                        children={" "}
                    />
                )}
            </Grid>
            }
            <Grid>
                {prevTasks.length > 0 &&
                <Typography variant={"h4"} align="center" style={{padding: 10}}>Current Task</Typography>}
                <Form
                    schema={schema}
                    uiSchema={uiSchema}
                    formData={formResponses}
                    formContext={dataForStoragePath}
                    widgets={widgets}
                    disabled={complete}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                >
                    <Button type="submit" disabled={complete}>Submit</Button>
                    {/*<Button variant="danger" disabled={complete} style={{marginLeft: 7}} onClick={handleRelease}>Release</Button>*/}
                </Form>
            </Grid>
        </div>
    )
}


export default Task
