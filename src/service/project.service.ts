import {apiClient} from "@/service/api.client.ts";
import {CREATE_PROJECT} from "@/constants/api.constants.ts";

export const createProject = async (data:any) =>  {
    const res = await apiClient.post(CREATE_PROJECT, data);
    return res.data
}