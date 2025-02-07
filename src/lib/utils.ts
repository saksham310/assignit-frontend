import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const refreshPage = ()=>{
  setTimeout(()=> {
    window.location.reload();
  },1800);
}