import React from 'react';
import {Box, Button, Grid, Stack} from "@mui/material";
import Form from "../../../../components/form/Form";
import {TaskViews} from "../Task.types";

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
};

const CommonView = (props: Props) => {
    const {data, view, complete, previousTasks, formData, disabled, hideSubmit, onChange, onSubmit, onRelease, onPrevious} = props;
    const {schema, uiSchema} = data;
    const {allow_go_back, allow_release} = data.stage;
    const inactive = disabled || complete;

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
            <Button type={"submit"} variant={"contained"} hidden={hideSubmit} disabled={inactive}>Отправить</Button>
            <Button hidden={!allow_go_back} variant={"contained"} color={"warning"} disabled={inactive}
                    onClick={onPrevious}>Открыть предыдущее задание</Button>
            <Button hidden={!allow_release} variant={"contained"} color={"error"} disabled={inactive}
                    onClick={onRelease}>Освободить задание</Button>
        </Stack>
    )

    if (view === "split" && Array.isArray(previousTasks) && previousTasks.length > 0) {
        return (
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
        return (
            <Box>
                {renderPreviousTasks(previousTasks)}
                <Form schema={schema} uiSchema={uiSchema} formData={formData} onChange={onChange}
                      onSubmit={onSubmit}
                      disabled={inactive}>
                    {renderButtons()}
                </Form>
            </Box>
        );
    }
};

export default CommonView