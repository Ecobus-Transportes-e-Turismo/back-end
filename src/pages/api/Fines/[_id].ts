import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect, FinesColletion } from "../../../config/database";
import { Fines } from "../../../types";
import { useAcess } from '../../../services/acessUser'


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
                const accessUser = await useAcess(String(user_Id));
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
                const { _id: findId, placa, desc } = req.body;

                if(findId === ""){
                    const fine = await FinesColletion.find<Fines>({
                            placa:placa,
                            desc: desc == null ? false : true
                        }
                    
                    ).toArray();
                    if(fine.length == 0){
                        res.status(200).json({message:`Não há itens...`})
                    }
                    res.status(200).json({fines:fine});
                } else {
                    const fine = await FinesColletion.findOne<Fines>({_id : new ObjectId(String(findId))});
                    res.status(200).json({fines:fine});
                }
            } catch (error) {
                res.status(404).json({message:'Multa não encontrada...'});
            }
        break;

        case "DELETE":
            try {
                const accessUser = await useAcess(String(user_Id));
                if(accessUser){
                    const { _id: findId } = req.body;
                    await FinesColletion.findOneAndDelete({_id: new ObjectId(findId)});
                    res.status(201).json({message:"Multa deletada com sucesso!"});
                }else {
                    res.status(401).json({ message: `unauthorized` });
                }
            } catch (err) {
                res.status(400).json({message:err});
            }
        break;

        case "PUT":
            try {
                const fine:any = req.body;
                const accessUser = await useAcess(String(user_Id));
                if(accessUser){
                    await FinesColletion.findOneAndUpdate({_id: new ObjectId(String(fine._id))}, {$set:fine});
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