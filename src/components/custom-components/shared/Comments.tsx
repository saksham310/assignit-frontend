import UserAvatar from "@/components/custom-components/shared/UserAvatar.tsx";
import moment from 'moment';

interface  CommentProps {
    comment: {name:string,comment:string,createdAt: string}
}


const  getRelativeDate = (date) => {
    return moment(date).fromNow(); // Example: "a day ago", "2 hours ago", "Yesterday", etc.
}

const Comments = ({comment}:CommentProps) => {
    return <>
    <div className="flex gap-3 items-center ">
        <UserAvatar name={comment!.name} className={'size-8 text-sm'}/>
        <div className={'flex-col text-sm w-full space-y-2'}>
            <div className={'flex items-center justify-between '}>
                <p>{comment!.name}</p>
                <span className={'text-xs text-gray-500'}>{getRelativeDate(comment.createdAt)}</span>
            </div>
            <p className={'text-xs'}>{comment!.comment}</p>
        </div>
    </div>
    </>
}

export default Comments;