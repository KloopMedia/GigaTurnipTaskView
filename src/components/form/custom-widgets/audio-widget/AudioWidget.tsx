import React, { useCallback, useEffect, useState } from "react";

import { WidgetProps } from "@rjsf/core";
import { useReactMediaRecorder } from "react-media-recorder";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { storage } from "../../../../services/firebase/Firebase"
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const AudioWidget = ({
    schema,
    id,
    options,
    value,
    required,
    disabled,
    readonly,
    label,
    formContext,
    onChange,
    onBlur
}: WidgetProps) => {

    const [record, setRecord] = useState<any>(null)
    const [loader, setLoader] = useState(false)

    const { storagePath } = formContext;
    const privateUpload = options.private ? options.private : false;
    const defaultRecord = options.default ? options.default : false;
    const readOnly = readonly || (options.readonly as boolean ?? false);

    const privatePath = privateUpload ? "private" : "public";
    const storageRef = ref(storage, `${privatePath}/${storagePath}`);

    useEffect(() => {
        if (defaultRecord) {
            setRecord(options.default)
        }
        else if (value) {
            getDownloadURL(ref(storage, value))
                .then(url => setRecord(url))
        }
    }, [value])

    const Indicator = styled.div`
      width: 10px;
      height: 10px;
      margin-left: 8px;
      border-radius: 50%;
      background-color: red;
      animation: ${keyframes`50% {opacity: 0;}`} 1s linear infinite;
    `

    const handleStopRecording = async (blobUrl: string, blob: Blob) => {
        setLoader(true)
        setRecord(blobUrl)
        const ext = blob.type.split('/')[1]
        const filename = id.replace(/\./g, '_').replace(/ /g, '_') + '.' + ext
        const fileRef = ref(storageRef, filename)
        const path = await uploadBytes(fileRef, blob).then((snapshot: any) => snapshot.ref.fullPath)
        setLoader(false)
        onChange(path);
        onBlur(id, path)
    }

    const {
        status,
        startRecording,
        stopRecording
    } = useReactMediaRecorder({ video: false, onStop: handleStopRecording });

    const renderButton = (status: string) => {
        switch (status) {
            case "recording":
                return (
                    <Button
                        variant={"contained"}
                        onClick={stopRecording}
                        sx={{ marginBottom: 1 }}
                        disabled={disabled || readOnly}
                        endIcon={<StopCircleIcon />}
                    >
                        Остановить
                    </Button>
                );
            default:
                return (
                    <Button
                        variant={"contained"}
                        onClick={startRecording}
                        sx={{ marginBottom: 1 }}
                        disabled={disabled || readOnly}
                        endIcon={<RadioButtonCheckedIcon sx={{ fill: disabled || readonly ? "grey" : "red" }} />}
                    >
                        Запись
                    </Button>
                );
        }
    }


    return (
        <Box>
            <label className={"form-label"}>{label}{required && "*"}</label>
            {!defaultRecord && !(disabled || readOnly) && <Grid container alignItems={"center"}>
                <Grid item>{!record ? renderButton(status) : null}</Grid>
                <Grid item>{status === "recording" && <Indicator />}</Grid>
                <Grid item>{loader && <CircularProgress sx={{ marginLeft: 1 }} size={30} />}</Grid>
                {record && <Button
                    variant={"contained"}
                    disabled={disabled || readOnly}
                    onClick={() => {
                        onChange('');
                        setRecord(null);
                    }}>Удалить</Button>}
            </Grid>}
            {record && <Grid container>
                <AudioPlayer
                    src={record}
                    onPlay={e => console.log("onPlay")}
                // progressJumpSteps={{backward: 10000, forward: 10000}}
                />
            </Grid>}
        </Box>
    );
};

export default AudioWidget;