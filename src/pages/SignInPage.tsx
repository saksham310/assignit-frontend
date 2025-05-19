
import {loginSchema} from "@/schemas/auth.schema.ts";
import {FormFieldProps} from "@/types/form.type.ts";
import FormCard from "@/components/custom-components/forms/formCard.tsx";
import {FaEye} from "react-icons/fa";

import {MdMail} from "react-icons/md";
import {useLogin} from "@/hooks/auth.hooks.ts";
import {LoginInput} from "@/types/auth.type.ts";



const SignInPage = () => {
const {mutate}=useLogin();
    const onSubmit = (val: LoginInput) => {
        return new Promise((resolve, reject) => {
            mutate(val, {
                onSuccess: () => resolve(true),
                onError: (err) => reject(err)
            });
        });
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
        <div className="flex flex-col gap-10 justify-center items-center relative">
            <FormCard
                title="Welcome Back"
                schema={loginSchema}
                onSubmit={onSubmit}
                fields={fields}
                btnText="Login"
                footerText="Don't have an account?"
                footerLinkText="Sign Up"
                forgotPasswordLink={true}
            />
        </div>


    </>
}
export default SignInPage;

