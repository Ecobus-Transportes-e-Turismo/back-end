import axios from 'axios';
import { parseCookies } from 'nookies'


export const api = axios.create({
    baseURL:'http://localhost:3000/api',
    timeout:5000,
    timeoutErrorMessage:'Tempo excedido...',
    headers:{
        'Content-Type':'application/json',
    }
});

