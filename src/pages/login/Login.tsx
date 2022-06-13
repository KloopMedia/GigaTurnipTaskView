import React from "react";
import {Box, Button, Typography} from "@mui/material";
import {useAuth} from "../../context/authentication/hooks/useAuth";
import {useLocation, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";


const Login = () => {
    const {login} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const {t} = useTranslation();

    // @ts-ignore
    const from = location?.state?.from?.pathname || "/";

    const handleLogin = () => {
        login(() => navigate(from, {replace: true}))
    }

    return (
        <Box p={3}>
            <Typography align="center" variant="h4">{t("sign_up_page.title")}</Typography>
            <Typography variant="body1" align="center">{t("sign_up_page.description1")}</Typography>
            <Typography variant="body1" align="center">{t("sign_up_page.description2")}</Typography>
            <Box display={"flex"} justifyContent={"center"} p={2}>
                <Button size="large" color="primary" variant="contained" fullWidth={true}
                        onClick={handleLogin}>{t("sign_up_page.sign_up_button")}</Button>
            </Box>
        </Box>
    )
}

export default Login