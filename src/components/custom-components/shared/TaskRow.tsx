import {Badge} from "@/components/ui/badge.tsx";
import {Bug} from "lucide-react";
import {MultiSelect} from "@/components/ui/multi-select.tsx";
import {useState} from "react";
import PrioritySwitcher from "@/components/custom-components/shared/PrioritySwitcher.tsx";
import {useNavigate} from "react-router-dom";
import {useUpdateTask} from "@/hooks/task.hooks.ts";


interface TaskRowProps {
    taskId: number;
    taskName: string;
    assignees: [{ id: string, username: string, image: string, avatarColor: string }];
    bugCount: number;
    priority: string;
    members?: any;
}

const TaskRow = ({taskId,taskName, assignees, bugCount, priority,members}: TaskRowProps) => {
    const maxCount = 3;
    const navigate = useNavigate();
    const [priorityStatus, setPriority] = useState<string>(priority)
    const openTaskDetailPage = () => {
        navigate(`tasks-details/${taskId}`);
    }
    const assignedMembersList = assignees.map(assignee => assignee.id as string) ?? [];
    const [selectedMembers, setSelectedMembers] = useState(assignedMembersList ?? []);
    const {mutate: updateTask} = useUpdateTask();

    const handleAssigneeChange = (value: string[]) => {
        const previousMembers = selectedMembers;
        setSelectedMembers(value);
            updateTask({
                id: taskId.toString(),
                data: {
                    assignees: value,
                },
            }, {
                onError: () => {
                    setSelectedMembers(previousMembers);
                },
            });
    };
    const handlePriorityChange = (value: string) => {
        const previousPriority = priority;
        setPriority(value);

            updateTask({
                id: taskId.toString(),
                data: {
                    priority: value,
                },
            },{
                onError: () => {
                    setPriority(previousPriority);
                }
            })
    }
    return (
        <>
            <div className={'grid grid-cols-4 gap-2 border-b p-2 text-xs items-center'} onDoubleClick={openTaskDetailPage}>
                <span className={'text-xs text-nowrap overflow-hidden overflow-ellipsis'}
                title={taskName}>{taskName}</span>
                <MultiSelect
                    options={members}
                    onValueChange={handleAssigneeChange}
                    defaultValue={selectedMembers}
                    placeholder="Unassigned"
                    maxCount={maxCount}
                />
                <Badge variant={'outline'}
                       className={'border-red-500 font-normal inline-flex items-center gap-1 bg-red-50 text-red-700 w-fit h-[24px] '}>
                    <Bug className="size-4"/>
                    <span>{bugCount} {bugCount > 1 ? "Bugs" : "Bug"}</span>
                </Badge>
                <PrioritySwitcher value={priorityStatus} onChange={handlePriorityChange}/>
            </div>
        </>
    )
}

export default TaskRow;