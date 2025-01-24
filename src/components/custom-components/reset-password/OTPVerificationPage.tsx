import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form.tsx";
import {InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot} from "@/components/ui/input-otp.tsx";

import {Button} from "@/components/ui/button.tsx";
import {MailOpen} from "lucide-react";
import {OTPSchema} from "@/schemas/auth.schema.ts";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

const OTPVerificationPage = ({handleStepChange}  :{handleStepChange:(step:number)=>void})=>{
    const form =useForm<z.infer<typeof OTPSchema>>({
        resolver:zodResolver(OTPSchema),
        defaultValues:{
            'pin':""
        }
    });
    const onSubmit = (values:any)=>{
        console.log(values);
        handleStepChange(3);
    }
    return <>
    <Card className={'m-4 p-8'}>
      <div className={'flex items-center justify-center m-8'}>
          <MailOpen className={'size-12 text-primary'}/>
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
                                    <InputOTP maxLength={4} {...field}>
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
                    <Button disabled={!form.formState.isDirty}>Verify OTP</Button>
                </form>
            </Form>
        </CardContent>
    </Card>
    </>
}

export default OTPVerificationPage;