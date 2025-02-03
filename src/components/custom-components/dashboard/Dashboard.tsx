import Analytics from "@/components/custom-components/dashboard/Analytics.tsx";
import TabLayoutWrapper from "@/components/custom-components/shared/TabLayoutWrapper.tsx";
import {AnalyticCardProps, TabConfig} from "@/types/dashboard.type.ts";
import ProjectInsightsTab from "@/components/custom-components/dashboard/project-insights/ProjectInsightsTab.tsx";
import MembersTab from "@/components/custom-components/dashboard/MembersTab.tsx";
import {Button} from "@/components/ui/button.tsx";
import {PlusCircle, Send} from "lucide-react";
import {useDashboardData} from "@/hooks/dashboard.hooks.ts";

interface DashboardProps {
    items:AnalyticCardProps[],
}

const Dashboard = ({items}:DashboardProps) => {
    const {projectData,memberData,membersColumns,isOwnerAdmin,projectColumns} = useDashboardData();
    const tabConfig:TabConfig[] = [
        {
            value: "projects",
            label: "Projects",
            component: () => <ProjectInsightsTab columns={projectColumns} data={projectData}/>,
        },
        {
            value: "members",
            label: "Members",
            component: () => <MembersTab columns={membersColumns} data={memberData} />,
        },
    ];
    return (

            <div className='flex flex-col gap-10 h-full '>
                <Analytics items={items} />
                <div className={'flex-1'}>
                   <div className={'relative'}>
                       {isOwnerAdmin &&
                           <div className={'hidden lg:flex w-auto  items-center gap-x-4 absolute right-1'}>
                               <Button variant={'outline'} size={'sm'}><PlusCircle/>Add Project</Button>
                               <Button size={'sm'}><Send/>Invite</Button>
                           </div>}

                       <TabLayoutWrapper tabConfig={tabConfig} isDashboard={true}/></div>
                </div>
            </div>

    );
}

export default Dashboard;
