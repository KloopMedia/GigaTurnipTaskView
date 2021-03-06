import React from 'react';
import {CSSObject, styled, Theme, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiLink from '@mui/material/Link';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {Link, useNavigate, useParams} from "react-router-dom";
import {Button, Typography} from "@mui/material";
import {useAuth} from "../../../context/authentication/hooks/useAuth";
import {useTranslation} from "react-i18next";

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
    [theme.breakpoints.down('sm')]: {
        width: 0,
    }
});

// @ts-ignore
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

const StyledAppBar = styled(MuiAppBar, {
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

export default function Appbar(props: { children?: any }) {
    const theme = useTheme();
    const {campaignId} = useParams();
    const navigate = useNavigate();
    const {user, logout} = useAuth();
    const [open, setOpen] = React.useState(false);
    const { t, i18n } = useTranslation();

    const {children} = props;

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const DrawerItems = [
        {page: "tasks", title: t("appbar.tasks"), icon: <AssignmentIcon/>},
        {page: "notifications", title: t("appbar.notifications"), icon: <NotificationsIcon/>}
    ]

    const renderDrawerItems = () => {
        return DrawerItems.map((item, index) => (
            <ListItem key={index} component={Link} to={`campaign/${campaignId}/${item.page}`}>
                <ListItemIcon>
                    {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title}/>
            </ListItem>
        ));
    };

    const handleLanguageChange = () => {
        if (i18n.language === "ru") {
            i18n.changeLanguage("en");
            localStorage.setItem('lang', "en");
        } else {
            i18n.changeLanguage("ru");
            localStorage.setItem('lang', "ru");
        }
    }

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <StyledAppBar position="fixed" open={open}>
                <Toolbar>
                    {campaignId && <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: '16px',
                            ...(open && {display: 'none'}),
                        }}
                    >
                        <MenuIcon/>
                    </IconButton>}
                    <Box sx={{flexGrow: 1}}>
                        <MuiLink component={Link} color={"inherit"} underline="none" variant="h6" noWrap to={"/"} sx={{
                            '&:hover': {
                                color: 'white',
                                boxShadow: 'none',
                            }
                        }}>
                            GigaTurnip Tasks
                        </MuiLink>
                        <Typography variant={"subtitle2"}>{user?.email}</Typography>
                    </Box>
                    <Button color={"inherit"} onClick={handleLanguageChange}>{i18n.language}</Button>
                    <Button color={"inherit"} onClick={() => logout(() => console.log('log out'))}>{t("appbar.log_out")}</Button>
                </Toolbar>
            </StyledAppBar>
            {campaignId && <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <List>
                    {renderDrawerItems()}
                </List>
            </Drawer>}
            <Box component="main" sx={{flexGrow: 1, width: "100%"}}>
                <DrawerHeader/>
                {children}
            </Box>
        </Box>
    );
}
