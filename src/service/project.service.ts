import {apiClient} from "@/service/api.client.ts";
import {CREATE_PROJECT, CREATE_SPRINT, GET_PROJECTS} from "@/constants/api.constants.ts";
import {ProjectCreationPayload} from "@/types/project.types.ts";

export const createProject = async (data:ProjectCreationPayload) =>  {
    const res = await apiClient.post(CREATE_PROJECT, data);
    return res.data
}

export const getProjects = async () => {
    const res = await apiClient.get(GET_PROJECTS);
    return res.data
}

export const createSprints = async (data) => {
    const res = await apiClient.post(CREATE_SPRINT, data);
    return res.data
}