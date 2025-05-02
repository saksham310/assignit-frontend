import Comments from "@/components/custom-components/shared/Comments.tsx";
import {useGetAllComments} from "@/hooks/task.hooks.ts";
import Loader from "@/components/custom-components/shared/Loader.tsx";
import {Comment} from "@/types/project.types.ts";
import {Ref, useState} from "react";

interface CommentPageProps {
    id: number;
    endCommentRef: Ref<HTMLDivElement>;
    setPreviewImage:React.Dispatch<React.SetStateAction<string>>;
    setCommentText:React.Dispatch<React.SetStateAction<string>>;
    setCommentId:React.Dispatch<React.SetStateAction<number|null>>;
    commentMessage:string;
    commentImage:string

}

const CommentPage = ({id,endCommentRef,setCommentText,setCommentId,setPreviewImage,commentMessage,commentImage}: CommentPageProps) => {
    const {data, isLoading, isError} = useGetAllComments(id);
    const [editCommentId, setEditCommentId] = useState<number | null>(null);
    // Early return for loading state
    if (isLoading) {
        return <Loader/>;
    }

    // Early return for error state or if data is missing
    if (isError || !data) {
        return <div>Error loading comments.</div>;
    }

    return (
        <>
            {data.map((comment: Comment) => (
                <Comments
                    key={comment.id}
                    comment={comment}
                    isEditing={editCommentId === comment.id}
                    editText ={commentMessage}
                    editImage ={commentImage}
                    isBlur={editCommentId !== null && editCommentId !== comment.id}
                    onEdit={() => {
                        setEditCommentId(comment.id)
                        setCommentText(comment.message)
                        setPreviewImage(comment.attachment ?? '')
                        setCommentId(comment.id)

                    }}
                    onCancelEdit={() => {
                        setEditCommentId(null)
                        setCommentText('')
                        setPreviewImage('')
                    }}
                />
            ))}
            <div ref={endCommentRef}/>
        </>
    );
};

export default CommentPage;
