import Logo from '@/assets/Logo.svg';
const Sidebar=()=>{
    return <>
    <div className='w-full h-full'>
        <div className='w-[100px] h-[83px] mb-1'>
            <img src={Logo} alt="Logo of Assign it" />
        </div>
        Workspace Switcher here
    </div></>
}
export default Sidebar;