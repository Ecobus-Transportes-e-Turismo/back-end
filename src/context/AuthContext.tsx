import type { SingInType } from '../types'
import { createContext, useState, useContext } from "react";
import * as Auth from '../services/auth';
import { Users } from "../types";
import { setCookie, destroyCookie, parseCookies } from 'nookies';
import  Router  from 'next/router';
import Loadding from '../components/Loadding';
import { api } from '../services/axios';
import { findAllUsers } from '../services/findAllUsers';

type FormatUsers = {
    name:string,
    _id:string
}


interface AuthContext {
    singed:boolean,
    user:Users | null,
    users?:FormatUsers[] | null
    singIn(data:SingInType):Promise<void>,
    singOut():Promise<void>,
    loadding:boolean,
    error?:boolean
}

const AuthContext = createContext<AuthContext >({} as AuthContext);

const AuthProvider = ({children}:any):JSX.Element => {

    const 
        [ user, setUser ] = useState<null | Users>(null),
        [ users, setUsers ] = useState<null | FormatUsers[]>(null),
        [ loadding, setLoadding ] = useState(false),
        [ error, setError ] = useState(false);

    const singIn = async ({email, password}:SingInType) => {
        try {
            setLoadding(true);
            const { user, token} = await Auth.handleSingIn({ email, password});
            setCookie(undefined, 'ecobus_token', token, { maxAge: 60 * 60 * 1 });
            setUser(user);

            api.defaults.headers.common = {
                'Authorization':token
            }
            user.office === 'Administrador' ?  setUsers(await findAllUsers(user._id)) : null
            
            setLoadding(false);
            Router.push('/');
        } catch (err) {
            setError(true);
            setLoadding(false);
        }
    }

    const singOut = async () => {
        destroyCookie(undefined, 'ecobus_token');
        Router.push('/Login')
    }

    return (
        loadding ? <Loadding/> :
        <AuthContext.Provider value={{singed:!!user, user, singIn, singOut, loadding, error, users}}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => {

    const ctx = useContext(AuthContext);
    return ctx;
}

export default AuthProvider;