import {Input} from "@/components/ui/input.tsx";
import {useRef, useState} from "react";
import {Status, StatusType} from "@/types/project.types.ts";
import {Label} from "@/components/ui/label.tsx";
import ColorPicker from "@/components/custom-components/shared/ColorPicker.tsx";

interface StatusListProps {
    title: string;
    statuses: Status[];
    onStatusChange: (status: Status, isNewStatus:boolean) => void;
}

const statusColor = {
    'To Do': "#90a9d0",
    'In Progress': '#f9d171',
    'Completed': '#008844'
}
const StatusList = ({title, statuses, onStatusChange}: StatusListProps) => {
    const labelRef = useRef<HTMLInputElement>(null);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const [color, setColor] = useState(statusColor[title]);
    const handleNewStatus = () => {
        if (labelRef.current) {
            const newStatus: Status = {
                id : `temp-${crypto.randomUUID()}`,
                name: labelRef.current!.value,
                type: title.replace(" ", "_") as StatusType,
                color: color,

            }
            if (newStatus.name) {
                onStatusChange(newStatus,true);
                labelRef.current!.value = '';
            }
        }


    }
    const handleStatusChange = (status:Status, field:'name'|'color',value:string) => {
        onStatusChange({ ...status, [field]: value },false)
    }

    const handleInput = (e: any) => {
        if (e.code === "Enter") handleNewStatus()
    }
    const handleInputEdit = (e: any,status:Status,field:"name",value:string) => {
        if (e.code === "Enter") onStatusChange({ ...status, [field]: value },false)
    }
    return (
        <>
            <div className={'flex flex-col space-y-4'}>
                <Label>{title}</Label>
                {statuses.map((status) => (
                    <div className={'flex items-center gap-3'} key={status.name}>
                        <ColorPicker setColor={(color) => handleStatusChange(status,'color',color)} color={status.color}/>
                        <Input defaultValue={status.name}
                               onKeyDown={(e) => handleInputEdit(e,status,'name',e.target.value)}  placeholder={'Add status'} className={'w-full'}/>
                    </div>
                ))}
                <div className={'flex items-center gap-3'}>

                    <ColorPicker setColor={setColor} color={color}/>
                    <Input ref={labelRef}
                           placeholder={'Add status'} className={'w-full border-dashed'}
                           onKeyDown={(e) => handleInput(e)}/>
                </div>
            </div>
        </>
    )
}

export default StatusList;