import {getWorkspaces} from "@/service/workspaceService.ts";
import {useQuery} from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import {useEffect, useState} from "react";

export const useGetWorkspace = () => {
    const header=useAuthHeader();
    const [isInterceptorReady, setInterceptorReady] = useState(false);
    useEffect(() => {
        if (header) {
            setInterceptorReady(true);
        }
    }, [header]);
    console.log(header);
    return useQuery({
        queryKey:['workspaces'],
        queryFn:getWorkspaces,
        enabled:!!header && isInterceptorReady,
    });
}