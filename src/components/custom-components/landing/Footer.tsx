import { Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
    return (
        <footer id="contact" className="bg-sidebar border-t border-sidebar-border">
            <div className="container mx-auto max-w-6xl px-4 py-12">
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
                                <span className="text-sidebar-primary-foreground font-bold text-sm">A</span>
                            </div>
                            <span className="font-space-grotesk font-bold text-xl text-sidebar-foreground">AssignIT</span>
                        </div>
                        <p className="text-sm text-gray-600">
                            Empowering students and educators with intelligent project management solutions.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-medium text-sidebar-foreground mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li>
                                <a href="#features" className="hover:text-sidebar-primary transition-colors">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#analytics" className="hover:text-sidebar-primary transition-colors">
                                    Analytics
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-sidebar-primary transition-colors">
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-sidebar-primary transition-colors">
                                    Updates
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-medium text-sidebar-foreground mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li>
                                <a href="#" className="hover:text-sidebar-primary transition-colors">
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-sidebar-primary transition-colors">
                                    Tutorials
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-sidebar-primary transition-colors">
                                    Best Practices
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-sidebar-primary transition-colors">
                                    Support
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-medium text-sidebar-foreground mb-4">Connect</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-700 hover:text-sidebar-primary transition-colors">
                                <Github className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-700 hover:text-sidebar-primary transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-700 hover:text-sidebar-primary transition-colors">
                                <Mail className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-sidebar-border mt-8 pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; 2025 AssignIT. Built for academic excellence.</p>
                </div>
            </div>
        </footer>
    )
}
