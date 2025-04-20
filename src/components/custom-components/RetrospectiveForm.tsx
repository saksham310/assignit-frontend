import {Label} from "@/components/ui/label.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";

const RetrospectiveForm = () => {
    const [feedback, setFeedback] = useState<Record<string, string>>({
        wentWell:'',
        toImprove:'',
        actionItems:''
    });
    const handleSubmit = () => {
        console.log(feedback);
    }
    return <>
        <div className={'flex-1 flex flex-col space-y-4'} >
            <div className="space-y-2">
                <Label htmlFor="actionItems">What went well?</Label>
                <Textarea
                    id="actionItems"
                    placeholder="Share positive aspects of the sprint"
                    value={feedback.wentWell}
                    onChange={(e) => setFeedback({...feedback, wentWell: e.target.value})}
                    className="min-h-[100px]"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="actionItems">What could be improved?</Label>
                <Textarea
                    id="actionItems"
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
            <Button type="submit" className="w-full" onClick={handleSubmit}>
                Submit Feedback Anonymously
            </Button>
        </div>
    </>
}

export default RetrospectiveForm;