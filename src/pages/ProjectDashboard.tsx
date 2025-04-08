import {TabConfig} from "@/types/dashboard.type.ts";
import {useOutletContext, useParams} from "react-router-dom";
import {useEffect} from "react";
import {PlusCircle} from "lucide-react";
import {useDialogStore} from "@/store/dialog.store.ts";
import SprintCreationForm from "@/components/custom-components/forms/SprintCreationForm.tsx";
import ProjectListView from "@/components/custom-components/dashboard/ProjectListView.tsx";
import ProjectOverview from "@/components/custom-components/dashboard/ProjectOverview.tsx";
import Dashboard from "@/components/custom-components/dashboard/Dashboard.tsx";
import {useGetProjectDetails} from "@/hooks/project.hooks.ts";
import Loader from "@/components/custom-components/shared/Loader.tsx";

const ProjectDashboard = () =>{
    const setTitle = useOutletContext<(title: string) => void>();
    const setOpen = useDialogStore(state => state.openDialog)
    const {projectId} = useParams();
    const {data,isLoading} = useGetProjectDetails(projectId)
    useEffect(() => {
        setTitle("Project")
    }, [setTitle]);

    if(isLoading) return <Loader/>
    const tabConfig: TabConfig[] = [
        {
            value: "overview",
            label: "Overview",
            component: () => <ProjectOverview projectData = {data.projectOverviewData}/>,
        },
        {
            value: "list",
            label: "List",
            component: () => <ProjectListView projectSprint={data.projectSprintSummary}/>,
        },
        {
            value: "members",
            label: "Members",
            component: () => <> <div>TO DO </div></>,
        },
    ];

    const onCreateSprint = () => {
        setOpen(SprintCreationForm)
    }
    const actions = [
        { label: "Create Sprint", icon: <PlusCircle />, onClick: onCreateSprint },
    ]

    return <>
        <Dashboard tabConfig={tabConfig} actions={actions} isOwnerAdmin={true}/>
    </>
}

export default ProjectDashboard;