import { useForm} from "react-hook-form";
import {useWorkspaceStore} from "@/store/workspace.store.ts";
import {useDeleteWorkspace, useGetWorkspace, useLeaveWorkspace, useUpdateWorkspace} from "@/hooks/workspace.hooks.ts";
import {WorkspaceData} from "@/types/workspace.type.ts";
import {Avatar} from "@radix-ui/react-avatar";
import {AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Form,FormControl, FormField, FormItem,} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { LogOut, Trash2} from "lucide-react";
import { CardContent } from "@/components/ui/card";
import {z} from "zod";
import {workspaceSchema} from "@/schemas/workspace.schema.ts";
import { useDashboardData } from "@/hooks/dashboard.hooks";
import Loader from "@/components/custom-components/shared/Loader.tsx";


const WorkspaceSettings=()=> {
   const {isOwnerAdmin}= useDashboardData();
    const currentWorkspaceId = useWorkspaceStore((state) => state.currentWorkspaceId);
    const {data} = useGetWorkspace();
    const currentWorkspace = data.find((item: WorkspaceData) => item.id == currentWorkspaceId);
    const form = useForm<z.infer<typeof workspaceSchema>>({
        defaultValues: {
            name: currentWorkspace.name,
        }
    });
    const {mutate,isPending} = useUpdateWorkspace();
    const {mutate: leaveMutate} = useLeaveWorkspace(currentWorkspaceId);
    const {mutate: deleteMutate} = useDeleteWorkspace();
    const handleLeaveWorkspace = () => {
    leaveMutate(currentWorkspaceId)
    }
    const handleDeleteWorkspace = () => {
        deleteMutate(currentWorkspaceId);
    }
    const onSubmit=(val: z.infer<typeof workspaceSchema>)=>{
        const data={
            id:currentWorkspaceId,
            name:val.name,
        }
             mutate(data)
    }
    if (isPending) {
        return <Loader/>
    }
    console.log(isOwnerAdmin)
    return (
       <>
       <Form {...form}>
           <form onSubmit={form.handleSubmit(onSubmit)}
               className={'flex flex-col space-y-6 gap-2  w-auto h-full overflow-y-auto no-scrollbar xl:space-y-5'}>
               <p className={'font-semibold'}>Workspace Settings</p>
               <div className={'flex items-center  gap-10'}>
                   <Avatar className={'size-20 lg:size-24'}>
                       <AvatarImage src=''/>
                       <AvatarFallback>{currentWorkspace?.name[0]}</AvatarFallback>
                   </Avatar>
                   <div className={'flex flex-col  w-full lg:max-w-[640px]'}>
                       <FormField
                           name="name"
                           control={form.control}
                           render={({field}) => (
                               <FormItem>
                                   <FormControl>
                                       <Input className=" text-black" {...field} disabled={!isOwnerAdmin}/>
                                   </FormControl>
                               </FormItem>
                           )
                           }
                       />
                   </div>
               </div>
               <Separator/>
               <p className={'font-semibold'}>Danger Zone</p>
               <CardContent className={'flex flex-col gap-10'}>
                   <div>
                       <AlertDialog>
                           <AlertDialogTrigger className={'flex flex-col  text-start max-w-[420px] '}>
                               <div
                                   className=" flex items-center mb-3 font-semibold p-1 text-sm rounded-md text-red-700">
                                   <LogOut className="h-4 w-4 mr-2"/>
                                   Leave Workspace
                               </div>
                           </AlertDialogTrigger>
                           <span className='text-gray-500 text-sm'>Permanently leave  the workspace and remove all the access to the workspaces</span>
                           <AlertDialogContent>
                               <AlertDialogHeader>
                                   <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                   <AlertDialogDescription>
                                       This action cannot be undone. This will permanently  remove you from the workspace.
                                   </AlertDialogDescription>
                               </AlertDialogHeader>
                               <AlertDialogFooter>
                                   <AlertDialogCancel>Cancel</AlertDialogCancel>
                                   <AlertDialogAction
                                       onClick={handleLeaveWorkspace}
                                       className={'bg-destructive hover:bg-destructive/80 text-destructive-foreground'}>Continue</AlertDialogAction>
                               </AlertDialogFooter>
                           </AlertDialogContent>
                       </AlertDialog>
                   </div>
                   {isOwnerAdmin &&
                   <div>
                       <AlertDialog>
                           <AlertDialogTrigger className={'flex flex-col  text-start max-w-[420px] '}>
                               <div
                                   className=" flex items-center mb-3 font-semibold p-1 text-sm rounded-md text-red-700">
                                   <Trash2 className="h-4 w-4 mr-2"/>
                                   Delete
                               </div>
                           </AlertDialogTrigger>
                           <span className='text-gray-500 text-sm'>Permanently delete your account and remove all the access to the workspaces</span>
                           <AlertDialogContent>
                               <AlertDialogHeader>
                                   <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                   <AlertDialogDescription>
                                       This action cannot be undone. This will permanently delete your account
                                       and remove your data from our servers.
                                   </AlertDialogDescription>
                               </AlertDialogHeader>
                               <AlertDialogFooter>
                                   <AlertDialogCancel>Cancel</AlertDialogCancel>
                                   <AlertDialogAction
                                       onClick={handleDeleteWorkspace}
                                       className={'bg-destructive hover:bg-destructive/80 text-destructive-foreground'}>Continue</AlertDialogAction>
                               </AlertDialogFooter>
                           </AlertDialogContent>
                       </AlertDialog>
                   </div>}
               </CardContent>
               {isOwnerAdmin &&
               <div className={'flex justify-end mt-2 mr-2'}>
                   <Button disabled={!form.formState.isDirty || form.formState.isSubmitting}>Save</Button>
               </div>}
           </form>
       </Form>
       </>
    )
}

export default WorkspaceSettings;