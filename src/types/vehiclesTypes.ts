import { ObjectId } from "mongodb"

export type Vehicles  = {
    _id:ObjectId,
    placa:string,
    tipo:typeVehicle,
    prefixo:number | string,
    renavan:string,
    chassi:string,
    marca:string,
    modelo:string,
    cor:string,
    qtd_lugares:number,
    ano_fab:number,
    data_aquisicao?:Date,
    data_venda?:Date,
    Documentos:DocumentsVehicles,
    corporate:ObjectId,
    ativo:boolean
}

export enum typeVehicle {
    onibus = 'Ônibus',
    van = 'Van',
    micro = 'Micro',
    carro = 'Carro particular',
    moto = 'Moto',
    uber = 'Uber'
}

type DocumentsVehicles = {
    vcto:{
        artesp:Date
        sptrans:Date
        emtu:Date
        licenciamento:Date
        tacografo:Date
        zona_rest:Date
        antt?:Date
        apolice:{
            n_apolice:string,
            vcto_apolice:Date,
        },
        extintores:{
            tipo:string,
            peso:number,
            veto:Date
        },
    }
}
