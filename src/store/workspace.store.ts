import {create} from "zustand"
import {persist} from "zustand/middleware";
import {WorkspaceData} from "@/types/workspace.type.ts";

interface WorkspaceState {
    currentWorkspaceId: string | null;
    setCurrentWorkspaceId: (id: string | undefined) => void;
}

interface WorkspaceRoleState {
    roles: Record<string, string>;
    currentRole: string ;
    setRoles: (workspaceData: WorkspaceData[]) => void;
    setCurrentRoles: (id: string) => void;
}
export const useWorkspaceStore = create<WorkspaceState>()(
    persist(
        (set) => ({
            currentWorkspaceId: null,
            setCurrentWorkspaceId: (id) => set({ currentWorkspaceId: id }),
        }),
        {
            name: 'workspace-storage',
        }
    )
);

export const useWorkspaceRoleStore = create<WorkspaceRoleState>()(
    persist(
    (set) => ({
    roles: {},
    currentRole:"",
    setRoles: (workspaceData: WorkspaceData[]) =>
        set(() => ({
            roles: workspaceData.reduce((acc : any, curr) => {
                acc[curr.id] = curr.role;
                return acc;
            }, {}),
        })),
    setCurrentRoles: (id) =>   set((state) => ({ currentRole: state.roles[id] })),
}),{
        name: "workspace-role-storage",
    }
)
);