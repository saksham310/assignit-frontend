import {FormFieldProps} from "@/types/form.type.ts";
import {FaPeopleGroup} from "react-icons/fa6";
import FormCard from "@/components/shared/formCard.tsx";
import {workspaceSchema} from "@/schemas/workspaceSchemas.ts";
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import Onboarding from "@/assets/Onboarding.svg";


const OnboardingScreen=()=>{
    const fields:FormFieldProps[]=[{
        name:"Name",
        placeholder:"Enter your workspace name",
        type:"text",
        icon:FaPeopleGroup,
    }]
    const user=useAuthUser();
    console.log(user)
    return (
        <>
          <img src={Onboarding} alt=""/>
            <Dialog open={true}>
                <DialogContent >
                    {/*<DialogHeader className="space-y-7 px-10">*/}
                    {/*    <DialogTitle className="text-xl">Welcome </DialogTitle>*/}
                    {/*    /!*<DialogDescription>*!/*/}
                    {/*    /!*    Give your workspace a name to get started.*!/*/}
                    {/*    /!*</DialogDescription>*!/*/}
                    {/*</DialogHeader>*/}
                        <FormCard
                            title=" Give your workspace a name to get started."
                            schema={workspaceSchema}
                            fields={fields}
                            onSubmit={() => {
                            }}
                            btnText={"Create Workspace"}/>
                </DialogContent>
            </Dialog>

        </>
    )
}

export default OnboardingScreen;