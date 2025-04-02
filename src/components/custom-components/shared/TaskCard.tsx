import {Card, CardFooter,CardTitle,CardContent,CardHeader} from "@/components/ui/card.tsx";
import {AlertCircle, Flag, FlagIcon} from "lucide-react";
import UserAvatar from "@/components/custom-components/shared/UserAvatar.tsx";
import {cn, priorityFlagMap} from "@/lib/utils.ts";
import {useDraggable} from "@dnd-kit/core";
import {useDialogStore} from "@/store/dialog.store.ts";
import TaskDetailPage from "@/pages/TaskDetailPage.tsx";


interface TaskCardProps {
    task:any
}
const TaskCard = ({task}:TaskCardProps) =>{
    const maxCount = 3
    const setOpen = useDialogStore(state => state.openDialog)
    const openTaskDetailPage = () =>{
        setOpen(TaskDetailPage)
    }
    const flagColor = priorityFlagMap[task.priority.toLowerCase()];
    const {attributes,listeners,setNodeRef,transform} = useDraggable({
        id: task.id,
    })
    const style = transform ? {
        transform :`translate(${transform.x}px,${transform.y}px)`
    }: undefined
    return (
        <Card  ref={setNodeRef} {...listeners} {...attributes} onDoubleClick={openTaskDetailPage}
               className={`cursor-grab shadow-none `}
        style={style}>
            <CardHeader className="p-3 pb-0 flex flex-col">
                <span className={' flex text-xs font-medium items-center gap-1'}
                      style={{
                          color: flagColor
                      }}>
                    <FlagIcon size={'12'}/> {task.priority}</span>
                <CardTitle className="text-sm font-medium">{task.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-2 text-xs text-muted-foreground"></CardContent>
            <CardFooter className="flex items-center justify-between p-3 pt-0">
                <div className="flex flex-wrap items-center gap-0.5 ">
                    {task.assignees.slice(0, maxCount).map((value) => {
                        return (

                            <UserAvatar
                                name={value?.name || ""}
                                src={value?.image}
                                className={`h-5 w-5 text-black text-xs`}
                                avatarColor={value?.avatarColor}
                            />
                        );
                    })}
                    {task.assignees.length > maxCount && (
                        <span
                            className={cn(
                                "bg-transparent text-gray-500 border-foreground/1 hover:bg-transparent  font-normal text-xs",
                            )}
                        >
                                            {`+ ${task.assignees.length - maxCount}`}
                                        </span>
                    )}
                </div>
                <div className="flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    <span className="text-xs">
                        {task.bugCount} {task.bugCount > 1 ? "Bug" : "Bugs"}
          </span>
                </div>
            </CardFooter>
        </Card>
    )
}

export default TaskCard;