import TabLayoutWrapper from "@/components/custom-components/shared/TabLayoutWrapper.tsx";
import {TabConfig} from "@/types/dashboard.type.ts";
import {useOutletContext} from "react-router-dom";
import {useEffect} from "react";
import {PlusCircle} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useDialogStore} from "@/store/dialog.store.ts";
import SprintCreationForm from "@/components/custom-components/forms/SprintCreationForm.tsx";
import ProjectListView from "@/components/custom-components/dashboard/ProjectListView.tsx";

const tabConfig: TabConfig[] = [
    {
        value: "list",
        label: "List",
        component: () => <ProjectListView/>,
    },
    {
        value: "members",
        label: "Members",
        component: () => <> <div>TO DO </div></>,
    },
];
const ProjectDashboard = () =>{
    const setTitle = useOutletContext<(title: string) => void>();
    const setOpen = useDialogStore(state => state.openDialog)

    useEffect(() => {
        setTitle("Project")
    }, [setTitle]);
    const onCreateSprint = () => {
        setOpen(SprintCreationForm)
    }
    return <>

            <div className={'hidden lg:flex w-auto  items-center gap-x-4 absolute right-8'}>
        <Button variant={'outline'} size={'sm'} onClick={() =>onCreateSprint()}><PlusCircle/>Create
            Sprint</Button>
            </div>
    <TabLayoutWrapper tabConfig={tabConfig}/>
    </>
}

export default ProjectDashboard;