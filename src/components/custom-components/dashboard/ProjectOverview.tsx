
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {priorityFlagMap} from "@/lib/utils.ts";
import Analytics from "@/components/custom-components/dashboard/Analytics.tsx";
import moment from "moment";
import NoDataDisplay from "@/components/custom-components/shared/NoDataDisplay.tsx";
import {ProjectOverviewData} from "@/types/project.types.ts";

const ProjectOverview = ({projectData}: {projectData:ProjectOverviewData }) =>{

    const calculateProjectCompletionPercentage = (number) =>{
        return (number/projectData.tasks) * 100;
    }
    const taskStatusData = [
        { name: "Completed", value: calculateProjectCompletionPercentage(projectData.completed), color: "#10b954" }, // Green
        { name: "In Progress", value: calculateProjectCompletionPercentage(projectData.inProgress), color: "rgba(255,189,56,0.9)" }, // Amber
        { name: "To Do", value: calculateProjectCompletionPercentage(projectData.toDo), color: "#8f90ff" }, // Indigo
    ]
    const taskPriorityData = [
        { name: "High", value: calculateProjectCompletionPercentage(projectData.highPriority), color: priorityFlagMap['High'] }, // Red
        { name: "Medium", value: calculateProjectCompletionPercentage(projectData.mediumPriority), color: priorityFlagMap['Medium'] }, // Amber
        { name: "Low", value: calculateProjectCompletionPercentage(projectData.lowPriority), color: priorityFlagMap['Low'] }, // Green
    ]
   const items = [
       {
           name:'Completion Rate',
           info: ` ${projectData.tasks != 0 ? (projectData.completed/ projectData.tasks * 100).toFixed(2) : 0} %`,
           subInfo: "Of total tasks completed",
           iconLabel:'Complete'
       },
       {
           name:'Average Task Per Member',
           info: `${projectData.tasks/ projectData.members}`,
           subInfo: "Average workload per member",
           iconLabel:'Tasks'
       },
       {
           name:'In Progress',
           info: ` ${projectData.tasks != 0 ? (projectData.inProgress/ projectData.tasks * 100).toFixed(2) : 0} %`,
           subInfo: "Of tasks currently active",
           iconLabel:'Progress'
       },
       {
           name:'Time Remaining',
           info: `${moment(projectData.dueDate).diff(moment(),'days')}`,
           subInfo: "Days until deadline",
           iconLabel:'Due'
       },
   ]
    const hasData = projectData.tasks !=0;
    return (
        <>
        <div className={'flex flex-col gap-10 h-full'}>
              <Analytics items={items} className={'p-4 border-2 border-gray-100'}/>
            <div className={'grid md:grid-cols-2 gap-4 h-full'}>
                <Card className="bg-white shadow-sm border border-gray-100 rounded-lg">
                    <CardContent className="p-4 flex flex-col h-full max-h-[430px] ">
                        <div className="space-y-1 mb-4">
                            <h3 className="text-sm font-medium text-gray-700">Task Completion Distribution</h3>
                            <p className="text-xs text-gray-500">Breakdown of tasks by status</p>
                        </div>
                        <div className={'flex-1 p-4 '}>
                            {hasData ?
                                (
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
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
                                            <Tooltip formatter={(value: number, name: string) => [`${value.toFixed(2)}%`, name]}/>
                                        </PieChart>
                                    </ResponsiveContainer>
                                ) : (
                                 <NoDataDisplay title={'No Data'} subtitle={'Add tasks to see stats'}/>
                                )
                            }

                            <div className="flex justify-center gap-6 ">
                                {taskStatusData.map((entry, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                                        <span className="text-sm text-gray-600">
                      {entry.name}: {entry.value.toFixed(2)}%
                    </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white shadow-sm border border-gray-100 rounded-lg">
                    <CardContent className="p-4 flex flex-col h-full  ">
                        <div className="space-y-1 mb-4">
                            <h3 className="text-sm font-medium text-gray-700">Task Priority Distribution</h3>
                            <p className="text-xs text-gray-500">Breakdown of tasks by priority</p>
                        </div>
                        <div className="p-4 ">
                            {hasData ? <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={taskPriorityData} >
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip formatter={(value: number, name: string) => [`${value.toFixed(2)}%`, name]} />
                                    <Bar dataKey="value" barSize={50} radius={[10, 10, 0, 0]}>
                                        {taskPriorityData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer> :
                                <NoDataDisplay title={'No Data'} subtitle={'Add tasks to see stats'}/>
                            }

                            <div className="flex justify-center gap-6  ">
                                {taskPriorityData.map((entry, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                                        <span className="text-sm text-gray-600">
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