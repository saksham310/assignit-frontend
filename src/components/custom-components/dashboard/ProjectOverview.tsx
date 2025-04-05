
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {priorityFlagMap} from "@/lib/utils.ts";
import Analytics from "@/components/custom-components/dashboard/Analytics.tsx";
import moment from "moment";
import NoDataDisplay from "@/components/custom-components/shared/NoDataDisplay.tsx";

const ProjectOverview = ({projectSprint}) =>{

    const taskStatusData = [
        { name: "Completed", value: projectSprint.completed, color: "#10b954" }, // Green
        { name: "In Progress", value: projectSprint.inProgress, color: "rgba(255,189,56,0.9)" }, // Amber
        { name: "To Do", value: projectSprint.toDo, color: "#8f90ff" }, // Indigo
    ]
    const taskPriorityData = [
        { name: "High", value: 10, color: priorityFlagMap['High'] }, // Red
        { name: "Medium", value: 8, color: priorityFlagMap['Medium'] }, // Amber
        { name: "Low", value: 6, color: priorityFlagMap['Low'] }, // Green
    ]
   const items = [
       {
           name:'Completion Rate',
           info: ` ${projectSprint.tasks != 0 ? projectSprint.completed/ projectSprint.tasks * 100 : 0} %`,
           subInfo: "Of total tasks completed",
           iconLabel:'Complete'
       },
       {
           name:'Average Task Per Member',
           info: `${projectSprint.tasks/ projectSprint.members}`,
           subInfo: "Average workload per member",
           iconLabel:'Tasks'
       },
       {
           name:'In Progress',
           info: ` ${projectSprint.tasks != 0 ? projectSprint.inProgress/ projectSprint.tasks * 100 : 0} %`,
           subInfo: "Of tasks currently active",
           iconLabel:'Progress'
       },
       {
           name:'Time Remaining',
           info: `${moment(projectSprint.dueDate).diff(moment(),'days')}`,
           subInfo: "Days until deadline",
           iconLabel:'Due'
       },
   ]
    const hasData = projectSprint.tasks !=0;
    return (
        <>
        <div className={'flex flex-col gap-10'}>
              <Analytics items={items} className={'p-4 border-2 border-gray-100'}/>
            <div className={'grid md:grid-cols-2 gap-4'}>
                <Card className="bg-white shadow-sm border border-gray-100 rounded-lg">
                    <CardContent className="p-4 ">
                        <div className="space-y-1 mb-4">
                            <h3 className="text-sm font-medium text-gray-700">Task Priority Distribution</h3>
                            <p className="text-xs text-gray-500">Breakdown of tasks by priority</p>
                        </div>
                        <div className={'h-[360px] p-4'}>
                            {hasData ?
                                (
                                    <ResponsiveContainer width="100%" height="100%">
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
                                            <Tooltip
                                                formatter={(value) => [`${value}%`, ""]}
                                                contentStyle={{ border: "none", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}
                                            />
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
                      {entry.name}: {entry.value}%
                    </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white shadow-sm border border-gray-100 rounded-lg">
                    <CardContent className="p-4">
                        <div className="space-y-1 mb-4">
                            <h3 className="text-sm font-medium text-gray-700">Task Priority Distribution</h3>
                            <p className="text-xs text-gray-500">Breakdown of tasks by priority</p>
                        </div>
                        <div className="h-[360px] p-4">
                            {hasData ? <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={taskPriorityData} >
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
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
                      {entry.name}: {entry.value}%
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