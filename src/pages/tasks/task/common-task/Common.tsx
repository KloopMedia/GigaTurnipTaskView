import React from 'react';
import Form from "../../../../components/form/Form";
import BuilderLayout from "../../../../components/layout/common-layouts/BuilderLayout";
import {Button, Grid, Stack} from "@mui/material";

type Props = {
    data: any,
    formData: any,
    complete: boolean,
    previousTasks?: any[],
    onChange: (formData: any) => void,
    onSubmit: (formData: any) => void,
    onRelease: () => void,
    onPrevious: () => void
};

const Common = (props: Props) => {
    const {data, formData, complete, previousTasks, onChange, onSubmit, onRelease, onPrevious} = props;
    const {schema, uiSchema} = data;
    const {allow_go_back, allow_release} = data.stage;

    const renderPreviousTasks = (previousTasks: any[]) => {
        return previousTasks.map((task: any, index) => {
                const {responses, schema, uiSchema} = task;
                return <Form key={`prev_task_${index}`} schema={schema} uiSchema={uiSchema} formData={responses}
                             hideButton={true} disabled={true}/>;
            }
        )
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

    if (previousTasks && previousTasks.length > 0) {
        return (
            <Grid container direction='row' spacing={1} p={2}>
                <Grid container item sm={6} xs={12} sx={{display: 'block'}}>
                    {renderPreviousTasks(previousTasks)}
                </Grid>
                <Grid container item sm={6} xs={12} sx={{display: 'block'}}>
                    <Form schema={schema} uiSchema={uiSchema} formData={formData} onChange={onChange}
                          onSubmit={onSubmit} disabled={complete}>
                        {renderButtons()}
                    </Form>
                </Grid>
            </Grid>
        )
    }

    return (
        <BuilderLayout p={2}>
            <Form schema={schema} uiSchema={uiSchema} formData={formData} onChange={onChange} onSubmit={onSubmit}
                  disabled={complete}>
                {renderButtons()}
            </Form>
        </BuilderLayout>
    );
};

export default Common