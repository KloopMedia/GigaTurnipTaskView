import React, {useContext, useEffect, useState} from "react";
import Form from "@rjsf/bootstrap-4";
import {useHistory, useParams} from "react-router-dom";
import axios from "../../util/Axios";
import {tasksUrl} from '../../config/Urls'
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomFileWidget from "../custom-widgets/file-widget/CustomFileWidget";
import {Button} from "react-bootstrap";
import {Box, CircularProgress, Grid} from "@mui/material";
import {AuthContext} from "../../util/Auth";
import TextViewer from "../text-editor/TextViewer";
import AutoCompleteWidget from "../custom-widgets/autocomplete/AutoCompleteWidget";
import FixedRadioWidget from "../custom-widgets/fixed-radio-widget/FixedRadioWidget";

type RouterParams = { id: string, campaignId: string }
type dataForStoragePathParams = { campaignId: number, chainId: number, stageId: number, userId: string, taskId: number }

const QuickTaskContent = (props: { id: string, taskData: any, isAssigned: boolean, refreshTasks?: () => void }) => {
    const {id, taskData, isAssigned, refreshTasks} = props;
    let {campaignId} = useParams<RouterParams>();

    const {currentUser} = useContext(AuthContext)

    const [schema, setSchema] = useState({})
    const [uiSchema, setUiSchema] = useState({})
    const [formResponses, setFormResponses] = useState<any>({})
    const [complete, setComplete] = useState(false)
    const [prevTasks, setPrevTasks] = useState<any>([])
    const [dataForStoragePath, setDataForStoragePath] = useState<dataForStoragePathParams | {}>({})
    const [loader, setLoader] = useState(false)

    const widgets = {
        customfile: CustomFileWidget,
        autocomplete: AutoCompleteWidget,
        RadioWidget: FixedRadioWidget
    };

    useEffect(() => {
        const setData = async () => {
            const task = taskData
            const stage = task.stage

            setDataForStoragePath({
                campaignId: campaignId.toString(),
                chainId: stage.chain.id.toString(),
                stageId: stage.id.toString(),
                userId: currentUser.uid,
                taskId: task.id.toString()
            })

            let parsed_schema = JSON.parse(stage.json_schema) ?? {}
            let parsed_ui = JSON.parse(stage.ui_schema) ?? {}

            const previousTasks = task.displayed_prev_tasks.map((task: any) => ({
                responses: task.responses,
                json_schema: JSON.parse(task.stage.json_schema),
                ui_schema: JSON.parse(task.stage.ui_schema)
            }))

            setPrevTasks(previousTasks)
            setFormResponses(task.responses)
            setSchema(parsed_schema)
            setUiSchema(parsed_ui)
            setComplete(task.complete)
        }
        if (taskData && currentUser) {
            setData()
        }
    }, [taskData, currentUser])

    const handleSubmit = () => {
        setLoader(true)
        let data = {responses: formResponses, complete: true}
        axios.patch(tasksUrl + id + '/', data)
            .then(() => setLoader(false))
            .then(() => refreshTasks && refreshTasks())
            .catch(error => {
                alert(error)
                setLoader(false)
            })
    }

    const handleRelease = () => {
        axios.post(tasksUrl + id + '/release_assignment/')
            .then(() => alert("Released"))
            .then(() => window.location.reload())
            .catch(error => alert(error))
    }

    const handleChange = (e: any) => {
        setFormResponses(e.formData)
        let data = {responses: e.formData}
        axios.patch(tasksUrl + id + '/', data)
    }

    return (
        <Grid container>
            <Grid direction='row' container spacing={1}>
                {prevTasks.length > 0 &&
                <Grid container item sm={6} xs={12} sx={{display: 'block'}}>
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
                <Grid container item sm={prevTasks.length > 0 ? 6 : 12} xs={12} sx={{display: 'block'}}>
                    <Form
                        schema={schema ?? {}}
                        uiSchema={uiSchema ?? {}}
                        formData={formResponses ?? {}}
                        formContext={dataForStoragePath}
                        liveOmit={true}
                        omitExtraData={true}
                        widgets={widgets}
                        disabled={complete || !isAssigned}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                    >
                        <Box display={"flex"}>
                            <Button type="submit" disabled={complete || !isAssigned}>Submit</Button>
                            {loader && <Box paddingLeft={2}><CircularProgress/></Box>}
                        </Box>
                        {/*<Button variant="danger" disabled={complete} style={{marginLeft: 7}} onClick={handleRelease}>Release</Button>*/}
                    </Form>
                </Grid>
            </Grid>
        </Grid>
    )
}


export default QuickTaskContent
