import {
    Card,
    CardHeader, CardTitle, CardContent
} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx"
import {
    Form, FormControl, FormField, FormItem, FormMessage
} from "@/components/ui/form.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {registerSchema} from "@/schemas/authSchemas.ts";
import {Button} from "@/components/ui/button.tsx";
import {Separator} from "@/components/ui/separator.tsx";

const SignUpPage = () => {
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })
    const onSubmit = (val: z.infer<typeof registerSchema>) => {
        console.log(val);
    }
    return <>
        <Card className='w-full h-full md:w-[460px] bg-white shadow-none border-none p-[24px]'>
            <CardHeader className='flex justify-center items-center'>
                <CardTitle className='text-2xl font-bold'>Join Us Today</CardTitle>
            </CardHeader>
            <CardContent className='p-4'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                          className='flex flex-col space-y-8'>
                        <FormField
                            control={form.control}
                            name='username'
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            className='h-[45px]'
                                            placeholder='Enter your username'
                                            type='text'
                                            {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            className='h-[45px]'
                                            placeholder='Enter your email'
                                            type='email'
                                            {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                        <FormField
                            control={form.control}
                            name='password'
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input className='h-[45px]'
                                               placeholder='Enter your password'
                                               type='pasword'
                                               {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                        <Button>Sign Up</Button>
                    </form>
                </Form>
            </CardContent>
            <div className="flex items-start justify-center px-7">
                <Separator className="h-[2px]"></Separator>
            </div>
            <CardContent>
                <div className='flex flex-col items-center m-4'>
                    <span className='text-sm font-light text-primary'>or</span>
                    <p className='text-muted-foreground text-sm pt-2'>Already have an account?&nbsp;
                        <span  className='text-primary cursor-pointer'>Sign In</span></p>
                </div>
            </CardContent>
        </Card>
    </>
}
export default SignUpPage;

