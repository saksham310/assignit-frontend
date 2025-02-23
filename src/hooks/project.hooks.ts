import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createProject} from "@/service/project.service.ts";
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
            closeDialog();
            toast.success(data.message,{
                duration: 2000,
            });
        }

    })
}