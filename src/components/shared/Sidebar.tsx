import Logo from '@/assets/Logo.svg';
import WorkspaceSwitcher from "@/components/shared/WorkspaceSwitcher.tsx";
const Sidebar=()=>{
    return <>
    <div className='w-full h-full'>
        <div className='w-[100px] h-[83px] mb-1'>
            <img src={Logo} alt="Logo of Assign it" />
        </div>
       <WorkspaceSwitcher/>
    </div></>
}
export default Sidebar;