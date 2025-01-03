import axios from "axios";
import {toast} from "sonner";

export const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
})
export const setHeader=(header:string|null) => {
    if (header) {
        apiClient.defaults.headers.common['Authorization'] = header;
    } else {
        delete apiClient.defaults.headers.common['Authorization'];
    }
}
apiClient.interceptors.request.use((config)=>{
        if(config.url?.includes("/login") && config.url.includes("/signup") ){
            delete config.headers.Authorization;
        }
    return config;
},(error) => {
    console.log(error);
    return Promise.reject(error);
});
apiClient.interceptors.response.use((res)=>{
        return res;
    },(err)=>{
        toast.error(err.response.data.message, {
            duration: 2000,
        });
        return Promise.reject(err);
    }
);

