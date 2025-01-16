import {FormFieldProps} from "@/types/form.type.ts";
import {FaPeopleGroup} from "react-icons/fa6";
import {useCreateWorkspace} from "@/hooks/workspace.hooks.ts";
import {CreateWorkspaceData} from "@/types/workspace.type.ts";
import FormCard from "@/components/custom-components/forms/formCard.tsx";
import {workspaceSchema} from "@/schemas/workspace.schema.ts";
import {useDialogStore} from "@/store/dialog.store.ts";



const WorkspaceForm=({isOnboarding=false}:{isOnboarding:boolean})=>{
const fields:FormFieldProps[]=[{
    name:"name",
    placeholder:"Enter your workspace name",
    type:"text",
    icon:FaPeopleGroup,
}]
    const title=  isOnboarding ? " Give your workspace a name to get started." : 'Choose a Name for Your Workspace'
const {mutate}=useCreateWorkspace()
const closeDialog=useDialogStore((state) => state.closeDialog)              ;
const onSubmit = (val: CreateWorkspaceData) => {
    mutate(val,{
        onSuccess:()=>{
            closeDialog();
        }
    });
}

return (
    <>              <FormCard
                    title={title}
                    schema={workspaceSchema}
                    fields={fields}
                    onSubmit={onSubmit}
                    btnText={"Create Workspace"}/>
    </>
)
}
export default WorkspaceForm;
