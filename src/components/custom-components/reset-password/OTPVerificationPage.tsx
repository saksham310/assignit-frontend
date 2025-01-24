import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form.tsx";
import {InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot} from "@/components/ui/input-otp.tsx";

import {Button} from "@/components/ui/button.tsx";
import {MailOpen} from "lucide-react";

const OTPVerificationPage = ({handleStepChange}  :{handleStepChange:(step:number)=>void})=>{
    const form =useForm();
    const onSubmit = (values:any)=>{
        console.log(values);
        handleStepChange(3);
    }
    return <>
    <Card>
      <div className={'flex items-center justify-center m-8'}>
          <MailOpen className={'size-10'}/>
      </div>
        <CardHeader className={'space-y-8 text-center text-lg'}>
            <CardTitle>Enter your Verification Code</CardTitle>
            <CardDescription className={'text-gray-500'}>Please enter verification code sent to your email</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={'flex flex-col space-y-14 justify-center items-center w-full'}>
                    <FormField
                        control={form.control}
                        name="pin"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <InputOTP maxLength={6} {...field}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                    </InputOTPGroup>
                                        <InputOTPSeparator />
                                        <InputOTPGroup>
                                            <InputOTPSlot index={1} />
                                        </InputOTPGroup>
                                        <InputOTPSeparator />
                                        <InputOTPGroup>
                                            <InputOTPSlot index={2} />
                                        </InputOTPGroup>
                                        <InputOTPSeparator />
                                        <InputOTPGroup>
                                            <InputOTPSlot index={3} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button disabled={!form.formState.isValid}>Verify OTP</Button>
                </form>
            </Form>
        </CardContent>
    </Card>
    </>
}

export default OTPVerificationPage;