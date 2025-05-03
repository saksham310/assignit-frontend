// 1. Imports
import {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {toast} from "sonner";
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
import {AlertCircle, Bug, FlagIcon, User} from "lucide-react";
import PrioritySwitcher from "@/components/custom-components/shared/PrioritySwitcher.tsx";
import Editor from "@/editor/Editor.tsx";
import {useCreateTask, useUpdateTask} from "@/hooks/task.hooks.ts";
import {BugType, bugTypes, TaskPayload} from "@/types/project.types.ts";
import {cn, colorMap, getStatusColor} from "@/lib/utils.ts";

// 2. Props Interface
interface TaskEditorType {
    isCreateMode: boolean;
    task?: any;
    status?: any;
    members?: any;
}

// 3. Component
const TaskEditor = ({isCreateMode = true, task, status, members}: TaskEditorType) => {
    const statusLists = status;
    const {sprintId} = useParams();

    // 4. Refs & States
    const inputRef = useRef<HTMLInputElement>(null);
    const [taskStatus, setTaskStatus] = useState(task?.status ?? '');
    const [priority, setPriority] = useState<string>('High');
    const [initialValue, setInitialValue] = useState(task?.description ?? '');
    const [selectedMembers, setSelectedMembers] = useState(
        task?.assignees?.map(assignee => assignee.id as string) ?? []
    );
    const [bugCounts, setBugCounts] = useState<Record<BugType, number>>({
        frontend: task?.FrontendBugCount ?? 0,
        backend: task?.BackendBugCount ?? 0,
        database: task?.DatabaseBugCount ?? 0,
    });
    const totalBugs = bugTypes.reduce((acc, type) => acc + bugCounts[type], 0);

    useEffect(() => {
        if (task?.description) {
            setInitialValue(task.description);
        }
        if (task?.status) {
            setTaskStatus(task.status);
        }
        if (task?.assignees) {
            setSelectedMembers(task.assignees.map(assignee => assignee.id));
        }
    }, [task]);

    // 5. Hooks
    const {mutate} = useCreateTask();
    const {mutate: updateTask} = useUpdateTask();

    // 6. Handlers
    const handleStatusChange = (value: string) => {
        const newStatus = statusLists.find(status => status.name === value);
        if (!newStatus) return;

        const previousStatus = taskStatus;
        setTaskStatus(newStatus);

        if (!isCreateMode) {
            updateTask({
                id: task.id,
                data: {
                    status_id: newStatus.id,
                },
            }, {
                onError: () => {
                    setTaskStatus(previousStatus);
                },
            });
        }
    };

    const handleAssigneeChange = (value: string[]) => {
        const previousMembers = selectedMembers;
        setSelectedMembers(value);

        if (!isCreateMode) {
            updateTask({
                id: task.id,
                data: {
                    assignees: value,
                },
            }, {
                onError: () => {
                    setSelectedMembers(previousMembers);
                },
            });
        }
    };

    const handlePriorityChange = (value: string) => {
        const previousPriority = priority;
        setPriority(value);
        if (!isCreateMode) {
            updateTask({
                id: task.id,
                data: {
                    priority: value,
                },
            },{
                onError: () => {
                    setPriority(previousPriority);
                }
            })
        }
    }

    const handleDescriptionChange = (value: string) => {
      if ( initialValue == value) return;
        const previousDescription = initialValue;
        setInitialValue(value);
        if (!isCreateMode) {
            updateTask({
                id:task.id,
                data: {
                    description: value,
                }
            },{
                onError: () => {
                    setInitialValue(previousDescription);
                }
            })
        }

    }

    const handleInputChange = (value: string) => {
        if (isCreateMode || !value.trim()) return;
        toast.error("Please enter the task name", {duration: 2000, id: 'task-detail-name'});

        updateTask({
            id: task.id,
            data: {
                name: value,
            },
        });
    };

    const incrementBug = (type: BugType) => {
        const previousCount = bugCounts[type];

        setBugCounts(prev => ({...prev, [type]: prev[type] + 1}));

        updateTask({
            id: task.id,
            data: {
                [`${type}BugCount`]: previousCount + 1, // dynamic key
            },
        }, {
            onError: () => {
                setBugCounts(prev => ({...prev, [type]: previousCount}));
            },
        });
    };

    const decrementBug = (type: BugType) => {
        const previousCount = bugCounts[type];

        setBugCounts(prev => ({...prev, [type]: prev[type] - 1}));

        updateTask({
            id: task.id,
            data: {
                [`${type}BugCount`]: previousCount - 1, // dynamic key
            },
        }, {
            onError: () => {
                setBugCounts(prev => ({...prev, [type]: previousCount}));
            },
        });
    };

    const createTask = () => {
        if (!inputRef.current?.value.trim()) {
            toast.error("Please enter the task name", {duration: 2000, id: 'task-detail-name'});
            return;
        }

        const data: TaskPayload = {
            name: inputRef.current.value,
            description: initialValue,
            assignees: selectedMembers,
            status_id: taskStatus.id,
            priority,
            sprint_id: sprintId ?? '',
        };

        mutate(data);
    };

    // 7. JSX Render
    return (
        <div
            className={cn(
                'col-span-2 bg-white rounded-lg flex flex-col gap-4 p-2 overflow-y-auto',
                {'h-[520px]': isCreateMode}
            )}
        >
            <Input
                ref={inputRef}
                defaultValue={task?.name ?? ''}
                className="w-full font-medium border-none shadow-none hover:bg-gray-50 placeholder:font-normal"
                style={{fontSize: isCreateMode ? "14px" : "1.1em"}}
                placeholder="Give your task a name"
                required onBlur={(e) => handleInputChange(e.target.value.trim())}
            />

            <div className="border-b grid grid-cols-2 gap-2 text-xs">
                {/* Status */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <AlertCircle className="h-4 w-4"/> Status:
                    </div>
                    <Select value={taskStatus.name} onValueChange={handleStatusChange} >
                        <SelectTrigger
                            className="w-fit md:min-w-[170px] border-none shadow-none flex items-center gap-1">
                            <div className="flex items-center gap-2 text-xs">
                                <span
                                    className="size-4 border-2 rounded-full flex items-center justify-center"
                                    style={{borderColor: getStatusColor(taskStatus.name, statusLists)}}
                                >
                                    <span
                                        className="rounded-full size-2"
                                        style={{backgroundColor: getStatusColor(taskStatus.name, statusLists)}}
                                    ></span>
                                </span>
                                <span>{taskStatus.name}</span>
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <ScrollArea className="max-h-72">
                                {statusLists.map(item => (
                                    <SelectItem key={item.name} value={item.name} className="text-gray-400">
                                        <div className="flex items-center gap-2 text-xs">
                                            <span
                                                className="size-4 border-2 rounded-full flex items-center justify-center"
                                                style={{borderColor: item.color}}
                                            >
                                                <span
                                                    className="rounded-full size-2"
                                                    style={{backgroundColor: item.color}}
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
                    <FlagIcon className="w-4 h-4"/>
                    Priority:
                    <PrioritySwitcher value={priority} onChange={handlePriorityChange}/>
                </div>

                {/* Assignees */}
                <div className="flex items-center gap-2">
                    <User className="w-4 h-4"/>
                    Assignees:
                    <MultiSelect
                        options={members}
                        onValueChange={handleAssigneeChange}
                        defaultValue={selectedMembers}
                        placeholder="Unassigned"
                        maxCount={2}
                    />
                </div>
                <div className="flex items-center gap-2 text-red-700">
                    <Bug className="w-4 h-4"/>
                    Bug Count:
                    <span>{totalBugs} {totalBugs === 1 ? "Bug" : "Bugs"}</span>
                </div>

            </div>

            {/* Bug Section */}
            {!isCreateMode && (
                <div className="flex items-center gap-6 text-xs">
                    <div className="flex items-center gap-1">
                        <Bug className="h-4 w-4"/> Bug Cycle:
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
                                <div className="w-px bg-gray-300"/>
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
                <Editor isCreateMode={isCreateMode} initialValue={initialValue} onChange={handleDescriptionChange}/>
            </div>

            {/* Action */}
            {isCreateMode && <Button className="ml-auto" onClick={createTask}>Add Task</Button>}
        </div>
    );
};

export default TaskEditor;
