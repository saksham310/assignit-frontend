import { apiClient } from "@/service/api.client.ts";
import { UPDATE_PROFILE } from "@/constants/api.constants.ts";

// Update user profile
export const updateProfile = async (data: any) => {
        const res = await apiClient.put(UPDATE_PROFILE, data);
        return res.data;
}
