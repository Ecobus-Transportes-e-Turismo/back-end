import { NextPage } from "next";
import { useState } from "react";
import styles from './login.module.css';

//componets
import Input from '../../components/Input'
import Link from "next/link";
import Image from "next/image";

const Login:NextPage = () => {

    const 
        [ email, setEmail ] = useState(''),
        [ password, setPassword ] = useState('');

    return (
        <div className="container">
            <form className={styles.formLogin}>
                <div className={styles.logo}>
                    <Image
                        key='logo'
                        src = {require('../../public/image/logo.jpg')}
                        about='logo'
                        alt="logo da empresa"
                        layout="fixed"
                    />
                </div>
                
                <div>
                    <Input 
                        key='email' 
                        value={ email } 
                        setValue={setEmail} 
                        type='email'
                        autoComplete='false' 
                        placeholder="E-mail:"
                    />

                    <Input 
                        key='password' 
                        autoComplete='false' 
                        type='password' 
                        value={ password } 
                        setValue={setPassword} 
                        placeholder="Password:"
                    />

                    <Input 
                        key='submit' 
                        type="submit" 
                        value="Enviar"
                    />
                </div>
    
                <p>Ainda não está cadastrado? <Link href='#'><a>Cadastre-se!!!</a></Link></p>

            </form>
        </div>
    )
}
export default Login;