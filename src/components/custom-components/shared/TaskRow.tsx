import { priorityFlagMap} from "@/lib/utils.ts";
import {Badge} from "@/components/ui/badge.tsx";
import {AlertCircle, FlagIcon} from "lucide-react";
import {useDialogStore} from "@/store/dialog.store.ts";
import TaskDetailPage from "@/pages/TaskDetailPage.tsx";
import {MultiSelect} from "@/components/ui/multi-select.tsx";
import {useState} from "react";
import PrioritySwitcher from "@/components/custom-components/shared/PrioritySwitcher.tsx";


interface TaskRowProps {
    taskName: string;
    assignees: [{id:string,username:string,image :string,avatarColor:string}];
    bugCount: number;
    priority: string;
}
const TaskRow = ({ taskName, assignees, bugCount, priority }:TaskRowProps) => {
   const maxCount = 3;
    const setOpen = useDialogStore(state => state.openDialog)
   const openTaskDetailPage = () =>{
setOpen(TaskDetailPage)
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
                <Badge variant={'outline'} className={'border-red-500 font-normal inline-flex items-center gap-1 bg-red-50 text-red-700 w-fit h-[24px] '}>
                    <AlertCircle className="size-4"/>
                    <span>{bugCount} {bugCount > 1 ? "Bugs" : "Bug"}</span>
                </Badge>
                <PrioritySwitcher/>
            </div>
        </>
    )
}

export default TaskRow;