import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";
import { useEffect, useState, useRef } from "react";
import KanbanColumn from "@/components/custom-components/shared/KanbanColumn.tsx";
import TaskCard from "@/components/custom-components/shared/TaskCard.tsx";
import { io } from "socket.io-client";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { User } from "@/types/auth.type.ts";
import { SprintWithTask, TaskStatus } from "@/types/project.types.ts";

const SOCKET_URL = "https://dashboard.render.com/web/srv-d0ljibbuibrs73aco100/deploys/dep-d0lk143e5dus73cll92g";

interface KanbanBoardProps {
    tasks: SprintWithTask;
}

const KanbanBoard = ({ tasks }: KanbanBoardProps) => {
    const [taskStatus, setTaskStatus] = useState(tasks.taskStatus);
    const [activeTask, setActiveTask] = useState<null | any>(null);
    const socketRef = useRef<any>(null);
    const user = useAuthUser<User>();

    useEffect(() => {
        socketRef.current = io(SOCKET_URL);

        socketRef.current.on("task-status-updated", (data) => {
            const { taskId, newStatus } = data;
            handleStatusChange(taskId, newStatus);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const handleDragStart = (event: any) => {
        const taskId = event.active.id;
        const task = taskStatus
            .flatMap((col) => col.tasks)
            .find((t) => t.id === taskId);
        setActiveTask(task);
    };

    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e;
        if (!over) return;

        const taskId = active.id as number;
        const newStatus = over.id as string;

        handleStatusChange(taskId, newStatus);

        if (socketRef.current && user) {
            const userId = user.id;
            socketRef.current.emit("update-task-status", { taskId, newStatus, userId });
        }

        setActiveTask(null);
    };

    const handleStatusChange = (taskId: number, newStatus: string) => {
        const clonedStatus = [...taskStatus];

        const column = clonedStatus.find((col) =>
            col.tasks.some((task) => task.id === taskId)
        );
        if (!column) return;

        const taskToMove = column.tasks.find((task) => task.id === taskId);
        if (!taskToMove) return;

        column.tasks = column.tasks.filter((task) => task.id !== taskId);

        const targetColumn = clonedStatus.find((col) => col.id === newStatus);
        if (targetColumn) {
            targetColumn.tasks.push(taskToMove);
        }

        setTaskStatus(clonedStatus);
    };

    return (
        <div className="overflow-x-auto p-2">
            <DndContext
                onDragEnd={handleDragEnd}
                onDragStart={handleDragStart}
                autoScroll={true}
            >
                <div className="flex p-3">
                    {taskStatus.map((task) => (
                        <div
                            className="flex-shrink-0 w-[345px] mr-1"
                            key={task.id}
                        >
                            <KanbanColumn status={task} />
                        </div>
                    ))}
                </div>
                <DragOverlay>
                    {activeTask ? <TaskCard task={activeTask} /> : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
};

export default KanbanBoard;
