import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {ColumnDef} from "@tanstack/react-table";
import {FolderKanban} from "lucide-react";
import ProjectSummaryRow from "@/components/custom-components/dashboard/project-insights/ProjectSummaryRow.tsx";

const ProjectSummary=({ columns, data }: { columns: ColumnDef<any>[]; data: unknown[]})=>{
    const projects = [
        {
            id: 1,
            name: "FYP",
            tasks: 6,
            completed: 2,
            inProgress: 2,
            toDo: 2,
            dueDate: "Apr 15, 2025"
        },
        {
            id: 2,
            name: "Test",
            tasks: 4,
            completed: 3,
            inProgress: 1,
            toDo: 0,
            dueDate: "Mar 28, 2025"
        },
        {
            id: 3,
            name: "Testinggg",
            tasks: 5,
            completed: 0,
            inProgress: 2,
            toDo: 3,
            dueDate: "Apr 30, 2025"
        }
    ];
    return <>

            <Card className={' col-span-2  overflow-hidden h-full flex flex-col gap-3 '}>
                <CardHeader className="text-m font-semibold ">Project Summary
                </CardHeader>
                <CardContent className={'overflow-y-auto'}>
                    {data?.length == 0 &&(
                    <div className=" h-full  w-full  flex flex-col gap-6">
                        {projects.map((project) =>{
                            return <ProjectSummaryRow project={project}/>
                        })}
                    </div>  )}
                    {data?.length == 1 && (
                        <div className={'flex md:mt-40 flex-col gap-8 mx-auto items-center justify-center text-gray-400'}>
                            <FolderKanban className={'md:size-24'}/>

                           <p className={"text-sm "}> Your projects will be shown here</p></div>
                    )}
                </CardContent>
            </Card>


    </>
}
export default ProjectSummary;