import React, {ReactNode, useState} from 'react';
import {Box, Tab, Tabs as DefaultTabs, TabsProps} from "@mui/material";
import TabPanel from "./TabPanel";

type Props = TabsProps & {
    data: { label: string, component: ReactNode }[],
    value: number,
    onChange: (event: React.SyntheticEvent, newValue: number) => void
};

const a11yProps = (index: number) => ({
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
});

const Tabs = (props: Props) => {
    const {data, value, onChange, ...rest} = props;

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        onChange(event, newValue)
    }

    const renderTabs = () => {
        return data.map((item, index) =>
            <Tab key={`tab_${index}`} label={item.label} {...a11yProps(index)} />
        )
    }

    const renderPanels = () => {
        return data.map((item, index) =>
            <TabPanel key={`tabpanel_${index}`} index={index} value={value}>
                {item.component}
            </TabPanel>
        )
    }

    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <DefaultTabs value={value} onChange={handleChange} aria-label="basic tabs example" {...rest}>
                    {renderTabs()}
                </DefaultTabs>
            </Box>
            {renderPanels()}
        </Box>
    );
};

export default Tabs;