import {Badge} from "@/components/ui/badge.tsx";
import {Card, CardContent, CardHeader, CardTitle,} from "@/components/ui/card.tsx";
import {Bug, MessageSquare, Paperclip, Send,} from "lucide-react";
import {useState} from "react";
import {BugType, bugTypes} from "@/types/project.types.ts";
import TaskEditor from "@/components/custom-components/shared/TaskEditor.tsx";
import {useGetProjectStatusMembers} from "@/hooks/project.hooks.ts";
import Loader from "@/components/custom-components/shared/Loader.tsx";
import {useParams} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Separator} from "@/components/ui/separator";

const TaskDetailPage = () => {
   // TODO replace with fetched data
    const dummyTask = {
        id: 1,
        name: "Fix authentication issues",
        description: `<h3><strong>Steps to Reproduce:</strong></h3><p>
</p><ol><li data-list="unchecked"><span class="ql-ui" contenteditable="false"></span>Navigate to the Login page</li><li data-list="unchecked"><span class="ql-ui" contenteditable="false"></span>Enter valid user credentials (email and password)</li><li data-list="unchecked"><span class="ql-ui" contenteditable="false"></span>Click the "Login" button</li><li data-list="unchecked"><span class="ql-ui" contenteditable="false"></span>Observe behavior after submission</li></ol><p>

</p><p><strong>Expected Result:</strong> User should be successfully redirected to the Dashboard</p><p>
</p><p><strong>Actual Result:</strong> User remains on the Login page and receives a 500 Internal Server Error</p><p>
</p> 2 Editor.tsx:40:16
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
        <div className={'w-full flex flex-col gap-4 h-screen p-4 bg-gray-50 '}>
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
            <div className={'flex-1 gap-4 grid grid-cols-3 p-2 rounded-lg overflow-hidden'}>
                {/*Left Section*/}
               <TaskEditor isCreateMode={false} task={dummyTask}
                           status={projectStatusMember.projectStatus} members={projectStatusMember.projectMembers}/>
                {/*Right Section*/}
                <div className="h-full max-h-full overflow-hidden flex flex-col  ">
                    <Card className="shadow-none border-none  w-full flex flex-col flex-1 overflow-hidden">
                        <CardHeader className=" px-4 py-4 shrink-0 font-medium flex gap-1">
                            <CardTitle className={'flex items-center gap-1'}><MessageSquare className="h-5 w-5" /><p>Comments</p></CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 overflow-y-auto flex-1 flex flex-col gap-3 ">

                        </CardContent>
                        <CardContent className={'flex flex-col min-h-[150px] gap-2'}>
                            <Separator/>
                              <Textarea
                                  placeholder="Add a comment..."
                                  className="min-h-[80px]  w-full  resize-none text-sm"
                                  onChange={(e) => console.log(e.target.value)}
                              />
                            <div className={'flex items-center gap-1 ml-auto'}>
                                <Button variant="outline" size="sm" className="h-7 text-xs">
                                    <Paperclip className="h-3.5 w-3.5 mr-1" />
                                    <span>Attach</span>
                                </Button>
                                <Button variant={'outline'} size={'sm'} className={''}><Send/> Comment</Button>
                            </div>

                        </CardContent>
                    </Card>
                </div>
            </div>

        </div>
    </>
}

export default TaskDetailPage;