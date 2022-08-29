import type { Services } from '../../types';
import { useVehicles } from '../../context/vehicleContext';
import styles from './styles.module.css';
import { useAuth } from '../../context/AuthContext';

type TypePopup = {
    visible:boolean,
    close?:any,
    service?:Services | null,
}

const PopUp = ({visible, close, service }:TypePopup):JSX.Element => {
    const { vehicles } = useVehicles();
    const { users } = useAuth();
    return (
            <form className={styles.popup}  style={{display: visible ? 'flex' : 'none'}}>

            <button className={styles.close} onClick={()=>{}}>X</button>

                <fieldset className={styles.content}>
                    <legend> Corporate: </legend>
                    <article className={styles.empresa}>
                        <div><input type='date' name='date'/></div>
                        <div><input name='Corporate' /> </div>
                        <div><input name='responsavel' /></div>
                        <div><input name='phone' /></div>
                        <div><input name='phone' /></div>
                        <div><input name='email' /></div>
                    </article>
                </fieldset>

                 <fieldset className={styles.content}> 
                    <legend> Address: </legend>
                    <article className={styles.address}> 
                        <div><input  type='' value='' placeholder='Tipo:' /></div>
                        <div><input  type='' value='' placeholder='Logradouro:'  /></div>
                        <div><input  type='number' value='' placeholder='N°:'  /> </div>
                        <div><input type='' value='' placeholder='Complemento:'  /> </div>
                        <div><input type='' value='' placeholder='Bairro:'  /> </div>
                        <div><input type='' value='' placeholder='Cidade:'  /> </div>
                        <div><input type='' value='' placeholder='Zip code:'  /> </div>
                    </article>
                 </fieldset>

                 <fieldset className = {styles.content}>
                    <legend>Vehicle:</legend>
                    <div> <input type='' value='' placeholder='Valor:'  /> </div>

                    <select>
                        <option value=''></option>
                        {vehicles?.map(item => (
                            <option value={String(item._id)}> { item.tipo} {item.prefixo} - {item.placa} </option>
                        ))}
                    </select>

                    <select>
                        <option value=''></option>
                        {users?.map(item => (
                            <option value={String(item._id)}>{item.name}</option>
                        ))}
                    </select>

                 </fieldset>

                 <input 
                    key='submit' 
                    type="submit" 
                    value="Enviar"
                />
                 
            </form>
    )
}
export default PopUp;