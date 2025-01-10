import Dashboard from "@/components/shared/Dashboard.tsx";
import {useOutletContext, useParams} from "react-router-dom";
import {useEffect} from "react";
import {useGetWorkspaceAnalytics} from "@/hooks/workspaceHooks.ts";
import Loader from "@/components/shared/Loader.tsx";



const WorkspacePage = () => {
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
    const items = analytics.map((key) => ({
        name: key,
        count: workspaceAnalytics[key]
    }))


    return (
        <Dashboard items={items}/>
    )
}

export default WorkspacePage;