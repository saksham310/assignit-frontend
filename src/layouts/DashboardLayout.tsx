
const DashboardLayout = () => {
  return  <>
      <div className='flex w-full h-full p-4'>
<div className='fixed top-[32px] left-[32px] hidden lg:block lg:w-[220px] overflow-y-auto h-full'>Sidebar</div>
      </div>
      <div className='w-full lg:pl-[225px] '>
          <div className="max-w-screen-2xl">Nav</div>
          <div className="h-[200vh] rounded-lg flex flex-col py-8 px-6 bg-[#f6f8fb]">
             Dynamic Part
          </div>
      </div>
  </>
}

export default DashboardLayout;