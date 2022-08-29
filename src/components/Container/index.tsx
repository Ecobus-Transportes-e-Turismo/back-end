import DrawerMenu from "../DrawerMenu";
import Styles from './styles.module.css';


const Container = ({children}:any):JSX.Element => {
    return (
        <main className={Styles.container}>
            {/* <DrawerMenu/> */}
            <section className={Styles.content}>
                {children}
            </section>
            
        </main>
    );
}
export default Container