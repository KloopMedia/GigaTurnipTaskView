import React, {useEffect, useState} from "react";
import axios from "../../util/Axios";
import {Box, Button, Grid, Typography} from "@material-ui/core";
import Card from "./CampaignCard";
import AddIcon from '@material-ui/icons/Add';
import {campaignsUrl} from "../../config/Urls"
import {CampaignParams, CreateCampaignParams} from "../../util/Types";
import {useHistory} from "react-router-dom";
import {getCampaigns, getSelectableCampaigns, getUserCampaigns} from "../../util/Util";


const Builder = () => {
    const [campaigns, setCampaigns] = useState<CampaignParams[]>([])
    const [userCampaigns, setUserCampaigns] = useState<CampaignParams[]>([])
    const [selectableCampaigns, setSelectableCampaigns] = useState<CampaignParams[]>([])
    const [open, setOpen] = useState(false);
    const history = useHistory()

    useEffect(() => {
        // getCampaigns().then(res => setCampaigns(res))
        getUserCampaigns().then(res => setUserCampaigns(res))
        getSelectableCampaigns().then(res => setSelectableCampaigns(res))

    }, [])

    const openCampaignInfo = (id: string | number) => {
        history.push(`/campaign/about/${id}`)
    }

    const handleCampaignAdd = (data: CreateCampaignParams) => {
        axios.post(campaignsUrl, data)
            .then(res => {
                console.log(res)
                window.location.reload();
            })
    };

    const handleCardRedirect = (id: string | number) => {
        history.push(`/campaign/${id}/tasks`)
    }

    return (
        <Grid>
            <Grid>
                <Typography align={"center"} variant={"h4"}>Мои кампании</Typography>
                <Grid container justify={"center"}>
                    {userCampaigns.map(campaign => (
                        <Grid item key={campaign.id} style={{padding: 10}}>
                            <Card data={campaign}
                                  onCardButtonClick={handleCardRedirect}
                                  openCampaignInfo={openCampaignInfo}
                                  selectable={false}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Grid>

            <Grid>
                <Typography align={"center"} variant={"h4"}>Доступные кампании</Typography>
                <Grid container justify={"center"}>
                    {selectableCampaigns.map(campaign => (
                        <Grid item key={campaign.id} style={{padding: 10}}>
                            <Card data={campaign}
                                  onCardButtonClick={handleCardRedirect}
                                  openCampaignInfo={openCampaignInfo}
                                  selectable={true}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Builder


