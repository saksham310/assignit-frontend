import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {useGetWorkspace, useGetWorkspaceMember, useUpdateMemberRole} from "@/hooks/workspace.hooks.ts";
import {useJoinWorkspaceStore, useWorkspaceRoleStore} from "@/store/workspace.store.ts";
import {MembersData} from "@/types/workspace.type.ts";
import {getMembersColumns} from "@/constants/table-columns.constants.tsx";
import {WORKSPACE_ROLES} from "@/constants/roles.constants.ts";
import {useGetProjects} from "@/hooks/project.hooks.ts";


export const useDashboardNavigate = () => {
    const {data: workspaces, isLoading, isFetching} = useGetWorkspace();
    const navigate = useNavigate();
    const location = useLocation();
    const setRedirectUrl = useJoinWorkspaceStore((state: any) => state.setRedirectUrl);
    useEffect(() => {
        const isDashboard = location.pathname === '/';
        setRedirectUrl(null);
        if (!isFetching && workspaces && isDashboard) {
            if (workspaces.length === 0) {
                navigate("/create");
            } else {
                const id = workspaces[0].id;
                navigate(`/workspaces/${id}`);
            }
        }
    }, [isFetching, workspaces, navigate]);

    return {isLoading, isFetching};
}

export const useDashboardData = () => {
    const currentRole = useWorkspaceRoleStore((state) => state.currentRole);
    const {mutate} = useUpdateMemberRole();
    const setCurrentRole = useWorkspaceRoleStore((state) => state.setCurrentRoles);
    const {id} = useParams();
    const {data} = useGetWorkspaceMember(id);
    const memberData = data as MembersData[];
    const {data:project} = useGetProjects();
    useEffect(() => {
        if (!!id) setCurrentRole(id as string)
    }, [id]);
    const handleEditMember = (memberId: number, value: string) => {
        const data = {
            workspaceId: id,
            id: memberId,
            newRole: value
        }
        mutate(data)
    }
    const isOwnerAdmin = WORKSPACE_ROLES.filter(role => role != 'Member').includes(currentRole);
    const membersColumns = getMembersColumns(isOwnerAdmin, handleEditMember);
    return {isOwnerAdmin, memberData, project, membersColumns};

}