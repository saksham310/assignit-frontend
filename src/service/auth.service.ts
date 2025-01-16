import {apiClient} from "@/service/api.client.ts";
import {LOGIN_API, SIGNUP_API} from "@/constants/api.constants.ts";
import {LoginInput, RegisterInput} from "@/types/auth.type.ts";


export const login=async (data:LoginInput)=>{

        const res = await apiClient.post(`${LOGIN_API}`, data);
        return res.data;
}

export  const register=async (data:RegisterInput)=>{

        const res=await apiClient.post(`${SIGNUP_API}`,data);
        return res.data;
}