export type StatusType = "To_Do" | "In_Progress" | "Completed"

export interface Status {
    id?: string | number |undefined;
    name: string
    type: StatusType
    color: string
}
export interface ProjectCreationPayload {
    name: string
    startDate: Date
    dueDate: Date
    customStatus: Status[]
    workspaceId: string | null
}

export const statuses: Status[] = [
{id:1,name:'To Do', type:'To_Do', color : '#90a9d0' },
{id:2,name:'In Progress', type:'In_Progress', color : '#f9d171' },
{id:3,name:'Completed', type:'Completed', color : '#008844' },
]