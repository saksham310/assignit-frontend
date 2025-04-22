import {useDialogStore} from "@/store/dialog.store.ts";
import {Dialog, DialogContent} from "../../ui/dialog.tsx";
import React from "react";
import { DialogTitle } from "@radix-ui/react-dialog";


const ResponsiveDialog = () => {
    // const isDesktop = useMediaQuery("(min-width: 768px)")
    const isOpen = useDialogStore((state) => state.isOpen);
    const component = useDialogStore((state) => state.component);
    const closeDialog = useDialogStore((state) => state.closeDialog);

    return (
        <Dialog open={isOpen} onOpenChange={closeDialog} >
            <DialogContent className="max-w-fit max-h-full " >
              <DialogTitle className="hidden">Dialog</DialogTitle>
                {component ? React.createElement(component) : null}
            </DialogContent>
        </Dialog>
    )

}
export default ResponsiveDialog;