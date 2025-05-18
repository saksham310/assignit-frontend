import {
    CREATE_WORKSPACE,
    DELETE_WORKSPACE,
    GET_MEMBERS,
    GET_WORKSPACE_ANALYTICS,
    GET_WORKSPACES, INVITE_USER, JOIN_WORKSPACE,
    LEAVE_WORKSPACE, UPDATE_MEMBERS,
    UPDATE_WORKSPACE
} from "@/constants/api.constants.ts";
import { apiClient } from "@/service/api.client.ts";
import { CreateWorkspaceData, JoinWorkspaceResponse, MembersData, WorkspaceAnalyticsData, WorkspaceData } from "@/types/workspace.type.ts";

// Fetch all workspaces
export const getWorkspaces = async (): Promise<WorkspaceData[]> => {
    const res = await apiClient.get(GET_WORKSPACES);
    return res.data;
};

// Fetch workspace analytics by ID
export const getWorkspaceAnalytics = async (id: string | undefined): Promise<WorkspaceAnalyticsData> => {
    const res = await apiClient.get(GET_WORKSPACE_ANALYTICS(id as string));
    return res.data.workspaceAnalytics;
};

// Fetch workspace members by workspace ID
export const getWorkspaceMember = async (id: string | undefined): Promise<MembersData[]> => {
    const res = await apiClient.get(GET_MEMBERS(id as string));
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
    const res = await apiClient.put(UPDATE_WORKSPACE(data.id as string), data);
    return res.data;
};

// Delete a workspace by ID
export const deleteWorkspace = async (id: string | null) => {
    const res = await apiClient.delete(DELETE_WORKSPACE(id as string));
    return res.data;
};

// Leave a workspace by ID
export const leaveWorkspace = async (id: string | null) => {
    const res = await apiClient.delete(LEAVE_WORKSPACE(id as string));
    return res.data;
};

// Update the role of the user
export const updateMemberRole = async (data: { id: number; newRole: string; workspaceId: string | undefined }) => {
    const res = await apiClient.put(UPDATE_MEMBERS(data.workspaceId as string), data);
    return res.data;
};

// Invite Member to the workspace
export const inviteMember = async (data: { id: string | null; emails: string[] }) => {
    const res = await apiClient.post(INVITE_USER(data.id as string), data);
    return res.data;
};

// Join the workspace
export const joinWorkspace = async (inviteCode: string): Promise<JoinWorkspaceResponse> => {
    const res = await apiClient.post(JOIN_WORKSPACE, { inviteCode });
    return res.data;
};