import {
    CREATE_WORKSPACE,
    GET_WORKSPACE_ANALYTICS,
    GET_WORKSPACES,
    UPDATE_WORKSPACE
} from "@/constants/api.constants.ts";
import {apiClient} from "@/service/api.client.ts";
import {CreateWorkspaceData} from "@/types/workspace.type.ts";

export const getWorkspaces = async ()=>{
    const res = await apiClient.get(`${GET_WORKSPACES}`);
    return res.data;
}

export const getWorkspaceAnalytics=async(id:string|undefined)=>{
    const res=await apiClient.get(`${GET_WORKSPACE_ANALYTICS}/${id}`);
    return res.data.workspaceAnalytics;
}

export const createWorkspace = async (data:CreateWorkspaceData)=>{
    data.role="Owner";
    const res = await  apiClient.post(`${CREATE_WORKSPACE}`, data);
    return res.data;
}
export const updateWorkspace = async (data:{id:string|null,name:string})=>{
    const res = await apiClient.put(`${UPDATE_WORKSPACE}/${data.id}`,data);
    return res.data;
}