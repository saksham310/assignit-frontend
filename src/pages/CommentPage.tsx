import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";
import Comments from "@/components/custom-components/shared/Comments.tsx";

const comments: Array<{ name: string, message: string, createdAt: string }> = [
    {
        name: 'John Doe',
        message: "I will be doing the UI part of the code.",
        createdAt: '2025-03-27T10:00:00Z' // Specific date
    },
    {
        name: 'Jane Smith',
        message: "I will handle the backend API integration.",
        createdAt: '2025-03-26T14:30:00Z' // Specific date
    },
    {
        name: 'Michael Brown',
        message: "I can work on the database schema and models.",
        createdAt: '2025-03-23T08:45:00Z' // Specific date
    },
    {
        name: 'Emily Davis',
        message: "I'll take care of the authentication flow.",
        createdAt: '2025-03-22T16:20:00Z' // Specific date
    },
    {
        name: 'Chris Wilson',
        message: "I will review and optimize the frontend performance.",
        createdAt: '2025-03-21T11:15:00Z' // Specific date
    },
    {
        name: 'Michael Brown',
        message: "I can work on the database schema and models.",
        createdAt: '2025-03-23T08:45:00Z' // Specific date
    },
    {
        name: 'Emily Davis',
        message: "I'll take care of the authentication flow.",
        createdAt: '2025-03-22T16:20:00Z' // Specific date
    },
    {
        name: 'Chris Wilson',
        message: "I will review and optimize the frontend performance.",
        createdAt: '2025-03-21T11:15:00Z' // Specific date
    },
    {
        name: 'Michael Brown',
        message: "I can work on the database schema and models.",
        createdAt: '2025-03-23T08:45:00Z' // Specific date
    },
    {
        name: 'Emily Davis',
        message: "I'll take care of the authentication flow.",
        createdAt: '2025-03-22T16:20:00Z' // Specific date
    },
    {
        name: 'Chris Wilson',
        message: "I will review and optimize the frontend performance.",
        createdAt: '2025-03-21T11:15:00Z' // Specific date
    }
];

const CommentPage = () => {
    return <>
    <div className={'h-full flex flex-col p-2 space-y-4 overflow-hidden'}>
        <div className="flex-1 min-h-0 n space-y-7">
            {comments.map((comment, i) => (
                <Comments key={i} comment={comment} type = 'comment' />
            ))}
        </div>
        <div className={'relative'}>
            <Textarea placeholder="Add a comment..." className="resize-none" rows={5} />
            <div className="flex justify-end mt-2 absolute bottom-2 right-2">
                <Button size="sm">Send</Button></div>
        </div>
    </div>
    </>
}

export default CommentPage;