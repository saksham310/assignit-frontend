import Sidebar from "@/components/shared/Sidebar.tsx";
import {Outlet} from "react-router-dom";
import TopBar from "@/components/shared/TopBar.tsx";
import {useState} from "react";
import {useWorkspaceNavigation} from "@/hooks/workspaceHooks.ts";
import Loader from "@/components/shared/Loader.tsx";

const DashboardWrapper = () => {
    const [title, setTitle] = useState<string>("Workspace Summary");
    const {isLoading}=useWorkspaceNavigation();
    if (isLoading) {
        return(
        <div className='w-screen h-screen flex items-center justify-center'>
            <Loader />;
        </div>)
    }
    return (
        <div className="flex min-h-screen bg-white">
            <div className="fixed top-0 left-0 h-screen w-[200px] hidden lg:block p-4">
                <Sidebar />
            </div>
            <div className="flex-1 lg:ml-[200px]">
                <div className="px-6 py-3">
                    <TopBar title={title} />
                </div>
                <div className="px-6 pb-4">
                    <div className="bg-[#f6f8fb] flex flex-col rounded-lg p-7 lg:h-[calc(100vh-68px)] md:min-h-[calc(100vh-80px)]">
                        <Outlet context={setTitle} />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DashboardWrapper;