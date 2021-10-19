import React from 'react';
import {CardParams} from "../../util/Types";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ParentCard = (props: CardParams) => {
    const {id, name, description, campaign} = props.data;
    const {onCardButtonClick, openCampaignInfo, selectable} = props;

    const handleOpen = () => {
        onCardButtonClick(id)
    }

    const redirectToInfoPage = () => {
        if (openCampaignInfo) {
            openCampaignInfo(id)
        }
    }

    return (
        <Card sx={{ minWidth: 300 }}>
            <CardContent>
                <Typography variant="h5" component="h2" gutterBottom={true}>
                    {name}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                    ID: {id} {campaign && `Campaign: ${campaign}`}
                </Typography>
                <Typography variant="body1" component="p">
                    {description ? description : <br/>}
                </Typography>
            </CardContent>
            <CardActions>
                {selectable ?
                    <Button size="small" onClick={redirectToInfoPage}>Подробнее</Button>
                    :
                    <Button size="small" onClick={handleOpen}>Открыть</Button>
                }
            </CardActions>
        </Card>
    );
};

export default ParentCard