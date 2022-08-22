import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Grid, Pagination, Tab, Typography, useMediaQuery } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../../services/api/useAxios";
import useHelpers from "../../utils/hooks/UseHelpers";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useTranslation } from "react-i18next";


const Notifications = ({ importance, onlyNew }: { importance?: number, onlyNew?: boolean }) => {
    const [viewedNotifications, setViewedNotifications] = useState<any[]>([]);
    const [notViewedNotifications, setNotViewedNotifications] = useState<any[]>([{ id: 1, title: '123', importance: 0 }]);
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = React.useState(1);
    const [tab, setTab] = useState("1");

    const matches = useMediaQuery('(min-width:600px)');
    const navigate = useNavigate();
    const { campaignId } = useParams();
    const { parseId, formatDateString } = useHelpers();
    const parsedCampaignId = parseId(campaignId);
    const { getUserNotifications, getNotificationContent } = useAxios();
    const { t } = useTranslation();

    useEffect(() => {
        if (tab === "1") {
            getUserNotifications(parsedCampaignId, false, importance).then(res => {
                setTotalPages(Math.ceil(res.count / 10));
                setNotViewedNotifications(res.results);
            })
        } else if (tab === "2") {
            getUserNotifications(parsedCampaignId, true, importance).then(res => {
                setTotalPages(Math.ceil(res.count / 10));
                setViewedNotifications(res.results);
            })
        }
        setPage(1);
    }, [tab])

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        console.log(tab)
        if (value) {
            if (tab === "1") {
                getUserNotifications(parsedCampaignId, false, importance, value).then(res => {
                    setTotalPages(Math.ceil(res.count / 10));
                    setNotViewedNotifications(res.results);
                })
            } else if (tab === "2") {
                getUserNotifications(parsedCampaignId, true, importance, value).then(res => {
                    setTotalPages(Math.ceil(res.count / 10));
                    setViewedNotifications(res.results);
                })
            }
        }
    };

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setTab(newValue);
    };

    const openMessage = (id: number) => {
        navigate(`/campaign/${campaignId}/notifications/${id}`)
    }

    if (onlyNew) {
        return (
            <Box>
                {notViewedNotifications.map(message =>
                    <Grid container justifyContent="center" key={message.id} p={1}>
                        <Card onClick={() => openMessage(message.id)}
                            sx={{ width: matches ? 700 : 300, background: 'lightblue', cursor: "pointer" }}>
                            <CardContent>
                                <Typography variant="h6">
                                    {message.title}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {formatDateString(message.created_at)}
                                </Typography>
                            </CardContent>
                        </Card>
                        <Button
                            variant={'contained'}
                            sx={{ background: '#adbce6' }}
                            onClick={() => getNotificationContent(parseId(message.id))}>X
                        </Button>
                    </Grid>
                )}
            </Box>
        );
    } else {
        return (
            <Box>
                <Typography align={"center"} variant={"h5"} p={2}>{t("notifications.title")}</Typography>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={tab}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleTabChange} aria-label="lab API tabs example" centered variant={"fullWidth"}>
                                <Tab label={t("notifications.unread")} value="1" />
                                <Tab label={t("notifications.read")} value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            {notViewedNotifications.map(message =>
                                <Grid container justifyContent="center" key={message.id} p={1}>
                                    <Card onClick={() => openMessage(message.id)}
                                        sx={{ width: matches ? 700 : 300, background: 'lightblue', cursor: "pointer" }}>
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
                        <TabPanel value="2">
                            {viewedNotifications.map(message =>
                                <Grid container justifyContent="center" key={message.id} p={1}>
                                    <Card onClick={() => openMessage(message.id)}
                                        sx={{ width: matches ? 700 : 300, background: 'lightblue', cursor: "pointer" }}>
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
                    </TabContext>
                    {totalPages > 1 && <Box p={2} display={"flex"} justifyContent={"center"}>
                        <Pagination count={totalPages} page={page} onChange={handlePageChange} showFirstButton
                            showLastButton />
                    </Box>}
                </Box>
            </Box>
        );
    }
};

export default Notifications
