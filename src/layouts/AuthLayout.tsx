import Logo from "@/assets/Logo.svg"
import { Button } from "@/components/ui/button";
import { Outlet } from "react-router-dom";

const AuthLayout=()=>{
return <>
<main className="min-h-screen bg-[#F8F8F8] p-4">
    <div className="mx-auto max-w-screen-2xl p-6">
        <nav className='flex items-center justify-between'>
            <img src={Logo} alt="assignIt logo" height={150} width={150} />
            <Button size="lg">Sign In</Button>
        </nav>
        <div className="mt-20 flex items-center justify-center">
            <Outlet></Outlet>
        </div>
    </div>
 </main>

</>
}

export default AuthLayout;