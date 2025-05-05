import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    addProjectMember,
    createProject,
    createSprints,
    deleteProject,
    getProjectDetails,
    getProjectMembers,
    getProjectRetrospective,
    getProjects,
    getProjectStatus,
    getRetrospectiveFeedbacks,
    sendProjectRetrospective,
    updateMemberRole,
    updateProject,
    updateStatus
} from "@/service/project.service.ts";
import {toast} from "sonner";
import {useDialogStore} from "@/store/dialog.store.ts";
import {Status} from "@/types/project.types.ts";


export const useCreateProject = () => {
    const queryClient = useQueryClient();
    const closeDialog=useDialogStore((state) => state.closeDialog)
    return useMutation({
        mutationFn:createProject,
        onSuccess:async (data)=>{
            await queryClient.invalidateQueries({queryKey: ["workspaces"]});
            await queryClient.invalidateQueries({queryKey: ["workspace analytics",String(data.project.workspace_id)]});
            await queryClient.invalidateQueries({queryKey:['projects']})
            await queryClient.invalidateQueries({queryKey:['project_retrospective']})
            closeDialog();
            toast.success(data.message,{
                duration: 2000,
            });
        }

    })
}

export const useGetProjects = (id:string|undefined) => {
    return useQuery({
        queryKey:['projects'],
        queryFn:() => getProjects(id),
    })
}

export const useCreateSprint = () => {
    const queryClient = useQueryClient();
    const closeDialog=useDialogStore((state) => state.closeDialog)
    return useMutation({
        mutationFn:createSprints,
        onSuccess:async (data)=>{
            await queryClient.invalidateQueries({queryKey: ["workspaces"]});
            await queryClient.invalidateQueries({queryKey:['projects']});
            await queryClient.invalidateQueries({queryKey:['project']})
            await queryClient.invalidateQueries({queryKey:['project_retrospective']})
            closeDialog();
            toast.success(data.message,{
                duration: 2000,
            });
        }

    })
}

export const useGetProjectDetails = (id:string|undefined) => {
    return useQuery({
        queryKey:['project',id],
        queryFn:() => getProjectDetails(id),
    })
}

export const useGetProjectStatusMembers = (id:string|undefined) => {
    return useQuery({
        queryKey:['project_status',id],
        queryFn:() => getProjectStatus(id),
        enabled:!!id
    })
}

export const useGetProjectMembers = (id:string|undefined) => {
    return useQuery({
        queryKey:['project_members',id],
        queryFn:() => getProjectMembers(id),
    })
}

export const useGetProjectRetrospective = (id:string|undefined) => {
    return useQuery({
        queryKey:['project_retrospective',id],
        queryFn:() => getProjectRetrospective(id),
    })
}

export const useSubmitFeedback = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:sendProjectRetrospective,
        onSuccess:async (data)=>{
            await queryClient.invalidateQueries({queryKey:["project_feedback"]})
            toast.success(data.message,{
                duration: 2000,
            });
        }
    })
}

export const useGetRetrospectiveFeedbacks = (id:number) => {
    return useQuery({
        queryKey:['project_feedback',id],
        queryFn:() => getRetrospectiveFeedbacks(id)
    })
}

export const useUpdateStatus = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn :({data,id}:{data:Status[],id:number}) => updateStatus(data,id),
        onSuccess:async (data)=>{
            await queryClient.invalidateQueries({queryKey:["project"]})
            await queryClient.invalidateQueries({queryKey:["projects"]})
            await queryClient.invalidateQueries({queryKey:["project_status"]})
            toast.success(data.message,{
                duration: 2000,
            });
        }
    })
}

export const useUpdateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: { name: string; idealTaskCount: number } }) =>
            updateProject(id, payload),

        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["project"] });
            await queryClient.invalidateQueries({ queryKey: ["projects"] });
            toast.success(data.message, {
                duration: 2000,
            });
        },
    });
};

export const useAddProjectMember = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:({id,data}:{id:number,data:number[]}) => addProjectMember(id,data),
        onSuccess:async (data)=>{
            await queryClient.invalidateQueries({queryKey:["project_members"]});
            await queryClient.invalidateQueries({queryKey:["project"]});
            toast.success(data.message, {
                duration: 2000,
            });
        },
    })
}

export const useUpdateMember = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:({id,data}:{id:number,data:{memberId:number,role:string}}) => updateMemberRole(id,data),
        onSuccess:async (data)=>{
            await queryClient.invalidateQueries({queryKey:["project_members"]});
            await queryClient.invalidateQueries({queryKey:["project"]});
            toast.success(data.message, {
                duration: 2000,
            })
        }
    })
}

export const useDeleteProject = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (projectId: number) => deleteProject(projectId),
        onSuccess: (data) => {
            toast.success(data.message, {
                duration: 2000,
            });
            window.location.href='/';
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        }
    });
}