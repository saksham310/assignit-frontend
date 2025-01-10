import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {DataGrid} from "@/components/shared/DataGrid.tsx";
import { ColumnDef } from "@tanstack/react-table";
const GridWrapper = ({ columns, data }: { columns: ColumnDef<any>[]; data: unknown[]}) => {
    return (
       <div className={'h-full'}>
           <Tabs defaultValue="tasks" className="w-full  h-full flex flex-col ">
               <div>
                   < TabsList className="gap-2 bg-[#f6f8fb] space-x-2">
                   <TabsTrigger value="tasks">
                       Projects
                   </TabsTrigger>
                   <TabsTrigger value="members">
                       Members
                   </TabsTrigger>
               </TabsList>
               </div>
               <div className="bg-white rounded-lg mt-4 h-[calc(100dvh-16em)]">
                   <TabsContent value="tasks" className="p-6">
                       <p className="text-m font-semibold">Project Summary</p>
                       <div className={'grid grid-cols-3 gap-x-5'}>
                           <div className="mt-6 w-full col-span-2 overflow-y-auto scrollbar h-[calc(100dvh-23em)]">
                               <DataGrid columns={columns} data={data}/>
                           </div>
                           <div className={'col-span-1'}>PIE</div>
                       </div>
                   </TabsContent>


                   <TabsContent value="members" className="p-6">
                       <p className="text-m font-semibold">Members</p>
                       <div className="mt-6 w-full overflow-y-auto h-[calc(100dvh-22em)]">
                           <DataGrid columns={columns} data={data}/>
                       </div>
                   </TabsContent>
               </div>
           </Tabs>
       </div>
    );
};
export default GridWrapper;