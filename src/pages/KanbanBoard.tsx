import KanbanColumn from "@/components/custom-components/shared/KanbanColumn.tsx";
import {DndContext, DragEndEvent, DragOverlay} from "@dnd-kit/core";
import { useState} from "react";
import TaskCard from "@/components/custom-components/shared/TaskCard.tsx";


interface KanbanBoardProps {
    tasks: any
}
const KanbanBoard = ({tasks}:KanbanBoardProps) => {
    const [taskStatus, setTaskStatus] = useState(tasks.taskStatus);
    const [activeTask, setActiveTask] = useState<null | any>(null);

    const handleDragStart = (event: any) => {
        const taskId = event.active.id;
        const task = taskStatus
            .flatMap(col => col.tasks)
            .find(t => t.id === taskId);
        setActiveTask(task);
    };
    const handleDragEnd = (e:DragEndEvent)=>{
       const {active,over} = e;
       if (!over) return;
       const taskId = active.id as number;
       const newStatus = over.id as string;
       const column = taskStatus.find(col =>
       col.tasks.some(task => task.id === taskId))
        if (!column) return;
        const taskToMove = column.tasks.find((task) => task.id === taskId);
        if (!taskToMove) return;
        column.tasks = column.tasks.filter((task) => task.id !== taskId);
        const targetColumn = taskStatus.find((col) => col.name === newStatus);

        if (targetColumn) {
            targetColumn.tasks.push(taskToMove);
        }
        setTaskStatus([...taskStatus]);
        setActiveTask(null);
    }


    return <>
    <div  className={'overflow-x-auto p-2 '}>
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} >
            <div className="grid grid-cols-4 gap-3">
                {taskStatus.map((task) => {
                    return (
                        <div className="" key={task.type}>
                            <KanbanColumn status={task} />
                        </div>
                    );
                })}
            </div>
            <DragOverlay>
                {activeTask ? (
                    <TaskCard
                        task={activeTask}
                    />
                ) : null}
            </DragOverlay>
        </DndContext>
    </div>
    </>
}

export default KanbanBoard;