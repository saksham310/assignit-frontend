import ProjectSummary from "@/components/shared/ProjectSummary.tsx";
import {TProjectSummary} from "@/types/dashboard.type.ts";
import AssignedTasks from "@/components/shared/AssignedTasks.tsx";
import {ColumnDef} from "@tanstack/react-table";

const ProjectInsightsTab=({ columns, data }: { columns: ColumnDef<TProjectSummary>[]; data: unknown[]})=>{
    return <>
        <div className={'grid grid-cols-1 lg:grid-cols-3 3xl:grid-cols-1 gap-5 overflow-y-auto'}>
            <ProjectSummary columns={columns} data={data}/>
            <AssignedTasks/>
        </div>
    </>
}
export default  ProjectInsightsTab;