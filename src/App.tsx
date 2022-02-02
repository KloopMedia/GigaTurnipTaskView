import React, {useContext} from "react";
import Task from './components/tasks/Task'
import Appbar from "./components/appbar/Appbar";

import {HashRouter as Router, Route, Switch} from "react-router-dom";
import SimpleAppbar from "./components/appbar/SimpleAppbar";
import Campaigns from "./components/campaigns/Campaigns";
import TaskMenu from "./components/tasks/TaskMenu";
import About from "./components/campaigns/About";
import {AuthContext} from "./util/Auth";
import Notifications from "./components/notifications/Notifications";
import NotificationContent from "./components/notifications/NotificationContent";
import IntegratedTask from "./components/tasks/IntegratedTask";
import {Box, Button, Grid, Typography} from "@mui/material";
import {signInWithGoogle} from "./util/Firebase";

const App = () => {
    const {currentUser} = useContext(AuthContext)
    if (currentUser) {
        const token = localStorage.getItem("token");
        currentUser.getIdToken(false).then((idToken: string) => {
            if (token) {
                if (idToken !== token) {
                    localStorage.setItem("token", idToken);
                    window.location.reload()
                }
            } else {
                localStorage.setItem("token", idToken);
                window.location.reload()
            }
        })
    }

    if (!currentUser) {
        return (
            <Grid container direction="column" py={5} px={1} justifyContent="center">
                <Typography align="center" variant="h4">Регистрация</Typography>
                <Typography variant="body1" align="center">Нажмите на кнопку (Вход или Регистрация).</Typography>
                <Typography variant="body1" align="center">Если у вас нет аккаунта Google, то создайте его.</Typography>
                <br/>
                <Button size="large" color="primary" variant="contained" onClick={signInWithGoogle}>Регистрация</Button>
            </Grid>
        )
    }

    return (
        <Box>
            <Router>
                <Switch>
                    <Route exact path={"/campaign/about/:id"}>
                        <About/>
                    </Route>
                    <Route path={"/campaign/:campaignId"}>
                        <Appbar>
                            <Route exact path="/campaign/:campaignId/tasks">
                                <TaskMenu/>
                            </Route>
                            <Route exact path="/campaign/:campaignId/tasks/:id">
                                <Task/>
                            </Route>
                            <Route exact path="/campaign/:campaignId/tasks/:id/integrated">
                                <IntegratedTask/>
                            </Route>
                            <Route exact path={"/campaign/:campaignId/notifications"}>
                                <Notifications/>
                            </Route>
                            <Route exact path={"/campaign/:campaignId/notifications/:id"}>
                                <NotificationContent/>
                            </Route>
                        </Appbar>
                    </Route>
                    <Route path="/">
                        <SimpleAppbar>
                            <Campaigns/>
                        </SimpleAppbar>
                    </Route>
                </Switch>
            </Router>

        </Box>
    );
}

export default App