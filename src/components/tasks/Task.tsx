import React, {useEffect, useState} from "react";
import Form from "@rjsf/bootstrap-4";
import {useHistory, useParams} from "react-router-dom";
import axios from "../../util/Axios";
import {tasksUrl} from '../../config/Urls'
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomFileWidget from "../custom-widgets/file-widget/CustomFileWidget";
import {Button} from "react-bootstrap";

type RouterParams = { id: string }

const Task = () => {
    const {id} = useParams<RouterParams>();
    const history = useHistory()

    const [schema, setSchema] = useState({})
    const [uiSchema, setUiSchema] = useState({})
    const [formResponses, setFormResponses] = useState({})
    const [complete, setComplete] = useState(false)

    const widgets = {
        customfile: CustomFileWidget
    };

    useEffect(() => {
        const getTask = () => {
            return axios.get(tasksUrl + id + '/').then((res: any) => res.data)
        }
        const setData = async () => {
            let task = await getTask()
            let stage = task.stage
            console.log(task, stage)
            let parsed_schema = JSON.parse(stage.json_schema)
            let parsed_ui = JSON.parse(stage.ui_schema)
            setFormResponses(task.responses)
            setSchema(parsed_schema)
            setUiSchema(parsed_ui)
            setComplete(task.complete)
        }
        if (id) {
            setData()
        }
    }, [id])

    const handleSubmit = () => {
        console.log(formResponses)
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
            <Form
                schema={schema}
                uiSchema={uiSchema}
                formData={formResponses}
                widgets={widgets}
                disabled={complete}
                onChange={handleChange}
                onSubmit={handleSubmit}
            >
                <Button type="submit" disabled={complete}>Submit</Button>
            </Form>
        </div>
    )
}


export default Task


