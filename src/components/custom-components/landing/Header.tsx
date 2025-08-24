
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button.tsx"
import Logo from "@/assets/Logo.svg";
import {useNavigate} from "react-router-dom";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate=useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                isScrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : "bg-transparent"
            }`}
        >
            <div className="pl-[3rem] md:pl-0 container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <nav className='flex items-center justify-between'>
                        <img src={Logo} alt="assignIt logo" className='h-12 w-auto cursor-pointer' onClick={()=> navigate('/about')}/>
                    </nav>
                </div>

                <nav className="hidden md:flex items-center space-x-8">
                    <a href="#features" className="text-foreground hover:text-primary transition-colors">
                        Features
                    </a>
                    <a href="#analytics" className="text-foreground hover:text-primary transition-colors">
                        Analytics
                    </a>
                    <a href="#collaboration" className="text-foreground hover:text-primary transition-colors">
                        Collaboration
                    </a>
                    <a href="#contact" className="text-foreground hover:text-primary transition-colors">
                        Contact
                    </a>
                </nav>

                <Button className="bg-primary  text-primary-foreground" onClick={()=> navigate('/login')}>Get Started</Button>
            </div>
        </header>
    )
}
