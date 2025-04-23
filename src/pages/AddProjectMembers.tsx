import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {MultiSelect} from "@/components/ui/multi-select.tsx";

const AddProjectMembers = ({memberList}) =>{
    return <>
    <Card className={'h-full w-full md:w-[560px] shadow-none  border-none'}>
        <CardHeader className={'text-center font-bold text-xl'}>
            <CardTitle>Add Members to Project</CardTitle>
        </CardHeader>
        <CardContent>
       <div className={'w-full bg-red border-3'}>
           <MultiSelect options={memberList} onValueChange={()=>{}} className={'max-w-[540px] border-2'}/>
       </div>
        </CardContent>
    </Card>
    </>
}

export default AddProjectMembers;