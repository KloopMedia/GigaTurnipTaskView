import React from 'react';
import {Box, Button, Chip, Divider, Grid, Stack} from "@mui/material";
import Form from "../../../../components/form/Form";
import {TaskViews} from "../Task.types";
import {useAuth} from "../../../../context/authentication/hooks/useAuth";
import {useTranslation} from "react-i18next";
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

export type Props = {
    data: any,
    formData?: any,
    complete?: boolean,
    view?: TaskViews,
    disabled?: boolean,
    previousTasks?: any[],
    onChange: (formData: any) => void,
    onSubmit: (formData: any) => void,
    onRelease: () => void,
    onPrevious: () => void,
    hideSubmit?: boolean
    onFocus?: (id: string, formData: any) => void
};

const CommonView = (props: Props) => {
    const {
        data,
        view,
        complete,
        previousTasks,
        formData,
        disabled,
        hideSubmit,
        onChange,
        onSubmit,
        onRelease,
        onPrevious,
        onFocus
    } = props;
    const {id: taskId, schema, uiSchema} = data;
    const {id: stageId, allow_go_back, allow_release} = data.stage;
    const {id: chainId, campaign: campaignId} = data.stage.chain;
    const inactive = disabled || complete;

    const {t} = useTranslation();
    const {user} = useAuth();
    const storagePath = user ? `${campaignId}/${chainId}/${stageId}/${user.uid}/${taskId}` : null;

    const renderPreviousTasks = (tasks: any[] | undefined) => {
        if (Array.isArray(tasks) && tasks.length > 0) {
            return tasks.map((task: any, index) => {
                    const {responses, schema, uiSchema} = task;
                    return <Form
                        key={`prev_task_${index}`}
                        schema={schema}
                        uiSchema={uiSchema}
                        formData={responses}
                        hideButton={true}
                        disabled={true}
                    />;
                }
            );
        } else {
            return null;
        }
    }

    const renderButtons = () => (
        <Stack spacing={1} py={1}>
            <Button type={"submit"} variant={"contained"} hidden={hideSubmit}
                    disabled={inactive}>{t("task.submit")}</Button>
            <Button hidden={!allow_go_back} variant={"contained"} color={"secondary"} disabled={inactive}
                    onClick={onPrevious}>{t("task.open_previous")}</Button>
            <Button hidden={!allow_release} variant={"contained"} color={"warning"} disabled={inactive}
                    onClick={onRelease}>{t("task.release")}</Button>
        </Stack>
    )

    const form = (
        <Form
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            onChange={onChange}
            onSubmit={onSubmit}
            onFocus={onFocus}
            omitExtraData={true}
            liveOmit={true}
            formContext={{storagePath}}
            disabled={inactive}>
            {renderButtons()}
        </Form>
    )

    if (view === "split" && Array.isArray(previousTasks) && previousTasks.length > 0) {
        return (
            <Grid container direction='row' spacing={1}>
                <Grid container item sm={6} xs={12} sx={{display: 'block'}}>
                    {renderPreviousTasks(previousTasks)}
                </Grid>
                <Grid container item sm={6} xs={12} sx={{display: 'block'}}>
                    {form}
                </Grid>
            </Grid>
        );
    } else {
        return (
            <Box>
                {renderPreviousTasks(previousTasks)}
                <Divider hidden={previousTasks?.length === 0} sx={{py: 1}}>
                    <Chip icon={<ArrowCircleDownIcon/>} color={"primary"} label={t("task.divider_text")}/>
                </Divider>
                {form}
            </Box>
        );
    }
};

export default CommonView