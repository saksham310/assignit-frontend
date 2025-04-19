import {useDialogStore} from "@/store/dialog.store.ts";
import { useMediaQuery } from '@custom-react-hooks/use-media-query';
import {Dialog, DialogContent} from "../../ui/dialog.tsx";
import {Drawer, DrawerContent} from "@/components/ui/drawer.tsx";
import React from "react";

const ResponsiveDialog = () => {
    // const isDesktop = useMediaQuery("(min-width: 768px)")
    const isOpen = useDialogStore((state) => state.isOpen);
    const component = useDialogStore((state) => state.component);
    const closeDialog = useDialogStore((state) => state.closeDialog);

    // if (isDesktop) {
        return (
            <Dialog open={isOpen} onOpenChange={closeDialog} >
                <DialogContent className="max-w-fit max-h-full overflow-y-auto" >
                    {component ? React.createElement(component) : null}
                </DialogContent>
            </Dialog>
        )
    // }
    // return (
    //     <Drawer open={isOpen} onOpenChange={closeDialog}>
    //         <DrawerContent className="">
    //             {component ? React.createElement(component) : null}
    //         </DrawerContent>
    //     </Drawer>
    // )
}
export default ResponsiveDialog;