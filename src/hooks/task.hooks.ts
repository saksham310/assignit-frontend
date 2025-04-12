import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    addComment,
    createTask,
    getAllComments,
    getSprintTasks,
    getTaskById,
    updateTask
} from "@/service/task.service.ts";
import {toast} from "sonner";
import {useDialogStore} from "@/store/dialog.store.ts";
import {Comment, TaskPayload} from "@/types/project.types.ts";

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

export const useGetSprintTasks = (id:string) =>{
    return useQuery({
        queryKey:['sprint_task',id],
        queryFn:() => getSprintTasks(id),
    })
}

export const useGetTaskDetails = (id:string) =>{
    return useQuery({
        queryKey:['task_detail',id],
        queryFn:() => getTaskById(id)
    })
}

export const useUpdateTask = () => {
   const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, data}: { id: string; data: Partial<TaskPayload> }) =>
            updateTask(data, id),
        onSuccess: async (data) => {
            toast.success(data.message, {
                duration: 2000,
                id:'task_update',
            });
            queryClient.invalidateQueries({queryKey:['task_detail']});

        }
    })
}

export const useGetAllComments = (id:number) =>{
    return useQuery({
        queryKey:['comments',id],
        queryFn:() => getAllComments(id),
    })
}

export const useAddComment = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id,data}:{id:number,data:FormData}) => addComment(data,id),
        onSuccess:async (data)=>{
            toast.success(data.message, {
                duration: 2000,
                id:'comment_add',
            })
            queryClient.invalidateQueries({queryKey:['comments']});
        }
    })
}