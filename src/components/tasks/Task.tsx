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

type RouterParams = { id: string, campaignId: string }
type dataForStoragePathParams = {campaignId: number, chainId: number, stageId: number, userId: string, taskId: number}

const Task = () => {
    const {id, campaignId} = useParams<RouterParams>();
    const history = useHistory()
    const {currentUser} = useContext(AuthContext)

    const [schema, setSchema] = useState({})
    const [uiSchema, setUiSchema] = useState({})
    const [formResponses, setFormResponses] = useState({})
    const [complete, setComplete] = useState(false)
    const [prevTasks, setPrevTasks] = useState<any>([])
    const [dataForStoragePath, setDataForStoragePath] = useState<dataForStoragePathParams | {}>({})

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
            console.log(task, stage)

            setDataForStoragePath({
                campaignId: campaignId.toString(),
                chainId: stage.chain.toString(),
                stageId: stage.id.toString(),
                userId: currentUser.uid,
                taskId: task.id.toString()
            })

            let parsed_schema = JSON.parse(stage.json_schema)
            let parsed_ui = JSON.parse(stage.ui_schema)
            let caseId = task.case
            let prevStages = stage.displayed_prev_stages
            console.log(prevStages)
            let inTasksPromise = prevStages.map((stageId: number | string) => getTask(stageId, caseId))
            let inTasks = await Promise.all(inTasksPromise)
                .then(res => {
                    console.log(res)
                    return res.map((t: any) => {
                        return t.map((tt: any) => ({
                            responses: tt.responses,
                            json_schema: JSON.parse(tt.stage.json_schema),
                            ui_schema: JSON.parse(tt.stage.ui_schema)
                        }))
                    }).flat()
                })
            console.log("inTasks", inTasks)
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
        console.log("formResponses", formResponses)
        let data = {responses: formResponses, complete: true}
        axios.patch(tasksUrl + id + '/', data)
            .then(() => alert("Saved"))
            .then(() => history.goBack())
    }

    const handleChange = (e: any) => {
        setFormResponses(e.formData)
    }

    return (
        <div style={{width: '70%', minWidth: '400px', margin: '0 auto', display: 'block', padding: 10}}>
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
                {prevTasks.length > 0 && <Typography variant={"h4"} align="center" style={{padding: 10}}>Current Task</Typography>}
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
                </Form>
            </Grid>
        </div>
    )
}


export default Task
