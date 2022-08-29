import type { Services, SingInType } from "../../types";
import type { NextPage } from "next";

//Styles
import styles from './login.module.css';

//componets
import Link from "next/link";
import Image from "next/image";

//Hooks
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";


const Login:NextPage = () => {
    const { singIn, error } = useAuth();
    const { register, handleSubmit } = useForm<SingInType>({});

    const handleSingIn = async (data:SingInType) => {
        await singIn ({email:data.email, password:data.password});
    }

    return (
        <div className="container">
            <form className={styles.formLogin} onSubmit={handleSubmit(handleSingIn)}>
                <div className={styles.logo}>
                    <Image
                        key='logo'
                        src = {require('../../public/image/logo.jpg')}
                        about='logo'
                        alt="logo da empresa"
                        layout="responsive"
                        className={styles.logo}
                    />
                </div>
                
                <div className={styles.inputs}>
                    <input {...register('email')} type='email'/>   
                    <input {...register('password')} type='password'/> 
                    <input type='submit' value='Enviar' className="inputSubmit"/>
                </div>
    
                <p>Ainda não está cadastrado? <Link href='#'><a>Cadastre-se!!!</a></Link></p>

                {/* <p className='errorText'>{ error ? "E-mail or password invalid!" : null }</p> */}

            </form>
        </div>
    )
}
export default Login;