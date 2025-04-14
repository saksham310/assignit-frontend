import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";
import { useEffect, useState, useRef } from "react";
import KanbanColumn from "@/components/custom-components/shared/KanbanColumn.tsx";
import TaskCard from "@/components/custom-components/shared/TaskCard.tsx";
import { io } from "socket.io-client";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { User } from "@/types/auth.type.ts";

// Socket URL for your backend
const SOCKET_URL = "http://localhost:8080";

interface KanbanBoardProps {
    tasks: any;
}

const KanbanBoard = ({ tasks }: KanbanBoardProps) => {
    const [taskStatus, setTaskStatus] = useState(tasks.taskStatus);
    const [activeTask, setActiveTask] = useState<null | any>(null);
    const socketRef = useRef<any>(null); // Use a ref for the socket connection
    const user = useAuthUser<User>();

    useEffect(() => {
        // Initialize socket connection once
        socketRef.current = io(SOCKET_URL);

        // Listen for task-status-updated event
        socketRef.current.on("task-status-updated", (data) => {
            const {taskId, newStatus} = data;
            handleStatusChange(taskId, newStatus)
        })
            // Cleanup the socket connection on component unmount
            return () => {
                socketRef.current.disconnect();
            };
    }, []);

    // Handle drag start (when a user starts dragging a task)
    const handleDragStart = (event: any) => {
        const taskId = event.active.id;
        const task = taskStatus
            .flatMap((col) => col.tasks)
            .find((t) => t.id === taskId);
        setActiveTask(task);
    };

    // Handle drag end (when a task is dropped)
    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e;
        if (!over) return; // Do nothing if there's no target

        const taskId = active.id as number;
        const newStatus = over.id as string;
        handleStatusChange(taskId, newStatus);

        // Emit the task status update to the backend
        if (socketRef.current && user) {
            const userId = user.id;
            socketRef.current.emit("update-task-status", { taskId, newStatus, userId });
        }

        setActiveTask(null);
    };
    const handleStatusChange = (taskId,newStatus) =>{
        const column = taskStatus.find((col) =>
            col.tasks.some((task) => task.id === taskId)
        );
        if (!column) return;

        const taskToMove = column.tasks.find((task) => task.id === taskId);
        if (!taskToMove) return;

        column.tasks = column.tasks.filter((task) => task.id !== taskId);
        const targetColumn = taskStatus.find((col) => col.id === newStatus);

        if (targetColumn) {
            targetColumn.tasks.push(taskToMove);
        }
        setTaskStatus([...taskStatus]);

    }
    return (
        <div className="overflow-x-auto p-2">
            <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} autoScroll={true}>
                <div className="flex p-3">
                    {taskStatus.map((task, index) => (
                        <div className="flex-shrink-0 w-[345px] mr-1" key={index}>
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
