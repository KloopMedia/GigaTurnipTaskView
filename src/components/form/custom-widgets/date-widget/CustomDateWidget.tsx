import React from "react";
import {WidgetProps} from "@rjsf/core";
import {DatePicker, LocalizationProvider} from "@mui/lab";
import {TextField} from "@mui/material";
import Form from "react-bootstrap/Form";
import enLocale from "date-fns/locale/en-GB";
import ruLocale from "date-fns/locale/ru";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {useTranslation} from "react-i18next";


function DateWidget(props: WidgetProps) {
    const {
        schema,
        required,
        disabled,
        readonly,
        label,
        value,
        onChange,
    } = props;

    const {i18n, t} = useTranslation();

    const localeMap: any = {
        en: enLocale,
        ru: ruLocale,
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap[i18n.language]}><Form.Group
            className="mb-0">
            <Form.Label className="d-block">
                {label || schema.title}
                {(label || schema.title) && required ? "*" : null}
            </Form.Label>
            <DatePicker
                inputFormat="dd.MM.yyyy"
                mask="__.__.____"
                disabled={disabled}
                readOnly={readonly}
                value={new Date(value)}
                label={t("widgets.date_label")}
                onChange={value => onChange(value?.toJSON()?.slice(0, 10))}
                ignoreInvalidInputs={true}
                renderInput={(params) => <TextField {...params} hiddenLabel fullWidth size="small"/>}
            />
        </Form.Group>
        </LocalizationProvider>
    );
}

export default DateWidget;