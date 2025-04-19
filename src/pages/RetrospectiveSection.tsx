import { Label } from "@/components/ui/label";
import {Select, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import TabLayoutWrapper from "@/components/custom-components/shared/TabLayoutWrapper.tsx";
import RetrospectiveForm from "@/components/custom-components/RetrospectiveForm.tsx";


const RetrospectiveSection = () => {
      const tabconfig =  [
                {
                        value: "submit",
                        label: "Submit Feedback",
                        component: () => <RetrospectiveForm/>
                },
                {
                        value: "view",
                        label: "View Response",
                        component: () =><>To View</>,
                },
        ];
        return <>
        <div className={'w-full bg-white h-full rounded-lg p-4 flex flex-col space-y-4'}>

                <div className={'p-1 overflow-y-auto flex flex-col space-y-6'}>
                       <div className={'flex items-center w-full space-x-4 basis-4/5 '}>
                               <div className={'flex flex-col gap-3 flex-1'}>
                                       <Label>Select Project</Label>
                                       <Select>
                                               <SelectTrigger id="project">
                                                       <SelectValue placeholder="Select a project" />
                                               </SelectTrigger>
                                       </Select>
                               </div>
                               <div className={'flex flex-col gap-3 flex-1'}>
                                       <Label>Select Sprint</Label>
                                       <Select>
                                               <SelectTrigger id="project">
                                                       <SelectValue placeholder="Select a sprint" />
                                               </SelectTrigger>
                                       </Select>
                               </div>
                       </div>
                        <TabLayoutWrapper tabConfig={tabconfig}/>
                </div>
        </div>
        </>
}

export default RetrospectiveSection;