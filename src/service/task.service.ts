import {apiClient} from "@/service/api.client.ts";
import {CREATE_TASK} from "@/constants/api.constants.ts";
import {TaskPayload} from "@/types/project.types.ts";

export const createTask = async (data:TaskPayload) =>{
    const res = await apiClient.post(CREATE_TASK, data);
    return res.data
}