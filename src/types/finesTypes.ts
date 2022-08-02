import { ObjectId } from "mongodb";

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