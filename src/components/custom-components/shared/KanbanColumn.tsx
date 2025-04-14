import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge";
import TaskCard from "@/components/custom-components/shared/TaskCard.tsx";
import { useDroppable } from "@dnd-kit/core";

interface KanbanColumnProps {
    status: any;
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
                <Badge
                    variant="outline"
                    className="border-2 w-fit font-medium"
                    style={{ borderColor: status.color }}
                >
                    {status.name}
                </Badge>
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
