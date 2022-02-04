import React, {useEffect, useState} from 'react';
import {a11yProps, formatDateString, getUserNotifications, paginatedDataHandler} from "../../util/Util";
import {Box, Card, CardContent, Grid, Pagination, Tab, Tabs, Typography, useMediaQuery} from "@mui/material";
import {useHistory, useParams} from "react-router-dom";
import {RouterParams} from "../../util/Types";
import TabPanel from "../Tabs/TabPanel";


const Notifications = ({importance, onlyNew}: { importance?: number, onlyNew?: boolean }) => {
    const [viewedNotifications, setViewedNotifications] = useState<any[]>([]);
    const [notViewedNotifications, setNotViewedNotifications] = useState<any[]>([]);
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = React.useState(1);
    const [tab, setTab] = useState(0);

    const matches = useMediaQuery('(min-width:600px)');
    const history = useHistory();
    const {campaignId} = useParams<RouterParams>()

    useEffect(() => {
        if (tab === 0) {
            getUserNotifications(campaignId, false, importance).then(res => paginatedDataHandler(res, setNotViewedNotifications, setTotalPages))
        } else if (tab === 1) {
            getUserNotifications(campaignId, true, importance).then(res => paginatedDataHandler(res, setViewedNotifications, setTotalPages))
        }
        setPage(1);
    }, [tab])

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        console.log(tab)
        if (value) {
            if (tab === 0) {
                getUserNotifications(campaignId, false, importance, value).then(res => paginatedDataHandler(res, setNotViewedNotifications, setTotalPages))
            } else if (tab === 1) {
                getUserNotifications(campaignId, true, importance, value).then(res => paginatedDataHandler(res, setViewedNotifications, setTotalPages))
            }
        }
    };

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTab(newValue);
    };


    const openMessage = (id: number) => {
        history.push(`notifications/${id}`)
    }

    return (
        onlyNew ?
            <div>
                {notViewedNotifications.map(message =>
                    <Grid container justifyContent="center" key={message.id} p={1}>
                        <Card onClick={() => openMessage(message.id)}
                              sx={{width: matches ? 700 : 300, background: 'lightblue', cursor: "pointer"}}>
                            <CardContent>
                                <Typography variant="h6">
                                    {message.title}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {formatDateString(message.created_at)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                )}
            </div>
            :
            <div>
                <Typography align={"center"} variant={"h5"} p={2}>Уведомления</Typography>
                <Box sx={{width: '100%', bgcolor: 'background.paper'}}>
                    <Tabs value={tab} onChange={handleTabChange} centered variant={"fullWidth"}>
                        <Tab label="Непрочитанные" {...a11yProps(0)} />
                        <Tab label="Прочитанные" {...a11yProps(1)} />
                    </Tabs>
                    <TabPanel value={tab} index={0}>
                        {notViewedNotifications.map(message =>
                            <Grid container justifyContent="center" key={message.id} p={1}>
                                <Card onClick={() => openMessage(message.id)}
                                      sx={{width: matches ? 700 : 300, background: 'lightblue', cursor: "pointer"}}>
                                    <CardContent>
                                        <Typography variant="h6">
                                            {message.title}
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            {formatDateString(message.created_at)}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )}
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        {viewedNotifications.map(message =>
                            <Grid container justifyContent="center" key={message.id} p={1}>
                                <Card onClick={() => openMessage(message.id)}
                                      sx={{width: matches ? 700 : 300, background: 'lightblue', cursor: "pointer"}}>
                                    <CardContent>
                                        <Typography variant="h6">
                                            {message.title}
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            {formatDateString(message.created_at)}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )}
                    </TabPanel>
                </Box>
                {totalPages > 1 && <Box p={2} display={"flex"} justifyContent={"center"}>
                    <Pagination count={totalPages} page={page} onChange={handlePageChange} showFirstButton
                                showLastButton/>
                </Box>}
            </div>
    )
};

export default Notifications