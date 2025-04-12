// React & Routing
import {useParams} from "react-router-dom";

// Custom Hooks
import {useGetTaskDetails} from "@/hooks/task.hooks.ts";
import {useGetProjectStatusMembers} from "@/hooks/project.hooks.ts";

// UI Components
import {Badge} from "@/components/ui/badge.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Separator} from "@/components/ui/separator";

// Custom Components
import Loader from "@/components/custom-components/shared/Loader.tsx";
import TaskEditor from "@/components/custom-components/shared/TaskEditor.tsx";

// Icons
import {MessageSquare, Paperclip, Send} from "lucide-react";

import CommentPage from "@/pages/CommentPage.tsx";

const TaskDetailPage = () => {
    const {taskId} = useParams();
    const {projectId} = useParams();

    const {data, isLoading: isTaskDetailsLoading} = useGetTaskDetails(taskId as string);
    const dummyTask = data ?? {};


    const {data: projectStatusMember, isLoading: isStatusLoading} = useGetProjectStatusMembers(projectId);
    const isLoading = isStatusLoading || isTaskDetailsLoading;

    if (isLoading) {
        return <Loader/>
    }

    return (
        <div className={'w-full flex flex-col gap-4 h-screen p-4 bg-gray-50 '}>
            {/* Header */}
            <div className={'flex flex-col gap-4'}>
                <div className={'flex items-center gap-2 '}>
                    <Badge variant={'outline'}>Task Id</Badge>
                </div>
            </div>

            {/* Main Content */}
            <div className={'flex-1 gap-4 grid grid-cols-3 p-2 rounded-lg overflow-hidden'}>
                {/* Left Section - TaskEditor */}
                <TaskEditor
                    isCreateMode={false}
                    task={dummyTask}
                    status={projectStatusMember?.projectStatus}
                    members={projectStatusMember?.projectMembers}
                />

                {/* Right Section - Comments */}
                <div className="h-full max-h-full overflow-hidden flex flex-col">
                    <Card className="shadow-none border-none w-full flex flex-col flex-1 overflow-hidden">
                        <CardHeader className="px-4 py-4 shrink-0 font-medium flex gap-1">
                            <CardTitle className={'flex items-center gap-1 text-primary'}>
                                <MessageSquare className="h-5 w-5"/>
                                <p>Comments</p>
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="p-4 overflow-y-auto flex-1 flex flex-col gap-3 scrollbar">
                            <CommentPage id={dummyTask.id as number} />
                        </CardContent>

                        <CardContent className={'flex flex-col min-h-[150px] gap-2'}>
                            <Separator/>
                            <Textarea
                                placeholder="Add a comment..."
                                className="min-h-[80px] w-full resize-none text-sm"
                                onChange={(e) => console.log(e.target.value)}
                            />
                            <div className={'flex items-center gap-2 ml-auto'}>
                                <Button variant="outline" size="sm" className=" text-xs">
                                    <Paperclip />
                                    <span>Attach</span>
                                </Button>
                                <Button variant={'default'} size={'sm'}>
                                    <Send/> Comment
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default TaskDetailPage;
