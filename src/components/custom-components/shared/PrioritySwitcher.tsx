import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {FlagIcon} from "lucide-react";
import {priorityFlagMap} from "@/lib/utils.ts";


interface PrioritySwitcherProps {
    value:string;
    onChange:(value:string) => void;
}
const PrioritySwitcher = ({value,onChange}:PrioritySwitcherProps)  => {
    return <>
        <Select value={value} onValueChange={(val) =>{
            onChange(val)}}>
            <SelectTrigger className=" w-fit  border-none shadow-none  gap-4 ">
                <p className={'flex items-center gap-2  text-xs'}>
                  <FlagIcon className={'size-4'} fill={priorityFlagMap[value]}/> {value}</p>
            </SelectTrigger>
            <SelectContent className="w-auto">
                <div className={'max-h-72 flex flex-col text-xs'}>
                    <ScrollArea className={'flex-1 overflow-y-auto scrollbar'}>
                        {Object.keys(priorityFlagMap)?.map(
                            (item) => (<SelectItem key={item} value={item} className={'text-gray-400'}>
                                    <span className={'flex items-center gap-2 text-xs'}><FlagIcon className={'size-4'} fill={priorityFlagMap[item]}/>{item}</span>
                                </SelectItem>
                            )
                        )
                        }
                    </ScrollArea>
                </div>
            </SelectContent></Select>
    </>
}

export default PrioritySwitcher;