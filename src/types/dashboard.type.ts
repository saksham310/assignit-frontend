import {ReactNode} from "react";

export interface AnalyticCardProps{
    name: string,
    count:number
}

export type ProjectSummary={
    projectName:string,
    startDate:string,
    endDate:string,
    progress:ReactNode;
}