import UserAvatar from "@/components/custom-components/shared/UserAvatar.tsx";
import { useForm} from "react-hook-form";
import {userProfileSchema} from "@/schemas/user.schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {z} from "zod";
import {User} from "@/types/auth.type.ts";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form.tsx";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {Input} from "@/components/ui/input"
import {Separator} from "@/components/ui/separator.tsx";
import { Button } from "@/components/ui/button";
import {toast} from "sonner";


const UserSettings=()=>{
    const user=useAuthUser<User>();
    const defaultValues={
        username:user?.username ?? '',
        email:user?.email ?? '',
        password:"",
        confirmPassword:"",
        image:undefined,
    };
const form=useForm<z.infer<typeof userProfileSchema>>({
    defaultValues,
    resolver: zodResolver(userProfileSchema),
});
    const onSubmit=(val:z.infer<typeof userProfileSchema>)=>{
        if(val===defaultValues) return;
    }
    const onError = (errors: any) => {
        // Trigger toast for the first error encountered
        const firstErrorKey = Object.keys(errors)[0];
        if (firstErrorKey) {
            const firstErrorMessage = errors[firstErrorKey].message;
            toast.error(firstErrorMessage || "Something went wrong!");
        }
    };
    return (
        <>

                        <Form {...form} >
                            <form onSubmit={form.handleSubmit(onSubmit,onError)} className={'flex flex-col space-y-7 w-auto h-full '}>
                                <p className={'font-semibold'}>Profile Setting</p>
                                <div className={'flex  items-center mt-8 gap-10'}>
                                    <UserAvatar/>
                                    <div className={'flex flex-col  w-full max-w-[640px]'}>
                                        <FormField
                                            name="username"
                                            control={form.control}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Display Name</FormLabel>
                                                    <FormControl>
                                                        <Input className="" {...field} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <Separator className={'mt-6 mb-6'}/>
                                <p className={'font-semibold'}>Account Security</p>
                                <div className={'flex  items-center mt-10 gap-20 w-full'}>
                                    <div className={'flex flex-col  w-full max-w-[540px]'}><FormField
                                        name="email"
                                        control={form.control}
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input className="" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    /></div>
                                    <div className={'flex flex-col  w-full max-w-[540px]'}><FormField
                                        name="password"
                                        control={form.control}
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>New Password</FormLabel>
                                                <FormControl>
                                                    <Input className="" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    /></div>
                                    <div className={'flex flex-col  w-full max-w-[540px]'}><FormField
                                        name="confirmPassword"
                                        control={form.control}
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Confirm new password</FormLabel>
                                                <FormControl>
                                                    <Input className="" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    /></div>
                                </div>
                                <Separator className={'mt-6 mb-6'}/>
                                <AlertDialog>
                                    <AlertDialogTrigger className={'flex flex-col text-start max-w-[420px] '}>
                                        <p className={'font-semibold w-full text-red-700'}>Delete account</p>
                                    </AlertDialogTrigger>
                                    <span className='text-gray-500 text-sm'>Permanently delete your account and remove all the access to the workspaces</span>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete your account
                                                and remove your data from our servers.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                                className={'bg-destructive hover:bg-destructive/80 text-destructive-foreground'}>Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                                <div className={'flex justify-end mt-12 mr-2'}>
                                <Button disabled={!form.formState.isDirty || form.formState.isSubmitting }>Save</Button>
                                </div>
                            </form>
                        </Form>


        </>
    )
}
export default UserSettings;