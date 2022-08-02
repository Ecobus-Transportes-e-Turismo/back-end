import type { Services } from '../../../../types/index'
import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect, ServicesColletion } from "../../../../config/database";
import { AcessUsers } from '../../../../services/acessUser';

type ErrorResponse = {
    error:unknown | string
}

type ResponseType  = {
    services?:Services | Services[] | null;
    message?:string
}



const handleServices = async (req:NextApiRequest, res:NextApiResponse <ErrorResponse | ResponseType>) => {
    await dbConnect();

    const { _id : userId } = req.query;
    const  { dateNow } = req.body 
    const accessuser = await AcessUsers(String(userId));

    
    switch(req.method){
        case "PATCH":
            try {
                const allServices = await ServicesColletion.find<Services>({driveId: userId, data:dateNow}).toArray();
                res.status(200).json({services:allServices});
            } catch (err) {
                res.status(404).json({error:`Não há serviço...`});
            }
        break;

        case "GET":
            if(accessuser){
                try {
                    const allServicesToDay = await ServicesColletion.find<Services>({data:dateNow}).toArray();
                    res.status(200).json({services:allServicesToDay});
                } catch (err) {
                    res.status(404).json({error:err});
                }
            } else {
                res.status(401).json({ message: `unauthorized` });
            }
        break;

    }
}
export default handleServices;