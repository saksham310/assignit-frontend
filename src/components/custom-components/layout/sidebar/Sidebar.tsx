import Logo from '@/assets/Logo.svg';
import WorkspaceSwitcher from "@/components/custom-components/layout/sidebar/WorkspaceSwitcher.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import SidebarFooter from "@/components/custom-components/layout/sidebar/SidebarFooter.tsx";
import {LayoutDashboard, SettingsIcon, SquareActivity} from "lucide-react";
import {useWorkspaceStore} from "@/store/workspace.store.ts";
import {Link, useLocation} from "react-router-dom";
import ProjectList from "@/components/custom-components/layout/sidebar/ProjectList.tsx";


const Sidebar = () => {
    const currentWorkspaceId = useWorkspaceStore((state) => state.currentWorkspaceId);
    const location = useLocation();
    return <>
        <div className='w-[200px] h-full flex flex-col '>
            <div className='w-[80px] h-[53px] mb-2'>
                <img src={Logo} alt="Logo of Assign it"/>
            </div>
            <div className='flex-1 w-full overflow-y-auto flex flex-col space-y-2 scrollbar'>
                <WorkspaceSwitcher/>
                {getNavigationRoutes(currentWorkspaceId).map((route,index) => {
                    const Icon = route.icon;
                    const isActive = location.pathname === route.path;
                    if(index === 2){
                        return <>
                        <ProjectList/>
                            <Link key={route.path} to={route.path} className={
                                'p-2 text-sm ' + (isActive && 'bg-secondary rounded-md')}>
                                <span className={'flex items-center gap-2'}> <Icon className={'size-4'}/>{route.label}</span>
                            </Link>
                        </>
                    }
                    return <Link key={route.path} to={route.path} className={
                        'p-2 text-sm ' + (isActive && 'bg-secondary rounded-md')}>
                        <span className={'flex items-center gap-2'}> <Icon className={'size-4'}/>{route.label}</span>
                    </Link>
                })}
                {/*<ProjectList/>*/}
            </div>
            <Separator className='mb-4'/>
            <SidebarFooter/>
            < Separator className='mt-4'/>
        </div>
    </>
}
export default Sidebar;


const getNavigationRoutes = (id: string | null) => [
    {
        label: "Dashboard",
        path: `/workspaces/${id}`,
        icon: LayoutDashboard,
    },
    {
        label: "Settings",
        path: `/settings`,
        icon: SettingsIcon
    },
    {
        label: "Retrospective",
        path: `/workspaces/${id}/retrospective`,
        icon: SquareActivity

    }
]