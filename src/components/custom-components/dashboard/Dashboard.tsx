import TabLayoutWrapper from "@/components/custom-components/shared/TabLayoutWrapper.tsx";
import {TabConfig} from "@/types/dashboard.type.ts";
import {Button} from "@/components/ui/button.tsx";

interface Action {
    label: string;
    icon: JSX.Element;
    onClick: () => void;
}

interface DashboardProps {
    tabConfig: TabConfig[];
    isOwnerAdmin?: boolean;
    actions?: Action[];
}

const Dashboard = ({tabConfig,isOwnerAdmin,actions}: DashboardProps) => {

    return (
<>

    {isOwnerAdmin && actions && actions.length > 0 && (
        <div className={'hidden lg:flex w-auto  items-center gap-x-4 absolute right-8'}>
            {actions.map((action,index) => (
                <Button key={index}
                        variant={action.label === "Invite" ? "default" : "outline"}
                        size={'sm'}
                onClick={action.onClick}>
                    {action.icon}
                    {action.label}
                </Button>
            ))}
        </div>
    )}
    <TabLayoutWrapper tabConfig={tabConfig} isDashboard={false}/>


</>
    );
}

export default Dashboard;
