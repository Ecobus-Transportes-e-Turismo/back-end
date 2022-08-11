import type { SingInType } from '../types'
import { createContext, useState, useContext } from "react";
import * as Auth from '../services/auth';
import { Users } from "../types";
import { setCookie, destroyCookie, parseCookies } from 'nookies';
import  Router  from 'next/router';
import Loadding from '../components/Loadding';
import { NextPage } from 'next';

interface AuthContext {
    singed:boolean,
    user:Users | null,
    singIn(data:SingInType):Promise<void>,
    singOut():Promise<void>,
    loadding:boolean,
    error?:boolean
}

const AuthContext = createContext<AuthContext >({} as AuthContext);

const AuthProvider = ({children}:any):JSX.Element => {

    const [user, setUser] = useState<null | Users>(null);
    const [loadding, setLoadding] = useState(false);

    const singIn = async ({email, password}:SingInType) => {
        setLoadding(true);
        const { user, token} = await Auth.handleSingIn({password, email});
        setCookie(undefined, 'ecobus_token', token, { maxAge: 60 * 60 * 1 });
        setUser(user);
        setLoadding(false);
        Router.push('/')
    }

    const singOut = async () => {}

    return (
        loadding ? <Loadding/> :
        <AuthContext.Provider value={{singed:!!user, user, singIn, singOut, loadding}}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => {

    const ctx = useContext(AuthContext);
    return ctx;
}

export default AuthProvider;