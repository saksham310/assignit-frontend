import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {FolderKanban} from "lucide-react";
import ProjectSummaryRow from "@/components/custom-components/dashboard/project-insights/ProjectSummaryRow.tsx";


const ProjectSummary=({projects})=>{
    return <>
            <Card className={' col-span-2  overflow-hidden h-full flex flex-col gap-3 '}>
                <CardHeader className="text-m font-semibold ">Project Summary
                </CardHeader>
                <CardContent className={'overflow-y-auto'}>
                    {projects?.length > 0 &&(
                    <div className=" h-full  w-full  flex flex-col gap-6">
                        {projects.map((project) =>{
                            return <ProjectSummaryRow project={project}/>
                        })}
                    </div>  )}
                    {projects?.length == 0 && (
                        <div className={'flex md:mt-40 flex-col gap-8 mx-auto items-center justify-center text-gray-400'}>
                            <FolderKanban className={'md:size-24'}/>

                           <p className={"text-sm "}> Your projects will be shown here</p></div>
                    )}
                </CardContent>
            </Card>


    </>
}
export default ProjectSummary;