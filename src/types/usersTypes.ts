import { ObjectId } from "mongodb";
import { Address } from "./addressTypes";

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
    type:string,
    agency: number;
    account: number;
    digit: number;
    bank: string;
    pix: string;
};
export type Users = {
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

export enum Office {
    motorista = "Motorista",
    admin = "Administrador",
    mecanico = "Mecânico",
    auxiliarGeral = 'Auxiliar geral',
    freelance = 'Freelance'
}

export type SingInType = {
    email:string,
    password:string
}
