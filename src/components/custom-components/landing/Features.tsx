import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Kanban, Users, BarChart3, Settings, Target } from "lucide-react"

const features = [
    {
        icon: Kanban,
        title: "Kanban Boards",
        description:
            "Visual task management with drag-and-drop simplicity. Custom columns for each project's unique workflow.",
        color: "text-chart-1",
    },
    {
        icon: BarChart3,
        title: "Role-Based Reports",
        description:
            "Different insights for PM, Developer, and QA roles. Track performance, quality, and workload balance.",
        color: "text-chart-2",
    },
    {
        icon: Settings,
        title: "Custom Status",
        description: "Create your own project status that work across sprints. Each project gets its own status set.",
        color: "text-chart-3",
    },
    {
        icon: Target,
        title: "Sprint Planning",
        description: "Break work into manageable chunks with clear goals, timelines, and progress tracking.",
        color: "text-chart-4",
    },
    {
        icon: Users,
        title: "Team Collaboration",
        description: "Invite members, assign roles, and track contributions with detailed performance analytics.",
        color: "text-chart-1",
    },
    {
        icon: Building2,
        title: "Workspace Organization",
        description: "Keep multiple projects organized under dedicated workspaces with member management.",
        color: "text-chart-2",
    },
]

export function FeaturesSection() {
    return (
        <section id="features" className="py-16 px-4">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center space-y-4 mb-12">
                    <h2 className="font-semibold text-3xl md:text-4xl text-foreground">
                        Everything You Need to Ship
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        From idea to delivery, we've got the tools that actually help you get work done
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mt-6">
                        <span className="bg-primary/10 px-3 py-1 rounded-full">Workspace</span>
                        <ArrowRight className="h-4 w-4" />
                        <span className="bg-primary/10 px-3 py-1 rounded-full">Projects</span>
                        <ArrowRight className="h-4 w-4" />
                        <span className="bg-primary/10 px-3 py-1 rounded-full">Sprints</span>
                        <ArrowRight className="h-4 w-4" />
                        <span className="bg-primary/10 px-3 py-1 rounded-full">Tasks</span>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <Card key={index} className="bg-card border-border hover:shadow-lg transition-all hover:-translate-y-1">
                            <CardHeader className="text-center">
                                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                                </div>
                                <CardTitle className="font-space-grotesk text-card-foreground">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-center text-gray-600">{feature.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

function ArrowRight({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
    )
}
