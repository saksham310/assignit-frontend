import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {useGetProjects} from "@/hooks/project.hooks.ts";
import {useWorkspaceStore} from "@/store/workspace.store.ts";
import {LayoutTemplate} from "lucide-react";
import {useProjectColumns} from "@/constants/table-columns.constants.tsx";
import {DataGrid} from "@/components/custom-components/shared/DataGrid.tsx";


const ProjectSummary=()=>{
    const currentWorkspaceId = useWorkspaceStore((state) => state.currentWorkspaceId)
    const {data:projects} =useGetProjects(currentWorkspaceId as string);
    const columns = useProjectColumns(projects)
    return <>
            <Card className={'col-span-2  overflow-hidden h-full flex flex-col gap-1 bg-white shadow-sm border border-gray-100 rounded-lg '}>
                <CardHeader className="p-4 ml-2 text-m font-semibold ">Project Summary
                </CardHeader>
                <CardContent className={'overflow-y-auto '}>
                    {projects?.length > 0 && (
                        <DataGrid columns={columns} data={projects}/>

                    )}
                    {projects?.length == 0 && (
                        <div className={'flex flex-col justify-center items-center gap-4 h-full w-full p-40'}>
                            <LayoutTemplate className={'size-20 text-gray-400'}/>
                           <span className={'text-gray-400 font-medium text-nowrap'}>Add projects to see the summary</span>
                        </div>
                    )}
                </CardContent>
            </Card>


    </>
}
export default ProjectSummary;