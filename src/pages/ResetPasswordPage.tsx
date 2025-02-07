import EmailVerificationPage from "@/components/custom-components/reset-password/EmailVerificationPage.tsx";
import {useState} from "react";
import OTPVerificationPage from "@/components/custom-components/reset-password/OTPVerificationPage.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {resetPasswordSchema} from "@/schemas/auth.schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {FaEye, FaEyeSlash, FaSpinner} from "react-icons/fa";
import {Button} from "@/components/ui/button.tsx";
import {toast} from "sonner";
import {useResetPassword} from "@/hooks/auth.hooks.ts";


const ResetPasswordPage = () => {
    const [step,setStep] = useState(1);
    const [email,setEmail]=useState('');

    const {mutate,isPending}=useResetPassword();
    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver((resetPasswordSchema)),
        defaultValues:{
            password: "",
            confirmPassword: "",
        }
    })
    const [showPassword, setShowPassword] = useState(false);
    const togglePass=(val:string)=>{
        if(val!='password') return;
        setShowPassword(!showPassword);
    }
    const onSubmit=()=>{
        const data={email:email,password:form.getValues().password}
        mutate(data);
    }
    const onError = (errors: any) => {

            const firstErrorKey = Object.keys(errors)[0];
            if (firstErrorKey) {
                const firstErrorMessage = errors[firstErrorKey].message;
                toast.error(firstErrorMessage || "Something went wrong!");
            }
    };

    const handleStepChange = (step : number) => {
        setStep(step);
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
      <Card className={'w-full md:w-[460px] flex flex-col justify-center space-y-10'}>
          <CardHeader className={'text-center text-lg'}>
              <CardTitle>Create a new password</CardTitle>
          </CardHeader>
          <CardContent>
              <Form {...form} >
                  <form onSubmit={form.handleSubmit(onSubmit,onError)} className={'flex flex-col space-y-8'}>
                      <FormField
                          control={form.control}
                          name="password"
                          render={({field}) => (
                              <FormItem>
                                  <FormLabel>New Password</FormLabel>
                                  <div className="relative"><FormControl>
                                      <Input
                                          className="h-[45px]"
                                          placeholder={'Enter your password'}
                                          type={
                                           showPassword ? 'text' : 'password'
                                          }
                                          {...field}
                                      />

                                  </FormControl>
                                      <i onClick={()=>togglePass('password')} className='absolute cursor-pointer top-[14px] right-5'>
                                          {showPassword ? <FaEyeSlash className='size-4 text-primary'/> : <FaEye className='size-4 text-primary'/>}
                                      </i>
                                  </div>
                              </FormItem>
                          )}/>
                      <FormField
                          control={form.control}
                          name="confirmPassword"
                          render={({field}) => (
                              <FormItem>
                                  <FormLabel>Confirm Password</FormLabel>
                                  <div className="relative"><FormControl>
                                      <Input
                                          className="h-[45px]"
                                          placeholder={'Confirm your password'}
                                          type={
                                              showPassword ? 'text' : 'password'
                                          }
                                          {...field}
                                      />

                                  </FormControl>
                                      <i onClick={()=>togglePass('password')} className='absolute cursor-pointer top-[14px] right-5'>
                                          {showPassword ? <FaEyeSlash className='size-4 text-primary'/> : <FaEye className='size-4 text-primary'/>}
                                      </i>
                                  </div>
                              </FormItem>
                          )}/>
                      <Button disabled={!form.formState.isDirty || isPending}>Reset Password {isPending && <FaSpinner className={' animate-in spin-in repeat-infinite'}/>}</Button>
                  </form>
              </Form>
          </CardContent>
      </Card>
</>;
}
export default ResetPasswordPage;