import React from 'react';
import {
    AudioWidget,
    AutoCompleteWidget,
    DateTimeWidget,
    DateWidget,
    FileWidget,
    LinkWidget,
    RadioWidget,
    SelectWidget,
    CounterWidget,
    SimpleAutoComplete,
    EditorWidget,
} from "./custom-widgets";
import JsonForm from "@rjsf/bootstrap-4";
import 'bootstrap/dist/css/bootstrap.min.css';
import {FormProps} from "@rjsf/core"
import {useTranslation} from "react-i18next";
import { useToast } from '../../context/toast/hooks/useToast';


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
    const {openToast} = useToast();

    const widgets = {
        customfile: FileWidget,
        autocomplete: AutoCompleteWidget,
        RadioWidget: RadioWidget,
        customlink: LinkWidget,
        audio: AudioWidget,
        DateTimeWidget: DateTimeWidget,
        DateWidget: DateWidget,
        SelectWidget: SelectWidget,
        simple_autocomplete: SimpleAutoComplete,
        editor: EditorWidget,
    };

    const fields = {
        counter: CounterWidget
    }

    const customFormats = {
        'time': /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
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
            fields={fields}
            customFormats={customFormats}
            onChange={handleChange}
            onSubmit={handleSubmit}
            disabled={disabled}
            onError={(e) => openToast('Форманы толтурууда ката бар. Кайра текшерип чыгыңыз / Есть ошибка в заполнении формы. Проверьте ещё раз.', "error")}
            {...rest}
        >
            {renderButton()}
        </JsonForm>
    );
};

export default Form