import type { NextApiRequest, NextApiResponse } from 'next';
import type { Services } from '../../../types';
import { dbConnect, ServicesColletion } from '../../../config/database'

type ResponseError = {
    error:string
}
type ResponseType = {
    services?:Services | Services[],
    message?:string
}


const handleServices = async (
    req:NextApiRequest,
    res:NextApiResponse <ResponseError | ResponseType>
):Promise<void> => {
    await dbConnect();

    switch(req.method){
        case "PATCH":
            try {
                const { inicio, final } = req.body;
                const services = await ServicesColletion.find<Services>({
                    $and:[{data:{$gte:inicio}}, {data:{ $lte:final }}]
                }).toArray();
                res.status(200).json({services});
            } catch (error) {
                res.status(404).json({error:`Error ao consultar os serviços. Error: ${error}`});
            }
        break;

        case "POST":
            try {
                const services:Services[] = req.body;
                await ServicesColletion.insertMany(services);
                res.status(200).json({message:`Serviços inseridos com sucesso!`});
            } catch (error) {
                res.status(404).json({error:`Error ao inserir os serviços. Error: ${error}`});
            }
        break;

        case "DELETE":
            try {
                const { _id } = req.body;
                await ServicesColletion.deleteOne({_id:_id});
                res.status(200).json({message:`Serviço deletado com sucesso!`});
            } catch (error) {
                res.status(404).json({error:`Error ao deletar o serviço. Error: ${error}`});
            }
        break;


        case "PUT":
            try {
                const service = req.body;
                await ServicesColletion.findOneAndUpdate({_id:service._id},{$set:service},  {upsert:true, raw:true});
                res.status(201).json({message:`Serviço alterado com sucesso!`});
            } catch (error) {
                res.status(404).json({error:`Error ao alterar o serviço. Error: ${error}`});
            }
        break;

        case "GET":
            try {
                const services = await ServicesColletion.find<Services>({}).toArray();
                res.status(200).json({services});
            } catch (error) {
                res.status(404).json({error:`Error ao consultar o serviço. Error: ${error}`});
            }
        break;
    }
}

export default handleServices;