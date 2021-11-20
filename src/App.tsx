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
    return (
        <div>
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

        </div>
    );
}

export default App