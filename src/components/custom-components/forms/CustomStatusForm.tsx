import StatusList from "@/components/custom-components/forms/StatusList.tsx";
import {Status, statuses} from "@/types/project.types.ts";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";


interface CustomStatusProps {
    handleStepChange: (value : string) => void;
}
const CustomStatusForm = ({handleStepChange}: CustomStatusProps) => {
    const [statusList, setStatusList] = useState<Status[]>(statuses);
    const todoList = statusList.filter(status => status.type === 'To_Do');
    const inprogressList = statusList.filter(status => status.type === 'In_Progress');
    const completedList = statusList.filter(status => status.type === 'Completed');


    const onStatusChange = (newStatus: Status) => {
        setStatusList((prev) => [...prev, newStatus]); // Update state
    };

    const saveCustomStatus = () => {
        console.log(statusList);
        handleStepChange('default')
    }
    return (
        <>
            <div className={'w-full md:w-[480px] h-[580px] flex flex-col space-y-6 gap-4 overflow-auto scrollbar'}>
                <h1 className={'font-semibold text-lg'}>Add Custom Status</h1>
                <StatusList title={'To Do'} statuses={todoList} onStatusChange={onStatusChange} />
                <StatusList title={'In Progress'} statuses={inprogressList} onStatusChange={onStatusChange}/>
                <StatusList title={'Completed'} statuses={completedList} onStatusChange={onStatusChange}/>
                <Button className={'ml-auto'} onClick={()=>saveCustomStatus()}>Save Changes</Button>
            </div>
        </>
    )
}

export default CustomStatusForm;