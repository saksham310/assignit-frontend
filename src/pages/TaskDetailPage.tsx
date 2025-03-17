import {Badge} from "@/components/ui/badge.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {AlertCircle, User} from "lucide-react";

const TaskDetailPage = () => {
    return <>
   <div className={'container p-4  mx-auto py-6'}>
       <div className={'sticky top-0 bg-background pt-2 pb-4 z-10 mb-6 flex flex-col gap-6'}>
          <div className={'flex items-center gap-2'}>
              <Badge variant={'outline'}>Task Id</Badge>
              <Badge variant={'outline'}>Status</Badge>
          </div>
           <h1 className={'font-bold'}>
               TASK NAME
           </h1>
       </div>
       <div className={'grid md:grid-cols-[2fr_1fr] gap-6 '}>
           <div>
            <Card className={'shadow-none'}>
                <CardContent className="p-6">
                <div className={'grid grid-cols-2 gap-6'}>
                   <div className={'text-gray-500 gap-4 text-sm flex items-center '}>
                     <div className={'flex items-center gap-1 text-sm'}> <AlertCircle className="h-4 w-4" /> Status :</div>
                       <Popover>
                           <PopoverTrigger>
                               <Badge variant="outline" className={'p-[0.5rem] font-normal'}>In Progress</Badge>
                           </PopoverTrigger>
                           <PopoverContent className={'w-auto'}>
                               nothing
                           </PopoverContent>
                       </Popover>
                   </div>
                    <div className={'text-gray-500 gap-4 text-sm flex items-center'}>
                        <div className={'flex items-center gap-1 text-sm'}> <User className="h-4 w-4" /> Assignee :</div>
                        <Popover>
                        <PopoverTrigger>
                            <div className={'w-auto flex gap-1 text-sm  items-center'}>
                               <div className="flex items-center ">
                                   <div className={'rounded-2xl border size-6 text-center  bg-pink-200'}>S</div>
                                   <div className={'rounded-2xl border size-6 text-center bg-blue-200'}>A</div></div>
                               <span>+ 3</span>
                            </div>

                        </PopoverTrigger>
                        <PopoverContent className={'w-auto'}>
                            nothing
                        </PopoverContent>
                    </Popover>
                    </div>
                </div>
                </CardContent>
            </Card>
           </div>
           <div>SIDE CONTENT</div>
       </div>
   </div>
    </>
}
export default TaskDetailPage;