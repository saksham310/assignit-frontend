import Logo from "@/assets/Logo.svg"
import { Button } from "@/components/ui/button";
import {Link, Outlet, useLocation} from "react-router-dom";

const AuthLayout=()=>{
    const location = useLocation();
    const btnText=location.pathname==='/login'? "Sign Up":"Login";
    const navigateTo=location.pathname==='/login'?'/sign-up':'/login';
    return <>
        <main className="min-h-screen bg-[#EEEBF6] p-4">
            <div className="mx-auto max-w-screen-2xl p-6">
                <nav className='flex items-center justify-between'>
                    <img src={Logo} alt="assignIt logo" className='h-12 w-auto'/>
                </nav>
                <div className="mt-20 flex items-center justify-center">
                    <Outlet></Outlet>
                </div>
            </div>
        </main>

    </>;
}

export default AuthLayout;