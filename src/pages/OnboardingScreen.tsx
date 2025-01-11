import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import Onboarding from "@/assets/Onboarding.svg";
import WorkspaceForm from "@/components/custom-components/WorkspaceForm.tsx";


const OnboardingScreen=()=>{
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