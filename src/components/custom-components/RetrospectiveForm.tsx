import {Label} from "@/components/ui/label.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import {useSubmitFeedback} from "@/hooks/project.hooks.ts";
import {RetrospectivePayload} from "@/types/project.types.ts";

interface RetrospectiveFormProps {
    sprintId:number;
}
const RetrospectiveForm = ({sprintId}:RetrospectiveFormProps) => {
    const [feedback, setFeedback] = useState<Record<string, string>>({
        wentWell:'',
        toImprove:'',
        actionItems:''
    });
    const {mutate} = useSubmitFeedback()
    const handleSubmit = () => {
        if(!feedback.wentWell || !feedback.toImprove || !feedback.actionItems) return
       const payload = {
        ...feedback,
        sprintId
       } as RetrospectivePayload;
        mutate(payload)
        setFeedback({
            wentWell: '',
            toImprove: '',
            actionItems: '',
        })
    }
    const isDisabled = !feedback.wentWell || !feedback.toImprove || !feedback.actionItems;
    return <>
        <div className={'flex-1 flex flex-col space-y-4'} >
            <div className="space-y-2">
                <Label htmlFor="wentWell">What went well?</Label>
                <Textarea
                    id="wentWell"
                    placeholder="Share positive aspects of the sprint"
                    value={feedback.wentWell}
                    onChange={(e) => setFeedback({...feedback, wentWell: e.target.value})}
                    className="min-h-[100px]"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="toImprove">What could be improved?</Label>
                <Textarea
                    id="toImprove"
                    placeholder="Share areas that need improvement"
                    value={feedback.toImprove}
                    onChange={(e) => setFeedback({...feedback, toImprove: e.target.value})}
                    className="min-h-[100px]"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="actionItems">Action items</Label>
                <Textarea
                    id="actionItems"
                    placeholder="Suggest specific actions for improvement"
                    value={feedback.actionItems}
                    onChange={(e) => setFeedback({...feedback, actionItems: e.target.value})}
                    className="min-h-[100px]"
                />
            </div>
            <Button type="submit" className="ml-auto" onClick={handleSubmit} disabled={isDisabled}>
                Submit Feedback
            </Button>
        </div>
    </>
}

export default RetrospectiveForm;