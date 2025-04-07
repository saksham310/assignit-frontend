import {Input} from "@/components/ui/input.tsx";
import {AlertCircle, Bug, FlagIcon, User} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import PrioritySwitcher from "@/components/custom-components/shared/PrioritySwitcher.tsx";
import {MultiSelect} from "@/components/ui/multi-select.tsx";
import {BugType, bugTypes} from "@/types/project.types.ts";
import {cn, colorMap, getStatusColor} from "@/lib/utils.ts";
import Editor from "@/editor/Editor.tsx";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";


interface TaskEditorType {
    isCreateMode: boolean;
}

const TaskEditor = ({isCreateMode = true}: TaskEditorType) => {
    const statusLists = [
        {name: 'To Do', type: 'To_Do', color: '#90a9d0'},
        {name: 'In Progress', type: 'In_Progress', color: '#f9d171'},
        {name: 'Completed', type: 'Completed', color: '#008844'},
    ]
    const [taskStatus, setTaskStatus] = useState(statusLists[0]);

    const handleStatusChange = (value:string) => {
        const newStatus = statusLists.find(status => status.name === value)
        if (newStatus) {
            setTaskStatus(newStatus)
        }
        console.log(taskStatus)
    }

    const [bugCounts, setBugCounts] = useState<Record<BugType, number>>({
        frontend: 0,
        backend: 0,
        database: 0,
    })
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
    const [selectedMembers, setSelectedMembers] = useState(['Saksham Sharma','Jane Smith']);

    return <>
        <div className={cn('col-span-2  flex flex-col gap-4 p-2 overflow-y-auto', {"h-[520px]": isCreateMode})}>
            <Input className={'w-full font-medium border-none shadow-none hover:bg-gray-50 placeholder:font-normal '}
                   style={{
                       fontSize: isCreateMode ? "14px" : "1.1em",
                   }}
                   placeholder={'Give your task a name'} required/>


            <div className={' border-b grid grid-cols-2 gap-2'}>
                <div className={' gap-4 text-xs flex items-center '}>
                    <div className={'flex items-center gap-1 '}><AlertCircle
                        className="h-4 w-4"/> Status :
                    </div>
                    <Select value={taskStatus.name} onValueChange={(value) => handleStatusChange(value)}>
                        <SelectTrigger
                            className={'w-fit md:min-w-[170px] border-none shadow-none flex items-center gap-1'}>
                            <Badge variant="outline"
                                   className={`p-[0.5rem] text-center h-6 font-semibold w-full`}
                                   style={{
                                       borderColor: getStatusColor(taskStatus.name, statusLists),
                                       color: getStatusColor(taskStatus.name, statusLists),
                                   }}
                            >{taskStatus.name}</Badge>
                        </SelectTrigger>
                        <SelectContent className={'w-full '}>
                            <div className={'max-h-72 flex flex-col'}>
                                <ScrollArea className={'flex-1 overflow-y-auto scrollbar'}>
                                    {statusLists?.map(
                                        (item) => (<SelectItem key={item.name} value={item.name}
                                                               className={'text-gray-400'}>
                                                <Badge variant="outline" className={`p-[0.2rem]  w-full`}
                                                       style={{
                                                           borderColor: item.color,
                                                           color: item.color,
                                                           fontSize: "12px"
                                                       }}
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
            {!isCreateMode && (<div className={'flex items-center gap-6 text-xs'}>
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
                        <div
                            className="inline-flex border border-gray-300 rounded overflow-hidden text-xs text-gray-700">
                            <div className={`px-2 h-6 flex items-center justify-center ${colorMap[type]}`}>
                                {type}
                            </div>
                            <div className="w-px bg-gray-300"/>
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
            </div>)}
            <div className={' flex-1 '}>
                <Editor isCreateMode={isCreateMode}/>
            </div>
            {isCreateMode && <Button className={'ml-auto'}>Add Task</Button>}
        </div>
    </>
}

export default TaskEditor;