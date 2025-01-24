import EmailVerificationPage from "@/components/custom-components/reset-password/EmailVerificationPage.tsx";
import {useState} from "react";
import OTPVerificationPage from "@/components/custom-components/reset-password/OTPVerificationPage.tsx";


const ResetPasswordPage = () => {
    const [step,setStep] = useState(1);

    const handleStepChange = (step : number) => {
        setStep(step);
        console.log(step);
    }
    if(step === 1){
       return <>
           <EmailVerificationPage handleStepChange={handleStepChange}/>
       </>
    }
    if(step === 2){
     return <OTPVerificationPage/>
    }
    return <>
        Page
</>;
}
export default ResetPasswordPage;