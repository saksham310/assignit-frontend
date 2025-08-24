import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, PieChart, TrendingUp, Users } from "lucide-react"

export function AnalyticsSection() {
  return (
    <section id="analytics" className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="font-semibold text-3xl md:text-4xl text-foreground">
                Data-Driven Project Insights
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Make informed decisions with comprehensive analytics and real-time reporting. Track progress, identify
                bottlenecks, and optimize team performance.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4 text-chart-1" />
                    <CardTitle className="text-sm font-medium text-card-foreground">Completion Rate</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-chart-1">87%</div>
                  <p className="text-xs text-gray-600">Average across all projects</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-chart-2" />
                    <CardTitle className="text-sm font-medium text-card-foreground">Team Efficiency</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-chart-2">92%</div>
                  <p className="text-xs text-gray-600">Task completion on time</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-chart-4" />
                    <CardTitle className="text-sm font-medium text-card-foreground">Productivity</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-chart-4">+24%</div>
                  <p className="text-xs text-muted-foreground">Improvement over time</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2">
                    <PieChart className="h-4 w-4 text-chart-3" />
                    <CardTitle className="text-sm font-medium text-card-foreground">Sprint Success</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-chart-3">95%</div>
                  <p className="text-xs text-gray-600">Sprints completed successfully</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-primary/5 to-accent/10 rounded-2xl p-6">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-17%20at%2016.39.19-25l1j9hUrx7EmjKUs0pvTFt6z1oJeC.png"
                alt="FYP Analytics Dashboard"
                className="w-full rounded-lg shadow-xl"
              />
            </div>
            <div className="absolute -top-4 -left-4 bg-primary text-primary-foreground rounded-lg px-3 py-2 text-sm font-medium shadow-lg">
              Real-time Updates
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
