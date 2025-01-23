import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx"
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

const EmailVerificationPage = () => {
    const form=useForm();
    const onSubmit=()=>{
        console.log(form);
    }
    return <>
      <Card className={'flex flex-col space-y-2 p-6 shadow-none border-none'}>
          <CardHeader className={'text-center text-lg'}>
              <CardTitle >Forgot your password?</CardTitle>
              <CardDescription className={'text-gray-500 p-2'}>No worries, we will send you reset instructions</CardDescription>
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
<Button>Send OTP</Button>
</form>
</Form>
</CardContent>
    </Card>
        </>
};

export default EmailVerificationPage;