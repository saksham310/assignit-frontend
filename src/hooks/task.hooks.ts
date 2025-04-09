import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createTask} from "@/service/task.service.ts";
import {toast} from "sonner";
import {useDialogStore} from "@/store/dialog.store.ts";

export const useCreateTask = () => {
    const queryClient = useQueryClient();
    const closeDialog=useDialogStore((state) => state.closeDialog)
    return useMutation({
        mutationFn: createTask,
        onSuccess:async (data) =>{
            await queryClient.invalidateQueries({queryKey:['projects']});
            await queryClient.invalidateQueries({queryKey:['project_status']});
            closeDialog();
            toast.success(data.message,{
                duration: 2000,
            });
        }
    })
}