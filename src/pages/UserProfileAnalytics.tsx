import UserAvatar from "@/components/custom-components/shared/UserAvatar.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {BarChart2, Bug, PieChartIcon} from "lucide-react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import PerformanceMetric from "@/components/custom-components/PerformanceMetric.tsx";
import {useUserAnalytics} from "@/hooks/user.hooks.ts";
import {useParams} from "react-router-dom";
import Loader from "@/components/custom-components/shared/Loader.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useState} from "react";

const UserProfileAnalytics = (id: number) => {
    const {projectId} = useParams();
    const [selectedSprintId, setSelectedSprintId] = useState<number|undefined>();
    const {data, isLoading} = useUserAnalytics(projectId, id, selectedSprintId);

    if (isLoading) return <Loader/>
    const memberData = data?.details;

    // Data.tsx for donut chart
    const donutData = [
        {name: "Completed", value: memberData.tasks.completed},
        {name: "Remaining", value: memberData.tasks.total - memberData.tasks.completed},
    ]

    // Data.tsx for bar chart
    const barData = [
        {name: "In Progress", value: memberData.tasks.inProgress},
        {name: "To Do", value: memberData.tasks.todo},
    ]

    const k = -1.5;
    const completionRate = memberData.tasks.total === 0 ? 0 : Math.round((memberData.tasks.completed / memberData.tasks.total) * 100)
    const avgBugsPerTask = memberData.tasks.total === 0 ? 0  : +(memberData.tasks.bugs / memberData.tasks.total).toFixed(2);
    const qualityScore = avgBugsPerTask === 0 ? 0 : memberData?.role !== "QA" ? Math.min(100, Math.round(100 * Math.exp(k * avgBugsPerTask)))
        : Math.min(100, Math.round(100 * Math.exp(-k * avgBugsPerTask)));

    const idealLimit = memberData.sprintCount * memberData.idealTaskCount;
    const moderateLimit = memberData.sprintCount * memberData.idealTaskCount + 2;

    // Colors for charts
    const DONUT_COLORS = ["#10b981", "#e5e7eb"]
    const BAR_COLORS = ["#14b8a6", "#f59e0b"]

    return <>
        <div className={'w-auto h-full lg:w-[1240px] bg-white p-3 flex flex-col space-y-8'}>
            <div className={'flex justify-between items-center'}>
                <div className={'flex gap-3 items-center'}>
                    <UserAvatar className={'size-20'} name={memberData.username} avatarColor={memberData.avatarColor}
                                src={memberData.imageUrl}/>
                    <div className={'flex flex-col gap-2'}>
                        <span className={'text-lg font-medium'}>{memberData.username}</span>
                        <Badge variant={'secondary'}
                               className={'text-xs font-normal w-fit'}>{memberData.role.split("_").join(" ")}</Badge>
                        <span className={''}></span>
                    </div>
                </div>
                <div className="w-[200px]">
                    <Select
                        value={selectedSprintId?.toString() ?? "All Sprints"}
                        onValueChange={(value) => setSelectedSprintId(value && value != 'all' ? Number(value) : undefined)}
                    >
                        <SelectTrigger>
                            <SelectValue>
                                {selectedSprintId === undefined ? "All Sprints" : memberData.sprints.find(s => s.id === selectedSprintId)?.name}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={"all"}>All Sprints</SelectItem>
                            {memberData.sprints.map((sprint) => (
                                <SelectItem key={sprint.id} value={sprint.id.toString()}>
                                    {sprint.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            {/* Performance Analysis */}
            {memberData?.role !== "Project_Manager" && (
                <Card className="shadow-sm border border-gray-200">
                    <CardHeader>
                        <CardTitle className="text-base font-medium">Performance Analysis</CardTitle>
                        <CardDescription className={'text-gray-500 text-xs'}>Overall assessment based on task completion
                            and quality</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <PerformanceMetric
                                label="Task Efficiency"
                                value={completionRate}
                                maxValue={100}
                                unit="%"
                                description={
                                    completionRate >= 80
                                        ? "Excellent task completion rate"
                                        : completionRate >= 60
                                            ? "Good progress, keep it up"
                                            : "Needs improvement"
                                }
                                color={completionRate >= 80 ? "#10b981" : completionRate >= 60 ? "#14b8a6" : "#f59e0b"}
                            />

                            <PerformanceMetric
                                label={memberData?.role === "QA" ? "Testing Efficiency" : "Quality Score"}
                                value={qualityScore}
                                maxValue={100}
                                unit="%"
                                description={
                                    memberData?.role === "QA"
                                        ? qualityScore >= 85
                                            ? "Excellent testing efficiency: Thoroughly tested with high detection of critical issues."
                                            : qualityScore >= 60
                                                ? "Good testing efficiency: Test coverage is solid, though opportunities for deeper exploration may exist."
                                                : "Testing efficiency appears lower, but this may reflect high-quality code or limited issues present in the assigned tasks rather than missed defects."

                                        : (qualityScore >= 85
                                            ? "High quality work with minimal bugs"
                                            : qualityScore >= 60
                                                ? "Average quality, some improvements needed"
                                                : "Quality concerns, needs attention")
                                }
                                color={
                                    qualityScore >= 85
                                        ? "#10b981"
                                        : qualityScore >= 60
                                            ? "#f59e0b"
                                            : "#ef4444"
                                }
                            />

                            <PerformanceMetric
                                label="Workload Balance"
                                value={Math.min(100, Math.round((idealLimit / memberData.tasks.total) * 100))}
                                maxValue={100}
                                unit="%"
                                description={
                                    memberData.tasks.total <= idealLimit
                                        ? "Balanced workload"
                                        : memberData.tasks.total <= moderateLimit
                                            ? "Moderate workload"
                                            : "Heavy workload, consider redistribution"
                                }
                                color={
                                    memberData.tasks.total <= idealLimit
                                        ? "#10b981"
                                        : memberData.tasks.total <= moderateLimit
                                            ? "#f59e0b"
                                            : "#ef4444"
                                }
                            />
                        </div>
                    </CardContent>
                </Card>
            )}

            {/*Chart Sections*/}
            <div className={'grid grid-cols-1 lg:grid-cols-3 gap-6'}>
                {/* Pie chart Completed vs total*/}
                <Card className="shadow-sm border border-gray-200 ">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-sm font-medium flex items-center gap-2">
                                    <PieChartIcon className="h-4 w-4 text-teal-600"/>
                                    Task Completion
                                </CardTitle>
                                <CardDescription className={'text-gray-500 text-xs'}>Completed vs. total
                                    tasks</CardDescription>
                            </div>
                            <div className=" font-medium text-gray-900">{completionRate}%</div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[220px] flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={donutData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={90}
                                        dataKey="value"
                                        startAngle={90}
                                        endAngle={-270}
                                        cornerRadius={5}
                                        paddingAngle={2}
                                    >
                                        {donutData.map((_entry, index) => (
                                            <Cell key={`cell-${index}`} fill={DONUT_COLORS[index]}/>
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value: number, name: string) => [`${value.toFixed(2)}%`, name]}/>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex justify-between text-sm mt-2">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                                <span className="text-gray-600">Completed: {memberData.tasks.completed}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-gray-200"></div>
                                <span className="text-gray-600">
                    Remaining: {memberData.tasks.total - memberData.tasks.completed}
                  </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="shadow-sm border border-gray-200 ">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-sm font-medium flex items-center gap-2">
                                    <BarChart2 className="h-4 w-4 text-teal-600"/>
                                    Current Tasks
                                </CardTitle>
                                <CardDescription className={'text-gray-500 text-xs'}>In progress and to-do
                                    tasks</CardDescription>
                            </div>
                            <div
                                className=" font-medium text-gray-900">{memberData.tasks.todo + memberData.tasks.inProgress}</div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[220px] flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={barData} layout="horizontal">
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <Tooltip
                                        formatter={(value: number, name: string) => [`${value.toFixed(2)}%`, name]}/>
                                    <Bar dataKey="value" barSize={50} radius={[10, 10, 0, 0]}>
                                        {barData.map((_entry, index) => (
                                            <Cell key={`cell-${index}`} fill={BAR_COLORS[index]}/>
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex justify-between text-sm mt-2">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                                <span className="text-gray-600">In Progress: {memberData.tasks.inProgress}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                                <span className="text-gray-600">
                    To do: {memberData.tasks.todo}
                  </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                {/* Bug Metrics Card */}
                <Card className="shadow-sm border border-gray-200">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-sm font-medium flex items-center gap-2">
                                    <Bug className="h-4 w-4 text-rose-600"/>
                                    Bug Metrics
                                </CardTitle>
                                <CardDescription className={'text-gray-500 text-xs'}>Bug count and
                                    density</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[240px] flex flex-col gap-8 justify-center">
                            <div className="mt-4">
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm text-gray-600">Bug Density</span>
                                    <span className="text-sm font-medium text-gray-900">{avgBugsPerTask} per task</span>
                                </div>
                                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-rose-700 rounded-full"
                                        style={{width: `${Math.min(Number(avgBugsPerTask) * 50, 100)}%`}}
                                    ></div>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    {Number(avgBugsPerTask) <= 0.3
                                        ? "Low bug density - excellent quality"
                                        : Number(avgBugsPerTask) <= 0.6
                                            ? "Average bug density - acceptable quality"
                                            : "High bug density - quality needs improvement"}
                                </p>
                            </div>
                            <div className="flex-1 flex justify-between items-center">
                                <div className="text-center p-4 bg-gray-50 rounded-lg flex-1 mr-4">
                                    <div className="text-3xl font-semibold text-rose-800">{memberData.tasks.bugs}</div>
                                    <div className="text-sm text-gray-500 mt-1">Total Bugs</div>
                                </div>
                                <div className="text-center p-4 bg-gray-50 rounded-lg flex-1">
                                    <div className="text-3xl font-semibold text-gray-700">{qualityScore}%</div>
                                    <div
                                        className="text-sm text-gray-500 mt-1">{memberData?.role === "QA" ? "Test Efficiency" : "Quality Score"}</div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </>
}

export default UserProfileAnalytics;