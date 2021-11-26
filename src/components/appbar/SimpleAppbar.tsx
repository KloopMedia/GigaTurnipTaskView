import React, {useContext} from 'react';
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {signInWithGoogle, signOut} from '../../util/Firebase';
import {AuthContext} from "../../util/Auth";
import {useHistory} from "react-router-dom";
import {projectName} from "../../config/Config";
import {styled} from "@mui/material/styles";


const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

type AppbarProps = { children: React.ReactNode }

export default (props: AppbarProps) => {
    const {children} = props;
    const {currentUser} = useContext(AuthContext)
    const history = useHistory();

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1}}>
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
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <DrawerHeader/>
                {children}
            </Box>
        </Box>
    );
}