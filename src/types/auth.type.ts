import {z} from "zod";
import {loginSchema, registerSchema} from "@/schemas/authSchemas.ts";

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

interface UserData {
    id: number;
    username: string;
    email: string;
}

export interface AuthResponse {
    token: string;
    user: UserData
}

export interface AuthHookConfig<T> {
    mutationFn: (data: T) => Promise<AuthResponse>;
    successMessage: string;
}