import UserAvatar from "@/components/custom-components/shared/UserAvatar.tsx";
import moment from 'moment';

interface  CommentProps {
    comment: {name:string,message:string,createdAt: string}
    type: 'comment' | 'activity'
}


const  getRelativeDate = (date:string) => {
    return moment(date).fromNow(); // Example: "a day ago", "2 hours ago", "Yesterday", etc.
}

const Comments = ({comment,type}:CommentProps) => {

    return <>
    <div className="flex gap-4 items-center ">
        <UserAvatar name={comment!.name} className={'size-8 text-sm'}/>
        {type === 'comment' && (
            <div className={'flex-col text-sm w-full space-y-2'}>
                <div className={'flex items-center justify-between '}>
                    <p>{comment!.name}</p>
                    <span className={'text-xs text-gray-500'}>{getRelativeDate(comment.createdAt)}</span>
                </div>
                <p className={'text-xs'}>{comment!.message}</p>
            </div>
        )}
        {type === 'activity' && (
            <div className={'flex-col text-sm w-full space-y-1'}>
                <div className={'flex items-center justify-between '}>
                    <p>{comment!.name} {comment!.message}</p>
                </div>
                <p className={'text-xs'}>{getRelativeDate(comment.createdAt)}</p>
            </div>
        )}

    </div>
    </>
}

export default Comments;