import {GET_WORKSPACE_ANALYTICS, GET_WORKSPACES} from "@/constants/api.constants.ts";
import {apiClient} from "@/service/apiClient.ts";

export const getWorkspaces = async ()=>{
    const res= await apiClient.get(`${GET_WORKSPACES}`);
    return res.data;
}

export const getWorkspaceAnalytics=async(id:string|undefined)=>{
    const res=await apiClient.get(`${GET_WORKSPACE_ANALYTICS}/${id}`);
    return res.data;
}