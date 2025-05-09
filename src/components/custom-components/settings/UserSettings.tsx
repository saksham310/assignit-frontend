import UserAvatar from "@/components/custom-components/shared/UserAvatar.tsx";
import {useForm} from "react-hook-form";
import {userProfileSchema} from "@/schemas/user.schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {z} from "zod";
import {User} from "@/types/auth.type.ts";
import {Form, FormControl, FormField, FormItem, FormLabel,} from "@/components/ui/form.tsx";
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
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {Camera} from "lucide-react";
import {useRef, useState} from "react";
import {FormFieldProps} from "@/types/form.type.ts";
import {MdMail} from "react-icons/md";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {useUpdateProfile, useDeleteUser} from "@/hooks/user.hooks.ts";
import Loader from "@/components/custom-components/shared/Loader.tsx";


const UserSettings = () => {

    const user = useAuthUser<User>();
    const imageInputRef = useRef<HTMLInputElement>(null);
    const {mutate, isPending} = useUpdateProfile();
    const {mutate: deleteAccount, isPending: isDeleting} = useDeleteUser();
    const [previewImage, setPreviewImage] = useState(user?.image ?? "");

    const defaultValues = {
        username: user?.username ?? '',
        email: user?.email ?? '',
        password: "",
        confirmPassword: "",
        image: undefined,
    };
    const form = useForm<z.infer<typeof userProfileSchema>>({
        defaultValues,
        resolver: zodResolver(userProfileSchema),
    });

    const onSubmit = (val: z.infer<typeof userProfileSchema>) => {
        if (val === defaultValues) return;
        const formData = new FormData();
        formData.append('username', val.username);
        formData.append('email', val.email)

        if (val.password) {
            formData.append('password', val.password);
        }

        if (val.image) {
            formData.append('image', val.image);
        }

        mutate(formData,{
            onSuccess: (data) => {
                setPreviewImage(data.image)
                form.reset()
            }
        });
    }

    const onError = (errors: any) => {
        // Trigger toast for the first error encountered
        const firstErrorKey = Object.keys(errors)[0];
        if (firstErrorKey) {
            const firstErrorMessage = errors[firstErrorKey].message;
            toast.error(firstErrorMessage || "Something went wrong!");
        }
    };

    const handleImageClick = () => {
        imageInputRef.current?.click();
    }
    const handleImageChange = (e: any) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewImage(url);
            form.setValue("image", file, {
                shouldValidate: true,
                shouldDirty: true,
            });
        }
    }
    const fields: FormFieldProps[] = [
        {
            name: 'email',
            type: 'email',
            placeholder: 'Enter your email',
            icon: MdMail,
            label: 'Email'

        },
        {
            name: 'password',
            type: 'password',
            placeholder: 'Enter your password',
            icon: FaEye,
            label: "New password",
        },
        {
            name: 'confirmPassword',
            type: 'password',
            placeholder: 'Enter your password',
            icon: FaEye,
            label: "Confirm password",
        },
    ]
    const [showPassword, setShowPassword] = useState(false);
    const togglePass = (val: string) => {
        if (val != 'password') return;
        setShowPassword(!showPassword);
    }

    if (isPending || isDeleting) {
        return <Loader/>
    }

    return (
        <>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit, onError)}
                      className={'flex flex-col space-y-6  w-auto h-full overflow-y-auto no-scrollbar xl:space-y-5'}>
                    <p className={'font-semibold'}>Profile Setting</p>
                    <div className={'flex  items-center mt-8 gap-10'}>
                        <div className={'relative  group'} onClick={handleImageClick}>
                            <UserAvatar className={'size-24  text-lg  group-hover:opacity-50'} src={previewImage} avatarColor={user!.avatarColor} />
                            <p className={'absolute flex flex-col items-center top-[40%] w-full  text-xs  opacity-0' +
                                '  group-hover:opacity-100'}><Camera className={'size-4'}/>Change image</p>
                            <input ref={imageInputRef} type='file' accept="image/*" className={'hidden'}
                                   onChange={handleImageChange}/>
                        </div>
                        <div className={'flex flex-col  w-full lg:max-w-[640px]'}>
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
                                )
                                }
                            />
                        </div>
                    </div>
                    <Separator className={'mt-6 mb-6'}/>
                    <p className={'font-semibold'}>Account Security</p>
                    <div className={'flex flex-col lg:flex-row lg:items-center mt-10  gap-10 lg:gap-20 w-full scrollbar'}>
                        {fields.map((input) =>
                            <div className={'flex flex-col  w-full lg:max-w-[540px]'}>
                                <FormField
                                    key={input.name} // Add a unique key for each field
                                    control={form.control}
                                    //@ts-ignore
                                    name={input.name}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className={'text-sm'}>{input.label}</FormLabel>
                                            <div className="relative">
                                                <FormControl>
                                                    <Input
                                                        className="h-[38px]"
                                                        placeholder={input.placeholder}
                                                        type={
                                                            input.type === 'password' && showPassword ? 'text' : input.type
                                                        }

                                                        {...field}
                                                    />

                                                </FormControl>
                                                <i onClick={() => togglePass(input.type)}
                                                   className='absolute cursor-pointer top-[10px] right-5'>
                                                    {input.type === 'password' && showPassword ?
                                                        <FaEyeSlash className='size-4 text-gray-500'/> :
                                                        <input.icon className='size-4 text-gray-500'/>}
                                                </i>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}
                    </div>
                    <Separator className={'mt-8 mb-6'}/>
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
                                    onClick={() => deleteAccount()}
                                    className={'bg-destructive hover:bg-destructive/80 text-destructive-foreground'}>
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <div className={'flex justify-end mt-2 mr-2'}>
                        <Button disabled={!form.formState.isDirty || form.formState.isSubmitting}>Save</Button>
                    </div>
                </form>
            </Form>


        </>
    )
}
export default UserSettings;