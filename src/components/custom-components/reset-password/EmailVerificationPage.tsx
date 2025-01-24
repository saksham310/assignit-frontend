import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx"
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useGetOTP} from "@/hooks/auth.hooks.ts";
import {FaSpinner} from "react-icons/fa";
import {toast} from "sonner";

const EmailVerificationPage = () => {
    const form=useForm();
    const {mutate,isPending}=useGetOTP();
    const onSubmit=(val:any)=>{
        mutate(val,{
            onSuccess:()=>{
                toast.success("OTP has been sent to your email");
            }
        });
    }
    return <>
      <Card className={'flex flex-col space-y-2 p-6 shadow-none border-none'}>
          <CardHeader className={'text-center text-lg'}>
              <CardTitle >Forgot your password?</CardTitle>
              <CardDescription className={'text-gray-500 p-2'}>Don’t worry, we will send you an OTP to reset your password.</CardDescription>
          </CardHeader>
<CardContent>
<Form  {...form}>
<form onSubmit={form.handleSubmit(onSubmit)} className={'flex flex-col space-y-10'}>
<FormField
control={form.control}
name="email"
render={({ field }) => (
    <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
            <Input placeholder="Enter your email" {...field} />
        </FormControl>
        <FormMessage />
    </FormItem>
)}
 />
<Button disabled={isPending ||  !form.formState.isValid}>Send OTP {isPending && <FaSpinner/>}</Button>
</form>
</Form>
</CardContent>
    </Card>
        </>
};

export default EmailVerificationPage;