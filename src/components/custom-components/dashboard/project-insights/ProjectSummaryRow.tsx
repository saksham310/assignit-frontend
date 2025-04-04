import {Badge} from "@/components/ui/badge.tsx";
import {Separator} from "@/components/ui/separator.tsx";

interface ProjectSummaryRowProps {
    project:any
}
const ProjectSummaryRow = (
    {project}:ProjectSummaryRowProps
)=>{
    const progress =Math.round((project.completed / project.tasks) * 100) ? Math.round((project.completed / project.tasks) * 100) : 0
    return (<>

        <div className={'flex flex-col gap-4'}>
            <div className={'flex justify-between items-center'}>
                <div className={'flex items-center gap-4'}>
                    <div>
                        <span className='flex items-center justify-center border bg-indigo-100 text-indigo-600 size-8 rounded p-1'>{project.name.charAt(0)}</span>
                    </div>
                    <div>
                        <h4 className="font-medium">{project.name}</h4>
                        <p className="text-sm text-gray-500">Due: {project.dueDate.split('T')[0]}</p>
                    </div>
                </div>
                <div className={'flex items-center gap-4'}>
                    <Badge variant={'outline'} className={'bg-green-50 text-green-600 font-normal'}>Completed: {project.completed}</Badge>
                    <Badge variant={'outline'} className={'bg-yellow-50 text-yellow-600 font-normal'}>In Progress:  {project. inProgress}</Badge>
                    <Badge variant={'outline'} className={'bg-gray-50 text-gray-600 font-normal'}>To Do :  {project.toDo}</Badge>
                </div>
            </div>
            <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500 font-medium">Progress</span>
                    <span className="font-medium">{progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                        className="bg-[#9286f9] h-2 rounded-full"
                        style={{ width: `${progress}% ` }}
                    ></div>
                </div>
            </div>
        </div>
    <Separator className={'bg-gray-200'}/>
        </>
    )
}
export default ProjectSummaryRow;