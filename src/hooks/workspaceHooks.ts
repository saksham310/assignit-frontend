import {getWorkspaces} from "@/service/workspaceService.ts";
import {useQuery} from "@tanstack/react-query";

export const useGetWorkspace = () => {
    return useQuery({
        queryKey:['workspaces'],
        queryFn:getWorkspaces,
    });
}