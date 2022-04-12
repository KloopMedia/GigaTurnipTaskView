import React from 'react';
import {
    AudioWidget,
    AutoCompleteWidget,
    DateTimeWidget,
    DateWidget,
    FileWidget,
    LinkWidget,
    RadioWidget,
    SelectWidget
} from "./custom-widgets";
import JsonForm from "@rjsf/bootstrap-4";
import 'bootstrap/dist/css/bootstrap.min.css';
import {FormProps} from "@rjsf/core"
import {useTranslation} from "react-i18next";


interface Props extends FormProps<any> {
    schema: object,
    uiSchema?: object,
    formData?: any,
    onChange?: (formData: object) => void,
    onSubmit?: (formData: object) => void,
    hideButton?: boolean,
    disabled?: boolean
}

const Form: React.FC<Props> = (props) => {
    const {schema, uiSchema, formData, hideButton, onChange, onSubmit, children, disabled, ...rest} = props;
    const {t} = useTranslation();

    const widgets = {
        customfile: FileWidget,
        autocomplete: AutoCompleteWidget,
        RadioWidget: RadioWidget,
        customlink: LinkWidget,
        audio: AudioWidget,
        DateTimeWidget: DateTimeWidget,
        DateWidget: DateWidget,
        SelectWidget: SelectWidget
    };

    const handleChange = (e: { formData: object }) => {
        if (onChange) {
            onChange(e.formData)
        } else {
            return 0
        }
    }

    const handleSubmit = (e: { formData: object }) => {
        if (onSubmit) {
            onSubmit(e.formData)
        } else {
            return 0
        }
    }

    const renderButton = () => {
        if (children) {
            return children;
        } else if (hideButton) {
            return " "
        } else {
            return <button type="submit" className="btn btn-primary" disabled={disabled}>{t("submit")}</button>
        }
    }

    return (
        <JsonForm
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            widgets={widgets}
            onChange={handleChange}
            onSubmit={handleSubmit}
            disabled={disabled}
            {...rest}
        >
            {renderButton()}
        </JsonForm>
    );
};

export default Form