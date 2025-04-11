import {apiClient} from "@/service/api.client.ts";
import {
    CREATE_TASK,
    GET_ALL_COMMENTS,
    GET_SPRINT_TASKS,
    GET_TASK_DETAILS,
    UPDATE_TASK
} from "@/constants/api.constants.ts";
import {TaskPayload} from "@/types/project.types.ts";

export const createTask = async (data:TaskPayload) =>{
    const res = await apiClient.post(CREATE_TASK, data);
    return res.data
}

export const getSprintTasks = async (id: string) =>{
    const res = await apiClient.get(GET_SPRINT_TASKS(id));
    return res.data
}

export const getTaskById = async (id: string) =>{
    const res = await apiClient.get(GET_TASK_DETAILS(id));
    return res.data
}

export const updateTask = async (data:Partial<TaskPayload>,id:string) =>{
    const res = await apiClient.put(UPDATE_TASK(id), data);
    return res.data
}

export const getAllComments = async (id:number) =>{
    const res = await apiClient.get(GET_ALL_COMMENTS(id));
    return res.data
}