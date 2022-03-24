import React from 'react';
import {Button, CardActions, CardContent, Typography} from '@mui/material'
import MuiCard from '@mui/material/Card';
import {useTranslation} from "react-i18next";

type Props = {
    data: any;
    onClick: (id: number) => void;
};

const Card = (props: Props) => {
    const {data, onClick} = props;
    const {name, description, id, reopened} = data;

    const {t} = useTranslation();

    const handleClick = () => {
        onClick(id)
    }

    return (
        <MuiCard>
            <CardContent sx={{pb: 1}}>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography gutterBottom variant={"caption"} color="text.secondary">ID: {id}</Typography>
                <Typography overflow={"hidden"} textOverflow={"ellipsis"} variant="body2"
                            sx={{height: 60, maxWidth: 500}}>
                    {description}
                </Typography>
            </CardContent>
            <CardActions sx={{justifyContent: "space-between"}}>
                <Button size="small" onClick={handleClick}>{t("open")}</Button>
                <Typography color={"error"} hidden={!reopened}>Возвращено</Typography>
            </CardActions>
        </MuiCard>
    );
};

export default Card