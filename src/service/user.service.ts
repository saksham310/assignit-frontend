import { apiClient } from "@/service/api.client.ts";
import { UPDATE_PROFILE } from "@/constants/api.constants.ts";

// Update user profile
export const updateProfile = async (data: any) => {
    try {
        const res = await apiClient.put(UPDATE_PROFILE, data);
        return res.data;
    } catch (err) {
        // Log the error for debugging
        console.error("Error updating profile:", err);
        throw new Error("Failed to update profile. Please try again later.");
    }
};
