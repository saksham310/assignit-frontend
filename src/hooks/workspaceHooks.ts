import {createWorkspace, getWorkspaceAnalytics, getWorkspaces} from "@/service/workspaceService.ts";
import {useMutation, useQuery} from "@tanstack/react-query";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "sonner";

export const useGetWorkspace = () => {

    return useQuery({
        queryKey:['workspaces'],
        queryFn:getWorkspaces,
    });
}
export const useGetWorkspaceAnalytics=(id:string|undefined)=>{
    return useQuery({
        queryKey:['workspace analytics',id],
        queryFn:()=>getWorkspaceAnalytics(id),
        enabled:!!id
    })
}
export const useWorkspaceNavigation=()=>{
    const navigate=useNavigate();
    const {data:workspaces,isLoading} = useGetWorkspace();
    useEffect(()=>{
        if(isLoading) return;
        if(workspaces){
           const hasWorkspace=workspaces.length > 0;
           const targetPath=hasWorkspace?`/workspaces/${workspaces[0].id}`
           :'/create';
           navigate(targetPath);
        }
    },[isLoading, navigate, workspaces]);
    return {isLoading};
}

export const useCreateWorkspace=()=>{
    const navigate=useNavigate();
    return useMutation({
        mutationFn:createWorkspace,
        onSuccess:(data)=>{
            toast.success("Workspace Created Successfully!", {
                duration: 2000,
            });
            setTimeout(() => {
                navigate('/');
            }, 1000);
        }

    })
}