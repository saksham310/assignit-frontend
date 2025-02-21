import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {Input} from "@/components/ui/input.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {format} from "date-fns"
import {cn} from "@/lib/utils.ts";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar.tsx";
import {ProjectSchema} from "@/schemas/project.schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Label} from "@/components/ui/label.tsx";
import {RadioGroupItem, RadioGroup} from "@/components/ui/radio-group.tsx";
import {useState} from "react";
import CustomStatusForm from "@/components/custom-components/forms/CustomStatusForm.tsx";

const ProjectCreationForm = () => {
    const [step, setStep] = useState(0);
    const [value, setValue] = useState<string>('default');
    const form = useForm<z.infer<typeof ProjectSchema>>({
        resolver: zodResolver(ProjectSchema)
    });

    const handleStepChange = (value:string) => {
        if (value === 'custom') {
            setStep(1)
            setValue('custom')
            return
        }
        setStep(0)
    }
    if (step === 1) {
       return  <CustomStatusForm handleStepChange={handleStepChange}/>
    }
        return (<>
            <div className={'w-full md:w-[480px] h-[350px] flex flex-col space-y-2 gap-4 overflow-auto'}>
                <h1 className={'font-semibold text-xl'}>Create a new project</h1>
                <Form {...form}>
                    <form className={'flex flex-col space-y-6 h-full w-full'}>
                        <FormField
                            key="name"
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Project Name</FormLabel>
                                    <FormControl>
                                        <Input  {...field}/>
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
                                            <PopoverContent className="w-auto p-0" align="start">
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
                                            <PopoverContent className="w-auto p-0" align="start">
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
                        <div className="flex flex-col space-y-6">
                            <Label>Status</Label>
                            <RadioGroup defaultValue={value} className={'flex items-center gap-10'} onValueChange={(value)=>handleStepChange(value)}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="default" id="r1"/>
                                    <Label htmlFor="r1">Default</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="custom" id="r2"/>
                                    <Label htmlFor="r2">Custom</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <Button className={'ml-auto'}>Create</Button>
                    </form>
                </Form>
            </div>
        </>)

}

export default ProjectCreationForm;