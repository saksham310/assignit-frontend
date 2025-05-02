// React & Routing
import {useNavigate, useParams} from "react-router-dom";

// Custom Hooks
import { useGetTaskDetails} from "@/hooks/task.hooks.ts";
import {useGetProjectStatusMembers} from "@/hooks/project.hooks.ts";

// UI Components
import {Badge} from "@/components/ui/badge.tsx";


// Custom Components
import Loader from "@/components/custom-components/shared/Loader.tsx";
import TaskEditor from "@/components/custom-components/shared/TaskEditor.tsx";

// Icons
import {X} from "lucide-react";

import CommentPage from "@/pages/CommentPage.tsx";


const TaskDetailPage = () => {
    const {taskId, projectId} = useParams();
    const navigate = useNavigate();
    const {data, isLoading: isTaskDetailsLoading} = useGetTaskDetails(taskId as string);
    const taskList = data ?? {};
    const {data: projectStatusMember, isLoading: isStatusLoading} = useGetProjectStatusMembers(projectId);
    const isLoading = isStatusLoading || isTaskDetailsLoading;


    if (isLoading || !projectStatusMember?.projectStatus) return <Loader/>;




    return (
        <div className="w-full flex flex-col gap-3 h-screen p-4 bg-gray-50">
            {/* Header */}
            <div className="flex justify-between gap-4">
                <div className="flex items-center gap-2">
                    <Badge variant="outline">Task Id :{taskList.id}</Badge>
                </div>
                <X className={'size-4 cursor-pointer'} onClick={() => navigate(-1)}/>
            </div>

            {/* Main Content */}
            <div className="flex-1 gap-4 grid grid-cols-3 p-2 rounded-lg overflow-hidden">
                {/* Left Section - TaskEditor */}
                <TaskEditor
                    isCreateMode={false}
                    task={taskList}
                    status={projectStatusMember?.projectStatus}
                    members={projectStatusMember?.projectMembers}
                />

                {/* Right Section - Comments */}
                <div className="h-full max-h-full overflow-hidden flex flex-col">
                            <CommentPage
                                id={taskList.id as number}
                            />
                </div>
            </div>
        </div>
    );
};

export default TaskDetailPage;
