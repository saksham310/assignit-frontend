
import {DataGrid} from "@/components/custom-components/shared/DataGrid.tsx";
import { Button } from "@/components/ui/button";
import {ColumnDef} from "@tanstack/react-table";
import {Check, UserPlusIcon, X} from "lucide-react";
import {useState} from "react";
import AddProjectMembers from "@/pages/AddProjectMembers.tsx";
import {cn} from "@/lib/utils.ts";
import { motion, AnimatePresence } from "framer-motion";
import {MembersData} from "@/types/workspace.type.ts";
import {useAddProjectMember} from "@/hooks/project.hooks.ts";
import {useParams} from "react-router-dom";


interface MembersTabProps {
columns: ColumnDef<MembersData>[];
data: unknown[];
dbClick:boolean;
showAddMembers: boolean;
remainingMembers: unknown[];
}
const MembersTab=({ columns, data, dbClick = false ,showAddMembers = false, remainingMembers = []}:MembersTabProps )=>{
   const [showAddMember,setShowAddMember]=useState<boolean>(false)
   const [newMembers,setNewMembers]=useState<number[]>([]);
   const {mutate} = useAddProjectMember();
   const {projectId} = useParams();
   const handleAddMember=()=>{
       setShowAddMember(false);
       mutate({
           id:Number(projectId),
           data:newMembers
       })
       console.log(newMembers);
   }
    return <>
        <div className={'grid grid-cols-1 gap-5 h-full overflow-hidden'}>
                    <div className=" h-full  w-auto overflow-auto flex flex-col relative ">
                        {showAddMembers && <div className={'ml-auto flex items-center gap-6 min-h-[35px] absolute right-0 top-0'}>
                            <AnimatePresence>
                                {showAddMember && <motion.div
                                    initial={{ opacity: 0, x: 0}}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ ease: "easeInOut" }}
                                    exit="hidden"
                                    className={'flex items-center gap-2'}>
                                    <AddProjectMembers memberList={remainingMembers} handleMember={setNewMembers}/>
                                    {newMembers.length >0 && <Check className={'size-4 text-muted-foreground cursor-pointer'}  onClick={handleAddMember}/>}
                                    <X className={'size-4 text-muted-foreground cursor-pointer'}
                                       onClick={() => setShowAddMember(!showAddMember)}/>
                                </motion.div>}
                            </AnimatePresence>

                            <Button variant={'secondary'}  className={cn('hover:bg-secondary',{'hidden':showAddMember})}
                                    size={'sm'} onClick={() => setShowAddMember(true)}><UserPlusIcon/>Add members</Button>
                        </div>}
                        <DataGrid columns={columns} data={data} search={true} searchValue={'name'} dbClick={dbClick} />
                      </div>
                    </div>
        </>
        }

        export default MembersTab;
