import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import useAxios from "../../../services/api/useAxios";
import useHelpers from "../../../utils/hooks/UseHelpers";
import Integrated from "./integrated-task/Integrated";
import Common from "./common-task/Common";
import debounce from 'lodash.debounce'
import {useToast} from "../../../context/toast/hooks/useToast";
import {usePrompt} from "../../../components/prompt/Prompt";
import {TaskViews} from "./Task.types";
import Quick from "./quick-task/Quick";
import {Alert, Box} from "@mui/material";
import TextViewer from "../../../components/text-editor/TextViewer";
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';

type Props = {
    variant?: "quick" | "integrated" | "common",
    id?: number,
    view?: TaskViews,
    fullWidth?: boolean,
    hidePrompt?: boolean,
    active?: boolean,
    updateState?: Function
}


const Task = (props: Props) => {
    const {variant, id, view, updateState: updateData, active: isActive, hidePrompt, fullWidth} = props;

    const {taskId} = useParams();
    const {
        getTask,
        saveTask,
        getPreviousTasks,
        releaseTask,
        openPreviousTask,
        requestTaskAssignment,
        getIntegratedData,
        triggerTaskWebhook
    } = useAxios();

    const {openToast} = useToast();
    const navigate = useNavigate();
    const {parseId, parseTaskData} = useHelpers();

    const parsedId = id ? id : parseId(taskId);
    const DEBOUNCE_SAVE_DELAY_MS = 2000;

    const [showPrompt, setShowPrompt] = useState(false);
    const [data, setData] = useState<any>();

    usePrompt("Вы уверены, что хотите покинуть эту страницу?", hidePrompt ? false : showPrompt);

    const getData = useCallback((id) => {
        return getTask(id)
            .then(res => ({...res, ...parseTaskData(res)}));
    }, [])

    const getPreviousData = useCallback((id) => {
        return getPreviousTasks(id)
            .then(res => res.map((task: any) => parseTaskData(task)));
    }, [])

    const getIntegrated = useCallback((id) => {
        return getIntegratedData(id)
    }, [])

    const releaseUserTask = useCallback((id) => {
        return releaseTask(id)
    }, [])

    const openPrevious = useCallback((id) => {
        return openPreviousTask(id)
    }, [])

    const requestTask = useCallback((id) => {
        return requestTaskAssignment(id)
    }, [])

    const triggerWebhook = useCallback((id) => {
        return triggerTaskWebhook(id)
    }, [])

    const saveData = useCallback((id: number, data: { responses: any, complete?: boolean }) => {
        return saveTask(id, data);
    }, [])

    const debouncedSave = useCallback(debounce((id: number, data) => {
        return saveData(id, data)
    }, DEBOUNCE_SAVE_DELAY_MS), []);

    const handleRedirect = useCallback((id: number, next_direct_id: number, callback: Function) => {
        if (next_direct_id) {
            if (next_direct_id === id) {
                // Refresh data if it is the same task
                callback(id);
            } else {
                // Go to next task
                navigate(`../../${next_direct_id}`);
            }
        } else {
            navigate('../..');
        }
    }, [])

    const handlePrompt = useCallback((value: boolean) => {
        setShowPrompt(value)
    }, [])

    const updateState = useCallback((id) => {
        return getData(id).then(res => setData(res))
    }, [])

    useEffect(() => {
        updateState(parsedId)
            .then(() => window.scrollTo(0, 0));
    }, [parsedId])

    const taskMethods = {
        getData,
        getPreviousData,
        getIntegrated,
        releaseTask: releaseUserTask,
        requestTask,
        triggerWebhook,
        saveData,
        debouncedSave,
        openPreviousTask: openPrevious,
        handleRedirect,
        handlePrompt,
        openToast,
        updateState: updateData ?? updateState
    }


    if (variant === "quick") {
        return (
            <Box>
                <Quick id={parsedId} view={view} fullwidth={fullWidth} {...taskMethods}/>
            </Box>
        );
    }

    if (variant === "integrated" || data?.integrator_group) {
        return (
            <Box p={2}>
                <Integrated id={parsedId} {...taskMethods}/>
            </Box>
        );
    }

    return (
        <Box p={2}>
            <Alert icon={<AssignmentReturnIcon fontSize="inherit"/>} hidden={!(data && data.reopened)} sx={{mb: 2}}
                   severity="error">Это задание было возвращено!
            </Alert>
            <TextViewer data={data?.stage?.rich_text} hidden={!data?.stage?.rich_text}/>
            <Common id={parsedId} view={view} fullwidth={true} {...taskMethods}/>
        </Box>
    );
};

export default Task