import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge";
import TaskCard from "@/components/custom-components/shared/TaskCard.tsx";
import { useDroppable } from "@dnd-kit/core";
import { TaskStatus } from "@/types/project.types.ts";

interface KanbanColumnProps {
    status: TaskStatus;
}

const KanbanColumn = ({ status }: KanbanColumnProps) => {
    const { setNodeRef } = useDroppable({
        id: status.id,
    });

    return (
        <Card
            ref={setNodeRef}
            className="shadow-none flex flex-col h-[calc(100vh-280px)] border-primary/900 bg-primary/5"
        >
            <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
            <span className={'size-4 border-2 rounded-full flex items-center justify-center'} 
                                          style={{borderColor:status.color}}>
                                        <span className={'rounded-full size-2'} 
                                              style={{backgroundColor:status.color}}></span>
                                    </span>
                                    <span className={'text-xs font-medium'}>{status.name}</span>
            </div>
        
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto overflow-x-hidden p-2">
                <div className="flex flex-col gap-4">
                    {status.tasks.map((task: any) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default KanbanColumn;
