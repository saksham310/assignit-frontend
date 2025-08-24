export function KanbanShowcase() {
    return (
        <section className="py-16 px-4 bg-muted/30">
            <div className="container mx-auto max-w-6xl">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h2 className="font-semibold text-3xl md:text-4xl text-foreground">
                                Kanban That Actually Works
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Visual boards with custom status columns. Drag, drop, and track progress in real-time. Each project can
                                have its own workflow.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                <span className="text-foreground">Custom status columns per project</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                <span className="text-foreground">Drag-and-drop task management</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                <span className="text-foreground">Status shared across sprints</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                <span className="text-foreground">Priority and assignee tracking</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-gradient-to-br from-primary/10 to-accent/5 rounded-2xl p-6">
                            <img
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-17%20at%2016.49.59-TGxXnxZzi1FL5W798DiQNmAyD9xOdK.png"
                                alt="Kanban Board with Custom Status"
                                className="w-full rounded-lg shadow-2xl"
                            />
                        </div>
                        <div className="absolute -top-4 -left-4 bg-card border border-border rounded-lg p-3 shadow-lg">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-chart-3 rounded-full"></div>
                                <span className="text-sm font-medium text-card-foreground">Live Board</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
