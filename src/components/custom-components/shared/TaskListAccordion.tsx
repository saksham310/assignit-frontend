import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import TaskRow from "@/components/custom-components/shared/TaskRow.tsx";

const TaskListAccordion = ({task} ) => {
    return (
        <>
            <Accordion type={"single"} collapsible defaultValue={task.name }>
                <AccordionItem value={task.name}>
                    <Card className={'shadow-none '}>
                        <CardHeader className={' border-[#f6f8fb] rounded-lg px-3 py-2 mb-1 '}>
                            <div className={'flex justify-between  items-center'}>

                                <span><Badge variant={'outline'} className={'border-2'} style={{borderColor:task.color,
                                color:task.color}}>{task.name}</Badge></span>
                                <AccordionTrigger/>
                            </div>
                        </CardHeader>
                        <AccordionContent>
                            <CardContent className={'flex flex-col space-y-6'}>
                                <div className={'grid grid-cols-4'}>
                                    <span className={'font-semibold'}>Task</span>
                                    <span className={'font-semibold'}>Assignee</span>
                                    <span className={'font-semibold'}>Bug Count</span>
                                    <span className={'font-semibold'}> Priority</span>
                                </div>
                                {task.tasks.map(task => (
                                    <TaskRow
                                        taskName={task.name}
                                        assignees={task.assignees}
                                        key={task.name}
                                        bugCount={task.bugCount}
                                        priority={task.priority}
                                    />
                                ))}
                            </CardContent>
                        </AccordionContent>
                    </Card>
                </AccordionItem>
            </Accordion></>
    )
}
export default TaskListAccordion;