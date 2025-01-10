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
        <div className='flex h-screen bg-white'>
            <div className='fixed top-0 left-0 h-full w-[210px] hidden lg:block p-2'>
                <Sidebar/>
            </div>
            <div className='flex-1 lg:ml-[210px] flex flex-col h-dvh'>
                <div  className="px-4 py-3 "><TopBar title={title}/></div>
                <div className='flex-1 p-6 bg-[#f6f8fb] rounded-lg overflow-y-auto scrollbar'>
                    <Outlet context={setTitle}/>

                </div>
            </div>
        </div>
    )
};

export default DashboardWrapper;