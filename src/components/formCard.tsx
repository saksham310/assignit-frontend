import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {FormCardProps} from "@/types/form.type.ts";
import {z} from 'zod';
import {useState} from "react";

const FormCard = ({title, schema, onSubmit, btnText, footerText, footerLink, fields}: FormCardProps) => {
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {}
    });
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Card className="w-full h-full md:w-[460px] bg-white shadow-none border-none p-[24px]">
            <CardHeader className="flex justify-center items-center">
                <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8">
                        {fields.map((input) => (
                            <FormField
                                key={input.name} // Add a unique key for each field
                                control={form.control}
                                name={input.name}
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                className="h-[45px]"
                                                placeholder={input.placeholder}
                                                type={
                                                input.type==='password' && showPassword ?'text' : input.type
                                                }

                                                {...field}
                                            />
                                            <button>{input.icon}</button>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}
                        <Button type="submit">{btnText}</Button>
                    </form>
                </Form>
            </CardContent>
            <div className="flex items-start justify-center px-7">
                <Separator className="h-[2px]" />
            </div>
            <CardContent>
                <div className="flex flex-col items-center m-4">
                    <span className="text-sm font-light text-primary">or</span>
                    <p className="text-muted-foreground text-sm pt-2">
                        {footerText}&nbsp;
                        <span className="text-primary cursor-pointer">{footerLink}</span>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default FormCard;
