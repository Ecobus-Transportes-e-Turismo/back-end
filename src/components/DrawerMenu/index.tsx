import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import Styles from './styles.module.css';
import Image from 'next/image'


const DrawerMenu = ():JSX.Element => {
    const { singOut, user } = useAuth();
    return (
        <nav className={Styles.container}>
            <div className={Styles.content}>
                <Image
                    key='iconbus'
                    src = {require('../../public/image/icon.jpg')}
                    about='iconbus'
                    alt="icon da empresa"
                    layout="responsive"
                    className={Styles.logo}
                />
            </div>
            <ul className={Styles.list}>
                <li className={Styles.item}>
                    <span className={Styles.icon}>icon</span>
                    <Link href='#'><a>Dashbord</a></Link>
                </li>

                <li className={Styles.item}>
                    <span className={Styles.icon}>icon</span>
                    <Link href='#'><a>Escala</a></Link>
                </li>

                <li className={Styles.item}>
                    <span className={Styles.icon}>icon</span>
                    <Link href='#'><a>Abastecimento</a></Link>
                </li>

                <li className={Styles.item}>
                    <span className={Styles.icon}>icon</span>
                    <Link href='#'><a>Manutenção</a></Link>
                </li>

                <li className={Styles.item}>
                    <span className={Styles.icon}>icon</span>
                    <Link href='#'><a>Multas</a></Link>
                </li>

                <li className={Styles.item}>
                    <span className={Styles.icon}>icon</span>
                    <Link href='#'><a>Viagens</a></Link>
                </li>
            </ul>
            <button onClick={()=>{singOut}}>Sair</button>
        </nav>
    )
}
export default DrawerMenu;