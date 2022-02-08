import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import useAxios from "../../../services/api/useAxios";
import useHelpers from "../../../utils/hooks/UseHelpers";
import Integrated from "./integrated-task/Integrated";
import Common from "./common-task/Common";
import debounce from 'lodash.debounce'
import {useToast} from "../../../context/toast/hooks/useToast";

type DataProps = {
    schema: object,
    uiSchema: object,
    responses: any
} | undefined


const Task = () => {
    const {taskId} = useParams();
    const {getTask, saveTask, getPreviousTasks} = useAxios();
    const {openToast} = useToast();
    const {parseId, parseTaskData} = useHelpers();
    const parsedId = parseId(taskId);

    const DEBOUNCE_SAVE_DELAY_MS = 2000;

    const [data, setData] = useState<DataProps>();
    const [previousTasks, setPreviousTasks] = useState([]);

    useEffect(() => {
        getTask(parsedId)
            .then(res => ({...res, ...parseTaskData(res)}))
            .then(res => setData(res));

        getPreviousTasks(parsedId)
            .then(res => res.map((task: any) => parseTaskData(task)))
            .then(res => setPreviousTasks(res))
    }, [parsedId])

    const saveData = (data: { responses: any, complete?: boolean }) => {
        return saveTask(parsedId, data);
    }

    const debouncedSave = useCallback(debounce((data) => {
        return saveData(data)
            .then(() => console.log("saved"))
            .catch(err => openToast(err.message, "error"));
    }, DEBOUNCE_SAVE_DELAY_MS), []);

    const handleChange = (formData: any) => {
        console.log(formData)
        debouncedSave({responses: formData});
    }

    const handleSubmit = (formData: any) => {
        saveData({responses: formData, complete: true})
            .then(() => openToast("Данные сохранены", "success"))
            .catch(err => openToast(err.message, "error"));
    }

    const props = {data, onChange: handleChange, onSubmit: handleSubmit, previousTasks: previousTasks}

    if (data) {
        // @ts-ignore
        if (data.integrator_group) {
            return <Integrated {...props} />;
        } else {
            return <Common {...props} />;
        }
    } else {
        return null;
    }
};

export default Task