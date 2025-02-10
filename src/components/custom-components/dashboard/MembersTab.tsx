
import {DataGrid} from "@/components/custom-components/shared/DataGrid.tsx";
import {ColumnDef} from "@tanstack/react-table";

const MembersTab=({ columns, data }: { columns: ColumnDef<any>[]; data: unknown[]})=>{
    return <>
        <div className={'grid grid-cols-1 gap-5 h-full overflow-hidden'}>
                    <div className=" h-full  w-auto overflow-auto ">
                        <DataGrid columns={columns} data={data} search={true} searchValue={'name'} />
                    </div>


        </div>
        </>
        }

        export default MembersTab;
