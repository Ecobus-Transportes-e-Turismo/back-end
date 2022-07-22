import type { Users, Vehicles } from '../../../types'
import { dbConnect, VehiclesColletion } from '../../../config/database';
import { NextApiRequest, NextApiResponse } from "next";


type ErrorResponse = {
    message:string | unknown
}
type ResponseType = {
    vehicles:Vehicles | Vehicles[]
}


const handleVehicles = async (req:NextApiRequest, res:NextApiResponse<ResponseType | ErrorResponse>) => {
    await dbConnect();

    switch (req.method){
        
        case "GET":
            try{
                const allVehicles = await VehiclesColletion.find<Vehicles>({}).toArray();
                res.status(200).json({vehicles:allVehicles});
            }catch(err:unknown){
                res.status(400).json({message:err});
            }
        break;

        case "POST":
            const vehicle:Vehicles = req.body;
            try {
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
    }
}


export default handleVehicles;