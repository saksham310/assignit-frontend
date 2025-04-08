import {Badge} from "@/components/ui/badge.tsx";
import {Card, CardContent, CardHeader,} from "@/components/ui/card.tsx";
import {Bug,} from "lucide-react";
import {useState} from "react";
import {BugType, bugTypes} from "@/types/project.types.ts";
import TaskEditor from "@/components/custom-components/shared/TaskEditor.tsx";
import {useGetProjectStatusMembers} from "@/hooks/project.hooks.ts";
import Loader from "@/components/custom-components/shared/Loader.tsx";
import {useParams} from "react-router-dom";

const TaskDetailPage = () => {
   // TODO replace with fetched data
    const dummyTask = {
        id: 1,
        name: "Fix authentication issues",
        description: `
    <h2>Steps to Reproduce</h2>
    <ol>
      <li>Go to login page</li>
      <li>Enter valid credentials</li>
      <li>See error on redirect</li>
    </ol>
    <p><strong>Expected:</strong> Redirect to dashboard</p>
    <p><strong>Actual:</strong> Stuck on login with 500 error</p>
  `,
        sprint_id: 3,
        status_id: 5,
        priority: "High",
        bugCount: 5,
        FrontendBugCount: 2,
        BackendBugCount: 2,
        DatabaseBugCount: 1,
        status: {
            id: 5,
            name: "In Progress",
            color: "#4f46e5"
        },
        assignees:
            [
                {
                    "id": 5,
                    "imageUrl": "https://res.cloudinary.com/dcoky4dix/image/upload/v1744046907/user_profiles/bztm1631n2vzh4qforil.png",
                    "avatarColor": null,
                    "username": "sakshams._"
                }
        ]
    }
    const [bugCounts] = useState<Record<BugType, number>>({
        frontend: dummyTask.FrontendBugCount,
        backend: dummyTask.BackendBugCount,
        database: dummyTask.DatabaseBugCount,
    })
    const {projectId} = useParams();
    const totalBugs = bugTypes.reduce((acc, index) => acc + bugCounts[index], 0);
    const {data:projectStatusMember,isLoading} = useGetProjectStatusMembers(projectId)
    if(isLoading){
       return  <Loader/>
    }
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
               <TaskEditor isCreateMode={false} task={dummyTask}
                           status={projectStatusMember.projectStatus} members={projectStatusMember.projectMembers}/>
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