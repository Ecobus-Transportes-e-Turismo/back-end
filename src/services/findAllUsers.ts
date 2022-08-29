import { ObjectId } from "mongodb";
import { Users } from "../types";
import { api } from "./axios";

type FormatUsers = {
    name:string,
    _id:string
}

export const findAllUsers = async (_id:any) => {
    const { data } = await api.get<Users[]>(`/Users/${_id}`);

    const users: FormatUsers[] = [];

    data.map(item => {
        users.push({name:item.name, _id:String(item._id)})
    })

    return users;
}