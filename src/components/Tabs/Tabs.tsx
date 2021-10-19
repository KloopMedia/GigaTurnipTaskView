import React from 'react';
import {Box, Grid, Tab, Tabs} from "@mui/material";

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

type SimpleTabsProps = {
    value: number | string,
    handleChange: (event: any, newValue: number) => void,
    showSelectable: boolean,
    children: any
}

const SimpleTabs = (props: SimpleTabsProps) => {
    const {value, handleChange} = props;

    return (
        <Box sx={{width: '100%', bgcolor: 'background.paper'}}>
            <Tabs value={value} onChange={handleChange} centered variant={"fullWidth"}>
                <Tab label="Невыполненные" {...a11yProps(0)} />
                <Tab label="Выполненные" {...a11yProps(1)} />
                {props.showSelectable && <Tab label="Доступные" {...a11yProps(2)} />}
            </Tabs>
            {props.children}
        </Box>
    );
}

export default SimpleTabs
