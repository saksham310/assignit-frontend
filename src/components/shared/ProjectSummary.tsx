import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {DataGrid} from "@/components/shared/DataGrid.tsx";
import {ColumnDef} from "@tanstack/react-table";

const ProjectSummary=({ columns, data }: { columns: ColumnDef<any>[]; data: unknown[]})=>{
   const limitedData=data.slice(0,6);
    return <>
        <Card className={' col-span-2   '}>
            <CardHeader className="text-m font-semibold">Project Summary</CardHeader>
            <CardContent className={''}>
                <div className="lg:h-[calc(100dvh-22em)]  2xl:h-auto  w-full  scrollbar ">
                    <DataGrid columns={columns} data={limitedData}/>
                </div>
            </CardContent>
        </Card>
    </>
}
export default ProjectSummary;