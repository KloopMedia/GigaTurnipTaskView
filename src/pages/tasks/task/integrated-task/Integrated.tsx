import React, {useCallback, useEffect, useState} from 'react';
import BuilderLayout from "../../../../components/layout/common-layouts/BuilderLayout";
import {Box, Button, Chip, Divider, Grid} from "@mui/material";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown"
import Quick from "../quick-task/Quick";
import Common from "../common-task/Common";
import {TaskProps} from "../Task.types";


const Integrated = (props: TaskProps) => {
    const {
        id,
        getIntegrated,
        triggerWebhook
    } = props;

    const [integrations, setIntegrations] = useState([])
    const [active, setActive] = useState<number[]>([])
    const [update, setUpdate] = useState(false)

    const mountData = useCallback(async (id) => {
        const integrations = await getIntegrated(id);
        setIntegrations(integrations);
    }, [])

    useEffect(() => {
        mountData(id);
    }, [mountData, id])

    const handleActivate = (id: number, action: "add" | "remove") => {
        if (action === "add") {
            const newSet = Array.from(new Set([...active, id]));
            setActive(newSet)
        }
        if (action === "remove") {
            const copy: number[] = [...active]
            const index = copy.indexOf(id);
            if (index > -1) {
                copy.splice(index, 1);
                setActive(copy)
            }
        }
    }

    const forceUpdate = (value: boolean) => {
        setUpdate(value)
    }

    const handleWebhook = () => {
        triggerWebhook(id)
            .then(() => setUpdate(true))
    }

    return (
        <Box>
            <Grid container spacing={2}>
                {integrations.map((item: any, index: number) =>
                    (
                        <Grid item key={index} width={"100%"}>
                            <Quick {...props} onAction={handleActivate} hideSubmit={true} active={active.includes(item.id)} id={item.id}/>
                        </Grid>
                    )
                )}
            </Grid>
            <Box pt={2}>
                <Button fullWidth color={"warning"} variant={"contained"} onClick={handleWebhook}>Сгенерировать форму</Button>
            </Box>
            <Divider sx={{py: 2}}>
                <Chip icon={<ArrowCircleDownIcon/>} label="Обобщающая форма"/>
            </Divider>
            <Common fullwidth={true} update={update} forceUpdate={forceUpdate} {...props} />
        </Box>
    );
};

export default Integrated