import {z} from 'zod';
import {ReactNode} from "react";
export interface FormCardProps{
    title:string,
    schema:z.ZodSchema;
    onSubmit:(val:any)=>void;
    fields:FormFieldProps[];
    btnText:string;
    footerText:string;
    footerLink:string;
}

export interface FormFieldProps{
    name:string;
    placeholder:string;
    type:string;
    icon:ReactNode;
}