import z from 'zod'

export const userProfileSchema=z.object({
    username:z.string().min(1, "Username is required"),
    email:z.string().email(),
    password:z.string().optional().refine((password)=>
        {
            if(!password) return true;
            return password.length >=8;
        },{
        message:'Password must be at least 8 characters',
        }
    ),
    confirmPassword:z.string(),
    image: z
        .any()
        .optional()
        .refine(
            (file) => {
                if (!file || !file[0]) return true; // Skip validation if no file
                return ['image/jpeg', 'image/png', 'image/webp'].includes(file[0].type);
            },
            {
                message: 'File must be a valid image (JPEG, PNG, or WebP)',
            }
        )
}).refine((data)=> {
    if(data.password && !data.confirmPassword) return false;
    return data.password === data.confirmPassword
}, {
    message: "Passwords don't match",
    path: ["confirmPassword"],}
)