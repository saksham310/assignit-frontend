import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useState} from "react";
import {Badge} from "@/components/ui/badge.tsx";
import {Send, X} from "lucide-react";
import {toast} from "sonner";
import {useInviteMember} from "@/hooks/workspace.hooks.ts";
import {useWorkspaceStore} from "@/store/workspace.store.ts";
import {FaSpinner} from "react-icons/fa";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {emailSchema} from "@/schemas/auth.schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form.tsx";


const SendInvitePage = () => {
    const [emailList, setEmailList] = useState(new Set<string>());

    const currentWorkspaceId = useWorkspaceStore((state) => state.currentWorkspaceId);

    const {mutate, isPending} = useInviteMember();

    const form = useForm<z.infer<typeof emailSchema>>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: ''
        }
    });
    const handleEmailChange = (data: z.infer<typeof emailSchema>) => {
        const email = data.email.trim().toLowerCase();
        if (emailList.size > 7) {
            toast.warning("You can send invitations to a maximum of 8 recipients at a time.")
            return;
        }

        if (!!email) {
            setEmailList(new Set(emailList).add(email));
            form.reset();
        }
    }

    const handleRemoveEmail = (value: string) => {
        const newEmailList = new Set(emailList)
        newEmailList.delete(value)
        setEmailList(newEmailList);
    }

    const handleSendInvite = () => {
        const data = {
            id: currentWorkspaceId,
            emails: Array.from(emailList)
        }
        mutate(data);
    }

    return <>
        <Card className={'w-full h-full md:w-[560px] bg-white shadow-none border-none '}>
            <CardHeader className={'text-center font-bold text-xl'}>
                <CardTitle>Workspace Invitation</CardTitle>
            </CardHeader>
            <CardContent className={'p-4  border-gray-200'}>
                <Form  {...form}>
                    <form onSubmit={form.handleSubmit(handleEmailChange)}
                          className={'flex justify-between items-center gap-2'}>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem className={'flex-1'}>
                                    <FormControl>
                                        <Input placeholder="Enter your email" {...field}  />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button disabled={!form.formState.isValid}>Add</Button>
                    </form>
                </Form>
            </CardContent>
            <CardContent className={'p-4 border-gray-200 '}>
                <div className={'flex gap-2  flex-wrap'}>
                    {Array.from(emailList).map((email) => {
                        return (
                            <Badge variant={"secondary"} className={"flex gap-3 p-2 items-center font-normal"}>
                                {email} <X size={'13'} onClick={() => handleRemoveEmail(email)}/>
                            </Badge>
                        )
                    })}
                </div>

            </CardContent>
            <Button disabled={isPending} className={'m-2 w-full'} onClick={() => handleSendInvite()}>
                {!isPending && (<span className={'flex gap-2 items-center'}><Send/> Send Invite</span>)}
                {isPending && <FaSpinner className={' animate-in spin-in repeat-infinite'}/>}
            </Button>
        </Card>
    </>
}

export default SendInvitePage;