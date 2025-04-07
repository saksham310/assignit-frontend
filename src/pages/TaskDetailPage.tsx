import {Badge} from "@/components/ui/badge.tsx";
import {Card, CardContent, CardHeader,} from "@/components/ui/card.tsx";
import {AlertCircle, MessageSquare, User, History, FlagIcon, Bug,} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";
import Editor from "@/editor/Editor.tsx";
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs.tsx";
import CommentPage from "@/pages/CommentPage.tsx";
import ActivityPage from "@/pages/ActivityPage.tsx";
import {useState} from "react";
import {BugType, bugTypes} from "@/types/project.types.ts";
import {cn, colorMap, getStatusColor, priorityFlagMap} from "@/lib/utils.ts";
import {MultiSelect} from "@/components/ui/multi-select.tsx";
import {Select, SelectItem, SelectTrigger, SelectGroup, SelectContent} from "@/components/ui/select.tsx";
import PrioritySwitcher from "@/components/custom-components/shared/PrioritySwitcher.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {Input} from "@/components/ui/input.tsx";

// const TaskDetailPage = () => {

//

//

//     return <>
//         <div className={'w-screen p-2 flex flex-col h-screen '}>
//             <div className={'sticky top-0 bg-background pt-2 pb-1 pl-6 z-10  flex flex-col gap-6'}>
//                 <div className={'flex items-center gap-2 '}>
//                     <Badge variant={'outline'}>Task Id</Badge>
//                     {totalBugs > 0 && <Badge variant={'outline'}
//                                              className={'border-red-500 font-normal inline-flex items-center gap-1 bg-red-50 text-red-700  '}>
//                         <AlertCircle className="size-4"/>
//                         <span>
//                         {totalBugs} {totalBugs === 1 ? "Bug" : "Bugs"}
//                       </span>
//                     </Badge>}
//
//                 </div>
//                 <h1 className={'font-bold'}>
//                     TASK NAME
//                 </h1>
//             </div>
//             <div className={'grid md:grid-cols-[2fr_1fr] gap-4 h-full max-h-[1000px] p-6 '}>
//                 <div className={'gap-4 flex flex-col '}>
//                     <Card className={'shadow-none w-full'}>
//                         <CardContent className="p-2">
//                             <div className={'grid grid-cols-3 space-x-20'}>
//                                 <div className={'text-gray-500 gap-4 text-sm flex items-center '}>
//                                     <div className={'flex items-center gap-1 text-sm'}><AlertCircle
//                                         className="h-4 w-4"/> Status :
//                                     </div>
//                                     <Select value={taskStatus} onValueChange={(value) => setTaskStatus(value)}>
//                                         <SelectTrigger className={'w-fit border-none shadow-none flex items-center gap-1'}>
//                                             <Badge variant="outline"
//                                                    className={`p-[0.5rem] h-6 font-semibold w-full`}
//                                                    style={{borderColor : color,
//                                                        color:color,
//                                                    }}
//                                             >{taskStatus}</Badge>
//                                         </SelectTrigger>
//                                         <SelectContent className={'w-auto'}>
//                                             <div className={'max-h-72 flex flex-col'}>
//                                                 <ScrollArea className={'flex-1 overflow-y-auto scrollbar'}>
//                                                     {statusLists?.map(
//                                                         (item) => (<SelectItem key={item.name} value={item.name} className={'text-gray-400'}>
//                                                             <Badge variant="outline" className={`p-[0.2rem]  w-full`} style={{borderColor : item.color, color:item.color,}}
//                                                             >{item.name}</Badge>
//                                                             </SelectItem>
//                                                         )
//                                                     )
//                                                     }
//                                                 </ScrollArea>
//                                             </div>
//                                             </SelectContent>
//                                     </Select>
//                                 </div>
//                                 <div className={'text-gray-500 gap-4 text-sm flex items-center '}>
//                                     <div className={'flex items-center gap-1 text-sm w-full max-w-[100px]'}>
//                                         <User
//                                             className="h-4 w-4"/> Assignee :
//                                     </div>
//                                     <MultiSelect
//                                         options={membersList}
//                                         onValueChange={setSelectedMembers}
//                                         defaultValue={selectedMembers}
//                                         placeholder="Unassigned"
//                                         maxCount={2}
//                                     />
//                                 </div>
//                                 <div className={'text-gray-500 gap-4 text-sm flex items-center'}>
//                                     Priority :
//                                     <PrioritySwitcher/>
//                                 </div>
//                             </div>

//                         </CardContent>
//                     </Card>
//                     <Editor/>
//                 </div>

//
//             </div>
//         </div>
//     </>
// }
// export default TaskDetailPage;
// const customCss = "max-h-[900px] h-auto"
const TaskDetailPage = () => {
    const [taskStatus, setTaskStatus] = useState("In Progress");
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

    const [selectedMembers, setSelectedMembers] = useState(['Saksham Sharma']);

    return <>
        <div className={'w-full flex flex-col gap-4 h-screen p-4 '}>
            <div className={'flex flex-col gap-4'}>
                <div className={'flex items-center gap-2 '}>
                    <Badge variant={'outline'}>Task Id</Badge>
                    {totalBugs > 0 && <Badge variant={'outline'}
                                             className={'border-red-500 font-normal inline-flex items-center gap-1 bg-red-50 text-red-700  '}>
                        <Bug className="size-4"/>
                        <span>
                        {totalBugs} {totalBugs === 1 ? "Bug" : "Bugs"}
                      </span>
                    </Badge>}

                </div>
            </div>
            {/*Main Contents*/}
            <div className={'flex-1  grid grid-cols-3  p-2 rounded-lg overflow-hidden'}>
                {/*Left Section*/}
                <div className={'col-span-2  flex flex-col gap-6 p-2 overflow-y-auto'}>
                    <Input className={'w-full font-medium border-none shadow-none hover:bg-gray-50 placeholder:text-black'}
                           style={{
                               fontSize: "1.1em",
                           }}
                           placeholder={'Create an authentication system'}/>


                    <div className={' border-b grid grid-cols-2 gap-2'}>
                        <div className={' gap-4 text-xs flex items-center '}>
                                                               <div className={'flex items-center gap-1 '}><AlertCircle
                                                                   className="h-4 w-4"/> Status :
                                                               </div>
                            <Select value={taskStatus} onValueChange={(value) => setTaskStatus(value)}>
                                <SelectTrigger className={'w-fit md:min-w-[170px] border-none shadow-none flex items-center gap-1'}>
                                    <Badge variant="outline"
                                           className={`p-[0.5rem] text-center h-6 font-semibold w-full`}
                                           style={{
                                               borderColor: color,
                                               color: color,
                                           }}
                                    >{taskStatus}</Badge>
                                </SelectTrigger>
                                <SelectContent className={'w-full '}>
                                    <div className={'max-h-72 flex flex-col'}>
                                        <ScrollArea className={'flex-1 overflow-y-auto scrollbar'}>
                                            {statusLists?.map(
                                                (item) => (<SelectItem key={item.name} value={item.name}
                                                                       className={'text-gray-400'}>
                                                        <Badge variant="outline" className={`p-[0.2rem]  w-full`}
                                                               style={{borderColor: item.color, color: item.color,fontSize:"12px"}}
                                                        >{item.name}</Badge>
                                                    </SelectItem>
                                                )
                                            )
                                            }
                                        </ScrollArea>
                                    </div>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className={' text-xs flex items-center'}>
                            <div className={'flex items-center gap-1'}>
                                <FlagIcon className={'w-4 h-4'}/>
                                Priority:
                            </div>
                            <PrioritySwitcher/>
                        </div>
                        <div className={' gap-2 text-xs flex items-center'}>
                            <div className={'flex items-center gap-1'}>
                                <User className={'w-4 h-4'}/>
                                Assignees:
                            </div>
                            <MultiSelect
                                options={membersList}
                                onValueChange={setSelectedMembers}
                                defaultValue={selectedMembers}
                                placeholder="Unassigned"
                                maxCount={2}/>
                        </div>
                    </div>
                    <div className={'flex items-center gap-6 text-xs'}>
                        <div className={'flex items-center gap-1 text-xs'}><Bug
                            className="h-4 w-4"/> Bug Cycle :
                        </div>
                        {bugTypes.map((type) => (
                            <div className="inline-flex items-center gap-1 text-xs">
                                <button
                                    onClick={() => decrementBug(type)}
                                    disabled={bugCounts[type] === 0}
                                    className="h-6 w-6 inline-flex items-center justify-center rounded-l-md border bg-slate-50 hover:bg-slate-100 disabled:opacity-50"
                                >
                                    -
                                </button>
                                <div className="inline-flex border border-gray-300 rounded overflow-hidden text-xs text-gray-700">
                                    <div className={`px-2 h-6 flex items-center justify-center ${colorMap[type]}`}>
                                        {type}
                                    </div>
                                    <div className="w-px bg-gray-300" />
                                    <div className="px-2 h-6 flex items-center justify-center">
                                        {bugCounts[type]}
                                    </div>
                                </div>
                                <button
                                    onClick={() => incrementBug(type)}
                                    className="h-6 w-6 inline-flex items-center justify-center rounded-r-md border bg-slate-50 hover:bg-slate-100"
                                >
                                    +
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className={' flex-1'}>
                        <Editor/>
                    </div>
                </div>
                {/*Right Section*/}
                <div className="h-full max-h-full overflow-hidden flex flex-col">
                    <Card className="shadow-none w-full flex flex-col flex-1 overflow-hidden">
                        <CardHeader className="border-b px-4 py-3 shrink-0">Activity</CardHeader>
                        <CardContent className="px-4 overflow-y-auto flex-1">
                        </CardContent>
                    </Card>
                </div>
            </div>

        </div>
    </>
}

export default TaskDetailPage;