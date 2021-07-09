import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Grid} from "@material-ui/core";

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

const SimpleTabs = (props: any) => {
    const classes = useStyles();
    const {value, handleChange} = props;

    return (
        <Grid>
            <div className={classes.root}>
                <Tabs value={value} onChange={handleChange} variant="fullWidth" centered aria-label="simple tabs example">
                    <Tab label="Невыполненные" {...a11yProps(0)} />
                    <Tab label="Выполненные" {...a11yProps(1)} />
                </Tabs>
            </div>
            {props.children}
        </Grid>
    );
}

export default SimpleTabs
