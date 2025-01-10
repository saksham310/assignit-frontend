import Dashboard from "@/components/shared/Dashboard.tsx";
import {ColumnDef} from "@tanstack/react-table";
import {ProjectSummary} from "@/types/dashboard.type.ts";
import {useOutletContext, useParams} from "react-router-dom";
import {useEffect} from "react";
import {useGetWorkspaceAnalytics} from "@/hooks/workspaceHooks.ts";
import Loader from "@/components/shared/Loader.tsx";
import { Progress } from "@/components/ui/progress"


const WorkspacePage = () => {
    const setTitle = useOutletContext<(title: string) => void>();

    useEffect(() => {
        setTitle("Workspace Summary")
    }, [setTitle]);

    const {id} = useParams();
    const {data: workspaceAnalytics, isLoading} = useGetWorkspaceAnalytics(id);

    if (isLoading) {
        return <Loader/>
    }

    if (!workspaceAnalytics) return;

    const analytics = ["Projects", "Members", "Sprints", "Overdue Projects"];
    const items = analytics.map((key) => ({
        name: key,
        count: workspaceAnalytics[key]
    }))

    const columns: ColumnDef<ProjectSummary>[] = [
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

    const dummyProjectTasks: ProjectSummary[] = [
        {
            projectName: "Website Redesign",
            startDate: "2024-06-01",
            endDate: "2025-06-01",
            progress: <Progress value={10} className="w-auto" />,
        },
        {
            projectName: "Mobile App Development",
            startDate: "2024-07-01",
            endDate: "2025-01-15",
            progress: <Progress value={50} className="w-full" />,
        },
        {
            projectName: "E-commerce Platform Upgrade",
            startDate: "2024-08-01",
            endDate: "2025-02-01",
            progress: <Progress value={30} className="w-full" />,
        },
        {
            projectName: "Corporate Branding Overhaul",
            startDate: "2024-09-01",
            endDate: "2025-03-30",
            progress: <Progress value={60} className="w-full" />,
        },
        {
            projectName: "Data Migration to Cloud",
            startDate: "2024-10-01",
            endDate: "2025-04-20",
            progress: <Progress value={50} className="w-full" />,
        },
        {
            projectName: "Internal Tools Revamp",
            startDate: "2024-11-01",
            endDate: "2025-05-10",
            progress: <Progress value={45} className="w-full" />,
        },
        {
            projectName: "Customer Support Chatbot",
            startDate: "2024-12-01",
            endDate: "2025-06-01",
            progress: <Progress value={80} className="w-full" />,
        },
        {
            projectName: "SEO Optimization Campaign",
            startDate: "2024-05-01",
            endDate: "2024-12-01",
            progress: <Progress value={25} className="w-full" />,
        },
        {
            projectName: "AI-Powered Analytics Dashboard",
            startDate: "2024-04-01",
            endDate: "2024-11-30",
            progress: <Progress value={10} className="w-full" />,
        },
        {
            projectName: "AI-Powered Analytics Dashboard",
            startDate: "2024-04-01",
            endDate: "2024-11-30",
            progress: <Progress value={10} className="w-full" />,
        },
        {
            projectName: "AI-Powered Analytics Dashboard",
            startDate: "2024-04-01",
            endDate: "2024-11-30",
            progress: <Progress value={10} className="w-full" />,
        },
        {
            projectName: "AI-Powered Analytics Dashboard",
            startDate: "2024-04-01",
            endDate: "2024-11-30",
            progress: <Progress value={10} className="w-full" />,
        },
        {
            projectName: "AI-Powered Analytics Dashboard",
            startDate: "2024-04-01",
            endDate: "2024-11-30",
            progress: <Progress value={10} className="w-full" />,
        },
    ];

    return (
        <Dashboard items={items} columns={columns} data={dummyProjectTasks}/>
    )
}

export default WorkspacePage;