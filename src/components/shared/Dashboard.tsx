import Analytics from "@/components/shared/Analytics.tsx";
import TabLayoutWrapper from "@/components/shared/TabLayoutWrapper.tsx";
import {AnalyticCardProps, TProjectSummary, TabConfig} from "@/types/dashboard.type.ts";
import { ColumnDef } from "@tanstack/react-table"
import ProjectInsightsTab from "@/components/shared/ProjectInsightsTab.tsx";
import MembersTab from "@/components/shared/MembersTab.tsx";

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
        size: 73,
        cell: ({ row }) => row.original.progress
    },
]
const membersColumns: ColumnDef<any>[] = [
    {
        accessorKey: "memberName",
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
]
const projectData = [
    {
        projectName: "Website Redesign",
        startDate: "2024-01-15",
        endDate: "2024-06-30",
        progress: "50%",
    },
    {
        projectName: "Mobile App Development",
        startDate: "2023-10-01",
        endDate: "2024-04-20",
        progress: "80%",
    },
    {
        projectName: "E-commerce Platform",
        startDate: "2024-03-01",
        endDate: "2024-12-31",
        progress: "10%",
    },
    {
        projectName: "CRM System Upgrade",
        startDate: "2023-11-15",
        endDate: "2024-05-30",
        progress: "30%",
    }, {
        projectName: "Website Redesign",
        startDate: "2024-01-15",
        endDate: "2024-06-30",
        progress: "50%",
    },
    {
        projectName: "Mobile App Development",
        startDate: "2023-10-01",
        endDate: "2024-04-20",
        progress: "80%",
    },
    {
        projectName: "E-commerce Platform",
        startDate: "2024-03-01",
        endDate: "2024-12-31",
        progress: "10%",
    },
    {
        projectName: "CRM System Upgrade",
        startDate: "2023-11-15",
        endDate: "2024-05-30",
        progress: "30%",
    },  {
        projectName: "E-commerce Platform",
        startDate: "2024-03-01",
        endDate: "2024-12-31",
        progress: "10%",
    },
    {
        projectName: "CRM System Upgrade",
        startDate: "2023-11-15",
        endDate: "2024-05-30",
        progress: "30%",
    },  {
        projectName: "E-commerce Platform",
        startDate: "2024-03-01",
        endDate: "2024-12-31",
        progress: "10%",
    },
    {
        projectName: "CRM System Upgrade",
        startDate: "2023-11-15",
        endDate: "2024-05-30",
        progress: "30%",
    },
];const membersData = [
    {
        memberName: "Alice Johnson",
        email: "alice.johnson@example.com",
        role: "Project Manager",
        joinDate: "2023-01-15",
    },
    {
        memberName: "Bob Smith",
        email: "bob.smith@example.com",
        role: "Frontend Developer",
        joinDate: "2023-07-10",
    },
    {
        memberName: "Charlie Brown",
        email: "charlie.brown@example.com",
        role: "Backend Developer",
        joinDate: "2023-10-01",
    },
    {
        memberName: "Diana Green",
        email: "diana.green@example.com",
        role: "UI/UX Designer",
        joinDate: "2023-05-20",
    },
    {
        memberName: "Charlie Brown",
        email: "charlie.brown@example.com",
        role: "Backend Developer",
        joinDate: "2023-10-01",
    },
    {
        memberName: "Diana Green",
        email: "diana.green@example.com",
        role: "UI/UX Designer",
        joinDate: "2023-05-20",
    },
    {
        memberName: "Charlie Brown",
        email: "charlie.brown@example.com",
        role: "Backend Developer",
        joinDate: "2023-10-01",
    },
    {
        memberName: "Diana Green",
        email: "diana.green@example.com",
        role: "UI/UX Designer",
        joinDate: "2023-05-20",
    },
    {
        memberName: "Charlie Brown",
        email: "charlie.brown@example.com",
        role: "Backend Developer",
        joinDate: "2023-10-01",
    },
    {
        memberName: "Diana Green",
        email: "diana.green@example.com",
        role: "UI/UX Designer",
        joinDate: "2023-05-20",
    },
    {
        memberName: "Charlie Brown",
        email: "charlie.brown@example.com",
        role: "Backend Developer",
        joinDate: "2023-10-01",
    },
    {
        memberName: "Diana Green",
        email: "diana.green@example.com",
        role: "UI/UX Designer",
        joinDate: "2023-05-20",
    },
];
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
const Dashboard = ({items}:DashboardProps) => {

    return (

            <div className='flex flex-col gap-10 h-full '>
                <Analytics items={items} />
                <div className={'flex-1'}>
                    <TabLayoutWrapper tabConfig={tabConfig} />
                </div>
            </div>

    );
}

export default Dashboard;
