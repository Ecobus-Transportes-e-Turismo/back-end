import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect, FinesColletion } from "../../../config/database";
import { Fines } from "../../../types";


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
                res.status(204).json({message:err});
            }
        break;

        case "POST":
            try {
                const fines:Fines = req.body;
                await FinesColletion.insertOne(fines)
                res.status(201).json({message:'Multa inserida com sucesso!'})
            } catch (error) {
                res.status(204).json({message:'Erro ao inserir a multa...'})
            }
        break;
    }
}

export default handleFines;