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

            <div className='flex flex-col gap-10 h-full '>
                <Analytics items={items} />
                <div className={'flex-1'}>
                    <GridWrapper columns={columns} data={data} />
                </div>
            </div>

    );
}

export default Dashboard;
