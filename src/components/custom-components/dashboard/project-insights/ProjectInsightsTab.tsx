import ProjectSummary from "@/components/custom-components/dashboard/project-insights/ProjectSummary.tsx";
import Analytics from "@/components/custom-components/dashboard/Analytics.tsx";
import {AnalyticCardProps} from "@/types/dashboard.type.ts";


const ProjectInsightsTab=({items}:{items:AnalyticCardProps[]})=>{
    return <>
        <div className={'h-full flex flex-col gap-10'}>
        <Analytics items={items} className={'p-4 border-2 border-gray-100 rounded-lg'}/>
        <div className={' h-full md:overflow-hidden'}>
            <ProjectSummary />
        </div>
        </div>
    </>
}
export default  ProjectInsightsTab;