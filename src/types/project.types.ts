import {User} from "@/types/auth.type.ts";

export type StatusType = "To_Do" | "In_Progress" | "Completed"

export interface Status {
    id?: string | number | undefined |null;
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

export interface SprintCreationPayload {
    project_id: string | undefined | number
    name: string
    startDate: Date
    dueDate: Date
}

export interface SprintList {
    id: number
    name: string
    project_id: number
    startDate: string
    endDate: string
}

export interface ProjectResponse {
    id: number
    name: string
    startDate: string
    updatedAt: string
    dueDate: string
    workspace_id: number
    sprint: SprintList[]
    totalTasks: number
    toDo: number
    inProgress: number
    completed: number
}


export interface Task {
    id: number;
    name: string;
    assignees: User[];
    bugCount: number;
    priority: 'Low' | 'Medium' | 'High';
}

export interface TaskStatus {
    id: number
    name: string;
    type: 'Completed' | 'In_Progress' | 'To_Do';
    color: string;
    tasks: Task[];
}

export interface SprintWithTask {
    id: number;
    name: string;
    taskStatus: TaskStatus[];
}

export interface ProjectOverviewData {
    id: number;
    name: string;
    startDate: string;
    updatedAt: string;
    dueDate: string;
    toDo: number;
    inProgress: number;
    completed: number;
    tasks: number;
    highPriority: number;
    lowPriority: number;
    mediumPriority: number;
    members: number;
}

export interface TaskPayload {
    name: string
    description: string
    assignees: string[]
    priority: string
    sprint_id: string
    status_id: number
    frontendBugCount?: number
    backendBugCount?: number
    databaseBugCount?: number
}

export const statuses: Status[] = [
    {id: "temp-1", name: 'To Do', type: 'To_Do', color: '#90a9d0'},
    {id: "temp-2", name: 'In Progress', type: 'In_Progress', color: '#f9d171'},
    {id: "temp-3", name: 'Completed', type: 'Completed', color: '#008844'},
]

export const bugTypes = ['frontend', 'backend', 'database']
export type BugType = typeof bugTypes[number]

export type Comment = {
    id: number,
    name: string,
    message: string,
    createdAt: string,
    userImage:string,
    avatarColor: string,
    type: 'comment' | 'activity'
    attachment?:string
    userId:number
}

export type ProjectRetrospective = {
    id: number
  name: string
  sprint: Sprint[]
}
export interface Sprint {
    id: number
    name: string
  }

export interface RetrospectivePayload {
    id: number
    sprintId: number
    wentWell: string
    toImprove: string
    actionItems: string
    createdAt: string
}

  