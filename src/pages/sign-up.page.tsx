
import {z} from 'zod';
import {registerSchema} from "@/schemas/authSchemas.ts";
import {FormFieldProps} from "@/types/form.type.ts";
import FormCard from "@/components/shared/formCard.tsx";
import {FaEye, FaUser} from "react-icons/fa";

import {MdMail} from "react-icons/md";
import {useRegister} from "@/hooks/authHooks.ts";



const SignUpPage = () => {
const {mutate}=useRegister();
    const onSubmit = (val: z.infer<typeof registerSchema>) => {
       mutate(val);
    }
    const fields:FormFieldProps[]=[
        {
            name:'username',type:'text',placeholder:'Enter your username',
            icon:FaUser

        },
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
            title="Start Your Project Journey"
            schema={registerSchema}
            onSubmit={onSubmit}
            fields={fields}
            btnText="Sign Up"
            footerText="Already have an account?"
            footerLinkText="Sign In"
        />


    </>
}
export default SignUpPage;

