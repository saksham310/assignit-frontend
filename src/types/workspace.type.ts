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
    name: string;
    email: string;
    role: string;
    joinDate: string;

}