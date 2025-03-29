import KanbanColumn from "@/components/custom-components/shared/KanbanColumn.tsx";
import {DndContext, DragEndEvent} from "@dnd-kit/core";
import {useState} from "react";


const initialTaskStatus = [
    {
        name: 'Completed',
        type: 'Completed',
        color: '#008844',
        tasks: [
            {   id:1,
                name: 'Implement authentication',
                assignees: [
                    { id: "1", name: "Saksham Sharma", image: "path_to_image.jpg", avatarColor: '#A7C7FF' }
                ],
                bugCount: 0,
                priority: 'Low'
            },
            {
                id:2,
                name: 'Optimize database queries',
                assignees: [
                    { id: "2", name: "Jane Smith", image: "", avatarColor: '#FFB3B3' }
                ],
                bugCount: 0,
                priority: 'Medium'
            }
        ]
    },
    {
        name: 'In Progress',
        type: 'In_Progress',
        color: '#f9d171',
        tasks: [
            {   id:3,
                name: 'Create dashboard UI',
                assignees: [
                    { id: "3", name: "Dean Kyle", image: "path_to_image.jpg", avatarColor: '#A7C72F' }
                ],
                bugCount: 2,
                priority: 'High'
            },
            {
                id:4,
                name: 'Fix API endpoint bugs',
                assignees: [
                    { id: "1", name: "Saksham Sharma", image: "path_to_image.jpg", avatarColor: '#A7C7FF' },
                    { id: "4", name: "Roman Guy", image: "", avatarColor: '#FFB3B3' },
                    { id: "2", name: "Jane Smith", image: "", avatarColor: '#FFB3B3' },
                    { id: "3", name: "Dean Kyle", image: "path_to_image.jpg", avatarColor: '#A7C72F' }
                ],
                bugCount: 1,
                priority: 'High'
            }
        ]
    },
    {
        name: 'To Do',
        type: 'To_Do',
        color: '#90a9d0',
        tasks: [
            {   id:5,
                name: 'Set up CI/CD pipeline',
                assignees: [
                    { id: "4", name: "Roman Guy", image: "", avatarColor: '#FFB3B3' }
                ],
                bugCount: 1,
                priority: 'Medium'
            },
            {
                id:6,
                name: 'Write unit tests',
                assignees: [
                    { id: "2", name: "Jane Smith", image: "", avatarColor: '#FFB3B3' }
                ],
                bugCount: 0,
                priority: 'Low'
            }
        ]
    },
    {
        name: 'Halted',
        type: 'Halted',
        color: '#90a9d0',
        tasks: [
            {   id:7,
                name: 'System Optimization',
                assignees: [
                    { id: "4", name: "Roman Guy", image: "", avatarColor: '#FFB3B3' }
                ],
                bugCount: 1,
                priority: 'Medium'
            },
            {
                id:8,
                name: 'Write unit cases',
                assignees: [
                    { id: "2", name: "Jane Smith", image: "", avatarColor: '#FFB3B3' }
                ],
                bugCount: 0,
                priority: 'Low'
            }
        ]
    }
];

const KanbanBoard = () => {
    const [taskStatus, setTaskStatus] = useState(initialTaskStatus);
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
    }
    return <>
    <div className={'grid grid-cols-1 gap-2 md:grid-cols-3 p-1 '}>
        <DndContext onDragEnd={handleDragEnd} >
        {taskStatus.map((task)=>{
            return (
               <KanbanColumn status={task}/>
            )
        })}
        </DndContext>
    </div>
    </>
}

export default KanbanBoard;