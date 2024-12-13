import {apiClient} from "@/service/apiClient.ts";
import {LOGIN_API, SIGNUP_API} from "@/constants/api.constants.ts";
import {z} from "zod";
import {loginSchema, registerSchema} from "@/schemas/authSchemas.ts";

export const login=async (data:z.infer<typeof loginSchema>)=>{

        const res = await apiClient.post(`${LOGIN_API}`, data);
        return res.data;
}

export  const register=async (data:z.infer<typeof registerSchema>)=>{

        const res=await apiClient.post(`${SIGNUP_API}`,data);
        return res.data;
}