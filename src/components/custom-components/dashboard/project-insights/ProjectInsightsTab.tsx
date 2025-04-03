import ProjectSummary from "@/components/custom-components/dashboard/project-insights/ProjectSummary.tsx";
import AssignedTasks from "@/components/custom-components/dashboard/project-insights/AssignedTasks.tsx";


const ProjectInsightsTab=()=>{
    return <>
        <div className={'grid grid-cols-1 lg:grid-cols-3 3xl:grid-cols-1 gap-5 h-full overflow-hidden'}>
            <ProjectSummary />
            <AssignedTasks/>
        </div>
    </>
}
export default  ProjectInsightsTab;