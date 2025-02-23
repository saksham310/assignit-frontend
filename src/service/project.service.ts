import {apiClient} from "@/service/api.client.ts";
import {CREATE_PROJECT} from "@/constants/api.constants.ts";
import {ProjectCreationPayload} from "@/types/project.types.ts";

export const createProject = async (data:ProjectCreationPayload) =>  {
    const res = await apiClient.post(CREATE_PROJECT, data);
    return res.data
}