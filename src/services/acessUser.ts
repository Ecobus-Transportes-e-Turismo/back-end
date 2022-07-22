import { ObjectId } from "mongodb";
import { dbConnect, CloseDb, UsersColletion } from "../config/database";
import { Users } from "../types";


export const handleAcessUser = async ( _id:string ):Promise<boolean> => {
    // await dbConnect();
    const userAcess = await UsersColletion.findOne<Users>({_id: new ObjectId(_id)});
    // await CloseDb();
    return userAcess?.office==='admin'? true : false
}