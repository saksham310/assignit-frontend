export type StatusType = "To_Do" | "In_Progress" | "Completed"

export interface Status {
    id?: string;
    name: string
    type: StatusType
    color: string
}

export const statuses: Status[] = [
{name:'To Do', type:'To_Do', color : '#90a9d0' },
{name:'In Progress', type:'In_Progress', color : '#f9d171' },
{name:'Completed', type:'Completed', color : '#008844' },
]