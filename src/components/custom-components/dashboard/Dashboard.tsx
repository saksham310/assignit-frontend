import Analytics from "@/components/custom-components/dashboard/Analytics.tsx";
import TabLayoutWrapper from "@/components/custom-components/shared/TabLayoutWrapper.tsx";
import {AnalyticCardProps, TProjectSummary, TabConfig} from "@/types/dashboard.type.ts";
import { ColumnDef } from "@tanstack/react-table"
import ProjectInsightsTab from "@/components/custom-components/dashboard/project-insights/ProjectInsightsTab.tsx";
import MembersTab from "@/components/custom-components/dashboard/MembersTab.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Edit, PlusCircle, Send} from "lucide-react";
import {useGetWorkspaceMember} from "@/hooks/workspace.hooks.ts";
import {useParams} from "react-router-dom";
import {MembersData} from "@/types/workspace.type.ts";
import {useWorkspaceRoleStore} from "@/store/workspace.store.ts";
import { DropdownMenu,DropdownMenuTrigger,DropdownMenuRadioItem,DropdownMenuContent,DropdownMenuRadioGroup } from "@/components/ui/dropdown-menu";

interface DashboardProps {
    items:AnalyticCardProps[],
}

const projectColumns: ColumnDef<TProjectSummary>[] = [
    {
        accessorKey: "projectName",
        header: "Name",
        size: 150,
    },
    {
        accessorKey: "startDate",
        header: "Start Date",
        size: 96
    },
    {
        accessorKey: "endDate",
        header: "End Date",
        size: 122
    },
    {
        accessorKey: "progress",
        header: "Task Progress",
    },
]

const Dashboard = ({items}:DashboardProps) => {
    const {id} = useParams();
    const {data} = useGetWorkspaceMember(id);
    const setCurrentRole = useWorkspaceRoleStore((state)=> state.setCurrentRoles)
    const membersData: MembersData[] = data;
    setCurrentRole(id as string);
    const currentRole = useWorkspaceRoleStore((state)=> state.currentRole)
    const projectData: unknown[] = [
    ];
    const WorkspaceRoles = ['Owner',"Admin","Member"]
    const isAdminOwner =["Owner","Admin"].includes(currentRole);
    const membersColumns: ColumnDef<any>[] = [
        {
            accessorKey: "name",
            header: "Name",
            size: 150,
        },
        {
            accessorKey: "email",
            header: "Email",
            size: 96
        },
        {
            accessorKey: "role",
            header: "Role",
            size: 122
        },
        {
            accessorKey: "joinDate",
            header: "Joined At",
            size: 73,
        },
        ...(isAdminOwner ? [
            {
                id: "actions",
                header: "Actions",
                cell: ({ row }) => (
                    <div>
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" >
                                <Edit className="h-4 w-4" />
                                  </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuRadioGroup value={"bottom"} onValueChange={(value)=>handleEditMember(row.original,value)} >
                                {WorkspaceRoles.map(role=>
                                <DropdownMenuRadioItem value={role} disabled={role == currentRole} >{role}</DropdownMenuRadioItem>)
                                }
                                <DropdownMenuRadioItem value="right">Kick</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu></div>
                ),
            }
        ]:[]
        )
    ]

    const handleEditMember = (memberId:any,value: string) => {
        console.log(memberId,value);
    }

    const tabConfig:TabConfig[] = [
        {
            value: "projects",
            label: "Projects",
            component: () => <ProjectInsightsTab columns={projectColumns} data={projectData}/>,
        },
        {
            value: "members",
            label: "Members",
            component: () => <MembersTab columns={membersColumns} data={membersData} />,
        },
    ];
    return (

            <div className='flex flex-col gap-10 h-full '>
                <Analytics items={items} />
                <div className={'flex-1'}>
                   <div className={'relative'}>
                       {isAdminOwner &&
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
