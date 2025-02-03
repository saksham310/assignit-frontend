import { Button } from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useState} from "react";
import {Badge} from "@/components/ui/badge.tsx";
import {X} from "lucide-react";

const SendInvitePage = ()=>{
    const [emailList, setEmailList] = useState<string[]>([]);
    return <>
  <Card className={'w-full h-full md:w-[560px] bg-white shadow-none border-none '}>
      <CardHeader className={'text-center'}>
          <CardTitle >Workspace Invitation</CardTitle>
      </CardHeader>
      <CardContent className={'p-8  border-gray-200 flex gap-2 justify-between items-center'}>
          <Input placeholder={'Enter email address'}/>
          <Button> Add</Button>
      </CardContent>
      <CardContent className={'p-8 border-gray-200 '}>
          <div className={'flex gap-2  flex-wrap'}>
              {emailList.map((email) => {
                  return   (
                      <Badge  variant={"secondary"} className={"flex gap-3 items-center font-normal"}>{email} <X size={'13'}/></Badge>
                  )
              })}
          </div>

      </CardContent>
      <Button className={'m-2 w-full'}>Send Invitation</Button>
  </Card>
    </>
}

export default SendInvitePage;