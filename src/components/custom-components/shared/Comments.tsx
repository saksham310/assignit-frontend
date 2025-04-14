import UserAvatar from "@/components/custom-components/shared/UserAvatar.tsx";
import moment from 'moment';
import { Comment } from "@/types/project.types.ts";

interface CommentProps {
    comment: Comment;
}

const getRelativeDate = (date: string) => {
    return moment(date).fromNow(); // Example: "a day ago", "2 hours ago", "Yesterday", etc.
}

const Comments = ({ comment }: CommentProps) => {
    // Avoiding unnecessary re-renders
    if (!comment) return null;

    return (
        <>
            {comment.type === 'comment' && (
                <div className="flex flex-col gap-2 p-2 border rounded-lg bg-gray-50">
                    <div className="flex gap-4 items-center">
                        <UserAvatar
                            src={comment.userImage}
                            avatarColor={comment.avatarColor}
                            name={comment.name}
                            className="size-8 text-sm"
                        />
                        <div className="flex-col text-sm w-full space-y-2">
                            <div className="flex items-center justify-between">
                                <p>{comment.name}</p>
                                <span className="text-xs text-gray-500">{getRelativeDate(comment.createdAt)}</span>
                            </div>
                            <p className="text-sm text-gray-700">{comment.message}</p>
                        </div>
                    </div>
                    {comment.attachment && (
                        <div className="items-center justify-center grid grid-cols-1">
                            <img src={comment.attachment} alt="Attachment" />
                        </div>
                    )}
                </div>
            )}
            {comment.type === 'activity' && (
                <div className="flex justify-between items-center text-xs text-gray-500 p-3 w-full space-y-1">
                    <div
                        className="flex items-center gap-2 justify-between text-nowrap overflow-hidden overflow-ellipsis"
                        style={{ fontSize: "11px" }}
                        title={`${comment.name} ${comment.message}`}
                    >
                        <span className="rounded-full size-1 min-w-1 bg-gray-500"></span>
                        <span className="text-nowrap overflow-hidden overflow-ellipsis">
              {comment.name} {comment.message}
            </span>
                    </div>
                    <span className="text-nowrap" style={{ fontSize: "10px" }}>
            {getRelativeDate(comment.createdAt)}
          </span>
                </div>
            )}
        </>
    );
}

export default Comments;
