import StatusList from "@/components/custom-components/forms/StatusList.tsx";
import {Status, statuses} from "@/types/project.types.ts";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {ChevronLeft} from "lucide-react";


interface CustomStatusProps {
    handleStepChange?: (value : string) => void;
    handleStatusList: (status :Status[]) => void;
}
const CustomStatusForm = ({handleStepChange,handleStatusList}: CustomStatusProps) => {
    const [statusList, setStatusList] = useState<Status[]>(statuses);
    const todoList = statusList.filter(status => status.type === 'To_Do');
    const inprogressList = statusList.filter(status => status.type === 'In_Progress');
    const completedList = statusList.filter(status => status.type === 'Completed');


    const onStatusChange = (newStatus: Status,isNewStatus:boolean) => {
        if (isNewStatus) {
            setStatusList((prev) => [...prev, newStatus]); // Add new status
        }else{
            setStatusList((prev) =>
                prev.map((status) =>  status.id === newStatus.id ? {...status,...newStatus} : status)
            );
        }

    };

    const saveCustomStatus = () => {
        const formattedStatusList = statusList.map(({ id, ...rest }) => ({
            ...rest,
            id: typeof id === "string" && id?.startsWith("temp-") ? undefined : id, // Remove only temporary IDs
        }));

        handleStatusList(formattedStatusList)

        handleStepChange?.('default')
    }
    return (
        <>
            <div className={'w-full md:w-[480px] h-[580px] flex flex-col space-y-6 gap-4 overflow-auto scrollbar'}>
                <h1 className={'font-semibold text-lg flex items-center gap-6'}><ChevronLeft className={'cursor-pointer'} onClick={() => handleStepChange?.('default')}/> Add Custom Status</h1>
                <StatusList title={'To Do'} statuses={todoList} onStatusChange={onStatusChange} />
                <StatusList title={'In Progress'} statuses={inprogressList} onStatusChange={onStatusChange}/>
                <StatusList title={'Completed'} statuses={completedList} onStatusChange={onStatusChange}/>
                <Button className={'ml-auto'} onClick={()=>saveCustomStatus()}>Save Changes</Button>
            </div>
        </>
    )
}

export default CustomStatusForm;