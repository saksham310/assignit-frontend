import { apiClient } from "@/service/api.client.ts";
import {UPDATE_PROFILE, USER_ANALYTICS} from "@/constants/api.constants.ts";


// Update user profile
export const updateProfile = async (data:  FormData) => {
        const res = await apiClient.put(UPDATE_PROFILE, data);
        return res.data;
}

export const getUserAnalytics = async (projectId: string|undefined, userId:number, sprintId?: number)  => {
        const res = await apiClient.get(USER_ANALYTICS(projectId, userId, sprintId));
        return res.data;
}