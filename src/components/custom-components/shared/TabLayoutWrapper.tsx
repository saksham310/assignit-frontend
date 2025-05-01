import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {TabConfig} from "@/types/dashboard.type.ts";
import {useSearchParams} from "react-router-dom";

interface TabLayoutWrapperProps {
    tabConfig: TabConfig[];
    isDashboard?: boolean;
}

const TabLayoutWrapper = ({tabConfig, isDashboard}: TabLayoutWrapperProps) => {
    const [queryParameters] = useSearchParams();
    const defaultTab = queryParameters.get('tab') ?? tabConfig[0].value;

    return (
        <div className={'h-full flex flex-col'}>
            <Tabs defaultValue={defaultTab} className="w-full  h-full flex flex-col  gap-0.5">
                <div>
                    < TabsList className="gap-2 bg-[#f6f8fb] space-x-2">
                        {tabConfig.map((tab) => {
                            return (
                                <TabsTrigger value={tab.value} key={tab.value}>
                                    {tab.label}
                                </TabsTrigger>
                            )
                        })}
                    </TabsList>
                </div>
                <div
                    className={`bg-white p-4 rounded-lg mt-4 ${isDashboard ? 'lg:h-[calc(100dvh-16em)]' : 'h-full'}  overflow-hidden `}>
                    {tabConfig.map((tab) => {
                        return (
                            <TabsContent key={tab.value} value={tab.value} className="p-1 h-full overflow-y-auto overflow-x-auto">
                                <tab.component/>
                            </TabsContent>
                        )
                    })}
                </div>
            </Tabs>
        </div>
    );
};
export default TabLayoutWrapper;