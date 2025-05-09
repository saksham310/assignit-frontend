import {z} from 'zod';

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, "Password is a required field")
});

export const registerSchema = z.object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email(),
    password: z.string().min(8, "Password must be a minimum of 8 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[^\s]{8,}$/,
            "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
        )
})

export const emailSchema = z.object({
    email: z.string().email(),
})
export const OTPSchema = z.object({
    'otp': z.string().min(4)
})

export const resetPasswordSchema = z.object({
    password: z.string().min(8, "Password must be a minimum of 8 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[^\s]{8,}$/,
            "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
    confirmPassword: z.string(),
}).refine((data) => {
        if (data.password && !data.confirmPassword) return false;
        return data.password === data.confirmPassword
    }, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    }
)