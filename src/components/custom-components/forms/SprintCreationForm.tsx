import {useForm} from "react-hook-form";
import {z} from "zod";
import {ProjectSchema} from "@/schemas/project.schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form,FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar.tsx";
import {useCreateSprint, useGetProjects} from "@/hooks/project.hooks.ts";
import {useParams} from "react-router-dom";
import {useWorkspaceStore} from "@/store/workspace.store.ts";
const SprintCreationForm = () => {
    const {projectId} = useParams()
    const currentWorkspaceId = useWorkspaceStore((state) => state.currentWorkspaceId)
    const {data:project} =useGetProjects(currentWorkspaceId as string);
    const currentProject = project.filter((project:any) => project.id == projectId);
    const {mutate} = useCreateSprint();
    const form = useForm<z.infer<typeof ProjectSchema>>({
        resolver: zodResolver(ProjectSchema),
        defaultValues:{
            name: `Sprint ${currentProject[0].sprint.length +1} `,
            startDate: new Date(),
            dueDate: new Date(Date.now() + 12096e5)
        }
    });

    const onSubmit = (values: z.infer<typeof ProjectSchema>) => {
        const data = {...values,project_id:projectId};
        mutate(data)

    }
   return <>
  <div className={'w-full md:w-[480px]  flex flex-col space-y-2 gap-4 overflow-auto'}>
        <h1 className={'font-semibold text-xl'}>Start a new sprint</h1>
        <Form {...form}>
            <form className={'flex flex-col space-y-6 h-full w-full'} onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    key="name"
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Sprint Name</FormLabel>
                            <FormControl>
                                <Input  placeholder="Enter your project name" {...field}/>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className={'flex justify-between items-center gap-4'}>
                    <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col w-full">
                                <FormLabel>Start Date</FormLabel>
                                <Popover modal={true}>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "pl-3 text-left font-normal",
                                                    !field.value && "text-gray-500"
                                                )}
                                            >
                                                {field.value ? format(field.value, "yyyy-MM-dd") : <span>Select a date</span>}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start"  onOpenAutoFocus={(e) => e.preventDefault()}
                                                    onCloseAutoFocus={(e) => e.preventDefault()}>
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) => date < new Date()} // Disable past dates
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dueDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col w-full">
                                <FormLabel>End Date</FormLabel>
                                <Popover modal={true}>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "pl-3 text-left font-normal",
                                                    !field.value && "text-gray-500"
                                                )}
                                            >
                                                {field.value ? format(field.value, "yyyy-MM-dd") : <span>Select a date</span>}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start"  onOpenAutoFocus={(e) => e.preventDefault()}
                                                    onCloseAutoFocus={(e) => e.preventDefault()}>
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                !form.watch("startDate") || date < form.watch("startDate")
                                            } // Disable dates before startDate
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </FormItem>
                        )}
                    />
                </div>
                <Button className={'ml-auto'}>Create</Button>
            </form>
        </Form>
    </div>
   </>
}

export default SprintCreationForm