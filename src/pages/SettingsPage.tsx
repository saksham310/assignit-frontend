import {TabConfig} from "@/types/dashboard.type.ts";
import TabLayoutWrapper from "@/components/custom-components/shared/TabLayoutWrapper.tsx";

const SettingsPage=()=>{
    const tabConfig:TabConfig[] = [
        {
            value: "account",
            label: "Account Settings",
            component: () => <div> User Settings</div>,
        },
        {
            value: "workspace",
            label: "Workspace Settings",
            component: () =><div> Workspace Settings</div>,
        },
    ];
    return(
    <>
        <TabLayoutWrapper tabConfig={tabConfig}/>
    </>
    )
}
export default SettingsPage;