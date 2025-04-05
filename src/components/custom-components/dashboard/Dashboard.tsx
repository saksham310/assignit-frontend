import TabLayoutWrapper from "@/components/custom-components/shared/TabLayoutWrapper.tsx";
import {AnalyticCardProps, TabConfig} from "@/types/dashboard.type.ts";
import ProjectInsightsTab from "@/components/custom-components/dashboard/project-insights/ProjectInsightsTab.tsx";
import MembersTab from "@/components/custom-components/dashboard/MembersTab.tsx";
import {Button} from "@/components/ui/button.tsx";
import {PlusCircle, Send} from "lucide-react";
import {useDashboardData} from "@/hooks/dashboard.hooks.ts";
import {useDialogStore} from "@/store/dialog.store.ts";
import SendInvitePage from "@/pages/SendInvitePage.tsx";
import ProjectCreationForm from "@/components/custom-components/forms/ProjectCreationForm.tsx";

interface DashboardProps {
    items: AnalyticCardProps[],
}

const Dashboard = ({items}: DashboardProps) => {
    const {memberData, membersColumns, isOwnerAdmin} = useDashboardData();
    const setOpen = useDialogStore(state => state.openDialog);
    const tabConfig: TabConfig[] = [
        {
            value: "overview",
            label: "Overview",
            component: () => <ProjectInsightsTab items={items} />,
        },
        {
            value: "members",
            label: "Members",
            component: () => <MembersTab columns={membersColumns} data={memberData}/>,
        },
    ];
    const onInvite = () => {
        setOpen(SendInvitePage);
    }
    const onAddProject = () => {
        setOpen(ProjectCreationForm)
    }
    return (
<>



    {isOwnerAdmin &&  <div className={'hidden lg:flex w-auto  items-center gap-x-4 absolute right-8'}>
        <Button variant={'outline'} size={'sm'} onClick={() => onAddProject()}><PlusCircle/>Add
            Project</Button>
        <Button size={'sm'} onClick={() => onInvite()}><Send/>Invite</Button>
    </div>}

                    <TabLayoutWrapper tabConfig={tabConfig} isDashboard={false}/>


</>
    );
}

export default Dashboard;
