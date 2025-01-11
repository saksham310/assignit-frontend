import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {DataGrid} from "@/components/shared/DataGrid.tsx";
import {ColumnDef} from "@tanstack/react-table";

const ProjectSummary=({ columns, data }: { columns: ColumnDef<any>[]; data: unknown[]})=>{
   // data=[];
    return <>

            <Card className={' col-span-2  overflow-hidden h-full flex flex-col '}>
                <CardHeader className="text-m font-semibold ">Project Summary</CardHeader>
                <CardContent className={'overflow-y-auto'}>
                    {data?.length > 0 &&(
                    <div className=" h-full  w-full ">
                        <DataGrid columns={columns} data={data}/>
                    </div>  )}
                    {data?.length < 1 && (
                        <div className={'flex items-center justify-center text-gray-400'}>

                            Your projects will be shown here</div>
                    )}
                </CardContent>
            </Card>


    </>
}
export default ProjectSummary;