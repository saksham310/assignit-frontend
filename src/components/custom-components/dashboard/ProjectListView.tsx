import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import SprintListView from "@/components/custom-components/dashboard/SprintListView.tsx";
import {Separator} from "@/components/ui/separator.tsx";
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

const ProjectListView = () => {
    return (
        <>
            <div className={'flex flex-col gap-0.5'}>
                {projectSprint.map((sprint)=> {
                    return <Accordion type={'single'} collapsible  defaultValue={sprint.name} key={sprint.id}>
                        <AccordionItem value={sprint.name}>
                            <Card className={'shadow-none border-none'}>
                                <CardHeader className={' border-[#f6f8fb] rounded-lg px-3 py-2 mb-1 hover:bg-[#f6f8fb]'}>
                                    <div className={'flex justify-between items-center'}>

                                        <CardTitle>{sprint.name.toUpperCase()}</CardTitle>
                                        <AccordionTrigger/>
                                    </div>
                                </CardHeader>
                                <AccordionContent>
                                    <CardContent className={'flex flex-col space-y-6'}>
                                        <SprintListView/>
                                    </CardContent>
                                </AccordionContent>
                            </Card>
                        </AccordionItem>
                        <Separator className={'bg-gray-200'}/>
                    </Accordion>
                })}

            </div>
        </>
    )
}

export default ProjectListView;