import {z} from 'zod';

export const loginSchema=z.object({
    email:z.string().email(),
    password:z.string().min(1, "Password is a required field")
});

export const registerSchema=z.object({
    username:z.string().min(1, "Username is required"),
    email:z.string().email(),
    password:z.string().min(8, "Password must be a minimum of 8 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
        )
})

export const sendOTPSchema=z.object({
    email:z.string().email(),
})
export const OTPSchema=z.object({
    'pin':z.string().min(4)
})