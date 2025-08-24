import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function Hero() {
    return (
        <section className=" pt-32 md:pt-48 pb-16 px-1 pl-12 lg:pl-14">
            <div className="container mx-auto  px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className=" font-semibold  text-3xl md:text-4xl text-foreground leading-tight">
                                Project Management <span className="text-primary">Made Simple</span>
                            </h1>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Built for students and teams who want to get things done. Kanban boards, role-based insights, and custom
                                workflows that actually work.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                Try It Out
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-border text-foreground hover:bg-muted bg-transparent"
                            >
                                <Play className="mr-2 h-4 w-4" />
                                Quick Demo
                            </Button>
                        </div>

                        <div className="flex items-center space-x-8 pt-4">
                            <div className="text-center">
                                <div className="font-space-grotesk font-bold text-2xl text-primary">150+</div>
                                <div className="text-sm text-muted-foreground">Student Projects</div>
                            </div>
                            <div className="text-center">
                                <div className="font-space-grotesk font-bold text-2xl text-primary">3</div>
                                <div className="text-sm text-muted-foreground">Role Types</div>
                            </div>
                            <div className="text-center">
                                <div className="font-space-grotesk font-bold text-2xl text-primary">∞</div>
                                <div className="text-sm text-muted-foreground">Custom Status</div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-gradient-to-br from-primary/10 to-accent/5 rounded-2xl p-8">
                            <img
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-17%20at%2016.39.06-dPqV0UsmIsQQQlRjHWrHMDxFnUW5eH.png"
                                alt="FYP Project Management Dashboard"
                                className="w-full rounded-lg shadow-2xl"
                            />
                        </div>
                        <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-lg p-4 shadow-lg">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-chart-4 rounded-full"></div>
                                <span className="text-sm font-medium text-card-foreground">Real-time Updates</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
