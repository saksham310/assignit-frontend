
export interface AnalyticCardProps{
    name: string,
    info: string,
    subInfo?:string,
}

export type TProjectSummary={
    projectName:string,
    startDate:string,
    endDate:string,
    progress:string;
}
export type TabConfig={
    value:string,
    label:string,
    component:React.ComponentType<any>
}