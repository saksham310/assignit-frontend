import Analytics from "@/components/shared/Analytics.tsx";
import GridWrapper from "@/components/shared/GridWrapper.tsx";
import {AnalyticCardProps} from "@/types/dashboard.type.ts";
import { ColumnDef } from "@tanstack/react-table"

interface DashboardProps {
    items:AnalyticCardProps[],
    columns:ColumnDef<any>[],
    data: unknown[]

}
const Dashboard = ({items,columns,data}:DashboardProps) => {

    return (
        <div className="grid grid-cols-1 gap-8 mb-2 haha">
            <Analytics items={items} />
            <GridWrapper columns={columns} data={data} />
        </div>
    );
}

export default Dashboard;
