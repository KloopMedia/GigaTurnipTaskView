import React, {useCallback, useEffect, useState} from 'react';
import {Box} from "@mui/material";
import BuilderLayout from "../../../../components/layout/common-layouts/BuilderLayout";
import {TaskProps} from "../Task.types";
import CommonView from "./CommonView";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";


const Common = (props: TaskProps & { update?: boolean, forceUpdate?: (value: boolean) => void }) => {
    const {
        id,
        view,
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
        update,
        getDynamicForm,
        forceUpdate
    } = props;

    const navigate = useNavigate();
    const {t} = useTranslation();

    const [data, setData] = useState<any>();
    const [formData, setFormData] = useState<any>();
    const [complete, setComplete] = useState(true);
    const [previousTasks, setPreviousTasks] = useState([]);
    const [isDynamic, setDynamic] = useState(false);

    const setDynamicForm = (data: any, formData: object) => {
        let _jsonData;
        try {
            _jsonData = JSON.stringify(formData)
        } catch (e) {
            _jsonData = '{}';
        }
        getDynamicForm(data.stage.id, _jsonData).then(res => {
            const {schema, ...rest} = data;
            const dynamicSchema = res.schema;
            setData({schema: dynamicSchema, ...rest})
        })
    }

    const mountData = useCallback(async (id) => {
        const data = await getData(id);
        const prev = await getPreviousData(id);

        console.log(data)
        if (!data.complete && data.stage.hasOwnProperty("dynamic_jsons")) {
            setDynamic(true);
            setDynamicForm(data, {});
        }
        setPreviousTasks(prev)
        setData(data);
        setFormData(data.responses ?? {});
        setComplete(data.complete);
    }, [])

    useEffect(() => {
        mountData(id);
    }, [mountData, id])

    useEffect(() => {
        if (update && forceUpdate) {
            mountData(id).then(() => forceUpdate(false))
        }
    }, [update])


    const handleRelease = () => {
        handlePrompt(false);
        releaseTask(id)
            .then(() => navigate('../..'));
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
                handlePrompt(false);
                openToast(t("task.saved_message"), "success");
                const {next_direct_id} = res;
                handleRedirect(id, next_direct_id, mountData);
            })
            .catch(err => openToast(err.message, "error"));
    }

    const handleFocus = (id: string, value: any) => {
        if (!data.complete && isDynamic) {
            setDynamicForm(data, formData)
        }
    }

    useEffect(() => {
        debouncedSave(id, {responses: formData});
        // Show Prompt if not complete
        handlePrompt(!complete);
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
        onFocus: handleFocus
    }

    if (!data) {
        return null;
    }

    if (fullwidth) {
        return (
            <Box>
                <CommonView view={view} {...formProps}/>
            </Box>
        );
    }

    return (
        <BuilderLayout>
            <CommonView view={view} {...formProps}/>
        </BuilderLayout>
    );
};

export default Common