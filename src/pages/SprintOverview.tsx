import {TabConfig} from "@/types/dashboard.type.ts";
import TabLayoutWrapper from "@/components/custom-components/shared/TabLayoutWrapper.tsx";
import SprintListView from "@/components/custom-components/dashboard/SprintListView.tsx";
import {useOutletContext} from "react-router-dom";
import {useEffect} from "react";
import {PlusCircle} from "lucide-react";
import { Button } from "@/components/ui/button";

const SprintOverview = () => {
    const setTitle = useOutletContext<(title: string) => void>();
    useEffect(() => {
        setTitle("Sprint Overview");
    }, [setTitle]);
    const tabConfig: TabConfig[] = [
        {
            value: "list",
            label: "List",
            component: () => <SprintListView/>,
        },
        {
            value: "kanban",
            label: "Kanban",
            component: () => <>
                <div>Kanban here</div>
            </>,
        },
    ];
    return (
        <>
            <div className={'hidden lg:flex w-auto  items-center gap-x-4 absolute right-8'}>
                <Button variant={'outline'} size={'sm'} onClick={() => {}}><PlusCircle/>Add
                    Task</Button>
            </div>
            <TabLayoutWrapper tabConfig={tabConfig}/></>
    )
}

export default SprintOverview