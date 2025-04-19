import {TabConfig} from "@/types/dashboard.type.ts";
import {useOutletContext, useParams} from "react-router-dom";
import {useEffect} from "react";
import {PlusCircle} from "lucide-react";
import {useDialogStore} from "@/store/dialog.store.ts";
import SprintCreationForm from "@/components/custom-components/forms/SprintCreationForm.tsx";
import ProjectListView from "@/components/custom-components/dashboard/ProjectListView.tsx";
import ProjectOverview from "@/components/custom-components/dashboard/ProjectOverview.tsx";
import Dashboard, {Action} from "@/components/custom-components/dashboard/Dashboard.tsx";
import {useGetProjectDetails, useGetProjectMembers} from "@/hooks/project.hooks.ts";
import Loader from "@/components/custom-components/shared/Loader.tsx";
import UserProfileAnalytics from "@/pages/UserProfileAnalytics.tsx";
import {getMembersColumns} from "@/constants/table-columns.constants.tsx";
import MembersTab from "@/components/custom-components/dashboard/MembersTab.tsx";


const ProjectDashboard = () => {
    const setTitle = useOutletContext<(title: string) => void>();
    const setOpen = useDialogStore(state => state.openDialog)
    const {projectId} = useParams();
    const {data, isLoading} = useGetProjectDetails(projectId)
    const {data: projectMembers, isLoading: isMemberLoading} = useGetProjectMembers(projectId);
    useEffect(() => {
        setTitle("Project")
    }, [setTitle]);
    const handleEditMember = (memberId: number, value: string) => {
        console.log(memberId, value)
    }

    const membersColumns = getMembersColumns(false, true, handleEditMember);

    if (isLoading || isMemberLoading) return <Loader/>


    const tabConfig: TabConfig[] = [
        {
            value: "overview",
            label: "Overview",
            component: () => <ProjectOverview projectData={data?.projectOverviewData}/>,
        },
        {
            value: "list",
            label: "List",
            component: () => <ProjectListView projectSprint={data?.projectSprintSummary}/>,
        },
        {
            value: "members",
            label: "Members",
            component: () => <MembersTab columns={membersColumns} data={projectMembers?.currentMembers}/>,
        },
    ];

    const onCreateSprint = () => {
        setOpen(SprintCreationForm)
    }
    const onTest = () => {
        setOpen(UserProfileAnalytics)
    }
    const actions: Action[] = [
        {label: "Create Sprint", icon: <PlusCircle/>, variant: "default", onClick: onCreateSprint},
        {label: "Test", icon: <PlusCircle/>, variant: "default", onClick: onTest},
    ]

    return <>
        <Dashboard tabConfig={tabConfig} actions={actions} isOwnerAdmin={true}/>
    </>
}

export default ProjectDashboard;