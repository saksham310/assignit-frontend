import {
    CREATE_WORKSPACE,
    DELETE_WORKSPACE,
    GET_MEMBERS,
    GET_WORKSPACE_ANALYTICS,
    GET_WORKSPACES, INVITE_USER,
    LEAVE_WORKSPACE,
    UPDATE_WORKSPACE
} from "@/constants/api.constants.ts";
import { apiClient } from "@/service/api.client.ts";
import { CreateWorkspaceData } from "@/types/workspace.type.ts";

// Fetch all workspaces
export const getWorkspaces = async () => {
    const res = await apiClient.get(GET_WORKSPACES);
    return res.data;
};

// Fetch workspace analytics by ID
export const getWorkspaceAnalytics = async (id: string | undefined) => {
    const res = await apiClient.get(`${GET_WORKSPACE_ANALYTICS}/${id}`);
    return res.data.workspaceAnalytics;
};

// Fetch workspace members by workspace ID
export const getWorkspaceMember = async (id: string | undefined) => {
    const res = await apiClient.get(`${GET_MEMBERS}/${id}`);
    return res.data.userList;
};

// Create a new workspace (default role: Owner)
export const createWorkspace = async (data: CreateWorkspaceData) => {
    data.role = "Owner";
    const res = await apiClient.post(CREATE_WORKSPACE, data);
    return res.data;
};

// Update workspace details (ID & Name)
export const updateWorkspace = async (data: { id: string | null; name: string }) => {
    const res = await apiClient.put(`${UPDATE_WORKSPACE}/${data.id}`, data);
    return res.data;
};

// Delete a workspace by ID
export const deleteWorkspace = async (id: string | null) => {
    const res = await apiClient.delete(`${DELETE_WORKSPACE}/${id}`);
    return res.data;
};

// Leave a workspace by ID
export const leaveWorkspace = async (id: string | null) => {
    const res = await apiClient.get(`${LEAVE_WORKSPACE}/${id}`);
    return res.data;
};

// Invite Member to the workspace
export  const inviteMember = async (data :{id: string | null; emails: string []}) => {
    const res = await  apiClient.post(`${INVITE_USER}/${data.id}`, data);
    return res.data;
}