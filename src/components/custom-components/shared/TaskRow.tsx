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
            <div className={'grid grid-cols-4 min-w-[800px] gap-4 border-b p-3 text-xs items-center'}
                 style={{
                     gridTemplateColumns: '2fr 2fr 1fr 1fr'
                 }}
                 onDoubleClick={openTaskDetailPage}>
                <span className={'text-sm font-medium text-nowrap overflow-hidden overflow-ellipsis min-w-[200px]'}
                      title={taskName}>{taskName}</span>
                <div className="min-w-[200px]">
                    <MultiSelect
                        options={members}
                        onValueChange={handleAssigneeChange}
                        defaultValue={selectedMembers}
                        placeholder="Unassigned"
                        maxCount={maxCount}
                    />
                </div>
                <Badge variant={'outline'}
                      className={'border-red-500 font-normal inline-flex items-center gap-1.5 bg-red-50/50 text-red-700 w-fit h-[26px] px-3'}>
                    <Bug className="size-4"/>
                    <span>{bugCount} {bugCount > 1 ? "Bugs" : "Bug"}</span>
                </Badge>
                <div className="flex justify-start min-w-[120px]">
                    <PrioritySwitcher value={priorityStatus} onChange={handlePriorityChange}/>
                </div>
            </div>
        </>
    )
}

export default TaskRow;