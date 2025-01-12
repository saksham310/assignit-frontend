import {z} from 'zod';

export const loginSchema=z.object({
    email:z.string().email(),
    password:z.string().min(1, "Password is a required field")
});

export const registerSchema=z.object({
    username:z.string().min(1, "Username is required"),
    email:z.string().email(),
    password:z.string().min(8, "Password must be a minimum of 8 characters")
})