import React from 'react';
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExpandableCard from "../../../../components/card/ExpandableCard";
import CommonView from "../common-task/CommonView";
import { TaskViews } from "../Task.types";
import { useTranslation } from "react-i18next";
import EditIcon from '@mui/icons-material/Edit';

type Props = {
    active: boolean,
    data: any,
    formData?: any,
    complete?: boolean,
    view?: TaskViews,
    disabled?: boolean,
    previousTasks?: any[],
    onChange: (formData: any) => void,
    onSubmit: (formData: any) => void,
    onRelease: () => void,
    onPrevious: () => void,
    onOpen: () => void,
    onRequest: () => void,
    hideOpen?: boolean,
    hideSubmit?: boolean,
    onAction?: () => void
};

const QuickView = (props: Props) => {
    const { active, onRequest, onOpen, onAction, hideSubmit, hideOpen, ...rest } = props;
    const cardData = { name: props.data.stage.name, id: props.data.id }

    const { t } = useTranslation();

    const requestButton = active ?
        (
            <Tooltip key={"edit_button_checked"} title={t("accepted") as string}>
                <IconButton color={"primary"} size={"small"} onClick={onAction}>
                    <CheckCircleIcon color={"primary"} fontSize={"large"} />
                </IconButton>
            </Tooltip>
        )
        :
        <IconButton key={"edit_button"} onClick={onRequest}>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
                <EditIcon color={'primary'} />
                <Typography variant={'caption'}>{t('edit')}</Typography>
            </Box>
        </IconButton>

    return (
        <ExpandableCard data={cardData} extraActions={[requestButton]} hideOpenButton={hideOpen} onClick={onOpen}>
            <CommonView {...rest} hideSubmit={hideSubmit} disabled={!active} isUploading={false} />
        </ExpandableCard>
    );
};

export default QuickView