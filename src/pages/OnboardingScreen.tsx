import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import Onboarding from "@/assets/Onboarding.svg";
import WorkspaceForm from "@/components/custom-components/forms/WorkspaceForm.tsx";
import { useNavigate} from "react-router-dom";
import {useGetWorkspace} from "@/hooks/workspace.hooks.ts";


const OnboardingScreen=()=>{
    const currentWorkspaceId = useGetWorkspace();
    const navigate = useNavigate();
    if(!!currentWorkspaceId){
        navigate("/");
    }
    return (
        <>
          <img src={Onboarding} alt="" className={'size-full'}/>
            <Dialog open={true} >
                <DialogContent className="[&>button]:hidden max-w-fit">
                      <WorkspaceForm isOnboarding={true} />
                </DialogContent>
            </Dialog>

        </>
    )
}

export default OnboardingScreen;