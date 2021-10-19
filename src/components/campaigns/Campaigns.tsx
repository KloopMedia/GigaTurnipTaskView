import React, {useEffect, useState} from "react";
import {Grid, Typography} from "@mui/material";
import Card from "./CampaignCard";
import {CampaignParams} from "../../util/Types";
import {useHistory} from "react-router-dom";
import {getSelectableCampaigns, getUserCampaigns} from "../../util/Util";


const Builder = () => {
    const [userCampaigns, setUserCampaigns] = useState<CampaignParams[]>([])
    const [selectableCampaigns, setSelectableCampaigns] = useState<CampaignParams[]>([])
    const history = useHistory()

    useEffect(() => {
        getUserCampaigns().then(res => setUserCampaigns(res))
        getSelectableCampaigns().then(res => setSelectableCampaigns(res))

    }, [])

    const openCampaignInfo = (id: string | number) => {
        history.push(`/campaign/about/${id}`)
    }

    const handleCardRedirect = (id: string | number) => {
        history.push(`/campaign/${id}/tasks`)
    }

    return (
        <Grid>
            <Grid>
                <Typography align={"center"} variant={"h4"}>Мои кампании</Typography>
                <Grid container justifyContent={"center"}>
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
                <Grid container justifyContent={"center"}>
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


