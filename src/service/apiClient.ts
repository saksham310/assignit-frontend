import axios from "axios";
import {toast} from "sonner";

export const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
})

apiClient.interceptors.response.use((res)=>{
        return res;
    },(err)=>{
        toast.error(err.response.data.message, {
            duration: 2000,
        });
        return Promise.reject(err);
    }
);

