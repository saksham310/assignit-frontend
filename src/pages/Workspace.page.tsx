import Dashboard from "@/components/shared/Dashboard.tsx";
import {ColumnDef} from "@tanstack/react-table";
import {ProjectTask} from "@/types/dashboard.type.ts";
import {useOutletContext, useParams} from "react-router-dom";
import {useEffect} from "react";
import {useGetWorkspaceAnalytics} from "@/hooks/workspaceHooks.ts";
import Loader from "@/components/shared/Loader.tsx";

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

    const columns: ColumnDef<ProjectTask>[] = [
        {
            accessorKey: "taskName",
            header: "Task",
            size: 150,
        },
        {
            accessorKey: "sprintName",
            header: "Sprint",
            size: 96
        },
        {
            accessorKey: "status",
            header: "Status",
            size: 122
        },
        {
            accessorKey: "priority",
            header: "Priority",
            size: 73
        },


    ]
    const dummyProjectTasks: ProjectTask[] = [
        {
            taskName: "Implement login functionality",
            sprintName: "Sprint 1",
            status: "In Progress",
            priority: "High"
        },
        {
            taskName: "Design database schema",
            sprintName: "Sprint 1",
            status: "Completed",
            priority: "Medium"
        },
        {
            taskName: "Fix authentication bug",
            sprintName: "Sprint 2",
            status: "To Do",
            priority: "High"
        },
        {
            taskName: "Implement login functionality",
            sprintName: "Sprint 1",
            status: "In Progress",
            priority: "High"
        },
        {
            taskName: "Design database schema",
            sprintName: "Sprint 1",
            status: "Completed",
            priority: "Medium"
        },
        {
            taskName: "Fix authentication bug",
            sprintName: "Sprint 2",
            status: "To Do",
            priority: "High"
        },
        {
            taskName: "Implement login functionality",
            sprintName: "Sprint 1",
            status: "In Progress",
            priority: "High"
        },
        {
            taskName: "Design database schema",
            sprintName: "Sprint 1",
            status: "Completed",
            priority: "Medium"
        },
        {
            taskName: "Fix authentication bug",
            sprintName: "Sprint 2",
            status: "To Do",
            priority: "High"
        },
        {
            taskName: "Update UI for task management page",
            sprintName: "Sprint 2",
            status: "In Progress",
            priority: "Low"
        },
        {
            taskName: "Write unit tests for API endpoints",
            sprintName: "Sprint 3",
            status: "To Do",
            priority: "Medium"
        },
        {
            taskName: "Optimize database queries",
            sprintName: "Sprint 3",
            status: "Blocked",
            priority: "High"
        },
        {
            taskName: "Prepare sprint retrospective slides",
            sprintName: "Sprint 4",
            status: "Completed",
            priority: "Low"
        },
        {
            taskName: "Integrate third-party API",
            sprintName: "Sprint 4",
            status: "In Progress",
            priority: "High"
        },
        {
            taskName: "Integrate third-party API",
            sprintName: "Sprint 4",
            status: "In Progress",
            priority: "High"
        },
        {
            taskName: "Integrate third-party API",
            sprintName: "Sprint 4",
            status: "In Progress",
            priority: "High"
        },
        {
            taskName: "Integrate third-party API",
            sprintName: "Sprint 4",
            status: "In Progress",
            priority: "High"
        }
    ];
    return (
        <Dashboard items={items} columns={columns} data={dummyProjectTasks}/>
    )
}

export default WorkspacePage;