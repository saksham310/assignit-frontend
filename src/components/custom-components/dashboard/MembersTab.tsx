
import {DataGrid} from "@/components/custom-components/shared/DataGrid.tsx";
import { Button } from "@/components/ui/button";
import {ColumnDef} from "@tanstack/react-table";
import {UserPlusIcon, X} from "lucide-react";
import {useState} from "react";
import AddProjectMembers from "@/pages/AddProjectMembers.tsx";
import {cn} from "@/lib/utils.ts";

interface MembersTabProps {
columns: ColumnDef<any>[];
data: unknown[];
dbClick:boolean
}
const MembersTab=({ columns, data, dbClick = false }:MembersTabProps )=>{
   const [addMember,setAddMember]=useState<boolean>(false)
    return <>
        <div className={'grid grid-cols-1 gap-5 h-full overflow-hidden'}>
                    <div className=" h-full  w-auto overflow-auto flex flex-col ">
                      <div className={'ml-auto flex items-center gap-6'}>
                         <div className={cn('flex items-center gap-2',{'hidden':!addMember})}>
                             <AddProjectMembers memberList={data} />
                             <X className={'size-4 text-muted-foreground cursor-pointer'} onClick={() => setAddMember(!addMember)}/>
                         </div>
                          <Button variant={'secondary'}  className={cn('hover:bg-secondary',{'hidden':addMember})}
                                  size={'sm'} onClick={() => setAddMember(!addMember)}><UserPlusIcon/>Add members</Button>
                      </div>
                        <DataGrid columns={columns} data={data} search={true} searchValue={'name'} dbClick={dbClick} />
                    </div>


        </div>
        </>
        }

        export default MembersTab;
