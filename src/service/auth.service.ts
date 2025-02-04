import { apiClient } from "@/service/api.client.ts";
import { LOGIN_API, RESET_PASSWORD, SEND_OTP, SIGNUP_API, VERIFY_OTP } from "@/constants/api.constants.ts";
import { LoginInput, RegisterInput } from "@/types/auth.type.ts";

// Login API call
export const login = async (data: LoginInput) => {
        const res = await apiClient.post(LOGIN_API, data);
        return res.data;
};

// Register API call
export const register = async (data: RegisterInput) => {
        const res = await apiClient.post(SIGNUP_API, data);
        return res.data;
};

// Send OTP API call
export const sendOTP = async (email: string) => {
        const res = await apiClient.post(SEND_OTP, { email });
        return res.data;
};

// Verify OTP API call
export const verifyOTP = async (data: { email: string; otp: string }) => {
        console.log("Verifying OTP", data);
        const res = await apiClient.post(VERIFY_OTP, data);
        return res.data;
};

// Reset password API call
export const resetPassword = async (data: { email: string; password: string }) => {
        const res = await apiClient.post(RESET_PASSWORD, data);
        return res.data;
};
