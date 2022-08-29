import { Vehicles } from '../types';
import { api } from './axios';

type ResponseType = {
    vehicles:Vehicles[],
    placas:string[]
}


export const handleVehicles = async ():Promise<ResponseType> => {

    const placas = []

    const { data } = await api.get('/Vehicles');
    const { vehicles } = data;

    for(let i=0; i < vehicles.length; i++){
        placas.push(vehicles[i].placa);
    }
    return {
        placas:placas,
        vehicles:vehicles,
    }
}