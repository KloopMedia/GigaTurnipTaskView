import React, {useEffect, useState} from "react";
import useAxios from "../../services/api/useAxios";
import {Box} from "@mui/material";
import {useNavigate} from "react-router-dom";
import List from "../../components/list/List";
import {useTranslation} from "react-i18next";

const Campaigns = () => {
    const {getUserCampaigns, getSelectableCampaigns} = useAxios();
    const navigate = useNavigate();
    const {t} = useTranslation();

    const [data, setData] = useState([]);
    const [selectableCampaigns, setSelectableCampaigns] = useState([]);

    useEffect(() => {
        getUserCampaigns().then(res => setData(res));
        getSelectableCampaigns().then(res => setSelectableCampaigns(res));
    }, [])

    const handleOpen = (id: number) => {
        navigate(`/campaign/${id}/tasks`)
    }

    const handleSelect = (id: number) => {
        navigate(`/campaign/${id}/about`)
    }

    return (
        <Box px={3} py={1}>
            <List id={"user_campaigns"} data={data} hideCreateButton={true} label={t("campaigns.user_campaigns")} onSelect={handleOpen}/>
            <List hidden={selectableCampaigns.length === 0} id={"selectable_campaigns"} data={selectableCampaigns} hideCreateButton={true} label={t("campaigns.selectable_campaigns")} onSelect={handleSelect}/>
        </Box>
    )
}

export default Campaigns