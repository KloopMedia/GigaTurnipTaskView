import React, {useEffect, useState} from 'react';
import {Box} from "@mui/material";
import List from "../../components/list/List";
import useAxios from "../../services/api/useAxios";
import {useNavigate, useParams} from "react-router-dom";

type Props = {};

const Tasks = (props: Props) => {
    const {} = props;

    const {getCampaigns} = useAxios();
    const navigate = useNavigate();
    const {campaignId} = useParams();

    const [data, setData] = useState([])

    useEffect(() => {
        getCampaigns().then(res => setData(res))
    }, [])

    const handleSelect = (id: number) => {
        navigate(`/campaign/${campaignId}/tasks/${id}`)
    }


    return (
        <Box px={3} py={1}>
            <List id={"campaigns"} data={data} label={"Задания"} onSelect={handleSelect} hideCreateButton={true}/>
        </Box>
    );
};

export default Tasks