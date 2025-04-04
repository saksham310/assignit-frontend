
import {
    CalendarDays,
    CircleCheckBig,
    FolderOpenDot,
    Folders,
    ListTodo, Loader,
    LucideIcon,
    UsersRound
} from "lucide-react";
export const ICONS:Record<string,LucideIcon> = {
    "Projects":FolderOpenDot,
    "Sprints":Folders,
    "Members":UsersRound,
    "Tasks":ListTodo,
    "Complete": CircleCheckBig,
    "Progress":Loader,
    "Due": CalendarDays

};