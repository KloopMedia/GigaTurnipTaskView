import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useHistory} from "react-router-dom";
import {requestTaskAssignment, requestTaskCreation} from "../../util/Util";
import {CardProps} from "../../util/Types";
import {Box, Grid} from "@mui/material";

const TaskCard = (props: CardProps) => {
    const {id, complete, reopened, name, description, creatable, selectable, integrated} = props;
    const history = useHistory()

    const handleOpen = () => {
        if (integrated) {
            history.push(`${history.location.pathname}/${id}/integrated`)
        } else {
            history.push(`${history.location.pathname}/${id}`)
        }
    }

    const handleCreate = () => {
        requestTaskCreation(id)
            .then(res => history.push(`${history.location.pathname}/${res.id}`))
            .catch(err => alert(err))
    };

    const handleSelectable = () => {
        requestTaskAssignment(id)
            .then(res => history.push(`${history.location.pathname}/${id}`))
            .catch(err => alert(err))
    }

    const returnButton = () => {
        if (selectable) {
            return <Button size="small" onClick={handleSelectable}>Открыть</Button>
        } else if (creatable) {
            return <Button size="small" onClick={handleCreate}>Создать</Button>
        } else {
            return <Grid container>
                <Box flex={1}>
                    <Button size="small" onClick={handleOpen}>Открыть</Button>
                </Box>
                {!complete && reopened && <Typography variant={"subtitle1"} color={"red"}>Возвращено</Typography>}
            </Grid>
        }
    }

    return (
        <Card sx={{width: 300}}>
            <CardContent>
                <Typography variant="h5" component="span" gutterBottom={true}>
                    {name}
                </Typography>
                <br/>
                <Typography variant="subtitle2" component="span">
                    {id && !creatable ? `ID: ${id}` : <br/>}
                </Typography>
                <br/>
                <Typography variant="body1" component="span">
                    {description ? description : <br/>}
                </Typography>
            </CardContent>
            <CardActions>
                {returnButton()}
            </CardActions>
        </Card>
    );
};

export default TaskCard