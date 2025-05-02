import TaskListAccordion from "@/components/custom-components/shared/TaskListAccordion.tsx";
import {SprintWithTask} from "@/types/project.types.ts";
import {Separator} from "@/components/ui/separator";

interface  SprintListViewProps {
    sprint?: SprintWithTask;
    members?: any;
}

const SprintListView = ({sprint,members}:SprintListViewProps) => {
    const tasks = sprint?.taskStatus ?? [];
    return <>
        <div className={'flex flex-col space-y-4 p-2'}>
            {tasks.map((task) => (
                <div key={task.id}>
                    <TaskListAccordion task={task} members={members}/>
                
                </div>
            ))}
        </div>
    </>
}

export default SprintListView;