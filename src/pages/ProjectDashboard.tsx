import {TabConfig} from "@/types/dashboard.type.ts";
import {useOutletContext, useParams} from "react-router-dom";
import {useEffect} from "react";
import {PlusCircle } from "lucide-react";
import {useDialogStore} from "@/store/dialog.store.ts";
import SprintCreationForm from "@/components/custom-components/forms/SprintCreationForm.tsx";
import ProjectListView from "@/components/custom-components/dashboard/ProjectListView.tsx";
import ProjectOverview from "@/components/custom-components/dashboard/ProjectOverview.tsx";
import Dashboard, {Action} from "@/components/custom-components/dashboard/Dashboard.tsx";
import {useGetProjectDetails, useGetProjectMembers} from "@/hooks/project.hooks.ts";
import Loader from "@/components/custom-components/shared/Loader.tsx";
import {useGetMembersColumns} from "@/constants/table-columns.constants.tsx";
import MembersTab from "@/components/custom-components/dashboard/MembersTab.tsx";
import ProjectSettings from "@/components/custom-components/settings/ProjectSettings.tsx";


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

    const membersColumns = useGetMembersColumns(false, true, handleEditMember);

    if (isLoading || isMemberLoading) return <Loader/>

    const role = projectMembers?.userRole;
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
            component: () => <MembersTab columns={membersColumns} data={projectMembers?.currentMembers} dbClick={true}/>,
        },
        ...(role === "Project_Manager" ?
        [
            {
                value:"settings",
                label: "Settings",
                component: () => <ProjectSettings/>
            }
        ] :[]
        )
    ];

    const onCreateSprint = () => {
        setOpen(SprintCreationForm)
    }

    const actions: Action[] = [
        {label: "Create Sprint", icon: <PlusCircle/>, variant: "default", onClick: onCreateSprint},
    ]

    return <>
        <Dashboard tabConfig={tabConfig} actions={actions} isOwnerAdmin={true}/>
    </>
}

export default ProjectDashboard;