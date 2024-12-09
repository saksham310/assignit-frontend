
import {z} from 'zod';
import {loginSchema} from "@/schemas/authSchemas.ts";
import {FormFieldProps} from "@/types/form.type.ts";
import FormCard from "@/components/formCard.tsx";
import {FaEye} from "react-icons/fa";

import {MdMail} from "react-icons/md";



const SignInPage = () => {

    const onSubmit = (val: z.infer<typeof loginSchema>) => {
        console.log(val);
    }
    const fields:FormFieldProps[]=[
        {
            name: 'email',
            type: 'email',
            placeholder: 'Enter your email',
            icon:MdMail

        },
        {
            name: 'password',
            type: 'password',
            placeholder: 'Enter your password',
            icon: FaEye,


        },
    ]

    return <>
        <FormCard
            title="Join Us Today"
            schema={loginSchema}
            onSubmit={onSubmit}
            fields={fields}
            btnText="Login"
            footerText="Don't have an account?"
            footerLinkText="Sign Up"
        />


    </>
}
export default SignInPage;

