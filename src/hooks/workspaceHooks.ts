import {getWorkspaces} from "@/service/workspaceService.ts";
import {useQuery} from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export const useGetWorkspace = () => {
    const header=useAuthHeader();
    const [isInterceptorReady, setInterceptorReady] = useState(false);
    useEffect(() => {
        if (header) {
            setInterceptorReady(true);
        }
    }, [header]);
    return useQuery({
        queryKey:['workspaces'],
        queryFn:getWorkspaces,
        enabled:!!header && isInterceptorReady,
    });
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