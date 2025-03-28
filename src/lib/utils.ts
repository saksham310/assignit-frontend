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
  frontend: 'bg-blue-50', // Color for frontend bugs
  backend: 'bg-green-50', // Color for backend bugs
  database: 'bg-yellow-50', // Color for database bugs
};