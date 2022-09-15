import { ObjectId } from "mongodb";
import { UsersColletion } from "../config/database";
import { Users } from "../types";


export const definitionUser = async ( _id:string ) => {
    const userAcess = await UsersColletion.findOne<Users>({_id: new ObjectId(_id)});
    return userAcess?.office === 'Administrador' ? true : false;
}

