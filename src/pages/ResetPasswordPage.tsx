import EmailVerificationPage from "@/components/custom-components/reset-password/EmailVerificationPage.tsx";
import {useState} from "react";
import OTPVerificationPage from "@/components/custom-components/reset-password/OTPVerificationPage.tsx";


const ResetPasswordPage = () => {
    const [step,setStep] = useState(1);
    const [email,setEmail]=useState('');

    const handleStepChange = (step : number) => {
        setStep(step);
        console.log(step);
    }
    const handleEmailChange = (value : string) => {
        setEmail(value);
    }
    if(step === 1){
       return <>
           <EmailVerificationPage handleStepChange={handleStepChange} handleEmailChange={handleEmailChange}/>
       </>
    }
    if(step === 2){
     return <OTPVerificationPage handleStepChange={handleStepChange} email={email}/>
    }
    return <>
        Page
</>;
}
export default ResetPasswordPage;