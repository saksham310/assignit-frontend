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
    id : number;
    name: string;
    email: string;
    role: string;
    joinDate: string;
    avatarColor?: string;
    imageUrl?: string;

}
