import React, {useEffect, useState} from "react";
import {auth, provider} from "../../services/firebase/Firebase";
import {signInWithPopup, getIdToken, signOut, onIdTokenChanged} from "firebase/auth";
import {useTranslation} from "react-i18next";

interface AuthContextType {
    user: any;
    ready: boolean;
    getToken: () => Promise<string>;
    login: (callback: VoidFunction) => void;
    logout: (callback: VoidFunction) => void;
}

export const AuthContext = React.createContext<AuthContextType>(null!);

const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [ready, setReady] = useState(false);
    const {i18n} = useTranslation();

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

    const login = (callback: VoidFunction) => {
        return signInWithPopup(auth, provider).then((result) => {
            const user = result.user;
            console.log(user)
            setUser(user);
            callback();
        });
    };

    const logout = (callback: VoidFunction) => {
        return signOut(auth).then(() => {
            setUser(null);
            callback();
        });
    };

    const value = {user, ready, getToken, login, logout};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider