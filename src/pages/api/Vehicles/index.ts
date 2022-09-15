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


const handleVehicles = async (req:NextApiRequest, res:NextApiResponse<ResponseType | ErrorResponse>) => {
    await dbConnect();
    switch (req.method){
        case "GET":
            try{
                const allVehicles = await VehiclesColletion.find<Vehicles>({ativo:true}).toArray();
                res.status(200).json({vehicles:allVehicles});
            }catch(err:unknown){
                res.status(400).json({message:err});
            }
        break;

        case "POST":
            try {
                const vehicle:Vehicles = req.body;
                const verifyVehicle = await VehiclesColletion.findOne<Vehicles>({
                    placa:vehicle.placa, 
                    chassi:vehicle.chassi, 
                    renavan:vehicle.renavan
                });

                if(!verifyVehicle){
                    await VehiclesColletion.insertOne(vehicle);
                    res.status(201).json({message:'Veiculo inserido com sucesso!'})
                } else {
                    res.status(400).json({message:'Veiculo já cadastrado!'})
                }
                
            } catch (err) {
                res.status(400).json({message:'Erro ao inserir o veiculo...'})
            }
    break;

    case "PATCH":
            try{
                const vehicleId = req.body;
                const oneVehicles = await VehiclesColletion.findOne<Vehicles>({_id: new ObjectId(String(vehicleId))});
                res.status(200).json({vehicles: oneVehicles});
            }catch(err:unknown){
                res.status(400).json({message:err});
            }
        break;

        case "PUT":
            
            try {
                const vehicleId = req.body;
                const vehicle:Vehicles = req.body;
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
                const vehicleId = req.body;
                await VehiclesColletion.findOneAndDelete({_id: new ObjectId(String(vehicleId))});
                res.status(200).json({message:`Veiculo deletado com sucesso!`})
            } catch (err) {
                res.status(400).json({message:'Erro ao deletar o veiculo...'});
            }
        break;
    }
}


export default handleVehicles;