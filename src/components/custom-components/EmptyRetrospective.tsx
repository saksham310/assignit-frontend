import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "../ui/card"
import {CirclePlus, LayoutTemplate} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useDialogStore} from "@/store/dialog.store.ts";
import SprintCreationForm from "@/components/custom-components/forms/SprintCreationForm.tsx";
import ProjectCreationForm from "@/components/custom-components/forms/ProjectCreationForm.tsx";


interface EmptyRetrospectiveProps {
    hasProject: boolean,
    projectId?:number,
    showBtn?: boolean
}

const EmptyRetrospectiveState = ({hasProject = false,projectId,showBtn=false}: EmptyRetrospectiveProps) => {
    const setOpen = useDialogStore((state) => state.openDialog);
    const handleButtonClick = () =>
    {
       if( hasProject) {
           setOpen(()=><SprintCreationForm id={projectId}/>)
       }  else {
           setOpen(ProjectCreationForm)
       }
    }
    return (
        <Card className="flex flex-col items-center shadow-sm border-0 justify-center w-full h-full ">
            <LayoutTemplate className={'size-20 text-gray-400'}/>
            <CardHeader>
                <CardTitle className="text-center">No Retrospectives Available</CardTitle>
                <CardDescription className="text-center text-gray-700">
                    You can't create a retrospective yet because there are no active projects or sprints. Please make
                    sure a project and sprint are set up first.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
             {showBtn &&  <Button className={'flex items-center gap-2'} onClick={handleButtonClick}> <CirclePlus/>{hasProject ? "Create a sprint" : "Add a Project"}</Button>}
            </CardContent>
        </Card>

    )
}

export default EmptyRetrospectiveState
