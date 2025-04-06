import {apiClient} from "@/service/api.client.ts";
import {CREATE_PROJECT, CREATE_SPRINT, GET_PROJECT_DETAILS, GET_PROJECTS} from "@/constants/api.constants.ts";
import {ProjectCreationPayload, SprintCreationPayload} from "@/types/project.types.ts";

export const createProject = async (data:ProjectCreationPayload) =>  {
    const res = await apiClient.post(CREATE_PROJECT, data);
    return res.data
}

export const getProjects = async (id: string | undefined) => {
    const res = await apiClient.get(GET_PROJECTS(id as string));
    return res.data
}

export const createSprints = async (data:SprintCreationPayload) => {
    const res = await apiClient.post(CREATE_SPRINT, data);
    return res.data
}

export const getProjectDetails = async (id: string | undefined) => {
    const res = await apiClient.get(GET_PROJECT_DETAILS(id as string));
    return res.data
}