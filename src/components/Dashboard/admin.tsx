import type { Services, Users } from '../../types';

import Container from "../Container";
import Styles from './styles.module.css';
import Loadding from '../Loadding';
import PopUp from '../popUp';

import { DateFormat } from '../../services/formatDate';
import { useVehicles } from '../../context/vehicleContext';
import { useState, useEffect } from "react";
import { api } from '../../services/axios';
import { useAuth } from '../../context/AuthContext';


type Popup = {
    visible:boolean,
    indice:number | null
}

const DashBoardAdmn = ():JSX.Element => {
    const { user } = useAuth();
    const { vehicles } = useVehicles();
    const 
        [ dataInicioService, setDataInicioService ] = useState(''),
        [ dataFinalService, setDataFinalService ] = useState(''),
        [ drives, setDrives ] = useState<Users[] | null >(),
        [ services, setServices ] = useState<Services[] | null>(null),
        [ loadding, setLoadding ] = useState(true),
        [ popup, setPoup ] = useState<Popup>({visible:false, indice:null}),
        [ excluir, setExcluir ] = useState<boolean>(false);
    

    const Excluir = async (_id:string) => {
        try {
            await api.delete(`/Services/all/${user?._id}/${_id}`);
            setExcluir(!excluir);
        } catch (error) {
            console.log('error ao deletar')
        }
    }

    useEffect(() => {
        const findAllUsers = async () =>{
            const responseUser = await api.get(`/Users/${user?._id}`);
            setDrives(responseUser.data);
        }
        findAllUsers();
        setLoadding(false)
    },[]);

    useEffect(() => {
        const findServices = async () => {
            const datas = {
                dataInicioService:DateFormat(dataInicioService), 
                dataFinalService :DateFormat(dataFinalService),
            }
            const responseservices = await api.patch(`/Services/all/${user?._id}/`, datas);
            setServices(responseservices.data.services)
        }   
        findServices();
        setLoadding(false);

    }, [dataInicioService, dataFinalService, excluir]);

    return (
        <Container>
            <h1>Services</h1>
            <div className={Styles.sectionFind}>
                <input key={'dataInicial'} type="date" value={ dataInicioService } onChange={(event)=>{setDataInicioService(event.target.value)}}/>
                <input key={'dataFinal'}   type="date" value={ dataFinalService }  onChange={(event)=>{setDataFinalService(event.target.value)}}/>
            </div>

            {/* <div className={Styles.sectionFind}>
                <button onClick={()=>{ setPoup({visible:!popup.visible, indice:null}) }}> Cadastrar </button>
            </div> */}

            { loadding ? <Loadding/> :
                dataInicioService == '' ? <p>Selecione uma data de inicio</p>:
                <table className={Styles.table}>
                    <tr>
                        <th>Data</th>
                        <th>Tipo</th>
                        <th>Motorista</th>
                        <th>Veiculo</th>
                        <th>Empresa</th>
                        <th>Valor</th>
                        <th>Destino</th>
                        <th>Pedido</th>
                        <th>Ações</th>
                    </tr>
                     { services?.map((item, i) => (
                        <tr key= { String(item._id) } >
                            <td> { String(item.data)} </td>
                            <td> { item.typeVehicle } </td>
                            <td> 
                                {
                                    drives?.map(drive => (drive._id === item.driveId ? <p>{drive.name}</p>:null))
                                }
                            </td>
                            <td>
                             { vehicles?.map(car => (car._id === item.vehicleId ? <p>{car.tipo} {car.prefixo} - {car.placa}</p> : null ) )} 
                            </td>
                            <td>{item.corporate}</td>
                            <td>R$ { item.value }.00 </td>
                            <td>{String(item.destino)}</td>
                            <td> { item.pedido == null ? <p>N/D</p> : item.pedido} </td>
                            <td>
                                <button onClick={()=>{
                                    setPoup({visible:!popup.visible, indice:i}); 
                                    }}>
                                        Alterar
                                </button>
                                
                                <button onClick={ ()=>{ Excluir(String(item._id))} }>Excluir</button>
                            </td>
                        </tr>
                    ))} 
                    
                </table>
            }
        </Container>
    );
}
export default DashBoardAdmn;