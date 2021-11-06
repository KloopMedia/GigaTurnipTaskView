import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {RouterParams} from "../../util/Types";
import {getNotificationContent} from "../../util/Util";
import {Grid, Typography} from "@mui/material";
import TextViewer from "../text-editor/TextViewer";


const NotificationContent = () => {
    const {id} = useParams<RouterParams>();
    const [data, setData] = useState<any>({})

    useEffect(() => {
        getNotificationContent(id).then(res => setData(res))
    }, [id])

    console.log(data)

    return (
        <Grid container justifyContent={"center"}>
            <Grid item xs={12} p={1}>
                <Typography align={"center"} variant={"h6"}>{data.title}</Typography>
            </Grid>
            <Grid item xs={12}>
                <TextViewer data={data.text}/>
            </Grid>
        </Grid>
    )
}

export default NotificationContent