// Authentication APIs
export const LOGIN_API = '/auth/login';
export const SIGNUP_API = '/auth/signup';
export const SEND_OTP = '/auth/otp/send';
export const VERIFY_OTP = '/auth/otp/verify';
export const RESET_PASSWORD = '/auth/password/reset';

// Workspace Management APIs
export const GET_WORKSPACES = '/workspaces';
export const GET_WORKSPACE_ANALYTICS = (workspaceId:string) => `workspaces/${workspaceId}/analytics`;
export const GET_MEMBERS =  (workspaceId:string) => `workspaces/${workspaceId}/members`;

export const CREATE_WORKSPACE = '/workspaces';
export const UPDATE_WORKSPACE =  (workspaceId:string) => `workspaces/${workspaceId}`;

export const LEAVE_WORKSPACE =  (workspaceId:string) => `workspaces/${workspaceId}/members`;
export const DELETE_WORKSPACE =  (workspaceId:string) => `workspaces/${workspaceId}`;

export const UPDATE_MEMBERS = (workspaceId:string) => `workspaces/${workspaceId}/members/role`;

export const INVITE_USER =  (workspaceId:string) => `workspaces/${workspaceId}/invite`;
export const JOIN_WORKSPACE = `/workspaces/members/join`;



// User Profile APIs
export const UPDATE_PROFILE = '/user/profile/update';
export const DELETE_USER = '/user/delete';
export const USER_ANALYTICS = (projectId: string | undefined, userId: number, sprintId?: number) => 
    `/user/${projectId}/analytics/${userId}${sprintId ? `/${sprintId}` : ''}`;

// Project Management APIs
export const GET_PROJECTS = (workspaceId:string) =>`projects/${workspaceId}`;
export const GET_PROJECT_DETAILS = (projectId:string) => `projects/${projectId}/details`;
export const GET_PROJECT_MEMBERS = (projectId:string) => `projects/${projectId}/members`;
export const GET_PROJECT_STATUS_MEMBERS = (projectId:string) => `projects/${projectId}/status`;
export const GET_PROJECT_RETROSPECTIVE = (workspaceId:string) => `projects/${workspaceId}/retrospective`;
export const CREATE_SPRINT = '/projects/sprint';
export const CREATE_PROJECT = '/projects'
export const GET_SPRINT_TASKS = (sprintId:string) => `projects/sprint/${sprintId}/tasks`;
export const SUBMIT_RETROSPECTIVE = `projects/retrospective`;
export const GET_RETROSPECTIVE_FEEDBACKS = (id:number) => `projects/retrospective/${id}`;

export const UPDATE_PROJECT_STATUS = (projectId:number) => `projects/${projectId}/status/update`;
export const UPDATE_PROJECT = (projectId:number) => `projects/${projectId}`;
export const DELETE_PROJECT = (projectId: number) => `projects/${projectId}`;

export const ADD_PROJECT_MEMBER = (projectId:number) => `projects/${projectId}/members/add`;
export const UPDATE_PROJECT_MEMBER = (projectId:number) => `projects/${projectId}/members/role`;
// Task management APIs
export const CREATE_TASK = '/tasks'
export const GET_TASK_DETAILS = (taskId:string) => `tasks/${taskId}`;
export const UPDATE_TASK = (taskId:string) => `tasks/${taskId}`;


// Comment Management APIs

export const GET_ALL_COMMENTS = (taskId:string|number) => `tasks/${taskId}/all/comments`;
export const ADD_COMMENT = (taskId:number) => `tasks/${taskId}/comment`;
export const DELETE_COMMENT = (taskId: number, commentId: number) => `tasks/${taskId}/comment/${commentId}`;