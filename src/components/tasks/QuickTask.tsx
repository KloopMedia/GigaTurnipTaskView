import React, {useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import IconButton, {IconButtonProps} from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {QuickTaskProps} from "../../util/Types";
import QuickTaskContent from "./QuckTaskContent";
import {Button, Stack} from "@mui/material";
import {requestTaskAssignment} from "../../util/Util";
import DoneIcon from '@mui/icons-material/Done';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const QuickTask = (props: QuickTaskProps) => {
    const {id, complete, name, description, creatable, selectable, task, expand, refreshTasks} = props;
    const [expanded, setExpanded] = useState(false);
    const [isAssigned, setAssigned] = useState(false);

    useEffect(() => {
        setExpanded(expand)
    }, [expand])

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleSelectable = () => {
        requestTaskAssignment(id)
            .then(res => setAssigned(true))
            .catch(err => {
                alert(err)
                if (refreshTasks) {
                    refreshTasks()
                }
            })
    }

    return (
        <Card>
            <CardHeader
                action={
                    <Stack direction="row" spacing={1}>
                        <Button size={"small"} variant={isAssigned ? "text" : "outlined"} disabled={isAssigned} sx={{borderRadius: "5em"}}
                                onClick={handleSelectable}>
                            {isAssigned ?  <DoneIcon color={"primary"}/> : "Get"}
                        </Button>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            disabled={creatable}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon/>
                        </ExpandMore>
                    </Stack>
                }
                sx={{py: 1, px: 2}}
                title={name}
                subheader={`ID: ${id}`}
                titleTypographyProps={{variant: "h6"}}
                subheaderTypographyProps={{variant: "caption"}}
            />
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <QuickTaskContent id={id} taskData={task} isAssigned={isAssigned} refreshTasks={refreshTasks}/>
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default QuickTask
