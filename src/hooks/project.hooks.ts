import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createProject, createSprints, getProjects} from "@/service/project.service.ts";
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

export const useGetProjects = () => {
    return useQuery({
        queryKey:['projects'],
        queryFn:getProjects,
    })
}

export const useCreateSprint = () => {
    const queryClient = useQueryClient();
    const closeDialog=useDialogStore((state) => state.closeDialog)
    return useMutation({
        mutationFn:createSprints,
        onSuccess:async (data)=>{
            await queryClient.invalidateQueries({queryKey: ["workspaces"]});
            await queryClient.invalidateQueries({queryKey:['projects']})
            closeDialog();
            toast.success(data.message,{
                duration: 2000,
            });
        }

    })
}

