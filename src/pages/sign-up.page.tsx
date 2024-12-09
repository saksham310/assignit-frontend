
import {z} from 'zod';
import {registerSchema} from "@/schemas/authSchemas.ts";
import {FormFieldProps} from "@/types/form.type.ts";
import FormCard from "@/components/formCard.tsx";
import {EyeIcon, Mail, User} from "lucide-react";

const SignUpPage = () => {

    const onSubmit = (val: z.infer<typeof registerSchema>) => {
        console.log(val);
    }
    const fields:FormFieldProps[]=[
        {
            name:'username',type:'text',placeholder:'Enter your username',
            icon:<User/>
        },
        {
            name: 'email',
            type: 'email',
            placeholder: 'Enter your email',
            icon:<Mail/>
        },
        {
            name: 'password',
            type: 'password',
            placeholder: 'Enter your password',
            icon:<EyeIcon/>
        },
    ]

    return <>
        <FormCard
            title="Join Us Today"
            schema={registerSchema}
            onSubmit={onSubmit}
            fields={fields}
            btnText="Sign Up"
            footerText="Already have an account?"
            footerLink="Sign In"
        />


    </>
}
export default SignUpPage;

