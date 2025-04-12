import Comments from "@/components/custom-components/shared/Comments.tsx";
import {useGetAllComments} from "@/hooks/task.hooks.ts";
import Loader from "@/components/custom-components/shared/Loader.tsx";
import {Comment} from "@/types/project.types.ts";
import {Ref} from "react";

const CommentPage = ({id,endCommentRef}: {id: number,endCommentRef:Ref<HTMLDivElement> }) => {
    const {data,isLoading} = useGetAllComments(id);
    if(isLoading){
        return <Loader/>
    }
    return <>
        {data.map((comment:Comment) => {
           return (<Comments comment={comment}/>)
        })}
        <div ref={endCommentRef} />
    </>
}

export default CommentPage;