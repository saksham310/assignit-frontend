import {Label} from "@/components/ui/label.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import {useSubmitFeedback} from "@/hooks/project.hooks.ts";
import {RetrospectivePayload} from "@/types/project.types.ts";
import moment from "moment";
import {Card, CardContent} from "@/components/ui/card.tsx";

interface RetrospectiveFormProps {
    sprintId:number;
    sprintDate:string | undefined;
}
const RetrospectiveForm = ({sprintId,sprintDate}:RetrospectiveFormProps) => {
    const [feedback, setFeedback] = useState<Record<string, string>>({
        wentWell:'',
        toImprove:'',
        actionItems:''
    });
    const isSprintOver = sprintDate && moment(sprintDate).isValid() 
        ? moment().isAfter(moment(sprintDate)) 
        : false;
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
    console.log(sprintDate)
    const isDisabled = !feedback.wentWell || !feedback.toImprove || !feedback.actionItems;
    if(!isSprintOver){
      return  <div className={'flex items-center justify-center p-28'}>
          <Card className="shadow-none border-none w-[400px]">
              <CardContent className="px-6 py-10">
                  <div className="flex flex-col items-center justify-center text-center space-y-4">
                      <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center">
                          <svg
                              className="h-10 w-10 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                          >
                              <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 0 002-2M9 5a2 2 0 012-2h2a2 0 012 2"
                              />
                          </svg>
                      </div>
                      <div className="space-y-2">
                          <h3 className="text-xl font-semibold text-gray-800">Sprint In Progress</h3>
                          <p className="text-gray-500 text-sm max-w-[300px]">
                              The retrospective will be available once the current sprint ends. Stay focused and keep tracking your tasks until then.
                          </p>
                      </div>
                  </div>
              </CardContent>
          </Card>
      </div>
    }
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