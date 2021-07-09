import React, {useEffect, useState} from "react";
import axios from "../../util/Axios";
import {Grid} from "@material-ui/core";
import Card from "./CampaignCard";
import {campaignsUrl} from "../../config/Urls"

type CampaingParams = { id: number, name: string, description?: string };
export type NewCampaignParams = { name: string, description?: string }

const Builder = () => {
    const [campaigns, setCampaigns] = useState<CampaingParams[]>([])

    useEffect(() => {
        axios.get(campaignsUrl)
            .then(res => res.data)
            .then(res => {
                console.log(res)
                setCampaigns(res)
            })
    }, [])

    return (
        <Grid container justify={"center"}>
            {campaigns.map(campaign => (
                <Grid item style={{padding: 10}}>
                    <Card key={campaign.id} chain={campaign}/>
                </Grid>
            ))}
        </Grid>
    )
}

export default Builder


