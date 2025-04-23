import {Avatar} from "@radix-ui/react-avatar";
import {AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Settings2, Trash2} from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {Separator} from "@/components/ui/separator.tsx";

const ProjectSettings = () => {
    const [projectName, setProjectName] = useState("Final Year Project");
    const [sprintTasks, setSprintTasks] = useState(3);

    return (
        <div className="flex flex-col gap-4 w-auto h-full overflow-y-auto no-scrollbar xl:space-y-5">
            <p className="font-semibold text-xl">Project Settings</p>

              <div className="flex items-center gap-10">
                  <Avatar className="size-20 lg:size-24 rounded-lg border-2 border-gray-200">
                      <AvatarImage src=""/>
                      <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
                          {projectName.charAt(0)}
                      </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col w-full lg:max-w-[640px] gap-2">
                      <label className="text-sm font-medium">Project Name</label>
                      <Input
                          value={projectName}
                          onChange={(e) => setProjectName(e.target.value)}
                          className="text-black"
                      />
                  </div>

          </div>
            <Separator/>
            <div className="flex items-center justify-between mb-4">
                <p className="font-medium">Ideal Tasks per Sprint</p>
                <Input
                    type="number"
                    value={sprintTasks}
                    onChange={(e) => setSprintTasks(Number(e.target.value))}
                    className="ml-auto max-w-[140px]"
                />
            </div>
            <div className="flex items-center justify-between mb-4">
                <p className="font-medium">Status Management</p>
                <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                >
                    <Settings2 className="h-4 w-4"/>
                    Manage Status
                </Button>
            </div>

            <Separator/>
           <div className="flex items-center justify-between mb-4">
               <p className="font-semibold text-red-700 mb-4">Danger Zone</p>
               <AlertDialog>
                   <AlertDialogTrigger asChild>
                       <Button variant="destructive" className="flex items-center bg-red-700 gap-2">
                           <Trash2 className="h-4 w-4"/>
                           Delete Project
                       </Button>
                   </AlertDialogTrigger>
                   <AlertDialogContent>
                       <AlertDialogHeader>
                           <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                           <AlertDialogDescription>
                               This action cannot be undone. This will permanently delete your project
                               and remove all associated data from our servers.
                           </AlertDialogDescription>
                       </AlertDialogHeader>
                       <AlertDialogFooter>
                           <AlertDialogCancel>Cancel</AlertDialogCancel>
                           <AlertDialogAction className="bg-red-700">
                               Delete Project
                           </AlertDialogAction>
                       </AlertDialogFooter>
                   </AlertDialogContent>
               </AlertDialog>
           </div>
        </div>
    );
};

export default ProjectSettings;