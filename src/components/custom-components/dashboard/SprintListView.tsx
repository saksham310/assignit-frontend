import TaskListAccordion from "@/components/custom-components/shared/TaskListAccordion.tsx";

const taskStatus = [
    {
        name: 'Completed',
        type: 'Completed',
        color: '#008844',
        tasks: [
            {   id:1,
                name: 'Implement authentication',
                assignees: [
                    { id: "1", name: "Saksham Sharma", image: "path_to_image.jpg", avatarColor: '#A7C7FF' }
                ],
                bugCount: 0,
                priority: 'Low'
            },
            {
                id:2,
                name: 'Optimize database queries',
                assignees: [
                    { id: "2", name: "Jane Smith", image: "", avatarColor: '#FFB3B3' }
                ],
                bugCount: 0,
                priority: 'Medium'
            }
        ]
    },
    {
        name: 'In Progress',
        type: 'In_Progress',
        color: '#f9d171',
        tasks: [
            {   id:3,
                name: 'Create dashboard UI',
                assignees: [
                    { id: "3", name: "Dean Kyle", image: "path_to_image.jpg", avatarColor: '#A7C72F' }
                ],
                bugCount: 2,
                priority: 'High'
            },
            {
                id:4,
                name: 'Fix API endpoint bugs',
                assignees: [
                    { id: "1", name: "Saksham Sharma", image: "path_to_image.jpg", avatarColor: '#A7C7FF' },
                    { id: "4", name: "Roman Guy", image: "", avatarColor: '#FFB3B3' },
                    { id: "2", name: "Jane Smith", image: "", avatarColor: '#FFB3B3' },
                    { id: "3", name: "Dean Kyle", image: "path_to_image.jpg", avatarColor: '#A7C72F' }
                ],
                bugCount: 1,
                priority: 'High'
            }
        ]
    },
    {
        name: 'To Do',
        type: 'To_Do',
        color: '#90a9d0',
        tasks: [
            {   id:5,
                name: 'Set up CI/CD pipeline',
                assignees: [
                    { id: "4", name: "Roman Guy", image: "", avatarColor: '#FFB3B3' }
                ],
                bugCount: 1,
                priority: 'Medium'
            },
            {
                id:6,
                name: 'Write unit tests',
                assignees: [
                    { id: "2", name: "Jane Smith", image: "", avatarColor: '#FFB3B3' }
                ],
                bugCount: 0,
                priority: 'Low'
            }
        ]
    }
];

const SprintListView = () => {
    return <>
        <div className={'flex flex-col gap-0.5'}>
            {taskStatus.map((task) => (
                <TaskListAccordion task={task}/>
            ))}
        </div>
    </>
}

export default SprintListView;