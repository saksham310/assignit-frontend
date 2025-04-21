import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select.tsx";
import TabLayoutWrapper from "@/components/custom-components/shared/TabLayoutWrapper.tsx";
import RetrospectiveForm from "@/components/custom-components/RetrospectiveForm.tsx";
import { useGetProjectRetrospective } from "@/hooks/project.hooks";
import Loader from "@/components/custom-components/shared/Loader";
import { console } from "inspector";

const RetrospectiveSection = () => {
  const { id } = useParams();
  const { data: project, isLoading } = useGetProjectRetrospective(id);

  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>(undefined);
  const [selectedSprintId, setSelectedSprintId] = useState<string | undefined>(undefined);

  // Set default project and sprint after data is loaded
  useEffect(() => {
    if (project?.projects?.length > 0) {
      const defaultProject = project.projects[0];
      setSelectedProjectId(defaultProject.id);
      setSelectedSprintId(defaultProject.sprints?.[0]?.id);
    }
  }, [project]);

  if (isLoading) return <Loader />;

  const selectedProject = project.projects.find((p) => p.id === selectedProjectId);
  const sprints = selectedProject?.sprint || [];
  const role = selectedProject?.users[0]?.role ;

  const tabconfig = [
    {
      value: "submit",
      label: "Submit Feedback",
      component: () => (
        <RetrospectiveForm
        />
      ),
    },
    ...(role === "Project_Manager" ? [{
      value: "view",
      label: "View Response",
      component: () => <>To View</>, 
    }]:[])
  ];

  return (
    <div className="w-full bg-white h-full rounded-lg p-4 flex flex-col space-y-4">
      <div className="p-1 overflow-y-auto flex flex-col space-y-6">
        <div className="flex items-center w-full space-x-4 basis-4/5">
          {/* Project Selection */}
          <div className="flex flex-col gap-3 flex-1">
            <Label>Select Project</Label>
            <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
              <SelectTrigger id="project">
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                {project.projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sprint Selection */}
          <div className="flex flex-col gap-3 flex-1">
            <Label>Select Sprint</Label>
            <Select value={selectedSprintId} onValueChange={setSelectedSprintId}>
              <SelectTrigger id="sprint">
                <SelectValue placeholder="Select a sprint" />
              </SelectTrigger>
              <SelectContent>
                {sprints.map((sprint) => (
                  <SelectItem key={sprint.id} value={sprint.id}>
                    {sprint.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabLayoutWrapper tabConfig={tabconfig} />
      </div>
    </div>
  );
};

export default RetrospectiveSection;
