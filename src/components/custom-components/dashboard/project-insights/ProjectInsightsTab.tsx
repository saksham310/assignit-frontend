import ProjectSummary from "@/components/custom-components/dashboard/project-insights/ProjectSummary.tsx";
import AssignedTasks from "@/components/custom-components/dashboard/project-insights/AssignedTasks.tsx";
import Analytics from "@/components/custom-components/dashboard/Analytics.tsx";


const ProjectInsightsTab=({items})=>{
    return <>
        <div className={'h-full flex flex-col gap-10'}>
        <Analytics items={items} className={'p-4 border-2 border-gray-100 rounded-lg'}/>
        <div className={'grid grid-cols-1 lg:grid-cols-3 3xl:grid-cols-1 gap-4 h-full md:overflow-hidden'}>
            <ProjectSummary />
            <AssignedTasks/>
        </div>
        </div>
    </>
}
export default  ProjectInsightsTab;