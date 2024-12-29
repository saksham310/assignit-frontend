import Sidebar from "@/components/shared/Sidebar.tsx";
import {Navigate, Outlet} from "react-router-dom";
import TopBar from "@/components/shared/TopBar.tsx";
import {useState} from "react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

const DashboardWrapper = () => {
    const [title, setTitle] = useState<string>("Workspace Summary");
    const isAuthenticated = useIsAuthenticated();
    if(!isAuthenticated){
        return  <Navigate to="/login" replace={true} />;
    }else{
    return (
        <div className="flex min-h-screen bg-white">
            <div className="fixed top-0 left-0 h-screen w-[200px] hidden lg:block p-4">
                <Sidebar />
            </div>
            <div className="flex-1 lg:ml-[200px]">
                <div className="px-6 py-4">
                    <TopBar title={title} />
                </div>
                <div className="px-6 pb-4">
                    <div className="bg-[#f6f8fb] rounded-lg p-8 lg:h-[calc(100vh-76px)] md:min-h-[calc(100vh-80px)]">
                        <Outlet context={setTitle} />
                    </div>
                </div>
            </div>
        </div>
    )}
};

export default DashboardWrapper;