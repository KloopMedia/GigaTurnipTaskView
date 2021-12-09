import React, {useEffect, useState} from "react";

import {WidgetProps} from "@rjsf/core";
import {useReactMediaRecorder} from "react-media-recorder";
import {Box, Button, CircularProgress, Grid} from "@mui/material";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import firebase from "../../../util/Firebase";
import {keyframes} from "@emotion/react";
import styled from "@emotion/styled";

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

    const {campaignId, chainId, stageId, userId, taskId} = formContext;
    const privateUpload = options.private ? options.private : false
    const defaultRecord = options.default ? options.default : false

    let storageRef: any = undefined
    if (campaignId && chainId && stageId && userId && taskId) {
        storageRef = firebase.storage()
        if (privateUpload) {
            storageRef = storageRef.ref("private")
        } else {
            storageRef = storageRef.ref("public")
        }
        storageRef = storageRef.child(campaignId)
            .child(chainId)
            .child(stageId)
            .child(userId)
            .child(taskId)
    }

    useEffect(() => {
        if (defaultRecord) {
            setRecord(options.default)
        } else if (value) {
            firebase.storage().ref(value).getDownloadURL().then(url => {
                setRecord(url)
            })
        }
    }, [])

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
        const path = await storageRef.child(filename).put(blob).then((snapshot: any) => snapshot.ref.fullPath)
        setLoader(false)
        onChange(path);
        onBlur(id, path)
    }

    const {
        status,
        startRecording,
        stopRecording
    } = useReactMediaRecorder({video: false, onStop: handleStopRecording});

    const renderButton = (status: string) => {
        switch (status) {
            case "recording":
                return (
                    <Button
                        variant={"contained"}
                        onClick={stopRecording}
                        sx={{marginBottom: 1}}
                        disabled={disabled || readonly}
                        endIcon={<StopCircleIcon/>}
                    >
                        Остановить
                    </Button>
                );
            default:
                return (
                    <Button
                        variant={"contained"}
                        onClick={startRecording}
                        sx={{marginBottom: 1}}
                        disabled={disabled || readonly}
                        endIcon={<RadioButtonCheckedIcon sx={{fill: disabled || readonly ? "grey" : "red"}}/>}
                    >
                        Запись
                    </Button>
                );
        }
    }


    return (
        <Box>
            <label className={"form-label"}>{label}{required && "*"}</label>
            {!defaultRecord && <Grid container alignItems={"center"}>
                <Grid item>{renderButton(status)}</Grid>
                <Grid item>{status === "recording" && <Indicator/>}</Grid>
                <Grid item>{loader && <CircularProgress sx={{marginLeft: 1}} size={30}/>}</Grid>
            </Grid>}
            {record && <Grid container>
                <audio controls src={record}/>
            </Grid>}
        </Box>
    );
};

export default AudioWidget;