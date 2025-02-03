import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {DataGrid} from "@/components/custom-components/shared/DataGrid.tsx";
import {ColumnDef} from "@tanstack/react-table";
import {FolderKanban} from "lucide-react";

const ProjectSummary=({ columns, data }: { columns: ColumnDef<any>[]; data: unknown[]})=>{
console.log("yo data",data);
    return <>

            <Card className={' col-span-2  overflow-hidden h-full flex flex-col '}>
                <CardHeader className="text-m font-semibold ">Project Summary</CardHeader>
                <CardContent className={'overflow-y-auto'}>
                    {data?.length > 0 &&(
                    <div className=" h-full  w-full ">
                        <DataGrid columns={columns} data={data}/>
                    </div>  )}
                    {data?.length < 1 && (
                        <div className={'flex md:mt-16 flex-col gap-8 mx-auto items-center justify-center text-gray-400'}>
                            <FolderKanban className={'md:size-24'}/>

                           <p className={"text-sm "}> Your projects will be shown here</p></div>
                    )}
                </CardContent>
            </Card>


    </>
}
export default ProjectSummary;