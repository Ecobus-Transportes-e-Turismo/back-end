
import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect, FinesColletion } from "../../../config/database";
import { Fines } from "../../../types";
import { AcessUsers } from '../../../services/acessUser'


type ErrorResponse = {
    message:unknown | string
}

type ResponseType  = {
    fines:Fines | Fines[] | null
}

const handleFines = async (req:NextApiRequest, res:NextApiResponse<ErrorResponse | ResponseType>) => {
    await dbConnect();
    const { _id : user_Id } = req.query;

    switch ( req.method ) {
        case "GET":
            try {
                const allFines =  await FinesColletion.find<Fines>({ driveId:user_Id }).toArray();
                res.status(200).json({fines:allFines});
            } catch (err) {
                res.status(404).json({message:err});
            }
        break;

        case "POST":
            try {
                const accessUser = await AcessUsers(String(user_Id));
                if(accessUser){
                    const fines:Fines = req.body;
                    await FinesColletion.insertOne(fines)
                    res.status(201).json({message:'Multa inserida com sucesso!'})
                }else {
                    res.status(401).json({ message: `unauthorized` });
                }
            } catch (error) {
                res.status(404).json({message:'Erro ao inserir a multa...'})
            }
        break;

        case "PATCH":
            try {
                const { placa, desc } = req.body;

                if(placa === null){
                    const fine = await FinesColletion.find<Fines>({desc: desc}).toArray();
                    if(fine.length == 0){
                        res.status(200).json({message:`Não há itens...`})
                    }
                    res.status(200).json({fines:fine});
                } else {
                    const fine = await FinesColletion.find<Fines>({
                        driveId : user_Id,
                        desc:desc,
                        placa:placa
                    }).toArray();
                    res.status(200).json({fines:fine});
                }
            } catch (error) {
                res.status(404).json({message:'Multa não encontrada...'});
            }
        break;
    }
}

export default handleFines;