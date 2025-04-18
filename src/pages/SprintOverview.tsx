import {TabConfig} from "@/types/dashboard.type.ts";
import TabLayoutWrapper from "@/components/custom-components/shared/TabLayoutWrapper.tsx";
import SprintListView from "@/components/custom-components/dashboard/SprintListView.tsx";
import {useOutletContext, useParams} from "react-router-dom";
import {useEffect} from "react";
import { PlusCircle} from "lucide-react";
import Loader from "@/components/custom-components/shared/Loader.tsx";
import { Button } from "@/components/ui/button";
import KanbanBoard from "@/pages/KanbanBoard.tsx";
import {useDialogStore} from "@/store/dialog.store.ts";
import TaskEditor from "@/components/custom-components/shared/TaskEditor.tsx";
import {useGetProjectStatusMembers} from "@/hooks/project.hooks.ts";
import {useGetSprintTasks} from "@/hooks/task.hooks.ts";

const SprintOverview = () => {
    const setTitle = useOutletContext<(title: string) => void>();
    useEffect(() => {
        setTitle("Sprint Overview");
    }, [setTitle]);
    const {projectId,sprintId} = useParams()
    const {data:projectStatusMember,isLoading} = useGetProjectStatusMembers(projectId)
    const {data:sprintTasks} = useGetSprintTasks(sprintId ?? '')
    const setOpen = useDialogStore(state => state.openDialog)

    if(isLoading || !sprintTasks || !projectStatusMember){
        return  <Loader/>
    }

    const openTaskForm = () => {
        if (!projectStatusMember) return;
        setOpen(() => (
            <TaskEditor
                isCreateMode={true}
                status={projectStatusMember.projectStatus}
                members={projectStatusMember.projectMembers}
            />
        ));
    };

    const tabConfig: TabConfig[] = [
        {
            value: "list",
            label: "List",
            component: () => <SprintListView sprint={sprintTasks} members={projectStatusMember.projectMembers}/>,
        },
        {
            value: "board",
            label: "Board",
            component: () => <KanbanBoard tasks={sprintTasks}/>,
        },
    ];




    return (

        <>
            <div className={'hidden lg:flex w-auto  items-center gap-x-4 absolute right-8'}>
                <Button variant={'default'} size={'sm'} onClick={openTaskForm}><PlusCircle/>Add
                    Task</Button>
            </div>
            <TabLayoutWrapper tabConfig={tabConfig}/></>
    )
}

export default SprintOverview