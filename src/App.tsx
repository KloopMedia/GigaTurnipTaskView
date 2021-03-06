import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import AuthProvider from "./context/authentication/AuthProvider";
import ToastProvider from "./context/toast/ToastProvider";
import RequireAuth from "./pages/login/RequireAuth";
import Layout from "./components/layout/Layout";
import Login from "./pages/login/Login";
import Tasks from "./pages/tasks/Tasks";
import Campaigns from "./pages/campaigns/Campaigns";
import About from "./pages/campaigns/about/About";
import Task from "./pages/tasks/task/Task";
import Notifications from "./pages/notifications/Notifications";
import NotificationContent from "./pages/notifications/NotificationContent";

const App = () => (
    <ToastProvider>
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<RequireAuth><Layout /></RequireAuth>}>
                        <Route path={"campaign"}>
                            <Route path=":campaignId">
                                <Route path={"notifications"}>
                                    <Route path={":id"} element={<NotificationContent />} />
                                    <Route index element={<Notifications />} />
                                </Route>
                                <Route path={"about"} element={<About />} />
                                <Route path={"tasks"}>
                                    <Route path={":taskId"}>
                                        <Route index element={<Task />} />
                                    </Route>
                                    <Route index element={<Tasks />} />
                                </Route>
                                <Route index element={<Tasks />} />
                            </Route>
                            <Route index element={<Campaigns />} />
                        </Route>
                        <Route index element={<Campaigns />} />
                    </Route>
                    <Route path={"login"} element={<Login />} />
                </Routes>
            </Router>
        </AuthProvider>
    </ToastProvider>
)

export default App