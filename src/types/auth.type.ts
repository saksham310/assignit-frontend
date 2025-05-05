import {z} from "zod";
import {loginSchema, registerSchema} from "@/schemas/auth.schema.ts";

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

interface UserData {
    id: number;
    username: string;
    email: string;
    image: string | null;
    avatarColor: string | null;
}

export interface AuthResponse {
    token: string;
    user: UserData
}

export interface AuthHookConfig<T> {
    mutationFn: (data: T) => Promise<AuthResponse>;
    successMessage: string;
}

export interface User{
    id: number;
    username: string;
    email: string;
    image:string | null;
    avatarColor:string | null;
}