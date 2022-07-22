import type { Users, Vehicles } from '../../../types'
import { dbConnect, VehiclesColletion } from '../../../config/database';
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from 'mongodb';


type ErrorResponse = {
    message:string | unknown
}
type ResponseType = {
    vehicles:Vehicles | Vehicles[] | null
}


const handleVehiclesID = async (req:NextApiRequest, res:NextApiResponse<ResponseType | ErrorResponse>) => {
    await dbConnect();
    const {_id : vehicleId} = req.query;
    switch (req.method){
        
        case "PATCH":
            try{
                const oneVehicles = await VehiclesColletion.findOne<Vehicles>({_id: new ObjectId(String(vehicleId))});
                res.status(200).json({vehicles: oneVehicles});
            }catch(err:unknown){
                res.status(400).json({message:err});
            }
        break;

        case "PUT":
            const vehicle = req.body;
            try {
                VehiclesColletion.findOneAndUpdate(
                    {_id:new ObjectId(String(vehicleId))},
                    {$set:vehicle},
                    {upsert:true, raw:true}
                );
                res.status(201).json({message:'Veiculo alterado com sucesso!'});
            } catch (err) {
                res.status(400).json({message:'Erro ao alterar o veiculo...'});
            }   
        break;

        case "DELETE":
            try {
                await VehiclesColletion.findOneAndDelete({_id: new ObjectId(String(vehicleId))});
                res.status(200).json({message:`Veiculo deletado com sucesso!`})
            } catch (err) {
                res.status(400).json({message:'Erro ao deletar o veiculo...'});
            }
        break;
    }
}


export default handleVehiclesID;