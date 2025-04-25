import Dashboard, {Action} from "@/components/custom-components/dashboard/Dashboard.tsx";
import { useOutletContext, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useGetWorkspaceAnalytics } from "@/hooks/workspace.hooks.ts";
import Loader from "@/components/custom-components/shared/Loader.tsx";
import {AnalyticCardProps, TabConfig} from "@/types/dashboard.type.ts";
import ProjectInsightsTab from "@/components/custom-components/dashboard/project-insights/ProjectInsightsTab.tsx";
import MembersTab from "@/components/custom-components/dashboard/MembersTab.tsx";
import { useDashboardData } from "@/hooks/dashboard.hooks.ts";
import ProjectCreationForm from "@/components/custom-components/forms/ProjectCreationForm.tsx";
import SendInvitePage from "@/pages/SendInvitePage.tsx";
import { useDialogStore } from "@/store/dialog.store.ts";
import {CalendarDays, FolderOpenDot, Folders, PlusCircle, Send, UsersRound} from "lucide-react";


// Helper function to create analytics items
const createAnalyticsItems = (analytics: string[], workspaceAnalytics:Record<string,any>): AnalyticCardProps[] => {
    const iconLabel = {
        "Projects":FolderOpenDot,
        "Sprints":Folders,
        "Members":UsersRound,
        "Overdue Projects": CalendarDays,
    };

    return analytics.map((key:string) => ({
        name: key,
        info: `${workspaceAnalytics[key]}`,
        iconLabel: iconLabel[key],
    }));
};

const WorkspaceDashboard = () => {
    const setTitle = useOutletContext<(title: string) => void>();
    const { memberData, membersColumns, isOwnerAdmin } = useDashboardData();

    const { id } = useParams();
    const { data: workspaceAnalytics, isLoading } = useGetWorkspaceAnalytics(id);
    const setOpen = useDialogStore((state) => state.openDialog);

    // Set page title on mount
    useEffect(() => {
        setTitle("Workspace Summary");
    }, [setTitle]);

    // Handle loading and error states early
    if (isLoading) return <Loader />;
    if (!workspaceAnalytics) return null;

    const analytics = ["Projects", "Members", "Sprints", "Overdue Projects"];
    const items = createAnalyticsItems(analytics, workspaceAnalytics);

    const onInvite = () => setOpen(SendInvitePage);
    const onAddProject = () => setOpen(ProjectCreationForm);

    const tabConfig: TabConfig[] = [
        {
            value: "overview",
            label: "Overview",
            component: () => <ProjectInsightsTab items={items} />,
        },
        {
            value: "members",
            label: "Members",
            component: () => <MembersTab remainingMembers={[]} showAddMembers={false} columns={membersColumns} data={memberData} dbClick={false} />,
        },
    ];

    const actions:Action[] = [
        { label: "Invite Members", icon: <Send />,variant:'secondary', onClick: onInvite },
        { label: "Add Project", icon: <PlusCircle />,variant:'default', onClick: onAddProject },
    ];

    return <Dashboard tabConfig={tabConfig} isOwnerAdmin={isOwnerAdmin} actions={actions} />;
};

export default WorkspaceDashboard;
