import {TabConfig} from "@/types/dashboard.type.ts";
import TabLayoutWrapper from "@/components/custom-components/shared/TabLayoutWrapper.tsx";
import UserSettings from "@/components/custom-components/settings/UserSettings.tsx";
import WorkspaceSettings from "@/components/custom-components/settings/WorkspaceSettings.tsx";
import {useOutletContext} from "react-router-dom";
import {useEffect} from "react";

const SettingsPage=()=>{
    const setTitle = useOutletContext<(title: string) => void>();
    useEffect(() => {
        setTitle("Settings")
    }, [setTitle]);
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