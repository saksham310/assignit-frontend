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
export const USER_ANALYTICS = (projectId:string|undefined,userId:number) => `user/${projectId}/analytics/${userId}`;

// Project Management APIs
export const GET_PROJECTS = (workspaceId:string) =>`projects/${workspaceId}`;
export const GET_PROJECT_DETAILS = (projectId:string) => `projects/${projectId}/details`;
export const GET_PROJECT_MEMBERS = (projectId:string) => `projects/${projectId}/members`;
export const GET_PROJECT_STATUS_MEMBERS = (projectId:string) => `projects/${projectId}/status`;
export const CREATE_SPRINT = '/projects/sprint';
export const CREATE_PROJECT = '/projects'
export const GET_SPRINT_TASKS = (sprintId:string) => `projects/sprint/${sprintId}/tasks`;

// Task management APIs

export const CREATE_TASK = '/tasks'
export const GET_TASK_DETAILS = (taskId:string) => `tasks/${taskId}`;
export const UPDATE_TASK = (taskId:string) => `tasks/${taskId}`;


// Comment Management APIs

export const GET_ALL_COMMENTS = (taskId:string|number) => `tasks/${taskId}/all/comments`;
export const ADD_COMMENT = (taskId:number) => `tasks/${taskId}/comment`;