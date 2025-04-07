import {Badge} from "@/components/ui/badge.tsx";
import {Card, CardContent, CardHeader,} from "@/components/ui/card.tsx";
import {Bug,} from "lucide-react";
import {useState} from "react";
import {BugType, bugTypes} from "@/types/project.types.ts";
import TaskEditor from "@/components/custom-components/shared/TaskEditor.tsx";

const TaskDetailPage = () => {
    const [bugCounts] = useState<Record<BugType, number>>({
        frontend: 0,
        backend: 0,
        database: 0,
    })
    const totalBugs = bugTypes.reduce((acc, index) => acc + bugCounts[index], 0);



    return <>
        <div className={'w-full flex flex-col gap-4 h-screen p-4 '}>
            <div className={'flex flex-col gap-4'}>
                <div className={'flex items-center gap-2 '}>
                    <Badge variant={'outline'}>Task Id</Badge>
                    {totalBugs > 0 && <Badge variant={'outline'}
                                             className={'border-red-500 font-normal inline-flex items-center gap-1 bg-red-50 text-red-700  '}>
                        <Bug className="size-4"/>
                        <span>
                        {totalBugs} {totalBugs === 1 ? "Bug" : "Bugs"}
                      </span>
                    </Badge>}

                </div>
            </div>
            {/*Main Contents*/}
            <div className={'flex-1  grid grid-cols-3  p-2 rounded-lg overflow-hidden'}>
                {/*Left Section*/}
               <TaskEditor isCreateMode={false}/>
                {/*Right Section*/}
                <div className="h-full max-h-full overflow-hidden flex flex-col">
                    <Card className="shadow-none w-full flex flex-col flex-1 overflow-hidden">
                        <CardHeader className="border-b px-4 py-3 shrink-0">Activity</CardHeader>
                        <CardContent className="px-4 overflow-y-auto flex-1">
                        </CardContent>
                    </Card>
                </div>
            </div>

        </div>
    </>
}

export default TaskDetailPage;