import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {useDialogStore} from "@/store/dialog.store.ts";
import WorkspaceForm from "@/components/custom-components/forms/WorkspaceForm.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {PlusCircle} from "lucide-react";
import {useWorkspaceStore} from "@/store/workspace.store.ts";

interface SwitcherProps {
    onChange?: (id: string) => void,
    data?: {
        id: string, name: string
    }[],
}

const Switcher = ({onChange, data}: SwitcherProps) => {
    const id = useWorkspaceStore((state) => state.currentWorkspaceId);
    const setOpen = useDialogStore((state) => state.openDialog)
    const selectedValue = data?.find(item => item.id == id)?.id

    const onValChange = (val: string) => {
        if (val === "create") {
            setOpen(WorkspaceForm)
        } else {
            onChange && onChange(val);
        }
    }

    return (<Select onValueChange={onValChange} value={selectedValue}>
        <SelectTrigger className="w-full lg:w-[175px] font-medium text-sm ">
            <SelectValue placeholder='Select a Workspace'/>
        </SelectTrigger>
        <SelectContent className="w-auto">
            <div className={'max-h-72 flex flex-col'}>
                <ScrollArea className={'flex-1 overflow-y-auto scrollbar'}>
                    {data?.map(
                        (item) => (<SelectItem key={item.id} value={item.id} className={'text-gray-400'}>
                                {item.name}
                        </SelectItem>
                        )
                    )
                    }
                </ScrollArea>
                <div className={'mt-4'}>
                    <Separator/>
                    <SelectItem key="create" value="create" className={'font-500 '}>
                            <span className={'flex gap-x-10 p-2 items-center'}>
                                Create a workspace
                                <PlusCircle className={'size-4'}/>
                            </span>
                    </SelectItem>
                </div>

            </div>
        </SelectContent></Select>);


}
export default Switcher;