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
        <div className={'flex flex-col '}>
            {tasks.map((task) => (
                <div><TaskListAccordion key={task.id} task={task} members={members}/><Separator/></div>
            ))}
        </div>
    </>
}

export default SprintListView;