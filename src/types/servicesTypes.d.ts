import { ObjectId } from "mongodb"
import { Address } from "./addressTypes"
import { typeVehicle } from "./vehiclesTypes"

enum CTtype {
   aguiaSL =  'Águia de Fogo (SL)', 
   aguiaMG = 'Águia de Fogo (MG)', 
   ecofire = 'Rochacara Ecofire', 
   workfireGL = 'WorkFire (GL)', 
   workfireST = 'WorkFire (ST)', 
   Treinnar = 'Treinnar'
}
export type CT = {
    name:CTtype,
    address:Address,
    contato:string,
    phone:string
}

export interface Services  {
    _id?:ObjectId,
    data:string[],
    corporate:string,
    address:Address[],
    H_Embarque:string, // format = HH:MM
    typeVehicle:typeVehicle,
    qtd_pessoas:number,
    responsable:string,
    phone:string[],
    email:string[],
    value:number,
    destino:CT,
    observacoes:string,
    vehicleId:ObjectId,
    driveId:ObjectId,
    kmInicio:number,
    kmFinal: number
}