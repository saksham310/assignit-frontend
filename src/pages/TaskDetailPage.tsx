import {Badge} from "@/components/ui/badge.tsx";
import {Card, CardContent, CardHeader,} from "@/components/ui/card.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {AlertCircle, MessageSquare, User,History} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";
import Editor from "@/editor/Editor.tsx";
import {Tabs,TabsList,TabsTrigger,TabsContent} from "@/components/ui/tabs.tsx";

const TaskDetailPage = () => {
    return <>
        <div className={'w-screen py-4 mx-auto flex flex-col h-screen '}>
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
                <div className={'space-y-6 flex flex-col h-full overflow-y-auto p-2'}>
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
                    <Editor/>
                </div>
                <div className={"md:w-[400px] max-h-[650px] p-2"}>
                    <Card className={'shadow-none w-full h-full'}>
                        <Tabs defaultValue="comments" className="h-full flex flex-col">
                            <CardHeader className=" border-b px-4 py-3">
                                <TabsList className="grid w-full grid-cols-2 shadow-none bg-slate-50 ">
                                    <TabsTrigger value="comments" className="flex items-center gap-2 shadow-none">
                                        <MessageSquare className="h-4 w-4" />
                                        Comments
                                    </TabsTrigger>
                                    <TabsTrigger value="activity" className="flex items-center gap-2">
                                        <History className="h-4 w-4" />
                                        Activity
                                    </TabsTrigger>
                                </TabsList>
                            </CardHeader>
                        </Tabs>
                    </Card>
                </div>

            </div>
        </div>
    </>
}
export default TaskDetailPage;