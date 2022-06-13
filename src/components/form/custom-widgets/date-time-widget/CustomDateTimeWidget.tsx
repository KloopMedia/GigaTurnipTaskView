import React from "react";
import {WidgetProps} from "@rjsf/core";
import {DateTimePicker, LocalizationProvider} from "@mui/lab";
import {TextField} from "@mui/material";
import Form from "react-bootstrap/Form";
import enLocale from "date-fns/locale/en-GB";
import ruLocale from "date-fns/locale/ru";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {useTranslation} from "react-i18next";


function DateTimeWidget(props: WidgetProps) {
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
            <DateTimePicker
                inputFormat="dd.MM.yyyy HH:mm"
                mask="__.__.____ __:__"
                disabled={disabled}
                readOnly={readonly}
                value={value ? new Date(value) : null}
                label={t("widgets.date_time_label")}
                onChange={value => onChange(value?.toJSON())}
                ignoreInvalidInputs={true}
                renderInput={(params) => <TextField {...params} hiddenLabel fullWidth size="small"/>}
            />
        </Form.Group>
        </LocalizationProvider>
    );
}

export default DateTimeWidget;