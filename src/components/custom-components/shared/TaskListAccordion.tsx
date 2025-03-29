import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import UserAvatar from "@/components/custom-components/shared/UserAvatar.tsx";
import {cn} from "@/lib/utils.ts";
import {AlertCircle} from "lucide-react";


const selectedValues = [
    {id: "1", name: "Saksham Sharma", image: "path_to_image.jpg", avatarColor: '#A7C7FF'}, // Soft Light Blue
    {id: "2", name: "Jane Smith", image: "", avatarColor: '#FFB3B3'}, // Soft Light Red
    {id: "3", name: "Dean Kyle", image: "path_to_image.jpg", avatarColor: '#A7C72F'}, // Soft Light Blue
    {id: "4", name: "Roman Guy", image: "", avatarColor: '#FWB3B3'}, // Soft Light Red
];
const maxCount = 3
const TaskListAccordion = ({task} ) => {
    return (
        <>
            <Accordion type={"single"} collapsible defaultValue={task.name }>
                <AccordionItem value={task.name}>
                    <Card className={'shadow-none border-none'}>
                        <CardHeader className={' border-[#f6f8fb] rounded-lg px-3 py-2 mb-1 hover:bg-[#f6f8fb]'}>
                            <div className={'flex justify-between items-center'}>
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
                                <div className={'grid grid-cols-4 border-b p-2'}>
                                    <span>Create a login page</span>
                                    <div className="flex flex-wrap items-center gap-0.5 ">
                                        {selectedValues.slice(0, maxCount).map((value) => {
                                            return (

                                                <UserAvatar
                                                    name={value?.name || ""}
                                                    src={value?.image}
                                                    className={`h-6 w-6 text-black`}
                                                    avatarColor={value?.avatarColor}
                                                />
                                            );
                                        })}
                                        {selectedValues.length > maxCount && (
                                            <span
                                                className={cn(
                                                    "bg-transparent text-gray-500 border-foreground/1 hover:bg-transparent  font-normal text-xs",
                                                )}
                                            >
                                            {`+ ${selectedValues.length - maxCount}`}
                                        </span>
                                        )}
                                    </div>
                                    <Badge variant={'outline'} className={'border-red-500 font-normal inline-flex items-center gap-1 bg-red-50 text-red-700 w-fit '}>
                                        <AlertCircle className="size-4"/>
                                        <span>2 Bugs</span>
                                    </Badge>
                                    <span>Priority</span>
                                </div>
                                <div className={'grid grid-cols-4 border-b p-2'}>
                                    <span>Create a login page</span>
                                    <div className="flex flex-wrap items-center gap-0.5 ">
                                        {selectedValues.slice(0, maxCount).map((value) => {
                                            return (

                                                <UserAvatar
                                                    name={value?.name || ""}
                                                    src={value?.image}
                                                    className={`h-6 w-6 text-black`}
                                                    avatarColor={value?.avatarColor}
                                                />
                                            );
                                        })}
                                        {selectedValues.length > maxCount && (
                                            <span
                                                className={cn(
                                                    "bg-transparent text-gray-500 border-foreground/1 hover:bg-transparent  font-normal text-xs",
                                                )}
                                            >
                                            {`+ ${selectedValues.length - maxCount}`}
                                        </span>
                                        )}
                                    </div>
                                    <Badge variant={'outline'} className={'border-red-500 font-normal inline-flex items-center gap-1 bg-red-50 text-red-700 w-fit '}>
                                        <AlertCircle className="size-4"/>
                                        <span>2 Bugs</span>
                                    </Badge>
                                    <span>Priority</span>
                                </div>
                                <div className={'grid grid-cols-4 border-b p-2'}>
                                    <span>Create a login page</span>
                                    <div className="flex flex-wrap items-center gap-0.5 ">
                                        {selectedValues.slice(0, maxCount).map((value) => {
                                            return (

                                                <UserAvatar
                                                    name={value?.name || ""}
                                                    src={value?.image}
                                                    className={`h-6 w-6 text-black`}
                                                    avatarColor={value?.avatarColor}
                                                />
                                            );
                                        })}
                                        {selectedValues.length > maxCount && (
                                            <span
                                                className={cn(
                                                    "bg-transparent text-gray-500 border-foreground/1 hover:bg-transparent  font-normal text-xs",
                                                )}
                                            >
                                            {`+ ${selectedValues.length - maxCount}`}
                                        </span>
                                        )}
                                    </div>
                                    <Badge variant={'outline'} className={'border-red-500 font-normal inline-flex items-center gap-1 bg-red-50 text-red-700 w-fit '}>
                                        <AlertCircle className="size-4"/>
                                        <span>2 Bugs</span>
                                    </Badge>
                                    <span>Priority</span>
                                </div>
                                <div className={'grid grid-cols-4 border-b p-2'}>
                                    <span>Create a login page</span>
                                    <div className="flex flex-wrap items-center gap-0.5 ">
                                        {selectedValues.slice(0, maxCount).map((value) => {
                                            return (

                                                <UserAvatar
                                                    name={value?.name || ""}
                                                    src={value?.image}
                                                    className={`h-6 w-6 text-black`}
                                                    avatarColor={value?.avatarColor}
                                                />
                                            );
                                        })}
                                        {selectedValues.length > maxCount && (
                                            <span
                                                className={cn(
                                                    "bg-transparent text-gray-500 border-foreground/1 hover:bg-transparent  font-normal text-xs",
                                                )}
                                            >
                                            {`+ ${selectedValues.length - maxCount}`}
                                        </span>
                                        )}
                                    </div>
                                    <Badge variant={'outline'} className={'border-red-500 font-normal inline-flex items-center gap-1 bg-red-50 text-red-700 w-fit '}>
                                        <AlertCircle className="size-4"/>
                                        <span>2 Bugs</span>
                                    </Badge>
                                    <span>Priority</span>
                                </div>
                            </CardContent>
                        </AccordionContent>
                    </Card>
                </AccordionItem>
            </Accordion></>
    )
}
export default TaskListAccordion;