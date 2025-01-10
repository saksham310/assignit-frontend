import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {DataGrid} from "@/components/shared/DataGrid.tsx";
import { ColumnDef } from "@tanstack/react-table";
import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
const GridWrapper = ({ columns, data }: { columns: ColumnDef<any>[]; data: unknown[]}) => {
    return (
       <div className={'h-full'}>
           <Tabs defaultValue="tasks" className="w-full  h-full flex flex-col  gap-0.5">
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
               <div className="bg-white px-5 py-10 rounded-lg mt-4 lg:h-[calc(100dvh-16em)]">
                   <TabsContent value="tasks" className="p-1 ">
                       <div className={'grid grid-cols-1 lg:grid-cols-3 3xl:grid-cols-1 gap-5'}>
                           <Card className={' col-span-2   '}>
                               <CardHeader className="text-m font-semibold">Project Summary</CardHeader>
                               <CardContent className={''}>
                                   <div className="lg:h-[calc(100dvh-22em)]  2xl:h-auto  w-full overflow-y-auto scrollbar ">
                                       <DataGrid columns={columns} data={data}/>
                                   </div>
                               </CardContent>
                           </Card>
                           <Card className={' col-span-1  '}>
                               <CardHeader className="text-m font-semibold">Assigned Tasks</CardHeader>
                               <CardContent className={''}>
                               </CardContent>
                           </Card>
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