import type { Users } from "../../../types";
import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect, CloseDb, UsersColletion } from "../../../config/database";


type ResponseError = {
    error:string
}
type ResponseType = {
    message?:string,
    users?:Users | Users[] | null
}


const handleUserID = async ( 
    req: NextApiRequest, 
    res: NextApiResponse<ResponseError | ResponseType> 
): Promise<void> => {

    await dbConnect();
    const { _id } = req.query;

    switch (req.method) {
        case "POST":
            try {
                const users:Users[] = req.body;
                await UsersColletion.insertMany(users);
                res.status(200).json({message:`Usuário inserido com sucesso!`});
            } catch (error) {
                res.status(404).json({error:`Error ao inserir o usuário. Error: ${error}`});
            }
        break;

        case "GET":
            try {
                const users = await UsersColletion.find<Users>({}).toArray();
                res.status(200).json({users});
            } catch (error) {
                res.status(404).json({error:`Error ao consultar os usuários. Error: ${error}`});
            }
        break;

        case "DELETE":
            try {
                await UsersColletion.findOneAndDelete({_id:_id});
                res.status(200).json({message:`Usuário deletado com sucesso!`});
            } catch (error) {
                res.status(404).json({error:`Error ao deletar o usuário. Error: ${error}`});
            }
        break;

        case "PUT":
            const users:Users = req.body;
            try {
                await UsersColletion.findOneAndUpdate({_id:_id}, {$set:users}, {upsert:true, raw:true});
                res.status(200).json({message:`Usuário alterado com sucesso!`});
            } catch (error) {
                res.status(404).json({error:`Error ao alterar o usuário. Error: ${error}`});
            }
        break;

        case "PATCH":
            try {
                const users = await UsersColletion.findOne<Users>({_id:_id});
                res.status(200).json({users})
            } catch (error) {
                res.status(404).json({error:`Error ao consultar o usuário. Error: ${error}`});
            }
        break;

        default:
            res.status(500).json({error:`Error in server...`})
    }
    
   
}

export default handleUserID;