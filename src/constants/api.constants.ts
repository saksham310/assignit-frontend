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


export const INVITE_USER =  (workspaceId:string) => `workspaces/${workspaceId}/invite`;
export const JOIN_WORKSPACE = `/workspaces/members/join`;



// User Profile APIs
export const UPDATE_PROFILE = '/user/profile/update';
