import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect, ServicesColletion } from "../../../config/database";

type ErrorResponse = {
    message:unknown | string
}
type ResponseType  = {
    services:Object
}


const handleServices = async (req:NextApiRequest, res:NextApiResponse <ErrorResponse | ResponseType>) => {
    await dbConnect();
    let dateNow = new Date().toUTCString();
    
    switch(req.method){
        case "GET":
            const allServices = await ServicesColletion.find({}).toArray();
            res.status(200).json({services:{}});
        break;
    }
}
export default handleServices;