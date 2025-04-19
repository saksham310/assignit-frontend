
import {DataGrid} from "@/components/custom-components/shared/DataGrid.tsx";
import {ColumnDef} from "@tanstack/react-table";

interface MembersTabProps {
columns: ColumnDef<any>[];
data: unknown[];
dbClick:boolean
}
const MembersTab=({ columns, data, dbClick = false }:MembersTabProps )=>{
    return <>
        <div className={'grid grid-cols-1 gap-5 h-full overflow-hidden'}>
                    <div className=" h-full  w-auto overflow-auto ">
                        <DataGrid columns={columns} data={data} search={true} searchValue={'name'} dbClick={dbClick} />
                    </div>


        </div>
        </>
        }

        export default MembersTab;
