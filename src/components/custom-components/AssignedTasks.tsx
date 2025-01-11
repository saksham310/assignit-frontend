import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";

const AssignedTasks=()=>{
    return <>
        <Card className={' col-span-1 w-full h-full flex flex-col  '}>
            <CardHeader className="text-m font-semibold">Assigned Tasks</CardHeader>
            <CardContent className={''}>
            </CardContent>
        </Card></>
}

export default AssignedTasks;