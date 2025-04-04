import {Badge} from "@/components/ui/badge.tsx";
import {Card, CardContent, CardHeader,} from "@/components/ui/card.tsx";
import {AlertCircle, MessageSquare, User, History,} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";
import Editor from "@/editor/Editor.tsx";
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs.tsx";
import CommentPage from "@/pages/CommentPage.tsx";
import ActivityPage from "@/pages/ActivityPage.tsx";
import {useState} from "react";
import {BugType, bugTypes} from "@/types/project.types.ts";
import {colorMap, getStatusColor} from "@/lib/utils.ts";
import {MultiSelect} from "@/components/ui/multi-select.tsx";
import {Select,SelectItem,SelectTrigger,SelectGroup,SelectContent} from "@/components/ui/select.tsx";

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

    const [taskStatus, setTaskStatus] = useState("In Progress")

    const membersList = [
        {id: "1", username: "Saksham Sharma", image: "path_to_image.jpg", avatarColor: '#A7C7FF'}, // Soft Light Blue
        {id: "2", username: "Jane Smith", image: "", avatarColor: '#FFB3B3'}, // Soft Light Red
        {id: "3", username: "Alex Brown", image: "path_to_image.jpg", avatarColor: '#A2F2D0'}, // Soft Light Green
        {id: "4", username: "Ramsay Bruh", image: "path_to_image.jpg", avatarColor: '#FFF5A3'}, // Soft Light Yellow
        {id: "5", username: "Love Ada", image: "", avatarColor: '#E2AFFF'}, // Soft Light Purple
        {id: "6", username: "Chris Brown", image: "path_to_image.jpg", avatarColor: '#A1F1E6'}, // Soft Light Teal
        {id: "7", username: "Love Aa", image: "", avatarColor: '#E2AFAF'}, // Soft Light Purple
        {id: "8", username: "Chris rown", image: "path_to_image.jpg", avatarColor: '#A1E1E6'}, // Soft Light Teal
    ];
    const statusLists = [
        {name: 'To Do', type: 'To_Do', color: '#90a9d0'},
        {name: 'In Progress', type: 'In_Progress', color: '#f9d171'},
        {name: 'Completed', type: 'Completed', color: '#008844'},
    ]
    let color:string = getStatusColor(taskStatus,statusLists);
    const changeTaskStatus = (status: string) => {
        setTaskStatus(status)
        color = getStatusColor(taskStatus,statusLists)

    }
    const [selectedMembers, setSelectedMembers] = useState(['Saksham Sharma']);

    return <>
        <div className={'w-screen p-2 flex flex-col h-screen '}>
            <div className={'sticky top-0 bg-background pt-2 pb-1 pl-2 z-10  flex flex-col gap-6'}>
                <div className={'flex items-center gap-2 '}>
                    <Badge variant={'outline'}>Task Id</Badge>
                    {totalBugs > 0 && <Badge variant={'outline'}
                                             className={'border-red-500 font-normal inline-flex items-center gap-1 bg-red-50 text-red-700  '}>
                        <AlertCircle className="size-4"/>
                        <span>
                        {totalBugs} {totalBugs === 1 ? "Bug" : "Bugs"}
                      </span>
                    </Badge>}

                </div>
                <h1 className={'font-bold'}>
                    TASK NAME
                </h1>
            </div>
            <div className={'grid md:grid-cols-[2fr_1fr] gap-4 h-full max-h-[1000px] p-6 '}>
                <div className={'gap-4 flex flex-col '}>
                    <Card className={'shadow-none w-full'}>
                        <CardContent className="p-2">
                            <div className={'grid grid-cols-2'}>
                                <div className={'text-gray-500 gap-4 text-sm flex items-center '}>
                                    <div className={'flex items-center gap-1 text-sm'}><AlertCircle
                                        className="h-4 w-4"/> Status :
                                    </div>
                                    <Select value={taskStatus} onValueChange={(value) => setTaskStatus(value)}>
                                        <SelectTrigger className={'w-fit border-none shadow-none flex items-center gap-1'}>
                                            <Badge variant="outline"
                                                   className={`p-[0.5rem]  font-semibold w-full`}
                                                   style={{borderColor : color,
                                                       color:color,
                                                   }}
                                            >{taskStatus}</Badge>
                                        </SelectTrigger>
                                        <SelectContent className={'w-auto'}>
                                            <SelectGroup>
                                                {statusLists.map((status) => (
                                                    <SelectItem
                                                        value={status.name}><Badge variant="outline"
                                                                                   className={`p-[0.2rem]  w-full`}
                                                                                   style={{borderColor : status.color,
                                                                                       color:status.color,
                                                                                   }}
                                                    >{status.name}</Badge></SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className={'text-gray-500 gap-4 text-sm flex items-center'}>
                                    <div className={'flex items-center gap-1 text-sm'}>
                                        <User
                                            className="h-4 w-4"/> Assignee :
                                    </div>
                                    <MultiSelect
                                        options={membersList}
                                        onValueChange={setSelectedMembers}
                                        defaultValue={selectedMembers}
                                        placeholder="Unassigned"
                                        maxCount={2}
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
                <div className={""}>
                    <Card className={'shadow-none w-full max-w-[580px] h-full max-h-[865px]'}>
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
                                <TabsContent value="comments" className="flex-1  flex flex-col h-full overflow-hidden">
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