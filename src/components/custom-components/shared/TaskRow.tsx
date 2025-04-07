import {Badge} from "@/components/ui/badge.tsx";
import {AlertCircle} from "lucide-react";
import {MultiSelect} from "@/components/ui/multi-select.tsx";
import {useState} from "react";
import PrioritySwitcher from "@/components/custom-components/shared/PrioritySwitcher.tsx";
import {useNavigate} from "react-router-dom";


interface TaskRowProps {
    taskName: string;
    assignees: [{ id: string, username: string, image: string, avatarColor: string }];
    bugCount: number;
    priority: string;
}

const TaskRow = ({taskName, assignees, bugCount, priority}: TaskRowProps) => {
    const maxCount = 3;
    const navigate = useNavigate();
    const [priorityStatus, setPriority] = useState<string>(priority)
    const openTaskDetailPage = () => {
        navigate('/test')
    }
    const [selectedMembers, setSelectedMembers] = useState<string[]>([])
    return (
        <>
            <div className={'grid grid-cols-4 border-b p-2 text-xs items-center'} onDoubleClick={openTaskDetailPage}>
                <span className={'text-xs'}>{taskName}</span>
                <MultiSelect
                    options={assignees}
                    onValueChange={setSelectedMembers}
                    defaultValue={selectedMembers}
                    placeholder="Unassigned"
                    maxCount={maxCount}
                />
                <Badge variant={'outline'}
                       className={'border-red-500 font-normal inline-flex items-center gap-1 bg-red-50 text-red-700 w-fit h-[24px] '}>
                    <AlertCircle className="size-4"/>
                    <span>{bugCount} {bugCount > 1 ? "Bugs" : "Bug"}</span>
                </Badge>
                <PrioritySwitcher value={priorityStatus} onChange={setPriority}/>
            </div>
        </>
    )
}

export default TaskRow;