import Logo from '@/assets/Logo.svg';
import WorkspaceSwitcher from "@/components/shared/WorkspaceSwitcher.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import SidebarFooter from "@/components/shared/SidebarFooter.tsx";
import {LayoutDashboard, SettingsIcon} from "lucide-react";


const Sidebar=()=>{


    return <>
        <div className='w-[200px] h-full flex flex-col '>
            <div className='w-[80px] h-[53px] mb-2'>
                <img src={Logo} alt="Logo of Assign it"/>
            </div>
            {/*<Separator/>*/}
            <div className='flex-1 w-full overflow-y-auto flex flex-col space-y-8 scrollbar'>
                   <WorkspaceSwitcher/>

                    {navigationRoutes.map((route)=>{
                        const Icon=route.icon;
                        return (
                            <div className={'pl-2 text-sm flex items-center gap-2'}><Icon className={'size-4'}/>{route.label}</div>
                        )
                    })}

            </div>
            <Separator className='mb-4'/>
            <SidebarFooter/>
            < Separator className='mt-4' />
        </div>
    </>
}
export default Sidebar;


const navigationRoutes=[
    {
        label: "Dashboard",
        href: ``,
        icon: LayoutDashboard,
    },
    {
        label: "Settings",
        href: `/settings/`,
        icon: SettingsIcon
    }
]