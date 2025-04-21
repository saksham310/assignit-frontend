import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    createProject,
    createSprints,
    getProjectDetails, getProjectMembers,
    getProjectRetrospective,
    getProjects,
    getProjectStatus
} from "@/service/project.service.ts";
import {toast} from "sonner";
import {useDialogStore} from "@/store/dialog.store.ts";

export const useCreateProject = () => {
    const queryClient = useQueryClient();
    const closeDialog=useDialogStore((state) => state.closeDialog)
    return useMutation({
        mutationFn:createProject,
        onSuccess:async (data)=>{
            await queryClient.invalidateQueries({queryKey: ["workspaces"]});
            await queryClient.invalidateQueries({queryKey: ["workspace analytics",String(data.project.workspace_id)]});
            await queryClient.invalidateQueries({queryKey:['projects']})
            closeDialog();
            toast.success(data.message,{
                duration: 2000,
            });
        }

    })
}

export const useGetProjects = (id:string|undefined) => {
    return useQuery({
        queryKey:['projects'],
        queryFn:() => getProjects(id),
    })
}

export const useCreateSprint = () => {
    const queryClient = useQueryClient();
    const closeDialog=useDialogStore((state) => state.closeDialog)
    return useMutation({
        mutationFn:createSprints,
        onSuccess:async (data)=>{
            await queryClient.invalidateQueries({queryKey: ["workspaces"]});
            await queryClient.invalidateQueries({queryKey:['projects']});
            await queryClient.invalidateQueries({queryKey:['project']})
            closeDialog();
            toast.success(data.message,{
                duration: 2000,
            });
        }

    })
}

export const useGetProjectDetails = (id:string|undefined) => {
    return useQuery({
        queryKey:['project',id],
        queryFn:() => getProjectDetails(id),
    })
}

export const useGetProjectStatusMembers = (id:string|undefined) => {
    return useQuery({
        queryKey:['project_status',id],
        queryFn:() => getProjectStatus(id),

    })
}
export const useGetProjectMembers = (id:string|undefined) => {
    return useQuery({
        queryKey:['project_members',id],
        queryFn:() => getProjectMembers(id),
    })
}
export const useGetProjectRetrospective = (id:string|undefined) => {
    return useQuery({
        queryKey:['project_retrospective',id],
        queryFn:() => getProjectRetrospective(id),

    })
}