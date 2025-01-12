
import {loginSchema} from "@/schemas/auth.schema.ts";
import {FormFieldProps} from "@/types/form.type.ts";
import FormCard from "@/components/custom-components/forms/formCard.tsx";
import {FaEye} from "react-icons/fa";

import {MdMail} from "react-icons/md";
import {useLogin} from "@/hooks/authHooks.ts";
import {LoginInput} from "@/types/auth.type.ts";



const SignInPage = () => {
const {mutate}=useLogin();
    const onSubmit = (val: LoginInput) => {
        mutate(val);
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
            title="Welcome Back"
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

