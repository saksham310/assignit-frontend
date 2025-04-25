
import {MultiSelect} from "@/components/ui/multi-select.tsx";

const AddProjectMembers = ({memberList,handleMember}) =>{
    return <>

       <div className={'bg-red border-3 items-center w-full'}>
           <MultiSelect options={memberList} onValueChange={handleMember} className={'max-w-[540px] min-h-[35px] w-[180px] border-2'}/>
       </div>
    </>
}

export default AddProjectMembers;