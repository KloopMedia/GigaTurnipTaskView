import React from 'react';
import Form from "../../../../components/form/Form";
import BuilderLayout from "../../../../components/layout/common-layouts/BuilderLayout";
import {Grid} from "@mui/material";

type Props = {
    data: any,
    onChange: (formData: any) => void,
    onSubmit: (formData: any) => void,
    previousTasks?: any[]
};

const Common = (props: Props) => {
    const {data, onChange, onSubmit, previousTasks} = props;
    const {responses, schema, uiSchema, complete} = data;

    const renderPreviousTasks = (previousTasks: any[]) => {
        return previousTasks.map((task: any, index) => {
                const {responses, schema, uiSchema} = task;
                return <Form key={`prev_task_${index}`} schema={schema} uiSchema={uiSchema} formData={responses}
                             hideButton={true} disabled={true}/>;
            }
        )

    }

    if (previousTasks && previousTasks.length > 0) {
        return (
            <Grid container direction='row' spacing={1} p={2}>
                <Grid container item sm={6} xs={12} sx={{display: 'block'}}>
                    {renderPreviousTasks(previousTasks)}
                </Grid>
                <Grid container item sm={6} xs={12} sx={{display: 'block'}}>
                    <Form schema={schema} uiSchema={uiSchema} formData={responses} onChange={onChange}
                          onSubmit={onSubmit} disabled={complete}/>
                </Grid>
            </Grid>
        )
    }


    return (
        <BuilderLayout p={2}>
            <Form schema={schema} uiSchema={uiSchema} formData={responses} onChange={onChange} onSubmit={onSubmit}
                  disabled={complete}/>
        </BuilderLayout>
    );
};

export default Common