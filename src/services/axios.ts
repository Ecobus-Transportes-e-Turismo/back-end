import axios from 'axios';
import { parseCookies } from 'nookies'


const api = axios.create({
    baseURL:'http://localhost:3000/api',
    timeout:5000,
    timeoutErrorMessage:'Tempo excedido...',

    headers:{
        'Content-Type':'Application/json',
        'Access-Control-Allow-Origin': '*',
        'X-Requested-With': 'XMLHttpRequest',
        'responseEncoding': 'utf8',
    }
});

export const handleApi = (ctx?:any) => {
    const { ecobus_token:token } = parseCookies(ctx);

    if(ctx && token){
        api.defaults.headers.common = {
            'Authorization':token
        }
    }

    return api
}

