import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
    {
        name: "Sarah Chen",
        role: "Computer Science Student",
        content:
            "AssignIT transformed how our team managed our final year project. The sprint planning feature kept us on track throughout the semester.",
        rating: 5,
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        name: "Dr. Michael Rodriguez",
        role: "Software Engineering Professor",
        content:
            "I recommend AssignIT to all my students. The retrospective feature provides valuable insights for continuous improvement.",
        rating: 5,
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        name: "Alex Thompson",
        role: "Project Team Lead",
        content:
            "The workspace organization made it easy to manage multiple concurrent projects. The analytics helped us identify and resolve bottlenecks quickly.",
        rating: 5,
        avatar: "/placeholder.svg?height=40&width=40",
    },
]

export function CollaborationSection() {
    return (
        <section id="collaboration" className="py-16 px-4 bg-muted/30">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center space-y-4 mb-12">
                    <h2 className="font-space-grotesk font-bold text-3xl md:text-4xl text-foreground">
                        Trusted by Students & Educators
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        See how AssignIT is helping academic teams achieve their project goals with better collaboration and
                        organization
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="bg-card border-border">
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-chart-3 text-chart-3" />
                                    ))}
                                </div>
                                <Quote className="h-6 w-6 text-muted-foreground mb-4" />
                                <p className="text-card-foreground mb-4 leading-relaxed">{testimonial.content}</p>
                                <div className="flex items-center space-x-3 ">
                                    <span
                                        className="w-10 h-10 rounded-full border-2 flex items-center justify-center rounded-full "
                                    >{testimonial.name[0].toUpperCase()}</span>
                                    <div>
                                        <div className="font-medium text-card-foreground">{testimonial.name}</div>
                                        <div className="text-sm text-gray-600">{testimonial.role}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="bg-primary/5 rounded-2xl p-8 text-center">
                    <h3 className="font-space-grotesk font-bold text-2xl text-foreground mb-4">
                        Ready to Transform Your Project Management?
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                        Join hundreds of students and educators who are already using AssignIT to streamline their projects and
                        achieve better outcomes.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors">
                            Start Your Free Trial
                        </button>
                        <button className="border border-border text-foreground hover:bg-muted px-6 py-3 rounded-lg font-medium transition-colors">
                            Schedule a Demo
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
