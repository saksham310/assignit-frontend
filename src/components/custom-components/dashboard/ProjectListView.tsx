import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import SprintListView from "@/components/custom-components/dashboard/SprintListView.tsx";
import {Separator} from "@/components/ui/separator.tsx";


const projectSprint =  [
        {
            "id": "S1",
            "name": "Sprint 1",
            "taskStatus": [
                {
                    "name": "Completed",
                    "type": "Completed",
                    "color": "#008844",
                    "tasks": [
                        {
                            "id": 1,
                            "name": "Implement authentication",
                            "priority": "Low",
                            "bugCount": 0,
                            "assignees": [
                                { "id": "1", "name": "Saksham Sharma", "image": "path_to_image.jpg", "avatarColor": "#A7C7FF" }
                            ]
                        }
                    ]
                },
                {
                    "name": "In Progress",
                    "type": "In_Progress",
                    "color": "#f9d171",
                    "tasks": [
                        {
                            "id": 2,
                            "name": "Optimize database queries",
                            "priority": "Medium",
                            "bugCount": 1,
                            "assignees": [
                                { "id": "2", "name": "Jane Smith", "image": "", "avatarColor": "#FFB3B3" }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "S2",
            "name": "Sprint 2",
            "taskStatus": [
                {
                    "name": "Completed",
                    "type": "Completed",
                    "color": "#008844",
                    "tasks": [
                        {
                            "id": 3,
                            "name": "Fix UI responsiveness",
                            "priority": "High",
                            "bugCount": 0,
                            "assignees": [
                                { "id": "3", "name": "Dean Kyle", "image": "path_to_image.jpg", "avatarColor": "#A7C72F" }
                            ]
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
                            "assignees": [
                                { "id": "4", "name": "Roman Guy", "image": "", "avatarColor": "#FFB3B3" }
                            ]
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
                                    <div className={'flex gap-2 items-center'}>
                                        <AccordionTrigger/>
                                        <CardTitle>{sprint.name.toUpperCase()}</CardTitle>

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