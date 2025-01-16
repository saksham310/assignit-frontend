import {createWorkspace, getWorkspaceAnalytics, getWorkspaces} from "@/service/workspace.service.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useLocation, useNavigate} from "react-router-dom";
import {toast} from "sonner";
import {useEffect} from "react";

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

export const useCreateWorkspace = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: createWorkspace,
        onSuccess: async (data) => {
            queryClient.invalidateQueries({queryKey: ["workspaces"]});
            queryClient.invalidateQueries({queryKey: ["workspace analytics", data.newWorkspace.id]});
            toast.success("Successfully created workspace",{
                duration: 2000,
            });
            navigate("/");
        },
        onError: (error) => {
            toast.error("Failed to create workspace. Please try again.");
            console.error("Workspace creation failed:", error);
        }
    });
}


export const useWorkspaceNavigate=()=>{
    const { data: workspaces, isLoading,isFetching } = useGetWorkspace();
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const isDashboard=location.pathname==='/';
        if (!isFetching && workspaces && isDashboard) {
            if (workspaces.length === 0) {
                navigate("/create");
            } else {
                const id = workspaces[0].id;
                navigate(`/workspaces/${id}`);
            }
        }
    }, [isFetching, workspaces, navigate]);

    return {isLoading,isFetching};
}