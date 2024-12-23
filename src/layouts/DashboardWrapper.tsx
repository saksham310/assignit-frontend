import Sidebar from "@/components/shared/Sidebar.tsx";
import {Outlet} from "react-router-dom";
import TopBar from "@/components/shared/TopBar.tsx";
import {useState} from "react";

const DashboardWrapper = () => {
    const [title,setTitle]=useState<string>("Workspace Summary");
  return  <>
      <div className='flex w-full h-full p-4 '>
<div className='fixed top-[18px] left-[16px] hidden lg:block lg:w-[200px] overflow-y-auto h-full'><Sidebar/></div>
      </div>
      <div className='w-full fixed lg:pl-[220px] min-h-[calc(100vh-32px)] overflow-hidden '>
          <div className="max-w-screen-2xl px-6 mb-4"><TopBar title={title}/></div>
          <div className="h-[calc(100vh-64px)] overflow-y-auto rounded-lg flex flex-col py-8 px-6 bg-[#f6f8fb]">
            <Outlet context={setTitle}/>
          </div>
      </div>
  </>
}

export default DashboardWrapper;