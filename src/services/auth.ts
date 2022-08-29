import { SingInType, Users } from '../types';
import { api } from './axios';

type ResponseType = {
    user:Users,
    token:string,
    error:string
}


export const handleSingIn = async (data:SingInType) => {
    
    const response = await api.post<ResponseType>('/Users/singIn',{email: data.email, password: data.password});
    return response.data
}