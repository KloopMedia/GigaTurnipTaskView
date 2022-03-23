import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Grid, Typography} from "@mui/material";
import useHelpers from "../../utils/hooks/UseHelpers";
import useAxios from "../../services/api/useAxios";
import TextViewer from "../../components/text-editor/TextViewer";


const NotificationContent = () => {
    const {id} = useParams();
    const {parseId} = useHelpers();
    const parsedId = parseId(id);
    const {getNotificationContent} = useAxios();

    const [data, setData] = useState<any>({})

    useEffect(() => {
        getNotificationContent(parsedId).then(res => setData(res))
    }, [parsedId])

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