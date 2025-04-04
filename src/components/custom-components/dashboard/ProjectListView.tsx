import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import SprintListView from "@/components/custom-components/dashboard/SprintListView.tsx";
import {Separator} from "@/components/ui/separator.tsx";




const ProjectListView = ({projectSprint}) => {
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