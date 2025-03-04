import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { ChevronDown, ChevronsUpDown, Folder } from "lucide-react";
import { Link } from "react-router-dom";

const projects = [
    {
        id: 1,
        name: "Report Card",
        sprints: [
            { id: 101, name: "Sprint 1" },
            { id: 102, name: "Sprint 2" },
        ],
    },
    {
        id: 2,
        name: "Attendease",
        sprints: [
            { id: 101, name: "Sprint 1" },
            { id: 102, name: "Sprint 2" },
        ],
    },
    {
        id: 3,
        name: "Enrollment",
        sprints: [
            { id: 201, name: "Sprint 1" },
            { id: 202, name: "Sprint 2" },
        ],
    },
];

const ProjectList = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openProjects, setOpenProjects] = useState<{ [key: number]: boolean }>({});

    const toggleProject = (id: number) => {
        setOpenProjects((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <div className="flex items-center justify-between  p-2 rounded-lg  cursor-pointer ">
                    <span className="flex items-center gap-2 text-gray-800 text-sm font-semibold">
                        <Folder className="size-5 text-primary" />
                        <p>Projects</p>
                    </span>
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm">
                            <ChevronsUpDown className="h-5 w-5 text-gray-600" />
                            <span className="sr-only">Toggle</span>
                        </Button>
                    </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="mt-2 space-y-2">
                    {projects.map((project) => (
                            <Collapsible
                                open={openProjects[project.id] || false}
                                onOpenChange={() => toggleProject(project.id)}
                            >
                                <div className="flex items-center justify-between p-3 cursor-pointer ">
                                    <Link
                                        to={`/project/${project.id}`}
                                        className="text-[14px] w-full text-gray-800 font-normal hover:text-primary flex items-center gap-2"
                                    >
                                     <span className={'flex items-center justify-center border bg-primary text-white size-6 rounded p-1'}>{project.name.charAt(0)}</span> <p>{project.name}</p>
                                    </Link>
                                    <CollapsibleTrigger asChild>
                                        <Button variant="ghost" size="sm">
                                            <ChevronDown className={`h-5 w-5 text-gray-600 transition-transform ${openProjects[project.id] ? "rotate-180" : ""}`} />
                                            <span className="sr-only">Toggle</span>
                                        </Button>
                                    </CollapsibleTrigger>
                                </div>
                                <CollapsibleContent className="pl-6 pt-2 space-y-3">
                                    {project.sprints.map((sprint) => (
                                        <div
                                            key={sprint.id}
                                            className="text-[12px] text-gray-600 bg-gray-50 p-2 rounded-md hover:bg-gray-200 transition-all"
                                        >
                                            {sprint.name}
                                        </div>
                                    ))}
                                </CollapsibleContent>
                            </Collapsible>
                    ))}
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
};

export default ProjectList;
