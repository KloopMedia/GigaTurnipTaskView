import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import useAxios from "../../../services/api/useAxios";
import useHelpers from "../../../utils/hooks/UseHelpers";
import Integrated from "./integrated-task/Integrated";
import Common from "./common-task/Common";
import debounce from 'lodash.debounce'
import {useToast} from "../../../context/toast/hooks/useToast";
import {usePrompt} from "../../../components/prompt/Prompt";

type DataProps = {
    schema: object,
    uiSchema: object
} | undefined


const Task = () => {
    const {taskId} = useParams();
    const {getTask, saveTask, getPreviousTasks, releaseTask, openPreviousTask} = useAxios();
    const {openToast} = useToast();
    const navigate = useNavigate();
    const {parseId, parseTaskData} = useHelpers();

    const parsedId = parseId(taskId);
    const DEBOUNCE_SAVE_DELAY_MS = 2000;

    const [data, setData] = useState<DataProps>();
    const [formData, setFormData] = useState();
    const [complete, setComplete] = useState(false);
    const [previousTasks, setPreviousTasks] = useState([]);
    const [showPrompt, setShowPrompt] = useState(false);

    usePrompt("Вы уверены, что хотите покинуть эту страницу?", showPrompt);

    const getData = useCallback((id) => {
        getTask(id)
            .then(res => ({...res, ...parseTaskData(res)}))
            .then(res => {
                setData(res);
                setFormData(res.responses)
                setComplete(res.complete);
            });

        getPreviousTasks(id)
            .then(res => res.map((task: any) => parseTaskData(task)))
            .then(res => setPreviousTasks(res));
    }, [])

    useEffect(() => {
        getData(parsedId);
    }, [getData, parsedId])

    const saveData = (data: { responses: any, complete?: boolean }) => {
        return saveTask(parsedId, data);
    }

    const debouncedSave = useCallback(debounce((data, complete: boolean) => {
        if (complete) {
            return false;
        }
        return saveData(data)
    }, DEBOUNCE_SAVE_DELAY_MS), []);

    useEffect(() => {
        debouncedSave({responses: formData}, complete);
        // Show Prompt if not complete
        setShowPrompt(!complete);
        return () => debouncedSave.cancel();
    }, [formData, complete, debouncedSave])

    const handleChange = (formData: any) => {
        setFormData(formData);
    }

    const handleRedirect = (next_direct_id: number) => {
        if (next_direct_id) {
            if (next_direct_id === parsedId) {
                // Refresh data if it is the same task
                getData(parsedId);
            } else {
                // Go to next task
                navigate(`../../${next_direct_id}`);
            }
        } else {
            navigate('../..');
        }
    }

    const handleSubmit = (formData: any) => {
        setComplete(true);
        saveData({responses: formData, complete: true})
            .then((res) => {
                openToast("Данные сохранены", "success");
                const {next_direct_id} = res;
                handleRedirect(next_direct_id);
            })
            .catch(err => openToast(err.message, "error"));
    }

    const handleRelease = () => {
        releaseTask(parsedId)
            .then(() => navigate('../..'))
    }

    const handleOpenPrevious = () => {
        openPreviousTask(parsedId)
            .then(res => {
                const {id} = res;
                handleRedirect(id);
            })
    };

    const props = {
        data,
        formData,
        complete,
        previousTasks: previousTasks,
        onChange: handleChange,
        onSubmit: handleSubmit,
        onRelease: handleRelease,
        onPrevious: handleOpenPrevious
    }

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