import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";

const AssignedTasks=()=>{
    return <>
        <Card className={' col-span-2 lg:col-span-1 w-full h-full flex flex-col  '}>
            <CardHeader className="text-m font-semibold">Assigned Tasks</CardHeader>
            <CardContent className={''}>
                <div className={'flex md:mt-16 flex-col gap-8 mx-auto items-center justify-center text-gray-400'}>
                    <p className={"text-sm "}> You currently have no tasks assigned</p></div>
            </CardContent>
        </Card></>
}

export default AssignedTasks;