import Sidebar from "@/components/custom-components/layout/sidebar/Sidebar.tsx";
import {Outlet} from "react-router-dom";
import TopBar from "@/components/custom-components/layout/TopBar.tsx";
import {useState} from "react";
import { useDashboardNavigate} from "@/hooks/dashboard.hooks.ts";
import Loader from "@/components/custom-components/shared/Loader.tsx";

import ResponsiveDialog from "@/components/custom-components/shared/ResponsiveDialog.tsx";

const DashboardLayout = () => {
    const [title, setTitle] = useState<string>("Workspace Summary");
   const {isLoading } = useDashboardNavigate();
    if (isLoading) {
        return(
        <div className='w-screen h-screen flex items-center justify-center'>
            <Loader />;
        </div>)
    }
    return (<>
        <ResponsiveDialog/>
        <div className='flex w-screen h-screen bg-white'>
            <div className='fixed top-0 left-0 h-full w-[230px] hidden lg:block p-3'>
                <Sidebar/>
            </div>
            <div className='flex-1 lg:ml-[230px] flex flex-col h-dvh'>
                <div  className="px-4 py-3 "><TopBar title={title}/></div>
                <div className='flex-1 p-6 bg-[#f6f8fb] rounded-lg overflow-y-auto scrollbar w-[calc(100vw-80px)] lg:w-[calc(100vw-230px)]'>
                    <Outlet context={setTitle}/>

                </div>
            </div>
        </div>
        </>
    )
};

export default DashboardLayout;