import { Card, CardContent } from "@/components/ui/card.tsx";
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { priorityFlagMap } from "@/lib/utils.ts";
import Analytics from "@/components/custom-components/dashboard/Analytics.tsx";
import moment from "moment";
import NoDataDisplay from "@/components/custom-components/shared/NoDataDisplay.tsx";
import { ProjectOverviewData } from "@/types/project.types.ts";
import {CalendarDays, CircleCheckBig, ListTodo, Loader} from "lucide-react";
import {AnalyticCardProps} from "@/types/dashboard.type.ts";

const ProjectOverview = ({ projectData }: { projectData: ProjectOverviewData }) => {

    // calculating the project completion percentage
    const calculateProjectCompletionPercentage = (number: number) => {
        return projectData?.tasks !== 0 ? (number / projectData?.tasks) * 100 : 0;
    }

    // Task Status Data
    const taskStatusData = [
        { name: "Completed", value: calculateProjectCompletionPercentage(projectData?.completed), color: "#10b954" }, // Green
        { name: "In Progress", value: calculateProjectCompletionPercentage(projectData?.inProgress), color: "rgba(255,189,56,0.9)" }, // Amber
        { name: "To Do", value: calculateProjectCompletionPercentage(projectData?.toDo), color: "#8f90ff" }, // Indigo
    ];

    // Task Priority Data
    const taskPriorityData = [
        { name: "High", value: calculateProjectCompletionPercentage(projectData?.highPriority), color: priorityFlagMap['High'] }, // Red
        { name: "Medium", value: calculateProjectCompletionPercentage(projectData?.mediumPriority), color: priorityFlagMap['Medium'] }, // Amber
        { name: "Low", value: calculateProjectCompletionPercentage(projectData?.lowPriority), color: priorityFlagMap['Low'] }, // Green
    ];

    // Data for analytics
    const items:AnalyticCardProps[] = [
        {
            name: 'Completion Rate',
            info: ` ${projectData?.tasks !== 0 ? (projectData?.completed / projectData?.tasks * 100).toFixed(2) : 0} %`,
            subInfo: "Of total tasks completed",
            iconLabel: CircleCheckBig
        },
        {
            name: 'Average Task Per Member',
            info: `${(projectData?.tasks / projectData?.members).toFixed(2)}`,
            subInfo: "Average workload per member",
            iconLabel: ListTodo
        },
        {
            name: 'In Progress',
            info: ` ${projectData?.tasks !== 0 ? (projectData?.inProgress / projectData?.tasks * 100).toFixed(2) : 0} %`,
            subInfo: "Of tasks currently active",
            iconLabel: Loader
        },
        {
            name: 'Time Remaining',
            info: `${moment(projectData?.dueDate, "YYYY-MM-DD", true).isValid() ?
                (moment(projectData?.dueDate).diff(moment(), 'days') < 0 ?
                    `Overdue by ${Math.abs(moment(projectData?.dueDate).diff(moment(), 'days'))} days`
                    : `${moment(projectData?.dueDate).diff(moment(), 'days')} days remaining`)
                : 0}`,
            subInfo: "Days until deadline",
            iconLabel: CalendarDays
        },
    ];

    const hasData = projectData.tasks !== 0 && projectData.members !== 0;

    return (
        <>
            <div className={'flex flex-col gap-4 md:gap-10 h-full p-2 md:p-0'}>
                <Analytics items={items} className={'p-2 md:p-4 border-2 border-gray-100'} />
                <div className={'grid grid-cols-1 md:grid-cols-2 gap-4 h-full'}>
                    {/* Task Completion Distribution */}
                    <Card className="bg-white shadow-sm border-2 border-gray-100 rounded-lg">
                        <CardContent className="p-2 md:p-4 flex flex-col h-full">
                            <div className="space-y-1 mb-2 md:mb-4">
                                <h3 className="text-sm font-medium text-gray-700">Task Completion Distribution</h3>
                                <p className="text-xs text-gray-500">Breakdown of tasks by status</p>
                            </div>
                            <div className={'flex-1'}>
                                {hasData ? (
                                    <div className={'h-[250px] md:h-[300px] 2xl:h-[500px]'}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart aria-label="Task Completion Distribution">
                                                <Pie
                                                    data={taskStatusData}
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
                                                    {taskStatusData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip formatter={(value: number, name: string) => [`${value.toFixed(2)}%`, name]} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                ) : (
                                    <NoDataDisplay 
                                        title={'No Tasks Available'} 
                                        subtitle={'Add tasks and members to see statistics'} 
                                        containerClassName="h-[250px] md:h-[300px] 2xl:h-[500px]"
                                    />
                                )}
                                <div className="flex flex-wrap justify-center gap-3 md:gap-6 mt-2">
                                    {taskStatusData.map((entry, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <div className="w-2 md:w-3 h-2 md:h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                                            <span className="text-xs md:text-sm text-gray-600">
                                                {entry.name}: {entry.value.toFixed(2)}%
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Task Priority Distribution */}
                    <Card className="bg-white shadow-sm border-2 border-gray-100 rounded-lg">
                        <CardContent className="p-2 md:p-4 flex flex-col h-full">
                            <div className="space-y-1 mb-2 md:mb-4">
                                <h3 className="text-sm font-medium text-gray-700">Task Priority Distribution</h3>
                                <p className="text-xs text-gray-500">Breakdown of tasks by priority</p>
                            </div>
                            <div className="flex-1">
                                {hasData ? (
                                    <div className={'h-[250px] md:h-[300px] 2xl:h-[500px]'}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={taskPriorityData}>
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip formatter={(value: number, name: string) => [`${value.toFixed(2)}%`, name]} />
                                                <Bar dataKey="value" barSize={50} radius={[10, 10, 0, 0]}>
                                                    {taskPriorityData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                ) : (
                                    <NoDataDisplay 
                                        title={'No Tasks Available'} 
                                        subtitle={'Add tasks and members to see statistics'} 
                                        containerClassName="h-[250px] md:h-[300px] 2xl:h-[500px]"
                                    />
                                )}
                                <div className="flex flex-wrap justify-center gap-3 md:gap-6 mt-2">
                                    {taskPriorityData.map((entry, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <div className="w-2 md:w-3 h-2 md:h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                                            <span className="text-xs md:text-sm text-gray-600">
                                                {entry.name}: {entry.value.toFixed(2)}%
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default ProjectOverview;
