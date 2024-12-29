import Dashboard from "@/components/shared/Dashboard.tsx";
import {ColumnDef} from "@tanstack/react-table";
import {ProjectTask} from "@/types/dashboard.type.ts";
import {useOutletContext} from "react-router-dom";
import {useEffect} from "react";

const WorkspacePage=()=>{
    const setTitle = useOutletContext();
    useEffect(()=>{
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setTitle("Workspace Summary")
    },[]);
    const items=[
        { name: "Projects", count: 2},
        { name: "Members", count: 2},
        { name: "Sprints", count: 2},
        { name: "Overdue", count: 2}
    ]
    const columns:ColumnDef<ProjectTask>[]=[
        {
            accessorKey: "taskName",
            header: "Task",
            size:150,
        },
        {
            accessorKey: "sprintName",
            header: "Sprint",
            size:96
        },
        {
            accessorKey: "status",
            header: "Status",
            size:122
        },
        {
            accessorKey: "priority",
            header: "Priority",
            size:73
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
    return(
        <Dashboard items={items} columns={columns} data={dummyProjectTasks} />
    )

}

export default WorkspacePage;