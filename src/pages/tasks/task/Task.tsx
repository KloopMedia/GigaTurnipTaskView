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

type Props = {
    variant?: "quick" | "integrated" | "common",
    id?: number,
    view?: TaskViews,
    fullWidth?: boolean,
    hidePrompt?: boolean,
}


const Task = (props: Props) => {
    const {variant, id, view, hidePrompt, fullWidth} = props;

    const {taskId} = useParams();
    const {getTask, saveTask, getPreviousTasks, releaseTask, openPreviousTask, requestTaskAssignment} = useAxios();
    const {openToast} = useToast();
    const navigate = useNavigate();
    const {parseId, parseTaskData} = useHelpers();

    const parsedId = id ? id : parseId(taskId);
    const DEBOUNCE_SAVE_DELAY_MS = 2000;

    const [data, setData] = useState<any>();
    const [formData, setFormData] = useState();
    const [complete, setComplete] = useState(false);
    const [previousTasks, setPreviousTasks] = useState([]);
    const [showPrompt, setShowPrompt] = useState(false);
    const [active, setActive] = useState(false);

    usePrompt("Вы уверены, что хотите покинуть эту страницу?", hidePrompt ? false : showPrompt);

    const getData = useCallback((id) => {
        return getTask(id)
            .then(res => ({...res, ...parseTaskData(res)}));
    }, [])

    const getPreviousData = useCallback((id) => {
        return getPreviousTasks(id)
            .then(res => res.map((task: any) => parseTaskData(task)));
    }, [])

    const mountData = useCallback(async (id) => {
        const data = await getData(id);
        const prev = await getPreviousData(id);

        setPreviousTasks(prev)
        setData(data);
        setFormData(data.responses);
        setComplete(data.complete);
    }, [])

    const requestTask = useCallback((id) => {
        return requestTaskAssignment(id)
    }, [])

    useEffect(() => {
        mountData(parsedId);
    }, [mountData, parsedId])

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
        setShowPrompt(false);
        releaseTask(parsedId)
            .then(() => navigate('../..'));
    }

    const handleOpenPrevious = () => {
        openPreviousTask(parsedId)
            .then(res => {
                const {id} = res;
                handleRedirect(id);
            })
    };

    const handleRequest = () => {
        requestTask(parsedId)
            .then((res) => mountData(res.id))
            .then(() => setActive(true))
    }

    const handleSelect = () => {
        requestTask(parsedId)
            .then(res => {
                const {id} = res;
                handleRedirect(id);
            })
    }

    const formProps = {
        data,
        formData,
        complete,
        previousTasks: previousTasks,
        onChange: handleChange,
        onSubmit: handleSubmit,
        onRelease: handleRelease,
        onPrevious: handleOpenPrevious,
    }

    if (data) {
        if (variant === "quick") {
            const d = {name: data.stage.name, id: parsedId}
            return <Quick active={active} data={d} onRequest={handleRequest} onSelect={handleSelect}>
                <Common view={"split"} disabled={!active} fullwidth={true} {...formProps} />
            </Quick>;
        }

        if (variant === "integrated") {
            return <Integrated {...formProps} />;
        }

        return (
            <Common view={view} fullwidth={fullWidth} {...formProps} />
        );
    } else {
        return null;
    }
};

export default Task