import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import ProjectSummaryRow from "@/components/custom-components/dashboard/project-insights/ProjectSummaryRow.tsx";
import {useGetProjects} from "@/hooks/project.hooks.ts";
import {ProjectResponse} from "@/types/project.types.ts";
import {useWorkspaceStore} from "@/store/workspace.store.ts";
import NoDataDisplay from "@/components/custom-components/shared/NoDataDisplay.tsx";
import {TriangleAlert} from "lucide-react";


const ProjectSummary=()=>{
    const currentWorkspaceId = useWorkspaceStore((state) => state.currentWorkspaceId)
    const {data:projects} =useGetProjects(currentWorkspaceId as string);
    return <>
            <Card className={'col-span-2  overflow-hidden h-full flex flex-col gap-1 bg-white shadow-sm border border-gray-100 rounded-lg '}>
                <CardHeader className="text-m font-semibold ">Project Summary
                </CardHeader>
                <CardContent className={'overflow-y-auto '}>
                    {projects?.length > 0 &&(
                    <div className=" h-full  w-full  flex flex-col gap-2">
                        {projects.map((project:ProjectResponse) =>{
                           return <ProjectSummaryRow key={project.id} project={project} />
                        })}
                    </div>  )}
                    {projects?.length == 0 && (
                        <div className={'flex flex-col justify-center items-center gap-4 h-full w-full p-40'}>
                            <TriangleAlert className={'size-40 text-gray-300'} />
                           <span className={'text-gray-400 font-medium text-nowrap'}>Add projects to see the summary</span>
                        </div>
                       // <NoDataDisplay title={"No Projects"} subtitle={"Add projects for the summary"}/>
                    )}
                </CardContent>
            </Card>


    </>
}
export default ProjectSummary;