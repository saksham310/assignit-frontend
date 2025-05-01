import {apiClient} from "@/service/api.client.ts";
import {
    ADD_PROJECT_MEMBER,
    CREATE_PROJECT,
    CREATE_SPRINT,
    GET_PROJECT_DETAILS,
    GET_PROJECT_MEMBERS,
    GET_PROJECT_RETROSPECTIVE,
    GET_PROJECT_STATUS_MEMBERS,
    GET_PROJECTS,
    GET_RETROSPECTIVE_FEEDBACKS,
    SUBMIT_RETROSPECTIVE,
    UPDATE_PROJECT,
    UPDATE_PROJECT_MEMBER,
    UPDATE_PROJECT_STATUS
} from "@/constants/api.constants.ts";
import {ProjectCreationPayload, RetrospectivePayload, SprintCreationPayload, Status} from "@/types/project.types.ts";

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
export const getProjectMembers = async (id: string | undefined) => {
    const res = await apiClient.get(GET_PROJECT_MEMBERS(id as string));
    return res.data
}

export const getProjectStatus = async (id: string | undefined) => {
    const res = await apiClient.get(GET_PROJECT_STATUS_MEMBERS(id as string));
    return res.data
}
export const getProjectRetrospective = async (id: string | undefined) => {
    const res = await apiClient.get(GET_PROJECT_RETROSPECTIVE(id as string));
    return res.data
}

export const sendProjectRetrospective = async (data:RetrospectivePayload) => {
    const res = await apiClient.post(SUBMIT_RETROSPECTIVE,data)
    return res.data
}
export const getRetrospectiveFeedbacks = async (id:number) => {
    const res = await apiClient.get(GET_RETROSPECTIVE_FEEDBACKS(id));
    return res.data
}

export const updateStatus = async (data:Status[],id:number) => {
const res = await apiClient.post(UPDATE_PROJECT_STATUS(id),{customStatus:data});
return res.data
}

export const updateProject = async (id:number,payload:{'name':string;'idealTaskCount':number}) => {
    const res = await apiClient.put(UPDATE_PROJECT(id),payload);
    return res.data
}

export const addProjectMember = async (id:number,data:number[]) =>{
    const res = await apiClient.post(ADD_PROJECT_MEMBER(id),data)
    return res.data
}
export const updateMemberRole = async (id:number,data:{memberId:number,role:string}) =>{
    const res = await apiClient.put(UPDATE_PROJECT_MEMBER(id),data)
    return res.data
}