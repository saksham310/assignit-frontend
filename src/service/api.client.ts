import axios from "axios";
import {toast} from "sonner";

export const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
})
export const setHeader=(header:string) => {
    if (header) {
        apiClient.defaults.headers.Authorization = header;
    } else {
        // Remove the token from headers if it's not available
        delete apiClient.defaults.headers.Authorization;
    }
}
apiClient.interceptors.request.use((config)=>{
    const controller = new AbortController();
    const token = config.headers.Authorization;
    if(!token){
        controller.abort();
    }
    // return config;
    return {
        ...config,
        signal: controller.signal
    };
},(error) => {
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

