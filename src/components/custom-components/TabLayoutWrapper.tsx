import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {TabConfig} from "@/types/dashboard.type.ts";
const TabLayoutWrapper = ({ tabConfig}: {tabConfig:TabConfig[]}) => {
    return (
       <div className={'h-full flex flex-col'}>
           <Tabs defaultValue={tabConfig[0].value} className="w-full  h-full flex flex-col  gap-0.5">
               <div>
                   < TabsList className="gap-2 bg-[#f6f8fb] space-x-2">
                       {tabConfig.map((tab)=>{
                           return (
                               <TabsTrigger value={tab.value}>
                                   {tab.label}
                               </TabsTrigger>
                           )
                       })}
               </TabsList>
               </div>
               <div className="bg-white px-5 py-10 rounded-lg mt-4 lg:h-[calc(100dvh-16em)]  overflow-hidden ">
                   {tabConfig.map((tab)=>{
                       return (
                           <TabsContent value={tab.value} className="p-1 h-full overflow-y-auto">
                               <tab.component/>
                           </TabsContent>
                       )
                   })}
               </div>
           </Tabs>
       </div>
    );
};
export default TabLayoutWrapper;