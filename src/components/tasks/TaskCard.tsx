import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useHistory} from "react-router-dom";
import {requestTaskAssignment, requestTaskCreation} from "../../util/Util";

type CardProps = {
    id: number,
    complete?: boolean,
    name: string,
    description?: string,
    creatable?: boolean,
    selectable?: boolean
}

const TaskCard = (props: CardProps) => {
    const {id, complete, name, description, creatable, selectable} = props;
    const history = useHistory()

    const handleOpen = () => {
        history.push(`${history.location.pathname}/${id}`)
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
            return <Button size="small" onClick={handleOpen}>Открыть</Button>
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