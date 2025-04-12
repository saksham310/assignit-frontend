// React & Routing
import {useParams} from "react-router-dom";

// Custom Hooks
import {useAddComment, useGetTaskDetails} from "@/hooks/task.hooks.ts";
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
import {MessageSquare, Paperclip, Send, Trash, X} from "lucide-react";

import CommentPage from "@/pages/CommentPage.tsx";
import {useRef, useState} from "react";
import {FaSpinner} from "react-icons/fa";


const TaskDetailPage = () => {
    const {taskId} = useParams();
    const {projectId} = useParams();
    const endCommentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLInputElement>(null);
    const {data, isLoading: isTaskDetailsLoading} = useGetTaskDetails(taskId as string);
    const dummyTask = data ?? {};
    const {data: projectStatusMember, isLoading: isStatusLoading} = useGetProjectStatusMembers(projectId);
    const isLoading = isStatusLoading || isTaskDetailsLoading;
    const [previewImage, setPreviewImage] = useState("");
    const [commentText, setCommentText] = useState("");
    const {mutate, isPending} = useAddComment()

    if (isLoading) {
        return <Loader/>
    }
    const saveComment = () => {
        if (!commentText.trim() && !previewImage) return;
        const form = new FormData(); // 🔄 Create here
        form.append("message", commentText.trim());
        form.append("type", "comment")

        if (imageRef.current?.files?.[0]) {
            form.append("attachment", imageRef.current.files[0]);
        }
        mutate({
            id: taskId ? parseInt(taskId) : 0,
            data: form
        }, {
            onSuccess: () => {
                setTimeout(() => {
                    endCommentRef.current?.scrollIntoView({behavior: 'smooth'});
                }, 300);
            }
        })
        setCommentText('');
        setPreviewImage('');
        if (imageRef.current) {
            imageRef.current.value = ""; 
        }

    };
    const handleImageChange = (e: any) => {
        const file = e.target.files?.[0];
        console.log(file);
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewImage(url)
        }
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
                            <CommentPage id={dummyTask.id as number} endCommentRef={endCommentRef}/>
                        </CardContent>

                        <CardContent className={'flex flex-col min-h-[150px] gap-2'}>
                            <Separator/>
                            <Textarea
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Add a comment..."
                                className="min-h-[80px] w-full resize-none text-sm"
                            />
                            {
                                previewImage && (
                                    <div className={'relative group cursor-pointer'} onClick={() => setPreviewImage('')}>
                                        <span
                                            className={'absolute cursor-pointer left-14 opacity-0  top-8  group-hover:opacity-100 group-hover:cursor-pointer'}><Trash
                                            size={'18'}/></span>
                                        <div className={'grid grid-cols-3 gap-2'} onMouseOver={() => console.log('hi')}>

                                            <img src={previewImage} alt="" className={'border group-hover:opacity-20'}/>
                                        </div>
                                    </div>
                                )
                            }

                            <div className={'flex items-center gap-2 ml-auto'}>
                                <Button variant="outline" size="sm" className="disabled:cursor-not-allowed text-xs"
                                        disabled={!!previewImage}
                                        onClick={() => imageRef.current?.click()}>
                                    <Paperclip/>
                                    <span>Attach</span>
                                    <input ref={imageRef} type="file" accept="image/*" hidden
                                           onChange={handleImageChange}/>
                                </Button>
                                <Button variant={'default'} size={'sm'} onClick={saveComment}
                                        disabled={!commentText.trim() && !previewImage}>
                                    {isPending ? <FaSpinner className={' animate-in spin-in repeat-infinite'}/> :
                                        <span className={'flex items-center gap-1'}><Send/> Comment</span>}
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
