import {z} from "zod";

export const ProjectSchema = z.object({
    name: z.string({
        required_error: "A project name is required.",
    }),
    dueDate :z.date({
        required_error: "A due date is required.",
    }),
})