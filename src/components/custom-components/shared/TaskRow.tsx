import UserAvatar from "@/components/custom-components/shared/UserAvatar.tsx";
import {cn} from "@/lib/utils.ts";
import {Badge} from "@/components/ui/badge.tsx";
import {AlertCircle} from "lucide-react";


interface TaskRowProps {
    taskName: string;
    assignees: [{name:string,image :string,avatarColor:string}];
    bugCount: number;
    priority: string;
}
const TaskRow = ({ taskName, assignees, bugCount, priority }:TaskRowProps) => {
   const maxCount = 3;
    return (
        <>
            <div className={'grid grid-cols-4 border-b p-2'}>
                <span>{taskName}</span>
                <div className="flex flex-wrap items-center gap-0.5 ">
                    {assignees.slice(0, maxCount).map((value) => {
                        return (

                            <UserAvatar
                                name={value?.name || ""}
                                src={value?.image}
                                className={`h-6 w-6 text-black`}
                                avatarColor={value?.avatarColor}
                            />
                        );
                    })}
                    {assignees.length > maxCount && (
                        <span
                            className={cn(
                                "bg-transparent text-gray-500 border-foreground/1 hover:bg-transparent  font-normal text-xs",
                            )}
                        >
                                            {`+ ${assignees.length - maxCount}`}
                                        </span>
                    )}
                </div>
                <Badge variant={'outline'} className={'border-red-500 font-normal inline-flex items-center gap-1 bg-red-50 text-red-700 w-fit '}>
                    <AlertCircle className="size-4"/>
                    <span>{bugCount} {bugCount > 1 ? "Bugs" : "Bug"}</span>
                </Badge>
                <span>{priority}</span>
            </div>
        </>
    )
}

export default TaskRow;