import Logo from "@/assets/Logo.svg";
import {Navigate, Outlet} from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

const AuthLayout=()=>{
    const isAuthenticated = useIsAuthenticated();
    if(isAuthenticated){
      return  <Navigate to="/dashboard" replace={true} />;
    }else{
    return <>
        <main className="min-h-screen bg-[#EEEBF6] p-4">
            <div className="mx-auto max-w-screen-2xl p-6">
                <nav className='flex items-center justify-between'>
                    <img src={Logo} alt="assignIt logo" className='h-12 w-auto'/>
                </nav>
                <div className="mt-20 flex items-center justify-center">
                    <Outlet />
                </div>
            </div>
        </main>

    </>;
}}

export default AuthLayout;