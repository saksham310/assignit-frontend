import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {FlagIcon} from "lucide-react";
import {priorityFlagMap} from "@/lib/utils.ts";

const PrioritySwitcher = () => {
    return <>
        <Select onValueChange={(val) => console.log(val)}>
            <SelectTrigger className="  w-fit   border-none shadow-none flex gap-4 ">
                <SelectValue className={'font-medium text-xs text-gray-500'} placeholder='Set Priority'/>
            </SelectTrigger>
            <SelectContent className="w-auto">
                <div className={'max-h-72 flex flex-col'}>
                    <ScrollArea className={'flex-1 overflow-y-auto scrollbar'}>
                        {Object.keys(priorityFlagMap)?.map(
                            (item) => (<SelectItem key={item} value={item} className={'text-gray-400'}>
                                    <span className={'flex items-center gap-2'}><FlagIcon className={'size-4'} fill={priorityFlagMap[item]}/>{item}</span>
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