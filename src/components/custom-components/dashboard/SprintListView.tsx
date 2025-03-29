import TaskListAccordion from "@/components/custom-components/shared/TaskListAccordion.tsx";

const taskStatus = [
    {name:'Completed', type:'Completed', color : '#008844' },
    {name:'In Progress', type:'In_Progress', color : '#f9d171' },
    {name:'To Do', type:'To_Do', color : '#90a9d0' },
]
const SprintListView = () => {
    return <>
        <div className={'flex flex-col gap-0.5'}>
            {taskStatus.map((task) => (
                <TaskListAccordion task={task}/>
            ))}
        </div>
    </>
}

export default SprintListView;