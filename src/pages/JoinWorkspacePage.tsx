import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useParams, useSearchParams} from "react-router-dom";
import {Avatar} from "@radix-ui/react-avatar";
import {AvatarFallback} from "@/components/ui/avatar.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useJoinWorkspace} from "@/hooks/workspace.hooks.ts";

const JoinWorkspacePage = () =>{
    const [queryParameters] = useSearchParams();
    const {code} = useParams();
    const workspaceName = queryParameters.get('name')
    const {mutate} = useJoinWorkspace();
    const onSubmit = () =>{
        if(!!code)
        mutate(code);
    }
    const  onDecline = () => {
        window.location.href = '/login'
    }
    return <>
            <div className=" min-h-screen bg-[#EEEBF6] mx-auto max-w-screen-2xl p-20 flex justify-center items-center">
                <Card className={'w-full md:w-[600px] flex flex-col space-y-18 p-6 shadow-none justify-center items-center '}>
                    <CardHeader className={'text-center font-bold text-xl'}>
                        <CardTitle>You are invited to join a workspace</CardTitle>
                    </CardHeader>
                    <CardContent className={'w-full flex flex-col justify-center items-center space-y-8'}>
                        <Avatar className={'size-24'}>
                            <AvatarFallback >{workspaceName![0]}</AvatarFallback>
                        </Avatar>
                        <p className={'font-semibold'}>{workspaceName}</p>
                        <p className={'text-sm text-gray-500 w-full whitespace-nowrap '}>Join AssignIt to collaborate with your team and access shared resources.</p>
                       <div className={'flex  items-center justify-center gap-4  w-full'}>
                           <Button variant={'outline'} className={'flex-1'} onClick={()=>onDecline()}>Decline</Button>
                           <Button type={"button"} className={'flex-1'} onClick={()=>onSubmit()}>Accept Invitation</Button>
                       </div>
                    </CardContent>
                </Card>
            </div>

        </>
        }

        export default JoinWorkspacePage;