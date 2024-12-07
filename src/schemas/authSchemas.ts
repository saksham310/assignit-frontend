import {z} from 'zod';

export const loginSchema=z.object({
    email:z.string().email(),
    password:z.string().min(1,{
        message: "Password is a required field"
    })
});

export const registerSchema=z.object({
    username:z.string().min(1,{
        message: "Username is required"
    }),
    email:z.string().email(),
    password:z.string().min(8,{
        message: "Password must be a minimum of 8 characters"
    })
})