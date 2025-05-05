import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import {Link} from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
            <div className="w-full max-w-md space-y-6 text-center">
                <div className="flex justify-center">
                    <div className="h-24 w-24 rounded-full bg-[#f0ecfd] flex items-center justify-center">
                        <Search className="h-12 w-12 text-[#7c5cdb]" />
                    </div>
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-gray-900">Error</h1>
                <h2 className="text-2xl font-semibold text-gray-800">Something went wrong</h2>

                <p className="text-gray-600">The page you're looking for doesn't exist or has been moved.</p>

                <div className="pt-4">
                    <Link to="/">
                        <Button className="bg-[#7c5cdb] hover:bg-[#6a4bc9] text-white font-medium py-2 px-6 rounded-md transition-colors">
                            Back to Dashboard
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage
