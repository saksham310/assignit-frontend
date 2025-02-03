import {
    createWorkspace,
    deleteWorkspace,
    getWorkspaceAnalytics, getWorkspaceMember,
    getWorkspaces, leaveWorkspace,
    updateWorkspace
} from "@/service/workspace.service.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {toast} from "sonner";

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
            console.error("Workspace creation failed:", error);
        }
    });
}

export const useUpdateWorkspace = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateWorkspace,
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["workspaces"]});
            await queryClient.invalidateQueries({queryKey: ["workspace analytics",]});
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