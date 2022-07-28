import type { Services } from '../../../types/index'
import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect, ServicesColletion } from "../../../config/database";
import { AcessUsers } from '../../../services/acessUser';

type ErrorResponse = {
    message:unknown | string
}

type ResponseType  = {
    services:Services | Services[] | null;
}


const handleServices = async (req:NextApiRequest, res:NextApiResponse <ErrorResponse | ResponseType>) => {

    await dbConnect();
    const { _id : userId } = req.query;

    const dateNow = new Date().toLocaleDateString();
    console.log(dateNow)

    const accessuser = await AcessUsers(String(userId));

    if(accessuser){
        switch(req.method){
            case "GET":
                try {
                    const allServices = await ServicesColletion.find<Services>({data:dateNow}).toArray();
                    res.status(200).json({services:allServices});
                } catch (err) {
                    res.status(404).json({message:err});
                }
            break;

            case "POST":
                try {
                    const Services:Services = req.body;
                    await ServicesColletion.insertOne(Services);
                    res.status(201).json({message:`Serviço inserido com sucesso!`});
                } catch (err) {
                    res.status(404).json({message:err});
                }
            break;
        }
    } else {
        res.status(401).json({ message: `unauthorized` });
    }
    
}
export default handleServices;