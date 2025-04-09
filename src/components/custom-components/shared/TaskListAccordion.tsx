import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import TaskRow from "@/components/custom-components/shared/TaskRow.tsx";

const TaskListAccordion = ({task} ) => {
    return (
        <>
            <Accordion type={"single"} collapsible defaultValue={task.name }>
                <AccordionItem value={task.name}>
                    <Card className={'shadow-none border-none '}>
                        <CardHeader className={' rounded-lg px-3 py-2 mb-1 '}>
                            <div className={'flex justify-between  items-center'}>

                                <div className={'flex items-center gap-2'}>
                                    <span className={'size-4 border-2  rounded-full  flex items-center justify-center'} style={{borderColor:task.color}}>
                                    <span className={'rounded-full size-2 '} style={{backgroundColor:task.color}}></span>
                                </span>
                                   <span className={'text-sm font-semibold'}> {task.name}</span></div>

                                <AccordionTrigger/>
                            </div>
                        </CardHeader>
                        <AccordionContent>
                            {task.tasks.length > 0 &&
                                ( <CardContent className={'flex flex-col space-y-2'}>
                                    <div className={'grid grid-cols-4 items-center text-xs'}>
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
                                </CardContent>)
                             }

                        </AccordionContent>
                    </Card>
                </AccordionItem>
            </Accordion></>
    )
}
export default TaskListAccordion;