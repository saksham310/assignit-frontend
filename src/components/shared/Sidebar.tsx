import Logo from '@/assets/Logo.svg';
import WorkspaceSwitcher from "@/components/shared/WorkspaceSwitcher.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import SidebarFooter from "@/components/shared/SidebarFooter.tsx";


const Sidebar=()=>{


    return <>
        <div className='w-[200px] h-full flex flex-col '>
            <div className='w-[80px] h-[53px] mb-2'>
                <img src={Logo} alt="Logo of Assign it"/>
            </div>
            <div className='flex-1 w-full overflow-y-auto'>
                <WorkspaceSwitcher/>
            </div>
            <Separator className='mb-4' />
                <SidebarFooter/>

        </div>
    </>
}
export default Sidebar;

