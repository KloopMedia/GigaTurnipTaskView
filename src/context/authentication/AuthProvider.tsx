import React, { useEffect, useState } from "react";
import { auth, provider } from "../../services/firebase/Firebase";
import { signInWithPopup, getIdToken, signOut, onIdTokenChanged, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult, ApplicationVerifier } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { useToast } from "../toast/hooks/useToast";

interface AuthContextType {
    user: any;
    ready: boolean;
    getToken: () => Promise<string>;
    login: (callback: VoidFunction) => void;
    logout: (callback: VoidFunction) => void;
    loginWithPhone: (code: string, callback: VoidFunction) => void;
    requestOTP: (phone: string, appVerifier: RecaptchaVerifier) => Promise<boolean>;
}

export const AuthContext = React.createContext<AuthContextType>(null!);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [ready, setReady] = useState(false);
    const [userVerification, setUserVerification] = useState<ConfirmationResult | null>(null);
    const { i18n, t } = useTranslation();
    const {openToast} = useToast();

    useEffect(() => {
        onIdTokenChanged(auth, async (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
            setReady(true)
        });

        const lang = localStorage.getItem('lang');
        if (lang) {
            i18n.changeLanguage(lang);
        }
    }, [])

    const getToken = async () => {
        return await getIdToken(user);
    }

    const login = async (callback: VoidFunction) => {
        try {
            const result_1 = await signInWithPopup(auth, provider);
            const user = result_1.user;
            setUser(user);
            callback();
        } catch (error) {

        }
    };

    const loginWithPhone = async (code: string, callback: VoidFunction) => {
        if (userVerification) {
            try {
                const { user } = await userVerification.confirm(code)
                setUser(user);
                callback();
            } catch (error: any) {
                console.log(error.code);
                if (error.code === 'auth/invalid-verification-code') {
                    openToast(t("sign_up_page.invalid_code_error"), 'error')
                } else {
                    openToast(t("sign_up_page.unknown_login_with_phone_error"), 'error')
                }
            }
        }
    }

    const requestOTP = async (phone: string, appVerifier: RecaptchaVerifier): Promise<boolean> => {
        try {
            const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
            setUserVerification(confirmationResult);
            return true;
        } catch (error: any) {
            if (error.code === 'auth/invalid-phone-number') {
                openToast(t("sign_up_page.invalid_phone_number"), 'error')
            } else {
                openToast(t("sign_up_page.unknown_login_with_phone_error"), 'error')
            }
            return false;
        }
    }

    const logout = async (callback: VoidFunction) => {
        await signOut(auth);
        setUser(null);
        callback();
    };

    const value = { user, ready, getToken, login, logout, loginWithPhone, requestOTP };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider