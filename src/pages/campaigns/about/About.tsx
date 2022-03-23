import React, {useEffect, useState} from 'react';
import BuilderLayout from "../../../components/layout/common-layouts/BuilderLayout";
import {Button, Typography} from "@mui/material";
import useAxios from "../../../services/api/useAxios";
import {useNavigate, useParams} from "react-router-dom";
import useHelpers from "../../../utils/hooks/UseHelpers";
import TextViewer from "../../../components/text-editor/TextViewer";
import {useTranslation} from "react-i18next";

type Props = {};

const About = (props: Props) => {
    const {} = props;
    const {requestCampaignInfo, requestCampaignJoin} = useAxios();
    const navigate = useNavigate();
    const {campaignId} = useParams();
    const {parseId} = useHelpers();
    const parsedCampaignId = parseId(campaignId);
    const {t} = useTranslation();

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [richText, setRichText] = useState("")

    useEffect(() => {
        requestCampaignInfo(parsedCampaignId)
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
    }, [parsedCampaignId])

    const joinCampaign = () => {
        requestCampaignJoin(parsedCampaignId).then(() => navigate(`/campaign/${campaignId}/tasks`))
    }

    return (
        <BuilderLayout>
            <Typography variant={"h3"} align={"center"}>{name}</Typography>
            <Typography variant={"h6"} align={"center"}>{description}</Typography>
            {richText && <TextViewer data={richText}/>}
            <Button variant={"contained"} color={"warning"} fullWidth onClick={joinCampaign}>{t("campaigns.join")}</Button>
        </BuilderLayout>
    );
};

export default About