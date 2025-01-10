import {FormFieldProps} from "@/types/form.type.ts";
import {FaPeopleGroup} from "react-icons/fa6";
import FormCard from "@/components/shared/formCard.tsx";
import {workspaceSchema} from "@/schemas/workspaceSchemas.ts";
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import Onboarding from "@/assets/Onboarding.svg";
import {useCreateWorkspace} from "@/hooks/workspaceHooks.ts";
import {CreateWorkspaceData} from "@/types/workspace.type.ts";


const OnboardingScreen=()=>{
    const fields:FormFieldProps[]=[{
        name:"name",
        placeholder:"Enter your workspace name",
        type:"text",
        icon:FaPeopleGroup,
    }]
    const {mutate}=useCreateWorkspace();
    const onSubmit = (val: CreateWorkspaceData) => {
       console.log("onboardingScreen",val)
        mutate(val);
    }
    return (
        <>
          <img src={Onboarding} alt=""/>
            <Dialog open={true} >
                <DialogContent className="[&>button]:hidden max-w-fit">
                        <FormCard
                            title=" Give your workspace a name to get started."
                            schema={workspaceSchema}
                            fields={fields}
                            onSubmit={onSubmit}
                            btnText={"Create Workspace"}/>
                </DialogContent>
            </Dialog>

        </>
    )
}

export default OnboardingScreen;