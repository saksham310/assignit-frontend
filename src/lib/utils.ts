import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {BugType} from "@/types/project.types.ts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const refreshPage = ()=>{
  setTimeout(()=> {
    window.location.reload();
  },1800);
}

export const colorMap: Record<BugType, string> = {
  frontend: 'bg-blue-100', // Color for frontend bugs
  backend: 'bg-green-100', // Color for backend bugs
  database: 'bg-yellow-100', // Color for database bugs
};
export const getStatusColor = (statusName: string,statusList) =>{
  const status = statusList.find(item => item.name === statusName);
  return status ? status.color : null;
}

export const priorityFlagMap:Record<string,string> = {
  urgent:'red',
  high:'orange',
  medium:'green',
  low:'grey',
}