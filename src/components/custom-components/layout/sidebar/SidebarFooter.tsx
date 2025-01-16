
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '../../../ui/dropdown-menu.tsx';
import {EllipsisVertical, LogOut} from "lucide-react";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate} from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {User} from "@/types/auth.type.ts";
import { useQueryClient } from '@tanstack/react-query';
import UserAvatar from "@/components/custom-components/shared/UserAvatar.tsx";

const SidebarFooter=()=>{
    const query=useQueryClient();
    const signOut = useSignOut()
    const user =useAuthUser<User>();
    const navigate=useNavigate();
    const handleSignOut = () => {
        query.clear();
        signOut();
        navigate('/login');
    }
    return <>

        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className='flex items-center gap-2 justify-center'>
                <UserAvatar/> <p className='text-sm font-medium text-gray-600'>
                    {user?.username}
                </p>
                    <EllipsisVertical  className="m-auto size-4"/>
                    </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width] min-h-12"
            >
                <DropdownMenuItem onClick={handleSignOut}><span className={'flex gap-2 items-center'}>
                   Sign out <LogOut className="m-auto size-4"/></span>
            </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
}
export default SidebarFooter;