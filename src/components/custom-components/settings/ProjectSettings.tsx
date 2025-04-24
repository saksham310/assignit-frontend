import {Avatar} from "@radix-ui/react-avatar";
import {AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import { Pencil, Settings2, Trash2} from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {Separator} from "@/components/ui/separator.tsx";
import {useDialogStore} from "@/store/dialog.store.ts";
import CustomStatusForm from "@/components/custom-components/forms/CustomStatusForm.tsx";
import {Status} from "@/types/project.types.ts";
import {useParams} from "react-router-dom";
import {useGetProjectStatusMembers, useUpdateProject, useUpdateStatus} from "@/hooks/project.hooks.ts";
import Loader from "@/components/custom-components/shared/Loader.tsx";

const ProjectSettings = () => {
    const {projectId} = useParams();
    const {data: projectStatusMember, isLoading} = useGetProjectStatusMembers(projectId);
    const [inputDisabled, setInputDisabled] = useState<boolean>(true);
    const {mutate} = useUpdateStatus();
    const [projectName, setProjectName] = useState('');
    const [sprintTasks, setSprintTasks] = useState(0);
    const setOpen = useDialogStore(state => state.openDialog)
    const {mutate:updateProject} = useUpdateProject()
    useEffect(() => {
        if(projectStatusMember && !isLoading) {
            setProjectName(projectStatusMember?.name)
            setSprintTasks(projectStatusMember?.idealTaskCount)
        }
    }, [projectStatusMember, isLoading])
    if (isLoading) {
        return <Loader/>
    }
    const disableButton = projectStatusMember?.name === projectName && projectStatusMember?.idealTaskCount === sprintTasks;
    const handleStatusChange = (status: Status[]) => {
        mutate({
            data: status,
            id: projectId ? Number(projectId) : 0
        })

    }
    const handleManageStatus = () => {
        setOpen(() => <CustomStatusForm handleStatusList={handleStatusChange}
                                        projectStatus={projectStatusMember?.projectStatus}/>)
    }
    const handleSubmit = () => {
        const payload = {
            name:projectName,
            idealTaskCount:sprintTasks
        };

        updateProject({
            id:Number(projectId),
            payload:payload
        },{
            onError: () => {
                setProjectName(projectStatusMember?.name)
                setSprintTasks( projectStatusMember?.idealTaskCount )
            }
        })
    };

    return (
        <div className="flex flex-col gap-10 md:gap-4 w-auto h-full overflow-y-auto no-scrollbar xl:space-y-5">
            <p className="font-semibold">Project Settings</p>

            <div className="flex items-center gap-10">
                <Avatar className="size-20 lg:size-24 rounded-lg border-2 border-gray-200">
                    <AvatarImage src=""/>
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
                        {projectName.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col w-full lg:max-w-[640px] gap-2">
                    <div className={'flex items-center justify-between'}>
                        <label className="text-sm font-medium">Project Name</label>
                        <span className={'flex text-xs text-muted-foreground cursor-pointer items-center gap-1'}
                              onClick={()=>setInputDisabled(!inputDisabled)}
                        ><Pencil className={'size-4'}/>Edit</span>
                    </div>
                    <Input
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="text-black"
                        onBlur={()=>setInputDisabled(!inputDisabled)}
                        disabled={inputDisabled}
                    />
                </div>


            </div>
            <Separator/>
            <div className="flex items-center justify-between mb-4">
                <p className="font-medium">Ideal Tasks per Sprint</p>
                <Input
                    type="number"
                    value={sprintTasks}
                    min={1}
                    onChange={(e) => setSprintTasks(Number(e.target.value))}
                    className="ml-auto max-w-[140px]"
                />
            </div>
            <div className="flex items-center justify-between mb-4">
                <p className="font-medium">Status Management</p>
                <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={handleManageStatus}
                >
                    <Settings2 className="h-4 w-4"/>
                    Manage Status
                </Button>
            </div>

            <Separator/>
            <div className="flex  justify-between   mb-4">

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="flex mr-auto items-center bg-red-700 gap-2">
                            <Trash2 className="h-4 w-4"/>
                            Delete Project
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your project
                                and remove all associated data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-red-700">
                                Delete Project
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <div className={'flex justify-end mt-2 mr-2'}>
                    <Button disabled={disableButton} onClick={handleSubmit}>Save</Button>
                </div>
            </div>
        </div>
    );
};

export default ProjectSettings;