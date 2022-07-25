import { ObjectId } from "mongodb";
import { UsersColletion } from "../config/database";
import { Users } from "../types";


export const handleAcessUser = async ( _id:string ) => {
    const userAcess = await UsersColletion.findOne<Users>({_id: new ObjectId(_id)});
    return userAcess?.office === 'admin'? true : false
}

export const AcessUsers = async (idUser:string) => {
    return handleAcessUser(idUser);
}