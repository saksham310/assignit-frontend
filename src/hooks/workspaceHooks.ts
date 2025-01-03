import {getWorkspaces} from "@/service/workspaceService.ts";
import {useQuery} from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

export const useGetWorkspace = () => {
    const header=useAuthHeader();
    return useQuery({
        queryKey:['workspaces'],
        queryFn:getWorkspaces,
        enabled:!!header
    });
}