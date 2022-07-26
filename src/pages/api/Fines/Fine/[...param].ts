import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { FinesColletion } from "../../../../config/database";
import { Fines } from "../../../../types";
import { AcessUsers } from '../../../../services/acessUser'

type ErrorResponse = {
    message:unknown | string
}
type ResponseType  = {
    fine:Fines | Fines[] | null
}

const handleFineId = async (req:NextApiRequest, res:NextApiResponse<ErrorResponse | ResponseType>) => {

    const { param } = req.query;
    const acessUser = await AcessUsers(String(param?.[0]));

    switch(req.method){
        case "GET":
            try {
                const fine = await FinesColletion.findOne<Fines>({
                    _id: new ObjectId(String(param?.[1])),
                })
                res.status(200).json({fine});
            } catch (err) {
                res.status(404).json({message:err});
            }
        break;

        case "DELETE":
            if(acessUser){
                await FinesColletion.findOneAndDelete({_id: new ObjectId(String(param?.[1])),});
                res.status(201).json({message:'Multa deletada com sucesso!'})
            } else {
                res.status(401).json({ message: `unauthorized` });
            }
        break;

        case "PUT":
            try {
                const fine:any = req.body;

                if(acessUser){
                    await FinesColletion.findOneAndUpdate({_id: new ObjectId(String(param?.[1]))}, {$set:fine});
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

export default handleFineId;