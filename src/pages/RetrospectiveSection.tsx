import {useEffect, useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {Label} from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectItem,
    SelectContent,
} from "@/components/ui/select.tsx";
import TabLayoutWrapper from "@/components/custom-components/shared/TabLayoutWrapper.tsx";
import RetrospectiveForm from "@/components/custom-components/RetrospectiveForm.tsx";
import {useGetProjectRetrospective} from "@/hooks/project.hooks";
import Loader from "@/components/custom-components/shared/Loader";
import EmptyRetrospectiveState from "@/components/custom-components/EmptyRetrospective";
import {ProjectRetrospective, Sprint} from "@/types/project.types";
import {TabConfig} from "@/types/dashboard.type";
import ResponseView from "@/components/ResponseView.tsx";
import { useDashboardData } from "@/hooks/dashboard.hooks";


const RetrospectiveSection = () => {
    const {id} = useParams();
    const {data: project, isLoading} = useGetProjectRetrospective(id);
    const {isOwnerAdmin} = useDashboardData();

    const [selectedProjectId, setSelectedProjectId] = useState<number>();
    const [selectedSprintId, setSelectedSprintId] = useState<number>();
    const [selectedSprintDate, setSelectedSprintDate] = useState<string>();
    const setTitle = useOutletContext<(title: string) => void>();
    useEffect(() => {
        setTitle("Retrospective Section")
    }, [setTitle]);

    // Set default project and sprint after data is loaded
    useEffect(() => {
        if (project?.projects?.length && project?.projects?.length > 0) {
            const defaultProject: ProjectRetrospective = project.projects[0];
            setSelectedProjectId(defaultProject.id);
            setSelectedSprintId(defaultProject.sprint?.[0]?.id);
            const date = defaultProject?.sprint?.[0]?.endDate;
            setSelectedSprintDate(date)
        }
    }, [project]);

    if (isLoading) return <Loader/>;

    if (!project?.projects || project.projects.length === 0) {
        return <EmptyRetrospectiveState hasProject={false} showBtn={isOwnerAdmin}/>
    }

    const selectedProject = project.projects.find((p: ProjectRetrospective) => p.id === selectedProjectId);
    const sprints = selectedProject?.sprint || [];
    const role = selectedProject?.users[0]?.role;
    const handleProjectChange = (val:string) => {
        const newProjectId = +val;
        const selected = project?.projects?.find((p:ProjectRetrospective) => p.id === newProjectId);
        setSelectedProjectId(newProjectId);
        setSelectedSprintId(selected?.sprint?.[0]?.id);
        const date = selected?.sprint?.[0].endDate;
        setSelectedSprintDate(date)
    }
    const handleSprintChange = (val:string) => {
        const newSprintId = +val;
        const selected = sprints.find((s:Sprint) => s.id === newSprintId);
        setSelectedSprintId(newSprintId);
        setSelectedSprintDate(selected?.endDate)
    }
    const tabconfig: TabConfig[] = [
        {
            value: "submit",
            label: "Submit Feedback",
            component: () => (
                (!sprints || sprints?.length === 0) ?<EmptyRetrospectiveState hasProject={true}
                showBtn={!!role}
                 projectId={selectedProjectId as number}/> :
                <RetrospectiveForm sprintId={selectedSprintId as number} sprintDate={selectedSprintDate}/>
            ),
        },
        ...((role === "Project_Manager" && sprints.length > 0) ? [{
            value: "view",
            label: "View Response",
            component: () => <ResponseView sprintId={selectedSprintId as number}/>
        }] : [])
    ];

    return (
        <div className="w-full bg-white h-full overflow-hidden rounded-lg p-4 flex flex-col  space-y-2">
            <div className="p-1 overflow-y-auto flex flex-col space-y-4">
                <div className="flex items-center w-full space-x-4 basis-4/5">
                    {/* Project Selection */}
                    <div className="flex flex-col gap-3 flex-1">
                        <Label>Select Project</Label>
                        <Select value={selectedProjectId?.toString()}
                                onValueChange={(val) => handleProjectChange(val)}>
                            <SelectTrigger id="project">
                                <SelectValue placeholder="Select a project"/>
                            </SelectTrigger>
                            <SelectContent>
                                {project.projects.map((project: ProjectRetrospective) => (
                                    <SelectItem key={project.id} value={project.id.toString()}>
                                        {project.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Sprint Selection */}
                    <div className="flex flex-col gap-3 flex-1">
                        <Label>Select Sprint</Label>
                        <Select value={selectedSprintId?.toString()} onValueChange={(val) => handleSprintChange(val)}>
                            <SelectTrigger id="sprint">
                                <SelectValue placeholder="Select a sprint"/>
                            </SelectTrigger>
                            <SelectContent>
                                {sprints.map((sprint: Sprint) => (
                                    <SelectItem key={sprint.id} value={sprint.id.toString()}>
                                        {sprint.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <TabLayoutWrapper tabConfig={tabconfig} className="mt-0"/>
            </div>
        </div>
    );
};

export default RetrospectiveSection;
