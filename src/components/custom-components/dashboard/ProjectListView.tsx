import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import SprintListView from "@/components/custom-components/dashboard/SprintListView.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { SprintWithTask } from "@/types/project.types.ts";
import { useGetProjectStatusMembers } from "@/hooks/project.hooks.ts";
import { useParams } from "react-router-dom";
import Loader from "@/components/custom-components/shared/Loader.tsx";

interface ProjectListViewProps {
    projectSprint: SprintWithTask[];
}

const ProjectListView = ({ projectSprint }: ProjectListViewProps) => {
    const { projectId } = useParams();
    const { data: projectStatusMember, isLoading, isError } = useGetProjectStatusMembers(projectId);

    // Early return for loading state
    if (isLoading) {
        return <Loader />;
    }

    // Early return for error state or missing data
    if (isError || !projectStatusMember) {
        return <div>Error loading project status members.</div>;
    }

    const members = projectStatusMember.projectMembers;

    return (
        <div className="flex flex-col gap-0.5">
            {/* Ensure projectSprint is not empty before rendering .map() */}
            {projectSprint.length === 0 ? (
                <div>No sprints available for this project.</div>
            ) : (
                projectSprint.map((sprint) => (
                    <Accordion type="single" collapsible defaultValue={sprint.name} key={sprint.id}>
                        <AccordionItem value={sprint.name}>
                            <Card className="shadow-none border-none">
                                <CardHeader className="border-[#f6f8fb] rounded-lg px-3 py-2 mb-1 hover:bg-[#f6f8fb]">
                                    <div className="flex justify-between items-center">
                                        <CardTitle>{sprint.name.toUpperCase()}</CardTitle>
                                        <AccordionTrigger />
                                    </div>
                                </CardHeader>
                                <AccordionContent>
                                    <CardContent className="flex flex-col space-y-6">
                                        <SprintListView sprint={sprint} members={members} />
                                    </CardContent>
                                </AccordionContent>
                            </Card>
                        </AccordionItem>
                        <Separator className="bg-gray-200" />
                    </Accordion>
                ))
            )}
        </div>
    );
};

export default ProjectListView;
