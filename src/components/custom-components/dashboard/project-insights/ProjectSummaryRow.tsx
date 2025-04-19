import {Badge} from "@/components/ui/badge.tsx";
import {Separator} from "@/components/ui/separator.tsx";

interface ProjectSummaryRowProps {
    project:any,
    smallBadge?:boolean,
    isGeneric?:boolean,
}
const ProjectSummaryRow = (
    {project,smallBadge=true,isGeneric = false}:ProjectSummaryRowProps
)=>{
    const progress =Math.round((project.completed / project.tasks) * 100) ? Math.round((project.completed / project.tasks) * 100) : 0
    return (<>

        <div className={'flex flex-col gap-2 border-2 border-gray-200 p-[12px] rounded-md'}>
            <div className={'flex justify-between items-center'}>
                <div className={'flex items-center gap-4'}>
                    {!isGeneric &&  <div>
                        <span className='flex items-center justify-center border bg-indigo-100 text-indigo-600 size-8 rounded p-1'>{project.name.charAt(0)}</span>
                    </div>
                    }
                    <div>
                        <span className="font-medium text-[clamp(0.875rem, -1.7813rem + 8.5vw, 3rem)]">{isGeneric ? "Project Progress" :  project.name }</span>
                        <p className="text-xs text-gray-500">{isGeneric ? "Overall task completion status" :`Due: ${project.dueDate.split('T')[0]}`}</p>
                    </div>
                </div>
                { smallBadge && <div className={'flex items-center gap-4'}>
                    <Badge variant={'outline'} className={'bg-green-50 text-green-600 font-normal'}>Completed: {project.completed}</Badge>
                    <Badge variant={'outline'} className={'bg-yellow-50 text-amber-600 font-normal'}>In Progress:  {project. inProgress}</Badge>
                    <Badge variant={'outline'} className={'bg-gray-50 text-blue-600 font-normal'}>To Do :  {project.toDo}</Badge>
                </div>}
            </div>
            <div className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500 font-medium">Project Completion Rate</span>
                    <span className="font-medium">{progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                        className="bg-[#9286f9] h-2 rounded-full"
                        style={{ width: `${progress}% ` }}
                    ></div>
                </div>
            </div>
            {!smallBadge &&
                <div className="grid grid-cols-3 gap-6 ">
                    <div className={'rounded-md bg-green-50 text-green-600 font-normal flex flex-col justify-center items-center p-4'}>
                        <span className={'font-bold text-xl'}>{project.completed}</span>
                        <span>Completed</span>
                    </div>
                    <div className={'rounded-md bg-yellow-50 text-yellow-600 font-normal flex flex-col justify-center items-center p-4'}>
                        <span className={' font-bold text-xl'}>{project.inProgress}</span>
                        <span>In Progress</span>
                    </div>
                    <div className={'rounded-md bg-gray-50 text-gray-600 font-normal flex flex-col justify-center items-center p-4 '}>
                        <span className={' font-bold text-xl'}>{project.toDo}</span>
                        <span>To Do</span>
                    </div>
                </div>
            }

        </div>
        {!isGeneric && <Separator className={'bg-muted'}/>}
        </>
    )
}
export default ProjectSummaryRow;