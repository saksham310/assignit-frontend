export type CreateWorkspaceData={
    name:string;
    role?:string;
}

export type WorkspaceData={
    id:string;
    name:string;
    role:string;
}

export type MembersData = {
    id: number;
    name: string;
    email: string;
    role: string;
    joinDate: string;
    avatarColor?: string;
    imageUrl?: string;
}

export type WorkspaceAnalyticsData = {
    Projects: number;
    Members: number;
    Sprints: number;
    "Overdue Projects": number;
}

export type JoinWorkspaceResponse = {
    message: string;
    user: {
        id: number;
        user_id: number;
        workspace_id: number;
        role: string;
        joinDate: string;
    }
}
