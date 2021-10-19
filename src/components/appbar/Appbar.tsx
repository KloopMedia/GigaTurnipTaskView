import * as React from 'react';
import {styled, useTheme, Theme, CSSObject} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {projectName} from "../../config/Config";
import {signInWithGoogle, signOut} from "../../util/Firebase";
import {useHistory, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../util/Auth";
import {getUserCampaigns} from "../../util/Util";
import {Button} from "@mui/material";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

type AppbarProps = { children: React.ReactNode }

export default (props: AppbarProps) => {
    const theme = useTheme();
    const history = useHistory();
    const {campaignId} = useParams<{ campaignId: string }>();
    const {currentUser} = useContext(AuthContext)
    const {children} = props;

    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const redirectToMain = () => {
        history.push('/')
    }

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    {/*<IconButton*/}
                    {/*    color="inherit"*/}
                    {/*    aria-label="open drawer"*/}
                    {/*    onClick={handleDrawerOpen}*/}
                    {/*    edge="start"*/}
                    {/*    sx={{*/}
                    {/*        marginRight: '36px',*/}
                    {/*        ...(open && {display: 'none'}),*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <MenuIcon/>*/}
                    {/*</IconButton>*/}
                    <Typography variant="h6" noWrap component="div" sx={{cursor: "pointer", flexGrow: 1 }}
                                onClick={redirectToMain}>
                        {projectName}
                    </Typography>
                    <Typography>{currentUser?.email}</Typography>
                    {currentUser ?
                        <Button onClick={signOut} color={"inherit"}>
                            Выйти
                        </Button>
                        :
                        <Button onClick={signInWithGoogle} color={"inherit"}>
                            Войти
                        </Button>
                    }
                </Toolbar>
            </AppBar>
            {/*<Drawer variant="permanent" open={open}>*/}
            {/*    <DrawerHeader>*/}
            {/*        <IconButton onClick={handleDrawerClose}>*/}
            {/*            {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}*/}
            {/*        </IconButton>*/}
            {/*    </DrawerHeader>*/}
            {/*    <Divider/>*/}
            {/*</Drawer>*/}
            <Box component="main" sx={{flexGrow: 1, p: 0}}>
                <DrawerHeader/>
                {children}
            </Box>
        </Box>
    );
}
