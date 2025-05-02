import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import TaskRow from "@/components/custom-components/shared/TaskRow.tsx";
import {TaskStatus} from "@/types/project.types.ts";

interface TaskListAccordionProps {
    task: TaskStatus;
    members?: any // Replace with the actual type you're using
}

const TaskListAccordion = ({ task, members }: TaskListAccordionProps ) => {
    return (
        <>
            <Accordion type={"single"} collapsible defaultValue={task.name}>
                <AccordionItem value={task.name} className="border-none">
                    <Card className={'shadow-sm border border-gray-100'}>
                        <CardHeader className={'rounded-lg px-4 py-3 mb-1 bg-gray-50'}>
                            <div className={'flex justify-between items-center'}>
                                <div className={'flex items-center gap-2'}>
                                    <span className={'size-5 border-2 rounded-full flex items-center justify-center'} 
                                          style={{borderColor:task.color}}>
                                        <span className={'rounded-full size-2.5'} 
                                              style={{backgroundColor:task.color}}></span>
                                    </span>
                                    <span className={'text-sm font-semibold'}>{task.name}</span>
                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                        {task.tasks.length} {task.tasks.length === 1 ? 'task' : 'tasks'}
                                    </span>
                                </div>
                                <AccordionTrigger/>
                            </div>
                        </CardHeader>
                        <AccordionContent>
                            {task.tasks.length > 0 ? (
                                <CardContent className={'flex flex-col space-y-2 p-4'}>
                                    <div className={'grid grid-cols-4 gap-4 items-center text-xs bg-gray-50 p-3 rounded-md'}>
                                        <span className={'font-semibold text-gray-700'}>Task</span>
                                        <span className={'font-semibold text-gray-700'}>Assignee</span>
                                        <span className={'font-semibold text-gray-700'}>Bug Count</span>
                                        <span className={'font-semibold text-gray-700'}>Priority</span>
                                    </div>
                                    {task.tasks.map(task => (
                                        <TaskRow
                                            taskId={task.id}
                                            taskName={task.name}
                                            assignees={task.assignees}
                                            key={task.id}
                                            bugCount={task.bugCount}
                                            priority={task.priority}
                                            members={members}
                                        />
                                    ))}
                                </CardContent>
                            ) : (
                                <CardContent className="p-8 text-center text-gray-500">
                                    No tasks available in this section
                                </CardContent>
                            )}
                        </AccordionContent>
                    </Card>
                </AccordionItem>
            </Accordion>
        </>
    )
}
export default TaskListAccordion;