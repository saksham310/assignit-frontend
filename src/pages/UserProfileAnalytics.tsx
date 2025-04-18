import UserAvatar from "@/components/custom-components/shared/UserAvatar.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {AnalyticCardProps} from "@/types/dashboard.type.ts";
import {AlertCircle, BarChart2, Bug, CircleCheckBig, Loader, PieChartIcon} from "lucide-react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import PerformanceMetric from "@/components/custom-components/PerformanceMetric.tsx";

const UserProfileAnalytics = () => {
    const memberData = {
        id: "m-001",
        name: "Saksham Sharma",
        role: "Frontend Developer",
        email: "sakshams982@gmail.com",
        avatarColor: "#3e6de5",
        imageUrl: "https://res.cloudinary.com/dcoky4dix/image/upload/v1744692627/user_profiles/nhvmqci11qolnht7zzq9.jpg",
        joinDate: "March 15, 2023",
        tasks: {
            total: 48,
            completed: 40,
            inProgress: 6,
            todo: 2,
            bugs: 4,
        },
    }

    // Data for donut chart
    const donutData = [
        {name: "Completed", value: memberData.tasks.completed},
        {name: "Remaining", value: memberData.tasks.total - memberData.tasks.completed},
    ]

    // Data for bar chart
    const barData = [
        {name: "In Progress", value: memberData.tasks.inProgress},
        {name: "To Do", value: memberData.tasks.todo},
    ]


    const completionRate = Math.round((memberData.tasks.completed / memberData.tasks.total) * 100)
    const avgBugsPerTask = Number(memberData.tasks.bugs / memberData.tasks.total).toFixed(2);
    const qualityScore = Math.round(100 * Math.exp(-0.178 * avgBugsPerTask));


    // Colors for charts
    const DONUT_COLORS = ["#10b981", "#e5e7eb"]
    const BAR_COLORS = ["#14b8a6", "#f59e0b"]

    const items: AnalyticCardProps[] = [
        {
            name: 'Total Task',
            info: `${memberData.tasks.total}`,
            iconLabel: BarChart2
        },
        {
            name: 'Completed',
            info: `${memberData.tasks.completed}`,
            subInfo: `${completionRate}% completion`,
            iconLabel: CircleCheckBig
        },
        {
            name: 'In Progress',
            info: `${memberData.tasks.inProgress}`,
            iconLabel: Loader
        },
        {
            name: 'To Do',
            info: `${memberData.tasks.todo}`,
            iconLabel: AlertCircle
        },

    ]
    return <>
        <div className={'w-full h-full bg-white p-3 flex flex-col space-y-8'}>
            <div className={'flex gap-3 items-center'}>
                <UserAvatar className={'size-20'} name={memberData.name} avatarColor={memberData.avatarColor}
                            src={memberData.imageUrl}/>
                <div className={'flex flex-col gap-2'}>
                    <span className={'text-lg font-medium'}>Saksham Sharma</span>
                    <Badge variant={'secondary'} className={'text-xs font-normal w-fit'}>Frontend Developer</Badge>
                    <span className={''}></span>
                </div>
            </div>
            {/* Performance Analysis */}
            <Card className="shadow-sm border border-gray-200">
                <CardHeader>
                    <CardTitle className="text-base font-medium">Performance Analysis</CardTitle>
                    <CardDescription className={'text-gray-500 text-xs'}>Overall assessment based on task completion and quality</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                            label="Quality Score"
                            value={qualityScore}
                            maxValue={100}
                            unit=""
                            description={
                                Number.parseFloat(avgBugsPerTask) <= 0.5
                                    ? "High quality work with minimal bugs"
                                    : Number.parseFloat(avgBugsPerTask) <= 0.10
                                        ? "Average quality, some improvements needed"
                                        : "Quality concerns, needs attention"
                            }
                            color={
                                Number.parseFloat(avgBugsPerTask) <= 0.5
                                    ? "#10b981"
                                    : Number.parseFloat(avgBugsPerTask) <= 0.10
                                        ? "#f59e0b"
                                        : "#ef4444"
                            }
                        />

                        <PerformanceMetric
                            label="Workload Balance"
                            value={Math.min(100, 100 - (memberData.tasks.inProgress / 15) * 100)}
                            maxValue={100}
                            unit=""
                            description={
                                memberData.tasks.inProgress <= 5
                                    ? "Balanced workload"
                                    : memberData.tasks.inProgress <= 10
                                        ? "Moderate workload"
                                        : "Heavy workload, consider redistribution"
                            }
                            color={
                                memberData.tasks.inProgress <= 5
                                    ? "#10b981"
                                    : memberData.tasks.inProgress <= 10
                                        ? "#f59e0b"
                                        : "#ef4444"
                            }
                        />
                    </div>
                </CardContent>
            </Card>
            {/*<Analytics items={items} className={'p-1 border-2 border-gray-100'}/>*/}
            {/*Chart Sections*/}
            <div className={'grid grid-cols-3 gap-6'}>
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
                                        {donutData.map((entry, index) => (
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
                                        {barData.map((entry, index) => (
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
                            <div
                                className=" font-medium text-gray-900">{memberData.tasks.todo + memberData.tasks.inProgress}</div>
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
                                    <div className="text-sm text-gray-500 mt-1">Quality Score</div>
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