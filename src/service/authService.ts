import {apiClient} from "@/service/apiClient.ts";
import {LOGIN_API, SIGNUP_API} from "@/constants/api.constants.ts";

export const login=async (data:{email:string,password:string})=>{

        const res = await apiClient.post(`${LOGIN_API}`, data);
        return res.data;
}

export  const register=async (data:{username:string,email:string,password:string})=>{

        const res=await apiClient.post(`${SIGNUP_API}`,data);
        return res.data;
}