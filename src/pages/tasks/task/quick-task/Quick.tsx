import React from 'react';
import {Button, IconButton, Tooltip} from "@mui/material";
import ExpandableCard from "../../../../components/card/ExpandableCard";
import DoneIcon from '@mui/icons-material/Done';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type Props = {
    data: any,
    active?: boolean,
    onRequest: (id: number) => void,
    onSelect: (id: number) => void
};

const Quick: React.FC<Props> = (props) => {
    const {data, active, onSelect, onRequest, children} = props;

    const requestButton = active ?
        (
            <Tooltip title={"Получен"}>
                <IconButton color={"primary"} size={"small"}>
                    <CheckCircleIcon color={"primary"} fontSize={"large"}/>
                </IconButton>
            </Tooltip>
        )
        :
        (
            <Button key={"open_button"} variant={"contained"} onClick={() => onRequest(data.id)}>
                Редактировать
            </Button>
        );

    return (
        <ExpandableCard data={data} extraActions={[requestButton]} onClick={onSelect}>
            {children}
        </ExpandableCard>
    );
};

export default Quick