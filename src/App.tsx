import React, {useContext} from "react";
import Task from './components/tasks/Task'
import Appbar from "./components/appbar/Appbar";

import {HashRouter as Router, Route, Switch} from "react-router-dom";

import {AuthContext} from "./util/Auth";
import SimpleAppbar from "./components/appbar/SimpleAppbar";
import Campaigns from "./components/campaigns/Campaigns";
import TaskMenu from "./components/tasks/TaskMenu";


const App = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path={"/campaign/:campaignId"}>
                        <Appbar>
                            <Route exact path="/campaign/:campaignId/tasks">
                                <TaskMenu/>
                            </Route>
                            <Route exact path="/campaign/:campaignId/tasks/:id">
                                <Task/>
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