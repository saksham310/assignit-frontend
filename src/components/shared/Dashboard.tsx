import Analytics from "@/components/shared/Analytics.tsx";

const Dashboard = () => {
    const items=[
        { name: "Projects", count: 2},
        { name: "Sprint", count: 2}, { name: "Projects", count: 2},
        { name: "Sprint", count: 2}
    ]
    return <>
    <Analytics items={items}/></>
}

export default Dashboard;
