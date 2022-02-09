import React from 'react';
import Form from "../../../../components/form/Form";
import {Box, Button, Grid, Stack} from "@mui/material";
import BuilderLayout from "../../../../components/layout/common-layouts/BuilderLayout";
import {TaskViews} from "../Task.types";

type Props = {
    data: any,
    formData: any,
    complete: boolean,
    view?: TaskViews,
    fullwidth?: boolean,
    disabled?: boolean,
    previousTasks?: any[],
    onChange: (formData: any) => void,
    onSubmit: (formData: any) => void,
    onRelease: () => void,
    onPrevious: () => void
};

const Common = (props: Props) => {
    const {
        data,
        formData,
        complete,
        view,
        fullwidth,
        disabled,
        previousTasks,
        onChange,
        onSubmit,
        onRelease,
        onPrevious
    } = props;
    const {schema, uiSchema} = data;
    const {allow_go_back, allow_release} = data.stage;

    const inactive = disabled || complete;
    const previousTasksCount = Array.isArray(previousTasks) && previousTasks.length;

    const renderPreviousTasks = (tasks: any[] | undefined) => {
        if (Array.isArray(tasks) && tasks.length > 0) {
            return tasks.map((task: any, index) => {
                    const {responses, schema, uiSchema} = task;
                    return <Form key={`prev_task_${index}`} schema={schema} uiSchema={uiSchema} formData={responses}
                                 hideButton={true} disabled={true}/>;
                }
            );
        } else {
            return null;
        }
    }

    const renderButtons = () => (
        <Stack spacing={1} py={1}>
            <Button type={"submit"} variant={"contained"} disabled={complete}>Отправить</Button>
            <Button hidden={!allow_go_back} variant={"contained"} color={"warning"} disabled={complete}
                    onClick={onPrevious}>Открыть предыдущее задание</Button>
            <Button hidden={!allow_release} variant={"contained"} color={"error"} disabled={complete}
                    onClick={onRelease}>Освободить задание</Button>
        </Stack>
    )

    let COMPONENT;

    if (view === "split" && previousTasksCount) {
        COMPONENT = (
            <Grid container direction='row' spacing={1}>
                <Grid container item sm={6} xs={12} sx={{display: 'block'}}>
                    {renderPreviousTasks(previousTasks)}
                </Grid>
                <Grid container item sm={6} xs={12} sx={{display: 'block'}}>
                    <Form schema={schema} uiSchema={uiSchema} formData={formData} onChange={onChange}
                          onSubmit={onSubmit} disabled={inactive}>
                        {renderButtons()}
                    </Form>
                </Grid>
            </Grid>
        );
    } else {
        COMPONENT = (
            <Box>
                {renderPreviousTasks(previousTasks)}
                <Form schema={schema} uiSchema={uiSchema} formData={formData} onChange={onChange} onSubmit={onSubmit}
                      disabled={inactive}>
                    {renderButtons()}
                </Form>
            </Box>
        );
    }

    if (fullwidth) {
        return (
            <Box p={2}>
                {COMPONENT}
            </Box>
        );
    }

    return (
        <BuilderLayout p={2}>
            {COMPONENT}
        </BuilderLayout>
    );
};

export default Common