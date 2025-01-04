import {getWorkspaceAnalytics, getWorkspaces} from "@/service/workspaceService.ts";
import {useQuery} from "@tanstack/react-query";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export const useGetWorkspace = () => {

    return useQuery({
        queryKey:['workspaces'],
        queryFn:getWorkspaces,
    });
}
export const useGetWorkspaceAnalytics=(id:string|undefined)=>{
    console.log("Hook time",new Date().getTime());
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
}