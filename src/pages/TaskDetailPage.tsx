import {Badge} from "@/components/ui/badge.tsx";
import {Card, CardContent, CardHeader,} from "@/components/ui/card.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {AlertCircle, MessageSquare, User, History,} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";
import Editor from "@/editor/Editor.tsx";
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs.tsx";
import CommentPage from "@/pages/CommentPage.tsx";
import ActivityPage from "@/pages/ActivityPage.tsx";
import {useState} from "react";
import {BugType, bugTypes} from "@/types/project.types.ts";
import {colorMap} from "@/lib/utils.ts";
import {MultiSelect} from "@/components/ui/multi-select.tsx";
import UserAvatar from "@/components/custom-components/shared/UserAvatar.tsx";

const TaskDetailPage = () => {
    const [bugCounts, setBugCounts] = useState<Record<BugType, number>>({
        frontend: 0,
        backend: 0,
        database: 0,
    })
    const totalBugs = bugTypes.reduce((acc, index) => acc + bugCounts[index], 0);
    const incrementBug = (category: keyof typeof bugCounts) => {
        setBugCounts((prev) => ({
            ...prev,
            [category]: prev[category] + 1,
        }))
    }

    const decrementBug = (category: keyof typeof bugCounts) => {
        setBugCounts((prev) => ({
            ...prev,
            [category]: Math.max(0, prev[category] - 1),
        }))
    }
    const frameworksList = [
        { value: "react", label: "React", icon: User },
        { value: "angular", label: "Angular", icon: User},
        { value: "vue", label: "Vue", icon: User},
        { value: "svelte", label: "Svelte", icon: User },
        { value: "ember", label: "Ember", icon: User },
    ];
    const [selectedFrameworks, setSelectedFrameworks] = useState(['react']);

    return <>
        <div className={'w-screen py-1.5 mx-auto flex flex-col h-screen '}>
            <div className={'sticky top-0 bg-background pt-2 pb-1 pl-2 z-10  flex flex-col gap-6'}>
                <div className={'flex items-center gap-2 '}>
                    <Badge variant={'outline'}>Task Id</Badge>
                    {totalBugs > 0 && <Badge variant={'outline'}
                                             className={'border-red-500 font-normal inline-flex items-center gap-1 bg-red-50 text-red-700  '}>
                        <AlertCircle className="size-4"/>
                        <span>
                        {totalBugs}  {totalBugs === 1 ? "Bug" : "Bugs"}
                      </span>
                    </Badge>}

                </div>
                <h1 className={'font-bold'}>
                    TASK NAME
                </h1>
            </div>
            <div className={'grid md:grid-cols-[2fr_1fr] gap-6 h-full  '}>
                <div className={'space-y-6 flex flex-col h-full overflow-y-auto p-2'}>
                    <Card className={'shadow-none'}>
                        <CardContent className="p-6">
                            <div className={'grid grid-cols-2'}>
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
                                    <div className={'flex items-center gap-1 text-sm'}>
                                        <User
                                        className="h-4 w-4"/> Assignee :
                                    </div>
                                    <MultiSelect
                                        options={frameworksList}
                                        onValueChange={setSelectedFrameworks}
                                        defaultValue={selectedFrameworks}
                                        placeholder="Unassigned"
                                        maxCount={3}
                                    />
                                </div>
                            </div>
                            <Separator className="my-6"/>
                            <div className={'flex items-center gap-6 text-sm'}>
                                <div className={'flex items-center gap-1 text-sm'}><AlertCircle
                                    className="h-4 w-4"/> Bug Cycle :
                                </div>
                                {bugTypes.map((type) => (
                                    <div className="inline-flex items-center">
                                        <button
                                            onClick={() => decrementBug(type)}
                                            disabled={bugCounts[type] === 0}
                                            className="h-7 w-7 inline-flex items-center justify-center rounded-l-md border bg-slate-50 hover:bg-slate-100 disabled:opacity-50"
                                        >
                                            -
                                        </button>
                                        <div
                                            className={`h-7 px-2 inline-flex items-center justify-center border-t border-b ${colorMap[type]} text-gray-700 text-xs font-medium`}>
                                            <span className="mr-1">{type}</span>
                                            {bugCounts[type]}
                                        </div>
                                        <button
                                            onClick={() => incrementBug(type)}
                                            className="h-7 w-7 inline-flex items-center justify-center rounded-r-md border bg-slate-50 hover:bg-slate-100"
                                        >
                                            +
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    <Editor/>
                </div>
                <div className={"md:w-[400px] max-h-[670px] p-2"}>
                    <Card className={'shadow-none w-full h-full'}>
                        <Tabs defaultValue="comments" className="h-full flex flex-col">
                            <CardHeader className=" border-b px-4 py-3">
                                <TabsList className="grid w-full grid-cols-2 shadow-none bg-slate-50 ">
                                    <TabsTrigger value="comments" className="flex items-center gap-2 shadow-none">
                                        <MessageSquare className="h-4 w-4"/>
                                        Comments
                                    </TabsTrigger>
                                    <TabsTrigger value="activity" className="flex items-center gap-2">
                                        <History className="h-4 w-4"/>
                                        Activity
                                    </TabsTrigger>
                                </TabsList>
                            </CardHeader>
                            <TabsContent value="comments" className="flex-1 flex flex-col h-full overflow-hidden">
                                <CommentPage/>
                            </TabsContent>
                            <TabsContent value={'activity'} key="activity" className={'h-full gap-0 overflow-hidden'}>
                                <ActivityPage/>
                            </TabsContent>
                        </Tabs>
                    </Card>
                </div>

            </div>
        </div>
    </>
}
export default TaskDetailPage;