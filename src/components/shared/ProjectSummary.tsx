import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {DataGrid} from "@/components/shared/DataGrid.tsx";
import {ColumnDef} from "@tanstack/react-table";

const ProjectSummary=({ columns, data }: { columns: ColumnDef<any>[]; data: unknown[]})=>{
    return <>
        <Card className={' col-span-2  overflow-hidden h-full flex flex-col '}>
            <CardHeader className="text-m font-semibold ">Project Summary</CardHeader>
            <CardContent className={'overflow-y-auto'}>
                <div className=" h-full  w-full overflow-y-auto scrollbar ">
                    <DataGrid columns={columns} data={data}/>
                </div>
            </CardContent>
        </Card>
    </>
}
export default ProjectSummary;