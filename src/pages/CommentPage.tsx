import Comments from "@/components/custom-components/shared/Comments.tsx";
import { useGetAllComments } from "@/hooks/task.hooks.ts";
import Loader from "@/components/custom-components/shared/Loader.tsx";
import { Comment } from "@/types/project.types.ts";
import { Ref } from "react";

const CommentPage = ({ id, endCommentRef }: { id: number; endCommentRef: Ref<HTMLDivElement> }) => {
    const { data, isLoading, isError } = useGetAllComments(id);

    // Early return for loading state
    if (isLoading) {
        return <Loader />;
    }

    // Early return for error state or if data is missing
    if (isError || !data) {
        return <div>Error loading comments.</div>;
    }

    return (
        <>
            {data.map((comment: Comment) => (
                <Comments key={comment.id} comment={comment} />
            ))}
            <div ref={endCommentRef} />
        </>
    );
};

export default CommentPage;
