import type { Fines } from "../../../types";
import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect, FinesColletion } from "../../../config/database";
import { definitionUser } from '../../../services/acessUser'
import { ObjectId } from "mongodb";

type ErrorResponse = {
    message:unknown | string
}
type ResponseType  = {
    fines:Fines | Fines[] | null
}

const handleFines = async (
    req:NextApiRequest, 
    res:NextApiResponse<ErrorResponse | ResponseType>
) => {

    await dbConnect();


    const { _id : user_Id } = req.query;
    const isAdmin = await definitionUser(String(user_Id));

    switch ( req.method ) {
        
        case "GET":
            try {
                if(isAdmin){
                    const allFines =  await FinesColletion.find<Fines>({}).toArray();
                    res.status(200).json({fines:allFines});
                } else {
                    const allFinesUser =  await FinesColletion.find<Fines>({ driveId:user_Id }).toArray();
                    res.status(200).json({fines:allFinesUser});
                }
            } catch (err) {
                res.status(404).json({message:err});
            }
        break;

        case "POST":
            try {
                if(isAdmin){
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
                    const fine = await FinesColletion.find<Fines>({desc: desc, driveId:user_Id}).toArray();
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

        case "DELETE":
            try {
                const {_id} = req.body;
                if(isAdmin){
                    await FinesColletion.findOneAndDelete({_id: new ObjectId(String(_id))});
                    res.status(201).json({message:'Multa deletada com sucesso!'})
                } else {
                    res.status(401).json({ message: `unauthorized` });
                }
            } catch (error) {
                res.status(404).json({message:'Multa não encontrada...'});
            }
        break;

        case "PUT":
            try {
                const fines = req.body;
                const {_id} = req.body;
                if(isAdmin){
                    await FinesColletion.findOneAndUpdate({_id: new ObjectId(String(_id))}, {$set:fines});
                    res.status(200).json({message:`Multa alterada com sucesso!`});
                }else {
                    res.status(401).json({ message: `unauthorized` }); 
                }
            } catch (err) {
                res.status(400).json({message:err})
                
            }
        break;
    }
}

export default handleFines;