import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import axios from "../../util/Axios";
import {campaignsUrl} from "../../config/Urls";
import TextViewer from "../text-editor/TextViewer";
import {Button, Grid, Typography} from "@mui/material";
import {requestCampaignJoin} from "../../util/Util";


const About = () => {
    const {id}: { id: string } = useParams();
    const history = useHistory();

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [richText, setRichText] = useState("")

    useEffect(() => {
        console.log(campaignsUrl, id)
        axios.get(campaignsUrl + id + '/')
            .then(res => res.data)
            .then(res => {
                const {richText, name, description} = res;
                if (name) {
                    setName(name)
                }
                if (description) {
                    setDescription(description)
                }
                if (richText) {
                    setRichText(richText)
                }
            })
    }, [id])

    const joinCampaign = () => {
        requestCampaignJoin(id).then(() => history.push(`/campaign/${id}/tasks`))
    }

    return (
        <div style={{width: '70%', minWidth: '400px', margin: '0 auto', display: 'block', padding: 10}}>
            <Typography variant={"h3"} align={"center"}>{name}</Typography>
            <Typography variant={"h6"} align={"center"}>{description}</Typography>
            {richText && <TextViewer data={richText}/>}
            <Grid container justifyContent={"center"} style={{padding: 20}}>
                <Button variant={"contained"} color={"primary"} onClick={joinCampaign}>Присоединиться / Кошулуу</Button>
            </Grid>
        </div>
    )
}

export default About