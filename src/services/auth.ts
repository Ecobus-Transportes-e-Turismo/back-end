import { SingInType, Users } from '../types';
import { handleApi } from './axios';

type ResponseType = {
    user:Users,
    token:string,
    error:string
}


export const handleSingIn = async (data:SingInType) => {
    const api =  handleApi();
    const response = await api.post<ResponseType>('/Users/singIn',{email:data.email, pssword:data.password});
    return response.data
}