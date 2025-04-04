import TabLayoutWrapper from "@/components/custom-components/shared/TabLayoutWrapper.tsx";
import {TabConfig} from "@/types/dashboard.type.ts";
import {useOutletContext} from "react-router-dom";
import {useEffect} from "react";
import {PlusCircle} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useDialogStore} from "@/store/dialog.store.ts";
import SprintCreationForm from "@/components/custom-components/forms/SprintCreationForm.tsx";
import ProjectListView from "@/components/custom-components/dashboard/ProjectListView.tsx";
import ProjectOverview from "@/components/custom-components/dashboard/ProjectOverview.tsx";
import {SprintWithTaskStatus} from "@/types/project.types.ts";



const projectSprint:SprintWithTaskStatus[] =  [
    {
        "id": 1,
        "name": "Sprint 1",
        "taskStatus": [
            {
                "name": "Completed",
                "type": "Completed",
                "color": "#008844",
                "tasks": [
                    {   id:1,
                        name: 'Implement authentication',
                        assignees: [
                            { id: 1, username: "Saksham Sharma", email: "saksham@example.com", image: "path_to_image.jpg", avatarColor: '#A7C7FF' }
                        ],
                        bugCount: 0,
                        priority: 'Low'
                    },]
            },
            {
                "name": "In Progress",
                "type": "In_Progress",
                "color": "#f9d171",
                "tasks": [
                    {   id:3,
                        name: 'Create dashboard UI',
                        assignees: [
                            { id: 3, username: "Dean Kyle", email: "dean@example.com", image: "path_to_image.jpg", avatarColor: '#A7C72F' }
                        ],
                        bugCount: 2,
                        priority: 'High'
                    },
                ]
            }
        ]
    },
    {
        "id": 2,
        "name": "Sprint 2",
        "taskStatus": [
            {
                "name": "Completed",
                "type": "Completed",
                "color": "#008844",
                "tasks": [
                    {
                        id:2,
                        name: 'Optimize database queries',
                        assignees: [
                            { id: 2, username: "Jane Smith", email: "jane@example.com", image: null, avatarColor: '#FFB3B3' }
                        ],
                        bugCount: 0,
                        priority: 'Medium'
                    }
                ]
            },
            {
                "name": "To Do",
                "type": "To_Do",
                "color": "#90a9d0",
                "tasks": [
                    {
                        "id": 4,
                        "name": "Implement notifications",
                        "priority": "High",
                        "bugCount": 2,
                        assignees: [
                            { id: 1, username: "Saksham Sharma", email: "saksham@example.com", image: "path_to_image.jpg", avatarColor: '#A7C7FF' },
                            { id: 4, username: "Roman Guy", email: "roman@example.com", image: null, avatarColor: '#FFB3B3' },
                            { id: 2, username: "Jane Smith", email: "jane@example.com", image: null, avatarColor: '#FFB3B3' },
                            { id: 3, username: "Dean Kyle", email: "dean@example.com", image: "path_to_image.jpg", avatarColor: '#A7C72F' }
                        ],
                    }
                ]
            }
        ]
    }
]
const projectData = {
    "id": 8,
    "name": "FYP",
    "startDate": "2025-02-22T18:15:00.000Z",
    "updatedAt": "2025-02-22T12:49:31.953Z",
    "dueDate": "2025-05-30T18:15:00.000Z",
    "toDo": 0,
    "inProgress": 0,
    "completed": 0,
    "tasks": 0,
    "highPriority": 3,
    "lowPriority": 4,
    "mediumPriority": 13,
    "members" : 4

}
const tabConfig: TabConfig[] = [
    {
        value: "overview",
        label: "Overview",
        component: () => <ProjectOverview projectSprint = {projectData}/>,
    },
    {
        value: "list",
        label: "List",
        component: () => <ProjectListView projectSprint={projectSprint}/>,
    },
    {
        value: "members",
        label: "Members",
        component: () => <> <div>TO DO </div></>,
    },
];


const ProjectDashboard = () =>{
    const setTitle = useOutletContext<(title: string) => void>();
    const setOpen = useDialogStore(state => state.openDialog)

    useEffect(() => {
        setTitle("Project")
    }, [setTitle]);
    const onCreateSprint = () => {
        setOpen(SprintCreationForm)
    }
    return <>

            <div className={'hidden lg:flex w-auto  items-center gap-x-4 absolute right-8'}>
        <Button variant={'outline'} size={'sm'} onClick={() =>onCreateSprint()}><PlusCircle/>Create
            Sprint</Button>
            </div>
    <TabLayoutWrapper tabConfig={tabConfig}/>
    </>
}

export default ProjectDashboard;