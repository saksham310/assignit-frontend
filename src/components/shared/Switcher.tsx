import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

interface SwitcherProps {
    onChange?: (id: string) => void
}

const Switcher = ({onChange}:SwitcherProps) => {

    return (
        <Select onValueChange={onChange}>
            <SelectTrigger className="w-auto lg:w-[175px] font-semibold  text-primary">
                <SelectValue placeholder='Select a Workspace'/>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="1">Workspace One </SelectItem>
                <SelectItem value="2">Workspace Two</SelectItem>
                <SelectItem value="3">Workspace Three</SelectItem>
                <SelectItem value="4">Workspace Four</SelectItem>
            </SelectContent></Select>);


}
export default Switcher;