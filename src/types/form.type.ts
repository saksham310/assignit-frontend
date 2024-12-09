import {z} from 'zod';
import {IconType} from "react-icons";


export interface FormCardProps{
    title:string,
    schema:z.ZodSchema;
    onSubmit:(val:any)=>void;
    fields:FormFieldProps[];
    btnText:string;
    footerText?:string;
    footerLinkText?:string;
}

export interface FormFieldProps{
    name:string;
    placeholder:string;
    type:string;
    icon:IconType;

}