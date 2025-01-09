import Logo from '@/assets/Logo.svg';
import WorkspaceSwitcher from "@/components/shared/WorkspaceSwitcher.tsx";
import {Button} from "@/components/ui/button";
import {FaSignOutAlt} from "react-icons/fa";
import {Separator} from "@/components/ui/separator.tsx";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate} from "react-router-dom";
const Sidebar=()=>{
    const signOut = useSignOut()
    const navigate=useNavigate();
    const handleSignOut = () => {
        signOut();
        navigate('/login');
    }
    return <>
        <div className='w-[200px] h-full flex flex-col'>
            <div className='w-[100px] h-[83px] mb-1'>
                <img src={Logo} alt="Logo of Assign it"/>
            </div>
            <div className='flex-1 w-full overflow-y-auto'>
                <WorkspaceSwitcher/>
            </div>
            <Separator/>
            <div className="mt-auto p-4 w-full">
                <Button variant={"ghost"} className={'text-red-700'}
                        onClick={handleSignOut}>
                    Logout  <FaSignOutAlt/> </Button>
            </div>

        </div>
    </>
}
export default Sidebar;