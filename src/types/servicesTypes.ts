import { ObjectId } from "mongodb"
import { Address } from "./addressTypes"
import { typeVehicle } from "./vehiclesTypes"

export type CT = {
    name:string,
    address:Address,
    contato:string,
    phone:string
}

export interface Services  {
    _id?:ObjectId,
    data:Date | string, //DD/MM/YYYY
    corporate:String,
    address:Address[],
    H_Embarque:string, // format = HH:MM
    typeVehicle:typeVehicle,
    qtd_pessoas:number,
    responsable:string,
    phone:string[],
    email:string[],
    value:number,
    destino:CT | string,
    observacoes:string,
    vehicleId:ObjectId,
    driveId:ObjectId,
    kmInicio:number,
    kmFinal: number,
    pedido:number | string
}