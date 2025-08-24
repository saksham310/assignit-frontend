import { Badge } from "@/components/ui/badge"

export function RoleBasedReports() {
    return (
        <section className="py-16 px-4">
            <div className="container mx-auto max-w-6xl">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="relative order-2 lg:order-1">
                        <div className="bg-gradient-to-br from-primary/10 to-accent/5 rounded-2xl p-6">
                            <img
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-17%20at%2016.50.19-3RDMXXbS4tq7HiFA3HeMaW8D0c3uCz.png"
                                alt="Role-Based Performance Analytics"
                                className="w-full rounded-lg shadow-2xl"
                            />
                        </div>
                        <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-lg p-3 shadow-lg">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-chart-2 rounded-full"></div>
                                <span className="text-sm font-medium text-card-foreground">Analytics</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 order-1 lg:order-2">
                        <div className="space-y-6">
                            <h2 className="font-semibold text-3xl md:text-4xl text-foreground">
                                Reports That Make Sense
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Different insights for different roles. PMs see project health, developers track efficiency, QA monitors
                                quality metrics.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <Badge variant="secondary" className="bg-chart-1/10 text-chart-1 border-chart-1/20">
                                    PM
                                </Badge>
                                <span className="text-foreground">Project overview, team performance, deadlines</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Badge variant="secondary" className="bg-chart-2/10 text-chart-2 border-chart-2/20">
                                    Developer
                                </Badge>
                                <span className="text-foreground">Task efficiency, workload balance, completion rates</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Badge variant="secondary" className="bg-chart-3/10 text-chart-3 border-chart-3/20">
                                    QA
                                </Badge>
                                <span className="text-foreground">Bug metrics, quality scores, testing progress</span>
                            </div>
                        </div>

                        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                            <h4 className="font-medium text-foreground">Performance Tracking</h4>
                            <p className="text-sm text-gray-600">
                                Track task efficiency, quality scores, workload balance, and bug density. Each role gets the metrics
                                that matter to them.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
