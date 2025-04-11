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
    {type === 'comment' && (
    <div className={"flex gap-4 items-center p-3 border rounded-lg bg-gray-50 "}>
        <UserAvatar name={comment!.name} className={'size-8 text-sm'}/>

            <div className={'flex-col text-sm w-full space-y-2 '}>
                <div className={'flex items-center justify-between '}>
                    <p>{comment!.name}</p>
                    <span className={'text-xs text-gray-500'}>{getRelativeDate(comment.createdAt)}</span>
                </div>
                <p className={'text-xs'}>{comment!.message}</p>
            </div>

    </div>
    )}{type === 'activity' && (
            <div className={'flex justify-between items-center text-xs  text-gray-500 p-3  w-full space-y-1'}>
                <div className={'flex items-center text-xs gap-1 justify-between '}>
                    <span className={'rounded-full size-1 bg-gray-500'}></span>
                    <p>{comment!.name} {comment!.message}</p>
                </div>
                <span style={{fontSize:"10px"}}>{getRelativeDate(comment.createdAt)}</span>
            </div>
        )}
    </>
}

export default Comments;