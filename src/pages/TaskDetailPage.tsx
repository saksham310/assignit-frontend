import {Badge} from "@/components/ui/badge.tsx";
import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {AlertCircle, User} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";

const TaskDetailPage = () => {
    return <>
        <div className={'w-screen py-4 mx-auto flex flex-col'}>
            <div className={'sticky top-0 bg-background pt-2 pb-4 z-10  flex flex-col gap-6'}>
                        <div className={'flex items-center gap-2'}>
                            <Badge variant={'outline'}>Task Id</Badge>
                            <Badge variant={'outline'}>Status</Badge>
                        </div>
                        <h1 className={'font-bold'}>
                            TASK NAME
                        </h1>
                  </div>
            <div className={'grid md:grid-cols-[2fr_1fr] gap-6 h-full  '}>
                            <div className={'space-y-6 flex flex-col h-full overflow-y-auto'}>
                                <Card className={'shadow-none'}>
                                    <CardContent className="p-6">
                                        <div className={'grid grid-cols-2 gap-6'}>
                                            <div className={'text-gray-500 gap-4 text-sm flex items-center '}>
                                                <div className={'flex items-center gap-1 text-sm'}><AlertCircle
                                                    className="h-4 w-4"/> Status :
                                                </div>
                                                <Popover>
                                                    <PopoverTrigger>
                                                        <Badge variant="outline" className={'p-[0.5rem] font-normal'}>In
                                                            Progress</Badge>
                                                    </PopoverTrigger>
                                                    <PopoverContent className={'w-auto'}>
                                                        nothing
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                            <div className={'text-gray-500 gap-4 text-sm flex items-center'}>
                                                <div className={'flex items-center gap-1 text-sm'}><User
                                                    className="h-4 w-4"/> Assignee :
                                                </div>
                                                <Popover>
                                                    <PopoverTrigger>
                                                        <div className={'w-auto flex gap-1 text-sm  items-center'}>
                                                            <div className="flex items-center ">
                                                                <div
                                                                    className={'rounded-2xl border size-6 text-center  bg-pink-200'}>S
                                                                </div>
                                                                <div
                                                                    className={'rounded-2xl border size-6 text-center bg-blue-200'}>A
                                                                </div>
                                                            </div>
                                                            <span>+ 3</span>
                                                        </div>

                                                    </PopoverTrigger>
                                                    <PopoverContent className={'w-auto'}>
                                                        nothing
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                        </div>
                                        <Separator className="my-6"/>
                                        <div>
                                            <div className={'flex items-center gap-1 text-sm'}><AlertCircle
                                                className="h-4 w-4"/> Bug Cycle :
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className={'shadow-none h-full max-h-[745px]'}>
                                    <CardHeader
                                        className="p-4 font-medium bg-secondary rounded-t-xl text-sm text-gray-500">Description</CardHeader>
                                    <CardContent className="p-4 max-h-[400px] overflow-y-auto scrollbar">
                                               <p>Implement a secure user authentication flow with the following features:</p>
                                               <ul>
                                                   <li>Email and password login</li>
                                                   <li>Social login options (Google, GitHub)</li>
                                                   <li>Password reset functionality</li>
                                                   <li>Email verification</li>
                                                   <li>Remember me option</li>
                                               </ul>
                                               <p>The implementation should follow our security guidelines and be thoroughly tested.</p>
                                               <p>Additional details about implementation requirements:</p>
                                               <ul>
                                                   <li>Use JWT for authentication tokens</li>
                                                   <li>Implement proper password hashing with bcrypt</li>
                                                   <li>Set up rate limiting for login attempts</li>
                                                   <li>Create comprehensive unit and integration tests</li>
                                                   <li>Document the API endpoints thoroughly</li>
                                                   <li>Ensure GDPR compliance for user data</li>
                                               </ul>
                                               <p>
                                                   The authentication system should integrate with our existing user database and provide a seamless
                                                   experience across all platforms.
                                               </p>
                                    </CardContent>
                                </Card>
                            </div>
                <Card className={'shadow-none p-2'}>SIDE CONTENT</Card>
            </div>
        </div>
    </>
}
export default TaskDetailPage;