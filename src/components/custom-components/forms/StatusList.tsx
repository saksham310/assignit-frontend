import {Input} from "@/components/ui/input.tsx";
import {useRef, useState} from "react";
import {Status, StatusType} from "@/types/project.types.ts";
import {Label} from "@/components/ui/label.tsx";
import ColorPicker from "@/components/custom-components/shared/ColorPicker.tsx";

interface StatusListProps {
    title: string;
    statuses: Status[];
    onStatusChange: (status: Status) => void;
}

const statusColor = {
    'To Do': "#90a9d0",
    'In Progress': '#f9d171',
    'Completed': '#008844'
}
const StatusList = ({title, statuses, onStatusChange}: StatusListProps) => {
    const lableRef = useRef<HTMLInputElement>(null);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const [color, setColor] = useState(statusColor[title]);
    const handleNewStatus = () => {
        if (lableRef.current) {
            const newStatus: Status = {
                name: lableRef.current!.value,
                type: title.replace(" ", "_") as StatusType,
                color: color,

            }
            if (newStatus.name) {
                onStatusChange(newStatus);
                lableRef.current!.value = '';
            }
        }


    }

    const handleInput = (e: any) => {
        if (e.code === "Enter") handleNewStatus()
    }
    return (
        <>
            <div className={'flex flex-col space-y-4'}>
                <Label>{title}</Label>
                {statuses.map((status) => (
                    <div className={'flex items-center gap-3'} key={status.name}>
                        <div className={'size-5 rounded-xl flex items-center justify-center'}
                             style={{
                                 border: `1px solid ${status.color}`
                             }}
                        >
                            <div className="size-4 rounded-full" style={{backgroundColor: status.color}}></div>
                        </div>
                        <Input defaultValue={status.name} readOnly placeholder={'Add status'} className={'w-full'}/>
                    </div>
                ))}
                <div className={'flex items-center gap-3'}>

                    <ColorPicker setColor={setColor} color={color}/>
                    <Input ref={lableRef}
                           placeholder={'Add status'} className={'w-full border-dashed'}
                           onKeyDown={(e) => handleInput(e)}/>
                </div>
            </div>
        </>
    )
}

export default StatusList;