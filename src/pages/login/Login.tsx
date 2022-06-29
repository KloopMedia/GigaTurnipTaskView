import React, { useEffect, useState } from "react";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useAuth } from "../../context/authentication/hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../services/firebase/Firebase";

declare global {
    interface Window {
        recaptchaVerifier: RecaptchaVerifier;
    }
}


const Login = () => {
    const { login, loginWithPhone, requestOTP } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();

    const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
    const [OTPCode, setOTPcode] = useState<string | null>(null);
    const [codeIsSend, setCodeIsSend] = useState(false);

    // @ts-ignore
    const from = (location?.state?.from?.pathname ?? "/") + location?.state?.search;

    const handleLogin = () => {
        login(() => navigate(from, { replace: true }))
    }

    useEffect(() => {
        generateRecaptcha()
    }, [])


    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
        }, auth);
    }


    const requestSMSCode = async () => {
        if (phoneNumber) {
            const appVerifier = window.recaptchaVerifier;
            const isSend = await requestOTP(phoneNumber, appVerifier);
            setCodeIsSend(isSend);
        }
    }

    const submitSMSCode = () => {
        if (OTPCode) {
            loginWithPhone(OTPCode, () => navigate(from, { replace: true }));
        }
    }

    return (
        <Box display={"flex"} justifyContent={"center"}>
            <Box p={3} maxWidth={500}>
                <Typography align="center" variant="h4">{t("sign_up_page.title")}</Typography>
                <Typography variant="body1" align="center">{t("sign_up_page.description1")}</Typography>
                <Typography variant="body1" align="center">{t("sign_up_page.description2")}</Typography>
                <Box display={"flex"} justifyContent={"center"} py={2}>
                    <Button size="large" color="primary" variant="contained" fullWidth={true}
                        onClick={handleLogin}>{t("sign_up_page.sign_up_button")}</Button>
                </Box>
                <Divider><Typography variant={"caption"}>{t("sign_up_page.divider_text")}</Typography></Divider>
                <Box py={2}>
                    <Box py={1}>
                        <TextField
                            type="tel"
                            label={t("sign_up_page.phone_number")}
                            onChange={(event) => setPhoneNumber(event.target.value)}
                            fullWidth
                            helperText={t("sign_up_page.phone_helper_text")} />
                    </Box>
                    <Button onClick={requestSMSCode} size="large" color="primary" variant="contained" fullWidth={true}>
                        {t("sign_up_page.request_code_button")}
                    </Button>
                </Box>
                <Box hidden={!codeIsSend} py={1}>
                    <Box py={1}>
                        <TextField label={t("sign_up_page.otp_code")} onChange={(event) => setOTPcode(event.target.value)} fullWidth />
                    </Box>
                    <Button onClick={submitSMSCode} size="large" color="primary" variant="contained" fullWidth={true}>
                        {t("sign_up_page.submit_code_button")}
                    </Button>
                </Box>
                <Box id="recaptcha-container"></Box>
            </Box>
        </Box>
    )
}

export default Login