import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {DataGrid} from "@/components/shared/DataGrid.tsx";
import { ColumnDef } from "@tanstack/react-table";
import Switcher from "@/components/shared/Switcher.tsx";
const GridWrapper = ({ columns, data }: { columns: ColumnDef<any>[]; data: unknown[]}) => {
    return (
        <Tabs defaultValue="tasks" className="w-full">
            <TabsList className="gap-2 bg-[#f6f8fb] space-x-2">
                <TabsTrigger value="tasks">
                    Projects
                </TabsTrigger>
                <TabsTrigger value="members">
                    Members
                </TabsTrigger>
            </TabsList>
            <div className="bg-white rounded-lg mt-4">
                <TabsContent value="tasks" className="p-6">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-m font-bold">My Task Status</p>
                     <Switcher/>
                    </div>
                    <div className="mt-6 w-full overflow-hidden max-h-[calc(100vh-390px)]">
                        <DataGrid columns={columns} data={data} />
                    </div>
                </TabsContent>
                <TabsContent value="members" className="p-6">
                    <div className="mt-6 w-full overflow-hidden max-h-[calc(100vh-390px)]">
                        <DataGrid columns={columns} data={data}/>
                    </div>
                </TabsContent>
            </div>
        </Tabs>
    );
};
export default GridWrapper;