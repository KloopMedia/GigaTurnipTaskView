import React, {useCallback, useEffect, useState} from 'react';
import {Box} from "@mui/material";
import {TaskProps} from "../Task.types";
import {useNavigate} from "react-router-dom";
import QuickView from "./QuickView";

type Props = TaskProps & {
    active?: boolean,
    hideSubmit?: boolean,
    hideOpen?: boolean,
    onAction?: (id: number, action: "add" | "remove") => void
}

const Quick = (props: Props) => {
    const {
        id,
        view,
        active: isActive,
        hideSubmit,
        hideOpen,
        fullwidth,
        disabled,
        getData,
        getPreviousData,
        saveData,
        releaseTask,
        debouncedSave,
        openPreviousTask,
        handleRedirect,
        handlePrompt,
        openToast,
        requestTask,
        onAction,
        updateState
    } = props;

    const navigate = useNavigate();

    const [data, setData] = useState<any>();
    const [formData, setFormData] = useState();
    const [complete, setComplete] = useState(true);
    const [previousTasks, setPreviousTasks] = useState([]);
    const [active, setActive] = useState(isActive ?? false)

    const mountData = useCallback(async (id) => {
        setActive(false);
        const data = await getData(id);
        setData(data);
        setFormData(data.responses ?? {});
        setComplete(data.complete);
        try {
            const prev = await getPreviousData(id);
            setPreviousTasks(prev)
        } catch (error) {
            setPreviousTasks([])
            console.log(error);
        }
    }, [])

    useEffect(() => {
        mountData(id);
    }, [mountData, id])

    useEffect(() => {
        if (typeof isActive === "boolean") {
            setActive(isActive)
        }
    }, [isActive])


    const handleRelease = () => {
        releaseTask(id)
            .then(() => setActive(false));
    }

    const handleOpenPrevious = () => {
        openPreviousTask(id)
            .then(res => {
                const {id: prevId} = res;
                handleRedirect(id, prevId, mountData);
            })
    };

    const handleChange = (formData: any) => {
        setFormData(formData);
    }

    const handleSubmit = (formData: any) => {
        return saveData(id, {responses: formData, complete: true})
            .then((res) => {
                openToast("Данные сохранены", "success");
                setActive(false);
                updateState()
            })
            .catch(err => openToast(err.message, "error"));
    }

    const handleRequest = () => {
        if (onAction) {
            onAction(id, "add")
        } else {
            requestTask(id)
                .then((res) => mountData(res.id))
                .then(() => setActive(true))
        }
    }

    const handleOpen = () => {
        if (active) {
            navigate(`${id}`);
        } else {
            requestTask(id)
                .then(res => {
                    const {id} = res;
                    navigate(`${id}`);
                })
        }
    }

    const handleAction = () => {
        if (onAction) {
            onAction(id, "remove")
        } else {
            return null
        }
    }

    useEffect(() => {
        if (active) {
            debouncedSave(id, {responses: formData});
        }
    }, [formData, complete, debouncedSave, id])

    const formProps = {
        data,
        formData,
        complete,
        previousTasks: previousTasks,
        disabled,
        onChange: handleChange,
        onSubmit: handleSubmit,
        onRelease: handleRelease,
        onPrevious: handleOpenPrevious,
        onOpen: handleOpen,
        onRequest: handleRequest
    }

    if (!data) {
        return null;
    }

    return (
        <Box>
            <QuickView active={active} hideOpen={hideOpen} onAction={handleAction} hideSubmit={hideSubmit}
                       view={view} {...formProps}/>
        </Box>
    );

};

export default Quick