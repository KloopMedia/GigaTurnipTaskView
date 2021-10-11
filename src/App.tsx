import React from "react";
import Task from './components/tasks/Task'
import Appbar from "./components/appbar/Appbar";

import {HashRouter as Router, Route, Switch} from "react-router-dom";
import SimpleAppbar from "./components/appbar/SimpleAppbar";
import Campaigns from "./components/campaigns/Campaigns";
import TaskMenu from "./components/tasks/TaskMenu";
import About from "./components/campaigns/About";

const App = () => {
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