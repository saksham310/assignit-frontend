import Comments from "@/components/custom-components/shared/Comments.tsx";
import {useAddComment, useGetAllComments} from "@/hooks/task.hooks.ts";
import Loader from "@/components/custom-components/shared/Loader.tsx";
import {Comment} from "@/types/project.types.ts";
import {useRef, useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {MessageSquare, Paperclip, Send, Trash} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";
import {FaSpinner} from "react-icons/fa";

interface CommentPageProps {
    id: number;
}

const CommentPage = ({id}: CommentPageProps) => {
    const {data, isLoading, isError} = useGetAllComments(id);
    const endCommentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLInputElement>(null);
    const [editCommentId, setEditCommentId] = useState<number | null>(null);
    const [previewImage, setPreviewImage] = useState<string>('');
    const {mutate, isPending} = useAddComment();
    const [commentText, setCommentText] = useState<string>('');
    const buttonLabel = editCommentId ? "Update" : "Add";

    const saveComment = () => {
        if (!commentText.trim() && !previewImage) return; // Prevent submitting empty comment
        const form = new FormData();
        form.append("message", commentText.trim());
        form.append("type", "comment");

        if (imageRef.current?.files?.[0]) {
            form.append("attachment", imageRef.current.files[0]);
        }else if (editCommentId && previewImage) {
            // Only send this if it's an existing image that hasn't been changed
            form.append("existing_attachment", previewImage);
        }


        if (editCommentId) {
            form.append('comment_id',editCommentId.toString())
        }
            mutate(
                {
                    id: id ?? 0,
                    data: form,
                },
                {
                    onSuccess: () => {
                        setTimeout(() => {
                            endCommentRef.current?.scrollIntoView({behavior: 'smooth'});
                        }, 300);
                    },
                }
            );
            onCancelEdit();
            setCommentText('');
            setPreviewImage('');
            if (imageRef.current) {
                imageRef.current.value = '';
            }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewImage(url);
        }
    };

    // Early return for loading state
    if (isLoading) {
        return <Loader/>;
    }

    // Early return for error state or if data is missing
    if (isError || !data) {
        return <div>Error loading comments.</div>;
    }
    const onCancelEdit = () => {
        setEditCommentId(null)
        setCommentText('')
        setPreviewImage('')
    }
    return (
        <>
            <Card className="shadow-none border-none w-full flex flex-col flex-1 overflow-hidden">
                <CardHeader className="px-4 py-4 shrink-0 font-medium flex gap-1">
                    <CardTitle className="flex items-center gap-1 text-primary">
                        <MessageSquare className="h-5 w-5"/>
                        <p>Comments</p>
                    </CardTitle>
                </CardHeader>

                <CardContent className="p-4 overflow-y-auto flex-1 flex flex-col gap-3 scrollbar">
                    {data.map((comment: Comment) => (
                        <Comments
                            key={comment.id}
                            comment={comment}
                            isEditing={editCommentId === comment.id}
                            editText={commentText}
                            editImage={previewImage}
                            isBlur={editCommentId !== null && editCommentId !== comment.id}
                            taskId={id}
                            onEdit={() => {
                                setEditCommentId(comment.id)
                                setCommentText(comment.message)
                                setPreviewImage(comment.attachment ?? '')

                            }}
                        />
                    ))}
                    <div ref={endCommentRef}/>
                </CardContent>

                <CardContent className="flex flex-col min-h-[150px] gap-2">
                    <Separator/>
                    <Textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Add a comment..."
                        className="min-h-[80px] w-full resize-none text-sm"
                    />

                    {previewImage && (
                        <div className="relative group cursor-pointer" onClick={() => setPreviewImage('')}>
                  <span
                      className="absolute cursor-pointer left-14 opacity-0 top-8 group-hover:opacity-100 group-hover:cursor-pointer">
                    <Trash size={18}/>
                  </span>
                            <div className="grid grid-cols-3 gap-2">
                                <img src={previewImage} alt="Preview"
                                     className="border group-hover:opacity-20"/>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center gap-2 ml-auto">
                        <Button
                            variant="outline"
                            size="sm"
                            className="disabled:cursor-not-allowed text-xs"
                            disabled={!!previewImage}
                            onClick={() => imageRef.current?.click()}
                        >
                            <Paperclip/>
                            <span>Attach</span>
                            <input
                                ref={imageRef}
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleImageChange}
                            />
                        </Button>

                        {editCommentId && <Button
                            variant="secondary"
                            size="sm"
                            onClick={onCancelEdit}>
                            <span className="flex items-center gap-1">Cancel</span>
                        </Button>
                        }
                        <Button
                            variant="default"
                            size="sm"
                            onClick={saveComment}
                            disabled={!commentText.trim() && !previewImage}
                        >
                            {isPending ? (
                                <FaSpinner className="animate-in spin-in repeat-infinite"/>
                            ) : (
                                <span className="flex items-center gap-1">
                      <Send/>
                                    {buttonLabel}
                    </span>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default CommentPage;
