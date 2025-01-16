import {z} from "zod";

export const workspaceSchema = z.object({
    name:z.string().min(3,"Workspace name should be at least 3 characters"),
})