import React from 'react';
import useHelpers from "../../../../utils/hooks/UseHelpers";
import Form from "../../../../components/form/Form";
import BuilderLayout from "../../../../components/layout/common-layouts/BuilderLayout";
import Common from "../common-task/Common";

type Props = {
    data: any,
    onChange: (formData: any) => void,
    onSubmit: (formData: any) => void,
};

const Integrated = (props: Props) => {
    const {data, onChange, onSubmit} = props;
    const {responses} = data;
    const {json_schema, ui_schema, rich_text} = data.stage;
    const {parseJson} = useHelpers();

    const parsedSchema = parseJson(json_schema);
    const parsedUi = parseJson(ui_schema);

    return (
        <BuilderLayout p={2}>
            {/*<Common {...props} />*/}
        </BuilderLayout>
    );
};

export default Integrated