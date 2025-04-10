// 1. Imports
import {useEffect, useRef, useState} from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ScrollArea} from "@/components/ui/scroll-area";
import {MultiSelect} from "@/components/ui/multi-select.tsx";
import { AlertCircle, Bug, FlagIcon, User } from "lucide-react";
import PrioritySwitcher from "@/components/custom-components/shared/PrioritySwitcher.tsx";
import Editor from "@/editor/Editor.tsx";
import { useCreateTask } from "@/hooks/task.hooks.ts";
import { BugType, bugTypes, TaskPayload } from "@/types/project.types.ts";
import { cn, colorMap, getStatusColor } from "@/lib/utils.ts";

// 2. Props Interface
interface TaskEditorType {
    isCreateMode: boolean;
    task?: any;
    status?: any;
    members?: any;
}

// 3. Component
const TaskEditor = ({ isCreateMode = true, task, status, members }: TaskEditorType) => {
    const statusLists = status;
    const { sprintId } = useParams();

    // 4. Refs & States
    const inputRef = useRef<HTMLInputElement>(null);
    const [taskStatus, setTaskStatus] = useState(task?.status ?? statusLists[0]);
    const [priority, setPriority] = useState<string>('High');
    const [initialValue, setInitialValue] = useState(task?.description);
    const [selectedMembers, setSelectedMembers] = useState(
        task?.assignees?.map(assignee => assignee.id as string) ?? []
    );
    const [bugCounts, setBugCounts] = useState<Record<BugType, number>>({
        frontend: task?.FrontendBugCount ?? 0,
        backend: task?.BackendBugCount ?? 0,
        database: task?.DatabaseBugCount ?? 0,
    });
    useEffect(() => {
        if (task?.description) {
            setInitialValue(task.description);
        }
    }, [task]);

    // 5. Hooks
    const { mutate } = useCreateTask();

    // 6. Handlers
    const handleStatusChange = (value: string) => {
        const newStatus = statusLists.find(status => status.name === value);
        if (newStatus) setTaskStatus(newStatus);
    };

    const handleAssigneeChange = (value: string[]) => setSelectedMembers(value);

    const incrementBug = (type: BugType) =>
        setBugCounts(prev => ({ ...prev, [type]: prev[type] + 1 }));

    const decrementBug = (type: BugType) =>
        setBugCounts(prev => ({ ...prev, [type]: Math.max(0, prev[type] - 1) }));

    const createTask = () => {
        if (!inputRef.current?.value) {
            toast.error("Please enter the task name", { duration: 2000 });
            return;
        }

        const data: TaskPayload = {
            name: inputRef.current.value,
            description: initialValue,
            assignees: selectedMembers,
            status: taskStatus.id,
            priority,
            sprint_id: sprintId ?? '',
        };

        mutate(data);
    };

    // 7. JSX Render
    return (
        <div
            className={cn(
                'col-span-2 bg-white rounded-lg flex flex-col gap-6 p-2 overflow-y-auto',
                { 'h-[520px]': isCreateMode }
            )}
        >
            <Input
                ref={inputRef}
                defaultValue={task?.name ?? ''}
                className="w-full font-medium border-none shadow-none hover:bg-gray-50 placeholder:font-normal"
                style={{ fontSize: isCreateMode ? "14px" : "1.1em" }}
                placeholder="Give your task a name"
                required
            />

            <div className="border-b grid grid-cols-2 gap-2 text-xs">
                {/* Status */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" /> Status:
                    </div>
                    <Select value={taskStatus.name} onValueChange={handleStatusChange}>
                        <SelectTrigger className="w-fit md:min-w-[170px] border-none shadow-none flex items-center gap-1">
                            <div className="flex items-center gap-2">
                                <span
                                    className="size-4 border-2 rounded-full flex items-center justify-center"
                                    style={{ borderColor: getStatusColor(taskStatus.name, statusLists) }}
                                >
                                    <span
                                        className="rounded-full size-2"
                                        style={{ backgroundColor: getStatusColor(taskStatus.name, statusLists) }}
                                    ></span>
                                </span>
                                <span>{taskStatus.name}</span>
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <ScrollArea className="max-h-72">
                                {statusLists.map(item => (
                                    <SelectItem key={item.name} value={item.name} className="text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <span
                                                className="size-4 border-2 rounded-full flex items-center justify-center"
                                                style={{ borderColor: item.color }}
                                            >
                                                <span
                                                    className="rounded-full size-2"
                                                    style={{ backgroundColor: item.color }}
                                                ></span>
                                            </span>
                                            <span>{item.name}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </ScrollArea>
                        </SelectContent>
                    </Select>
                </div>

                {/* Priority */}
                <div className="flex items-center gap-2">
                    <FlagIcon className="w-4 h-4" />
                    Priority:
                    <PrioritySwitcher value={priority} onChange={setPriority} />
                </div>

                {/* Assignees */}
                <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Assignees:
                    <MultiSelect
                        options={members}
                        onValueChange={handleAssigneeChange}
                        defaultValue={selectedMembers}
                        placeholder="Unassigned"
                        maxCount={2}
                    />
                </div>
            </div>

            {/* Bug Section */}
            {!isCreateMode && (
                <div className="flex items-center gap-6 text-xs">
                    <div className="flex items-center gap-1">
                        <Bug className="h-4 w-4" /> Bug Cycle:
                    </div>
                    {bugTypes.map(type => (
                        <div key={type} className="inline-flex items-center gap-1">
                            <button
                                onClick={() => decrementBug(type)}
                                disabled={bugCounts[type] === 0}
                                className="h-6 w-6 flex items-center justify-center rounded-l-md border bg-slate-50 hover:bg-slate-100 disabled:opacity-50"
                            >
                                -
                            </button>
                            <div className="inline-flex border border-gray-300 rounded overflow-hidden">
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
                                className="h-6 w-6 flex items-center justify-center rounded-r-md border bg-slate-50 hover:bg-slate-100"
                            >
                                +
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Editor */}
            <div className="flex-1">
                <Editor isCreateMode={isCreateMode} initialValue={initialValue} onChange={setInitialValue} />
            </div>

            {/* Action */}
            {isCreateMode && <Button className="ml-auto" onClick={createTask}>Add Task</Button>}
        </div>
    );
};

export default TaskEditor;
