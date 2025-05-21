import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {ChevronDown, ChevronsUpDown, Folder} from "lucide-react";
import {Link, useLocation, useParams} from "react-router-dom";
import {useGetProjects} from "@/hooks/project.hooks.ts";
import {cn} from "@/lib/utils.ts";
import {ProjectResponse, SprintList} from "@/types/project.types.ts";
import {useWorkspaceStore} from "@/store/workspace.store.ts";


const ProjectList = () => {
    const [isOpen, setIsOpen] = useState(false);
    const currentWorkspaceId = useWorkspaceStore((state) => state.currentWorkspaceId)
    const {data} = useGetProjects(currentWorkspaceId as string);
    const projects = data ? data : [];
    const [openProjects, setOpenProjects] = useState<{ [key: number]: boolean }>({});
    const {sprintId} = useParams();

    const toggleProject = (id: number) => {
        setOpenProjects((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };
    useEffect(() => {
        if (projects.length > 0) {
            setIsOpen(true);
        }
    }, [projects.length])
    const location = useLocation();
    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
        });
    return (
        <div className="w-full max-w-md mx-auto">
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <div>
                    <CollapsibleTrigger
                        className="w-full flex items-center justify-between  p-2 rounded-lg  cursor-pointer ">
                        <span className="flex items-center gap-2 text-gray-800 text-sm font-semibold">
                        <Folder className="size-5 text-primary"/>
                        <p>Projects</p>
                         </span>

                        <Button variant="ghost" size="sm">
                            <ChevronsUpDown className="h-5 w-5 text-gray-600"/>
                            <span className="sr-only">Toggle</span>
                        </Button>
                    </CollapsibleTrigger>
                </div>
                <CollapsibleContent className=" space-y-4 pl-4 ">
                    {projects.length > 0 ? projects.map((project: ProjectResponse) => (
                            <Collapsible
                                open={openProjects[project.id] || false}
                                onOpenChange={() => toggleProject(project.id)}
                            >
                                <div title={project.name}
                                     className={cn("flex items-center justify-between p-[1px] pl-[7px]  cursor-pointer",
                                         location.pathname == `/project/${project.id}` && 'bg-secondary rounded-md')}>
                                    <Link
                                        to={`/project/${project.id}`}
                                        className="text-[13px] w-full text-gray-800 font-normal hover:text-primary flex items-center gap-2">

                                        <span
                                            className='flex items-center justify-center border bg-primary text-white size-6 rounded p-1'>{project.name.charAt(0).toUpperCase()}</span>
                                        <span
                                            className={'w-[100px] text-xs text-nowrap overflow-hidden overflow-ellipsis'}>{project.name}</span>
                                    </Link>
                                    <CollapsibleTrigger asChild>
                                        <Button variant="ghost" size="sm">
                                            <ChevronDown
                                                className={`h-5 w-5 text-gray-600 transition-transform ${openProjects[project.id] ? "rotate-180" : ""}`}/>
                                            <span className="sr-only">Toggle</span>
                                        </Button>
                                    </CollapsibleTrigger>
                                </div>
                                <CollapsibleContent className="pl-6 pt-2 space-y-3 flex flex-col">
                                    {project.sprint.map((sprint: SprintList) => (
                                        <div
                                            key={sprint.id}
                                            className={`p-2 flex items-center gap-2 text-[12px] rounded-md cursor-pointer
    ${sprintId && parseInt(sprintId) === sprint.id ? "bg-secondary  text-black" : "text-gray-600"}
  `}
                                        >
                                            <Link
                                                to={`/project/${project.id}/sprint/${sprint.id}`}
                                            >
                                                {sprint.name}
                                            </Link>
                                            <div className="text-[10px] text-gray-400">
                                                {formatDate(sprint.startDate)} - {formatDate(sprint.endDate)}
                                            </div>
                                        </div>

                                    ))}
                                </CollapsibleContent>
                            </Collapsible>
                        )
                    ) : <span className={'text-xs text-center text-gray-500 pl-2 '}>No projects</span>}
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
};

export default ProjectList;
