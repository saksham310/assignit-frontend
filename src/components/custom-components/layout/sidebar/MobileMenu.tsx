import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet.tsx";
import {Menu} from "lucide-react";
import Sidebar from "@/components/custom-components/layout/sidebar/Sidebar.tsx";

const MobileMenu=()=>{
    return <>
    <div className={'p-1 lg:hidden'}>
        <Sheet>
            <SheetTrigger><Menu/></SheetTrigger>
            <SheetContent className="w-auto">
               <Sidebar/>
            </SheetContent>
        </Sheet>
    </div></>
}
export default MobileMenu;