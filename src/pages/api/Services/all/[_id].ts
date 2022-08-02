import { ObjectID } from "bson";
import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect, ServicesColletion } from "../../../../config/database";
import { AcessUsers } from "../../../../services/acessUser";
import { Services } from "../../../../types";

type ErrorResponse = {
    error:unknown | string
}

type ResponseType  = {
    services?:Services | Services[] | null;
    message?:string
}

const handleAllServices = async (req:NextApiRequest, res:NextApiResponse <ResponseType | ErrorResponse>) => {
    await dbConnect();
    const { _id: userId } = req.query;
    const accessUser = await AcessUsers(String(userId));

    if(accessUser){
        switch(req.method){
            case "PUT":
                try {
                    const service = req.body;
                    await ServicesColletion.findOneAndUpdate({_id : new ObjectID(service._id)},{$set:service});
                    res.status(201).json({message:`Serviço alterado com sucesso!`});
                } catch (err) {
                    res.status(404).json({error:err});
                }
            break;

            case "DELETE":
                try {
                    const { serviceId } = req.body;
                    await ServicesColletion.findOneAndDelete({_id: new ObjectID(serviceId)});
                    res.status(201).json({message:`Serviço deletado com sucesso!`});
                } catch (err) {
                    res.status(404).json({error:err});
                }
            break;

            case "GET":
                try {
                    const all = await ServicesColletion.find<Services>({}).toArray();
                    res.status(200).json({services:all});
                } catch (err) {
                    res.status(404).json({error:err});
                }
            break;

            case "POST":
                try {
                    const services:Services = req.body;
                    await ServicesColletion.insertOne(services);
                    res.status(201).json({message:`Serviço inserido com sucesso!`});
                } catch (err) {
                    res.status(404).json({error:err});
                }
            break;
        }
    } else {
        switch(req.method){
            case "GET":
                try {
                    const allServicesDrive = await ServicesColletion.find<Services>({driveId:userId}).toArray();
                    res.status(200).json({services:allServicesDrive});
                } catch (err) {
                    res.status(404).json({error:err});
                }
            break;

            default:
                res.status(401).json({ message: `unauthorized` });
        }
    }
}
export default handleAllServices;