import Dashboard from "@/components/custom-components/dashboard/Dashboard.tsx";
import {useOutletContext, useParams} from "react-router-dom";
import {useEffect} from "react";
import {useGetWorkspaceAnalytics} from "@/hooks/workspace.hooks.ts";
import Loader from "@/components/custom-components/shared/Loader.tsx";



const WorkspaceDashboard = () => {
    const setTitle = useOutletContext<(title: string) => void>();

    useEffect(() => {
        setTitle("Workspace Summary")
    }, [setTitle]);

    const {id} = useParams();
    const {data: workspaceAnalytics, isLoading} = useGetWorkspaceAnalytics(id);

    if (isLoading) {
        return <Loader/>
    }

    if (!workspaceAnalytics) return;

    const analytics = ["Projects", "Members", "Sprints", "Overdue Projects"];
    const iconLabel = {
        "Projects":'Projects',
        "Members":"Members",
        "Sprints":"Sprints",
        "Overdue Projects":"Due"
    }
    const items = analytics.map((key) => ({
        name: key,
        info: `${workspaceAnalytics[key]}`,
        iconLabel: iconLabel[key],
    }))


    return (
        <Dashboard items={items}/>
    )
}

export default WorkspaceDashboard;