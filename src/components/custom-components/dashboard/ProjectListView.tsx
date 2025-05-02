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
            {projectSprint.length === 0 ? (
                <div className="flex items-center justify-center min-h-[50vh]">
                    <Card className="shadow-none border-none w-[400px]">
                        <CardContent className="px-6 py-10">
                            <div className="flex flex-col items-center justify-center text-center space-y-4">
                                <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center">
                                    <svg
                                        className="h-10 w-10 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 0 002-2M9 5a2 2 0 012-2h2a2 0 012 2"
                                        />
                                    </svg>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-semibold text-gray-800">No Sprints Available</h3>
                                    <p className="text-gray-500 text-sm max-w-[300px]">
                                        Get started by creating your first sprint to organize and track your project tasks.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
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
