import {apiClient} from "@/service/api.client.ts";
import {UPDATE_PROFILE} from "@/constants/api.constants.ts";

export const updateProfile=async (data: any)=>{
   try{
       const res=await apiClient.put(`${UPDATE_PROFILE}`, data);
       return res.data;
   }catch(err){
       console.error(err);
   }
}