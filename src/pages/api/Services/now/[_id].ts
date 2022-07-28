import type { Services } from '../../../../types/index'
import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect, ServicesColletion } from "../../../../config/database";

type ErrorResponse = {
    message:unknown | string
}

type ResponseType  = {
    services:Services | Services[] | null;
}


const handleServices = async (req:NextApiRequest, res:NextApiResponse <ErrorResponse | ResponseType>) => {
    await dbConnect();
    const { _id : userId } = req.query;
    
    const  dateNow = new Date().toLocaleDateString();
    console.log(dateNow);
    
    switch(req.method){
        case "GET":
            const allServices = await ServicesColletion.find<Services>({driveId: userId, data:dateNow}).toArray();
            res.status(200).json({services:allServices});
        break;
    }
}
export default handleServices;