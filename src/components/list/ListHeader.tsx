import React from 'react';
import {Button, Grid, IconButton, Tooltip, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import {ViewProps} from "./List.types";
import {useTranslation} from "react-i18next";

type Props = {
    label?: string,
    location: any,
    view: ViewProps,
    hideCreateButton?: boolean,
    hideViewButton?: boolean,
    onViewChange: (view: ViewProps) => void
};

const ListHeader = (props: Props) => {
    const {label, view, location, hideCreateButton, hideViewButton, onViewChange} = props;
    const {t} = useTranslation();

    return (
        <Grid container alignItems={"center"} spacing={1}>
            <Grid item flex={1}>
                <Typography hidden={!label} variant={"h4"}>{label}</Typography>
            </Grid>
            <Grid item hidden={hideCreateButton}>
                <Button component={Link} to={"new"} state={{from: location}} variant={"contained"} sx={{
                    '&:hover': {
                        color: 'white',
                        boxShadow: 'none',
                    }
                }}>{t("list_header.create")}</Button>
            </Grid>
            <Grid item hidden={hideViewButton}>
                <Tooltip title={t("list_header.grid") as string}>
                    <IconButton
                        color={view === "grid" ? "primary" : "default"}
                        onClick={() => onViewChange("grid")}
                    >
                        <GridViewIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title={t("list_header.list") as string}>
                    <IconButton
                        color={view === "list" ? "primary" : "default"}
                        onClick={() => onViewChange("list")}
                    >
                        <ViewListIcon/>
                    </IconButton>
                </Tooltip>
            </Grid>
        </Grid>
    );
};

export default ListHeader