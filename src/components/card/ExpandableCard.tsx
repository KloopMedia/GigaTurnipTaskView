import React, { ReactNode, useEffect, useState } from 'react';
import CardHeader from "@mui/material/CardHeader";
import { Box, CardActions, Grid, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { useTranslation } from "react-i18next";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

type Props = {
    data: any,
    hideExpandButton?: boolean,
    hideOpenButton?: boolean,
    extraActions?: ReactNode[],
    onClick?: (id: number) => void
};

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const ExpandableCard: React.FC<Props> = (props) => {
    const { data, children, hideExpandButton, hideOpenButton, extraActions, onClick } = props;
    const { name, description, id } = data;
    const [expand, setExpand] = useState(false);
    const { t } = useTranslation();

    const handleToggle = () => {
        setExpand(!expand)
    }

    useEffect(() => {
        setExpand(false);
    }, [id])

    const handleClick = () => {
        if (onClick) {
            onClick(id)
        }
    }

    return (
        <Card>
            <CardHeader
                action={
                    <Grid container direction="column">
                        {extraActions}
                        <IconButton hidden={hideOpenButton} onClick={handleClick}>
                            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
                                <OpenInNewIcon color={'primary'} />
                                <Typography variant={'caption'}>{t("open")}</Typography>
                            </Box>
                        </IconButton>
                    </Grid>
                }
                title={name}
                subheader={`ID: ${id}`}
                titleTypographyProps={{ variant: "h6" }}
                subheaderTypographyProps={{ variant: "caption" }}
            />
            <CardActions>
                <ExpandMore
                    hidden={hideExpandButton}
                    key={"expand_button"}
                    expand={expand}
                    onClick={handleToggle}
                    aria-expanded={expand}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expand} timeout="auto" unmountOnExit>
                <CardContent>
                    {children}
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default ExpandableCard