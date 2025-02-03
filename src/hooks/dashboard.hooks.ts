import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {useGetWorkspace, useGetWorkspaceMember} from "@/hooks/workspace.hooks.ts";
import {useWorkspaceRoleStore} from "@/store/workspace.store.ts";
import {MembersData} from "@/types/workspace.type.ts";
import {getMembersColumns, projectColumns} from "@/constants/table-columns.constants.tsx";
import {WORKSPACE_ROLES} from "@/constants/roles.constants.ts";


export const useDashboardNavigate=()=>{
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

export const useDashboardData = () =>{
    const currentRole = useWorkspaceRoleStore((state)=>state.currentRole);
    const setCurrentRole = useWorkspaceRoleStore((state)=>state.setCurrentRoles);
    const {id} = useParams();
    const {data} = useGetWorkspaceMember(id);
    const memberData = data as MembersData[];
    const projectData: unknown[] = [];

    useEffect(() => {
        if(!!id)  setCurrentRole(id as string)
    }, [id]);
    const handleEditMember = (memberId:number,value: string) => {
        console.log(memberId,value);
    }
    const isOwnerAdmin = WORKSPACE_ROLES.includes(currentRole);
    const membersColumns = getMembersColumns(isOwnerAdmin,handleEditMember)
    ;
   return {isOwnerAdmin,memberData,projectData,membersColumns, projectColumns};

}