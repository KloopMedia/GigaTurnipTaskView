import React, {useContext} from "react";
import {Box, Button, Grid, Typography} from "@mui/material";
import {useAuth} from "../../context/authentication/hooks/useAuth";
import {useLocation, useNavigate} from "react-router-dom";


const Login = () => {
    const {login} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // @ts-ignore
    const from = location?.state?.from?.pathname || "/";

    const handleLogin = () => {
        login(() => navigate(from, { replace: true }))
    }

    return (
        <Box p={3}>
            <Typography align="center" variant="h4">Регистрация</Typography>
            <Typography variant="body1" align="center">Нажмите на кнопку (Вход или Регистрация).</Typography>
            <Typography variant="body1" align="center">Если у вас нет аккаунта Google, то создайте его.</Typography>
            <Box display={"flex"} justifyContent={"center"} p={2}>
                <Button size="large" color="primary" variant="contained" fullWidth={true} onClick={handleLogin}>Регистрация</Button>
            </Box>
        </Box>
    )
}

export default Login