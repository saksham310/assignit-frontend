import UserAvatar from "@/components/custom-components/shared/UserAvatar.tsx";
import moment from 'moment';
import {Comment} from "@/types/project.types.ts";
import {Button} from "@/components/ui/button.tsx";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {User} from "@/types/auth.type.ts";

interface CommentProps {
    comment: Comment;
    isEditing?: boolean;
    isBlur?: boolean;
    onEdit?: () => void;
    onCancelEdit?: () => void;
    editText: string;
    editImage: string;
}

const getRelativeDate = (date: string) => {
    return moment(date).fromNow(); // Example: "a day ago", "2 hours ago", "Yesterday", etc.
}

const Comments = ({comment, isBlur, isEditing, onEdit, editImage, editText}: CommentProps) => {
    const user = useAuthUser<User>();
    const currentUserId = user?.id;
    if (!comment) return null;

    return (
        <>
            {comment.type === 'comment' && (
                <div className={`flex flex-col gap-2 p-2 border rounded-lg ${
                    isBlur ? "opacity-20 bg-gray-100 pointer-events-none" : ""}
                    ${isEditing ? "bg-white" : "bg-gray-50"}
                    `}>
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
                            <p className="text-sm text-gray-700">{isEditing ? editText : comment.message}</p>
                        </div>
                    </div>
                    {!isEditing && comment.userId === currentUserId && (
                        <div className="flex justify-end">
                            <Button size="sm" variant="ghost" onClick={onEdit}>Edit</Button>
                        </div>
                    )}
                    {comment.attachment && (
                        <div className="items-center justify-center grid grid-cols-1">
                            <img src={isEditing ? editImage : comment.attachment} alt="Attachment"/>
                        </div>
                    )}
                </div>
            )}
            {comment.type === 'activity' && (
                <div className="flex justify-between items-center text-xs text-gray-500 p-3 w-full space-y-1">
                    <div
                        className="flex items-center gap-2 justify-between text-nowrap overflow-hidden overflow-ellipsis"
                        style={{fontSize: "11px"}}
                        title={`${comment.name} ${comment.message}`}
                    >
                        <span className="rounded-full size-1 min-w-1 bg-gray-500"></span>
                        <span className="text-nowrap overflow-hidden overflow-ellipsis">
              {comment.name} {comment.message}
            </span>
                    </div>
                    <span className="text-nowrap" style={{fontSize: "10px"}}>
            {getRelativeDate(comment.createdAt)}
          </span>
                </div>
            )}
        </>
    );
}

export default Comments;
