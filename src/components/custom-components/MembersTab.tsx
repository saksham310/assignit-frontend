import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {DataGrid} from "@/components/custom-components/DataGrid.tsx";
import {ColumnDef} from "@tanstack/react-table";

const MembersTab=({ columns, data }: { columns: ColumnDef<any>[]; data: unknown[]})=>{
    return <>
        <Card className={' col-span-2  overflow-hidden h-full flex flex-col '}>
            <CardHeader className="text-m font-semibold ">Members</CardHeader>
            <CardContent className={'overflow-y-auto'}>
                <div className=" h-full  w-full ">
                    <DataGrid columns={columns} data={data}/>
                </div>
            </CardContent>
        </Card></>
}

export default MembersTab;