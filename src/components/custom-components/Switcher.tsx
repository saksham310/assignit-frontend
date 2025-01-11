import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {useParams} from "react-router-dom";
import {useDialogStore} from "@/store/dialog.store.ts";
import WorkspaceForm from "@/components/custom-components/WorkspaceForm.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {Separator} from "@/components/ui/separator.tsx";

interface SwitcherProps {
    onChange?: (id: string) => void,
    data?: {
        id:string,
        name:string
    }[],
}

const Switcher = ({onChange,data}:SwitcherProps) => {
    const {id}=useParams();
    const setOpen=useDialogStore((state)=>state.openDialog)
    const selectedValue = data?.find(item => item.id == id)?.id
    const onValChange = (val: string) => {
        if(val === "create"){
            setOpen(WorkspaceForm)
        }else{
           onChange && onChange(val);
        }
    }
    return (
        <Select onValueChange={onValChange} value={selectedValue}>
            <SelectTrigger className="w-auto lg:w-[175px] font-medium text-sm ">
                <SelectValue  placeholder='Select a Workspace'/>
            </SelectTrigger>
            <SelectContent className="w-[100%]">
                <div className={'max-h-72 flex flex-col'}>
                <ScrollArea className={'flex-1 overflow-y-auto scrollbar'}>
                    {data?.map((item) => (
                        <SelectItem key={item.id} value={item.id}>{item.name} </SelectItem>
                    ))}
                </ScrollArea>
                <Separator/>
                    <div className={'mt-auto'}>
                        <SelectItem key="create" value="create" className={'font-500 '}>Create a workspace </SelectItem>
                    </div>

                </div>
                </SelectContent></Select>);


}
export default Switcher;