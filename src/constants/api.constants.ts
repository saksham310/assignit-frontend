// Authentication APIs
export const LOGIN_API = '/auth/login';
export const SIGNUP_API = '/auth/register';
export const SEND_OTP = '/auth/send-otp';
export const VERIFY_OTP = '/auth/verify-otp';
export const RESET_PASSWORD = '/auth/reset-password';

// Workspace Management APIs
export const CREATE_WORKSPACE = '/workspace/create';
export const GET_WORKSPACES = '/workspace/getWorkspaces';
export const GET_WORKSPACE_ANALYTICS = '/workspace/getWorkspaceAnalytics';
export const UPDATE_WORKSPACE = '/workspace/update-workspace';
export const DELETE_WORKSPACE = '/workspace/delete-workspace';
export const LEAVE_WORKSPACE = '/workspace/leave-workspace';

// Workspace Members APIs
export const GET_MEMBERS = '/workspace/memberList';
export const INVITE_USER = '/workspace/invite';

// User Profile APIs
export const UPDATE_PROFILE = '/user/update-profile';
