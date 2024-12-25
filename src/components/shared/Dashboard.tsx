import Analytics from "@/components/shared/Analytics.tsx";
import GridWrapper from "@/components/shared/GridWrapper.tsx";
import {ProjectTask} from "@/types/dashboard.type.ts";
import { ColumnDef } from "@tanstack/react-table"
const Dashboard = () => {
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
    return (
        <div className="grid grid-cols-1 gap-10 mb-2 haha">
            <Analytics items={items} />
            <GridWrapper columns={columns} data={dummyProjectTasks} />
        </div>
    );
}

export default Dashboard;
