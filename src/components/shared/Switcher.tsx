import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {useParams} from "react-router-dom";

interface SwitcherProps {
    onChange?: (id: string) => void,
    data?: {
        id:string,
        name:string
    }[],
}

const Switcher = ({onChange,data}:SwitcherProps) => {
    const {id}=useParams();
    const selectedValue = data?.find(item => item.id == id)?.id
    return (
        <Select onValueChange={onChange} value={selectedValue}>
            <SelectTrigger className="w-auto lg:w-[175px] font-semibold">
                <SelectValue placeholder='Select a Workspace'/>
            </SelectTrigger>
            <SelectContent>
                {data?.map((item) => (
                    <SelectItem key={item.id} value={item.id}>{item.name} </SelectItem>
                ))}
            </SelectContent></Select>);


}
export default Switcher;