import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {useGetProjects} from "@/hooks/project.hooks.ts";
import {useWorkspaceStore} from "@/store/workspace.store.ts";
import {LayoutTemplate, Plus} from "lucide-react";
import {useProjectColumns} from "@/constants/table-columns.constants.tsx";
import {DataGrid} from "@/components/custom-components/shared/DataGrid.tsx";
import {useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button";
import { useDialogStore } from "@/store/dialog.store";
import ProjectCreationForm from "../../forms/ProjectCreationForm";
import { useDashboardData } from "@/hooks/dashboard.hooks";

const ProjectSummary=()=>{
    const currentWorkspaceId = useWorkspaceStore((state) => state.currentWorkspaceId)
    const setOpen = useDialogStore(state => state.openDialog)
    const {data:projects} =useGetProjects(currentWorkspaceId as string);
      const {isOwnerAdmin } = useDashboardData();
    const navigate = useNavigate();
    const ProjectColumnOptions = {
        onView: (id: string) =>navigate(`/project/${id}`),
        onEdit: (id: string) =>navigate(`/project/${id}/?tab=settings`),
    }
    const columns = useProjectColumns(ProjectColumnOptions)
    return <>
            <Card className={'col-span-2  overflow-hidden h-full flex flex-col gap-1 bg-white shadow-sm border border-gray-100 rounded-lg '}>
                <CardHeader className="p-4 ml-2 text-m font-semibold ">Project Summary
                </CardHeader>
                <CardContent className={'overflow-y-auto '}>
                    {projects?.length > 0 && (
                        <DataGrid columns={columns} data={projects}/>
                    )}
                    {projects?.length == 0 && (
                        <div className={'flex flex-col justify-center items-center gap-6 h-full w-full p-20'}>
                            <div>
                                <LayoutTemplate className={'size-12 text-gray-300'}/>
                            </div>
                            <div className="text-center">
                                {isOwnerAdmin ? (
                                    <>
                                        <p className={'text-gray-500 font-medium mb-2'}>No projects created yet</p>
                                        <p className={'text-gray-400 text-sm'}>Create your first project to get started</p>
                                    </>
                                ) : (
                                    <>
                                        <p className={'text-gray-500 font-medium mb-2'}>No projects available</p>
                                        <p className={'text-gray-400 text-sm'}>Only workspace owners and admins can create projects</p>
                                    </>
                                )}
                            </div>
                            {isOwnerAdmin && <Button 
                                onClick={() =>setOpen(ProjectCreationForm)} 
                                className="gap-2"
                            >
                                <Plus className="size-4" />
                                Create Project
                            </Button>}
                        </div>
                    )}
                </CardContent>
            </Card>
    </>
}
export default ProjectSummary;