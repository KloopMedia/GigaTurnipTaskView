import React from "react";

import Form from "react-bootstrap/Form";

import {FieldProps} from "@rjsf/core";
import {Button} from "react-bootstrap";
import {Box, Typography} from "@mui/material";

const Counter = ({required, label, formData, schema, onChange, rawErrors = []}: FieldProps) => {

    const _onChange = () => {
        const _value = Array.isArray(formData) ? formData : [];
        const newValue = [..._value, new Date().toISOString()];
        onChange(newValue);
    }

    return (
        <Form.Group className="mb-0">
            <Form.Label className={rawErrors.length > 0 ? "text-danger" : ""}>
                {label || schema.title}
                {(label || schema.title) && required ? "*" : null}
            </Form.Label>
            <br/>
            <Box display={"flex"}>
                <Typography variant={"h4"} pr={1}>{Array.isArray(formData) ? formData.length : 0}</Typography>
                <Button onClick={_onChange}>+</Button>
            </Box>
        </Form.Group>
    );
};

export default Counter;