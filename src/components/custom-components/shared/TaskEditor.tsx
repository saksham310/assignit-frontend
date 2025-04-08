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
    task?: any;
    status?:any;
    members?:any;
}

const TaskEditor = ({isCreateMode = true,task,status,members}: TaskEditorType) => {
    const statusLists = status
    const [taskStatus, setTaskStatus] = useState(task?.status ?? statusLists[0]);

    const handleStatusChange = (value: string) => {
        const newStatus = statusLists.find(status => status.name === value)
        if (newStatus) {
            setTaskStatus(newStatus)
        }
        console.log(taskStatus)
    }

    const [bugCounts, setBugCounts] = useState<Record<BugType, number>>({
        frontend: task?.FrontendBugCount ?? 0,
        backend: task?.BackendBugCount ?? 0,
        database: task?.DatabaseBugCount ?? 0,})
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

    const membersList = members
    const assignedMembersList = task?.assignees.map(assignee => assignee.id as string) ?? [];
    const [selectedMembers, setSelectedMembers] = useState(assignedMembersList ?? []);

    const handleAssigneeChange = (value: string[]) => {
        setSelectedMembers(value);
    }

    const [priority,setPriority] = useState<string>('High')
    const value = task?.name ?? ''
    const initialValue = task?.description ?? ''

    return <>
        <div className={cn('col-span-2  flex flex-col gap-4 p-2 overflow-y-auto', {"h-[520px]": isCreateMode})}>
            <Input defaultValue={value} className={'w-full font-medium border-none shadow-none bg-gray-50 placeholder:font-normal '}
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
                    <PrioritySwitcher value={priority} onChange={setPriority}/>
                </div>
                <div className={' gap-2 text-xs flex items-center'}>
                    <div className={'flex items-center gap-1'}>
                        <User className={'w-4 h-4'}/>
                        Assignees:
                    </div>
                    <MultiSelect
                        options={membersList}
                        onValueChange={handleAssigneeChange}
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
                <Editor isCreateMode={isCreateMode} initialValue={initialValue}/>
            </div>
            {isCreateMode && <Button className={'ml-auto'}>Add Task</Button>}
        </div>
    </>
}

export default TaskEditor;