import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useRef, useState} from "react";
import {Badge} from "@/components/ui/badge.tsx";
import {Send, X} from "lucide-react";
import {toast} from "sonner";

const SendInvitePage = () => {
    const [emailList, setEmailList] = useState(new Set<string>());
    const inputRef = useRef<HTMLInputElement>(null);

    const handleEmailChange = (value: string, event?: KeyboardEvent) => {
        if (event && !(event.key === "Enter")) return;

        value = value.trim().toLowerCase();

        if (emailList.size > 7) {
            toast.warning("You can send invitations to a maximum of 8 recipients at a time.")
            return;
        }

        if (!!value) {
            setEmailList(new Set(emailList).add(value));
            inputRef.current!.value = '';
        }
    }

    const handleRemoveEmail = (value: string) => {
        const newEmailList = new Set(emailList)
        newEmailList.delete(value)
        setEmailList(newEmailList);
    }
    return <>
        <Card className={'w-full h-full md:w-[560px] bg-white shadow-none border-none '}>
            <CardHeader className={'text-center font-bold text-xl'}>
                <CardTitle>Workspace Invitation</CardTitle>
            </CardHeader>
            <CardContent className={'p-4  border-gray-200 flex gap-2 justify-between items-center'}>
                <Input placeholder={'Enter email address'} ref={inputRef} type='email'
                       onKeyDown={(event: KeyboardEvent) => handleEmailChange(inputRef.current!.value, event)}/>
                <Button onClick={() => handleEmailChange(inputRef.current!.value)}> Add</Button>
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
            <Button className={'m-2 w-full'}>Send Invitation<Send/></Button>
        </Card>
    </>
}

export default SendInvitePage;