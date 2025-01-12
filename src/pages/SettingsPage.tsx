import {TabConfig} from "@/types/dashboard.type.ts";
import TabLayoutWrapper from "@/components/custom-components/shared/TabLayoutWrapper.tsx";
import UserSettings from "@/components/custom-components/settings/UserSettings.tsx";
import WorkspaceSettings from "@/components/custom-components/settings/WorkspaceSettings.tsx";

const SettingsPage=()=>{
    const tabConfig:TabConfig[] = [
        {
            value: "account",
            label: "Account Settings",
            component: () => <UserSettings/>,
        },
        {
            value: "workspace",
            label: "Workspace Settings",
            component: () =><WorkspaceSettings/>,
        },
    ];
    return(
    <>
        <TabLayoutWrapper tabConfig={tabConfig}/>
    </>
    )
}
export default SettingsPage;