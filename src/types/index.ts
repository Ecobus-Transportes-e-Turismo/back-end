import { ObjectId, Timestamp } from "mongodb"

export type Address = {
    type:string,
    address:string,
    number: number,
    complement: string,
    neighborhood:string,
    city:string,
    state:string,
    cep: string,
    country:string,
    url?:string
};

export type SingInType = {
    email:string,
    password:string
}

export interface Vehicles  {
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

enum TypeFine {
    pagamento = "pgto",
    indicacao = "indicação"
}

export interface Fines  {
    _id: ObjectId,
    driveId: ObjectId,
    placa: string,
    orgao_emissor: string,
    tipo: TypeFine,
    Aiimp: string,
    renainf: string,
    guia: string,
    infracao: string,
    data_infracao:Date,
    municipio: string,
    valor: number,
    desconto: number,
    data_venc: Date,
    titulo: string | null,
    desc: boolean
}

type Documents = {
    cpf: string;
    rg: string;
    pis: string | null;
    cnh: CNH;
};

type CNH = {
    vcto: Date;
    number: string;
};

type BankData = {
    agency: number;
    account: number;
    digit: number;
    bank: string;
    pix: string;
};

export interface Users {
    _id?: ObjectId;
    name: string;
    address: Address;
    documents: Documents;
    bankData: BankData;
    office: Office;
    phone: string;
    email: string;
    password: string;
    corporate?: ObjectId;
}

enum Office {
    motorista = "Motorista",
    admin = "admin",
}
enum typeVehicle {
    onibus = 'Onibus',
    van = 'Van',
    micro = 'Micro',
    carro = 'Uber',
    moto = 'Moto'
}

export type CT = {
    name:string,
    address:Address,
    contato:string,
    phone:string
}

export interface Services  {
    _id?:ObjectId,
    data:Date | string,
    corporate:String,
    address:Address,
    H_Embarque:Timestamp,
    typeVehicle:typeVehicle,
    qtd_pessoas:number,
    responsable:string,
    phone:string,
    email:string,
    value:number,
    CT_destino:CT,

    entrada:{
        vehicleId:ObjectId,
        driveId:ObjectId,
        kminicial:number,
        kmFinal:number
    },

    saida:{
        vehicleId:ObjectId,
        driveId:ObjectId,
        kminicial:number,
        kmFinal:number
    }
}