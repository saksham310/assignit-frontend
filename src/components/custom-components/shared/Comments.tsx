import UserAvatar from "@/components/custom-components/shared/UserAvatar.tsx";
import moment from 'moment';
import {Comment} from "@/types/project.types.ts";

interface  CommentProps {
    comment: Comment
}


const  getRelativeDate = (date:string) => {
    return moment(date).fromNow(); // Example: "a day ago", "2 hours ago", "Yesterday", etc.
}

const Comments = ({comment}:CommentProps) => {

    return <>
    {comment.type === 'comment' && (
    <div className={"flex gap-4 items-center p-3 border rounded-lg bg-gray-50 "}>
        <UserAvatar name={comment!.name} className={'size-8 text-sm'}/>

            <div className={'flex-col text-sm w-full space-y-2 '}>
                <div className={'flex items-center justify-between '}>
                    <p>{comment!.name}</p>
                    <span className={'text-xs text-gray-500'}>{getRelativeDate(comment.createdAt)}</span>
                </div>
                <p className={'text-xs text-gray-700'}>{comment!.message}</p>
            </div>

    </div>
    )}{comment.type === 'activity' && (
            <div className={'flex justify-between items-center text-xs  text-gray-500 p-3   w-full space-y-1'}>
                <div className={'flex items-center  gap-2 justify-between '}
                     style={{fontSize:"11px"}}>
                    <span className={'rounded-full size-1 min-w-1 bg-gray-500'}></span>
                    <span>{comment!.name} {comment!.message}</span>
                </div>
                <span className={'flex-1 text-nowrap'} style={{fontSize:"10px"}}>{getRelativeDate(comment.createdAt)}</span>
            </div>
        )}
    </>
}

export default Comments;