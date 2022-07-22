import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect, UsersColletion } from "../../../config/database";
import { handleAcessUser } from "../../../services/acessUser";
import { Users } from "../../../types";

const handleUserID = async ( req: NextApiRequest, res: NextApiResponse ): Promise<void> => {
    const { _id } = req.query;
    //Rotas que usuarios não admin acessa!

    if(await handleAcessUser(String(_id))) {
        await dbConnect();
        switch (req.method) {
            case "GET": //Consultar todos os usuarios
                try {
                    const users = await UsersColletion.find<Users>({}).toArray();
                    res.status(200).json(users);
                } catch (error) {
                    res.status(400).json({error:`erro na requisição, error: ${error}`});
                }    
            break;

            case "POST": // Inserir usuario
                const user = req.body;
                try {
                    const insertedUser = await UsersColletion.insertOne(user);
                    res.status(201).json({message:`Usuário ${insertedUser.insertedId} inserido com sucesso!`});
                } catch (error) {
                    res.status(400).json({error:`Erro ao inserir o usuário, error: ${error} `});
                }
            break;

            case "PATCH": // Consultar usuario
                try {
                    const findUser = await UsersColletion.findOne<Users>({_id: _id});
                    res.status(200).json(findUser);
                } catch (error:any) {
                    res.status(500).json(error);
                }
            break;

            case "PUT":
                try {
                    const user:Users = req.body;
                    const alterUser = UsersColletion.findOneAndUpdate(
                        { _id: _id },
                        { $set: { user } },
                        { upsert: true, raw: true }
                    );
                    res.status(200).json({ message: `Usuário alterado com sucesso`, alterUser });

                } catch (error: any) {
                    res.status(404).json({ error: `Usuário não encontrado, error: ${error}`,});
                } 
            break;

            case "DELETE":
                try {
                    await UsersColletion.deleteOne({_id: _id});
                    res.status(200).json({message: `Usuário deletado com sucesso!` });
                } catch (error) {
                    res.status(404).json({ message: `Usuário não encontrado` });
                }
            break;
        }
    } else {
        res.status(401).json({message:'Unauthorized'})
    }
    
}
export default handleUserID;