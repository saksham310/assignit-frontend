import EmailVerificationPage from "@/components/custom-components/reset-password/EmailVerificationPage.tsx";
import {useState} from "react";

const ResetPasswordPage = () => {
    const [step,] = useState(1);
    if(step === 1){
       return <>
           <EmailVerificationPage/>
       </>
    }
    return <>
        Page
</>;
}
export default ResetPasswordPage;