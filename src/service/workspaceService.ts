import {GET_WORKSPACES} from "@/constants/api.constants.ts";
import {apiClient} from "@/service/apiClient.ts";

export const getWorkspaces = async ()=>{
    const res= await apiClient.get(`${GET_WORKSPACES}`);
    return res.data;
}