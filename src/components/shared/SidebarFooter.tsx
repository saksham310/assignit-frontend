
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '../ui/dropdown-menu';
import {ChevronUp, User2} from "lucide-react";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate} from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {User} from "@/types/auth.type.ts";
import { useQueryClient } from '@tanstack/react-query';

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
                <User2/> <p className='text-sm font-medium text-gray-500'>
                    {user?.username}
                </p>
                <ChevronUp className="ml-auto"/>
                    </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                side="right"
                className="w-[--radix-popper-anchor-width]"
            >
                <DropdownMenuItem> <span onClick={handleSignOut}>Sign out</span>
            </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
}
export default SidebarFooter;