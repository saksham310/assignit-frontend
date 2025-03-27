import Comments from "@/components/custom-components/shared/Comments.tsx";

const activity = [
    {
        "name": "John Doe",
        "message": "updated the task description.",
        "createdAt": "2025-03-12T14:20:00Z"
    },
    {
        "name": "Jane Smith",
        "message":  "changed the task title.",
        "createdAt": "2025-03-13T14:25:00Z"
    },
    {
        "name": "Michael Brown",
        "message": "assigned Emily Davis to the task.",
        "createdAt": "2025-03-14T14:30:00Z"
    },
    {
        "name": "Michael Brown",
        "message": "assigned Emily Davis to the task.",
        "createdAt": "2025-03-27T14:30:00Z"
    },
    {
        "name": "Jane Smith",
        "message":  "changed the task title.",
        "createdAt": "2025-03-13T14:25:00Z"
    },
    {
        "name": "Michael Brown",
        "message": "assigned Emily Davis to the task.",
        "createdAt": "2025-03-14T14:30:00Z"
    },
    {
        "name": "Michael Brown",
        "message": "assigned Emily Davis to the task.",
        "createdAt": "2025-03-27T14:30:00Z"
    },
    {
        "name": "Jane Smith",
        "message":  "changed the task title.",
        "createdAt": "2025-03-13T14:25:00Z"
    },
    {
        "name": "Michael Brown",
        "message": "assigned Emily Davis to the task.",
        "createdAt": "2025-03-14T14:30:00Z"
    },
    {
        "name": "Michael Brown",
        "message": "assigned Emily Davis to the task.",
        "createdAt": "2025-03-27T14:30:00Z"
    }
]

const ActivityPage = () => {
    return <>
        <div className={'h-full flex flex-col p-2 space-y-4'}>
        <div className="flex-1 min-h-0 overflow-y-auto space-y-7">
            {activity.map((item,id) => (
                <Comments comment={item} type={'activity'} key={id} />
            ))}

    </div>
        </div>
    </>
}

export default ActivityPage;