import {
    createWorkspace,
    deleteWorkspace,
    getWorkspaceAnalytics, getWorkspaceMember,
    getWorkspaces, inviteMember, joinWorkspace, leaveWorkspace,
    updateWorkspace
} from "@/service/workspace.service.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {toast} from "sonner";
import {useDialogStore} from "@/store/dialog.store.ts";
import {refreshPage} from "@/lib/utils.ts";

export const useGetWorkspace = () => {
    return useQuery({
        queryKey:['workspaces'],
        queryFn:getWorkspaces,
        staleTime: 0,
    });
}
export const useGetWorkspaceAnalytics=(id:string|undefined)=>{
    return useQuery({
        queryKey:['workspace analytics',id],
        queryFn:()=>getWorkspaceAnalytics(id),
        enabled:!!id
    })
}
export const useGetWorkspaceMember=(id:string|undefined)=>{
    return useQuery({
        queryKey:['workspace member',id],
        queryFn:()=>getWorkspaceMember(id),
        enabled:!!id
    })
}
export const useCreateWorkspace = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: createWorkspace,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({queryKey: ["workspaces"]});
            await queryClient.invalidateQueries({queryKey: ["workspace analytics", data.newWorkspace.id]});
            toast.success("Successfully created workspace",{
                duration: 2000,
            });
            navigate(`/workspaces/${data.newWorkspace.id}`);
        },
        onError: (error) => {
            toast.error("Failed to create workspace. Please try again.");
        }
    });
}

export const useUpdateWorkspace = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateWorkspace,
        onMutate :async (data)=>{
            await queryClient.cancelQueries({queryKey: ['workspaces']});
            const previousWorkspaces = queryClient.getQueryData(['workspaces']);

            // Update cache immediately (before API call completes)
            queryClient.setQueryData(['workspaces'], (oldWorkspaces:any) =>
                oldWorkspaces.map(workspace =>
                    workspace.id === data.id
                        ? {...workspace, ...data}
                        : workspace
                )
            );

            return { previousWorkspaces };
        },
        onError: (_err, _data, context) => {
            // Restore old data if API call fails
            queryClient.setQueryData(['workspaces'], context!.previousWorkspaces);
            toast.error("Update failed");
        },
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({queryKey: ["workspaces"]});
            await queryClient.invalidateQueries({queryKey: ["workspace analytics",data.id]});
            toast.success("Successfully update workspace",{
                duration: 2000,
            });
        }
    })
}

export const useDeleteWorkspace = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: deleteWorkspace,
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["workspaces"]});
            await queryClient.invalidateQueries({queryKey: ["workspace analytics",]});
            navigate("/");
        }
    })
}
export  const useLeaveWorkspace = (id: string | null) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({mutationFn:
        leaveWorkspace,
        onSuccess: async () => {
        await queryClient.invalidateQueries({queryKey: ["workspaces"]});
        await queryClient.invalidateQueries({queryKey: ["workspace analytics",id]});
        navigate("/");
    }
})
}

export const useInviteMember = () => {
    const closeDialog=useDialogStore((state) => state.closeDialog)
    return useMutation({
        mutationFn: inviteMember,
        onMutate: async ()=>{
            toast.info("Email is queued. You will be notified once sent.",{
                duration: 2000,
            })
            closeDialog();
        },
        onSuccess:  (data) => {
            toast.dismiss();
            toast.success(data.message,{
                duration: 2000,
            })
        },
    })
}

export const useJoinWorkspace = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: joinWorkspace,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({queryKey: ["workspaces"]});
            await queryClient.invalidateQueries({queryKey: ["workspace analytics", data.newWorkspace.id]});
            toast.success("Successfully joined workspace",{
                duration: 2000,
            });
            navigate(`/workspaces/${data.user.workspace_id}`);
        }

        }
    )
}