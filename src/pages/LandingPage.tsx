import {Header} from "@/components/custom-components/landing/Header.tsx";
import {Hero} from "@/components/custom-components/landing/Hero.tsx"
import {FeaturesSection} from "@/components/custom-components/landing/Features.tsx";
import {KanbanShowcase} from "@/components/custom-components/landing/Kanban.tsx";
import {RoleBasedReports} from "@/components/custom-components/landing/Reports.tsx";
import {AnalyticsSection} from "@/components/custom-components/landing/Data.tsx";
import {CollaborationSection} from "@/components/custom-components/landing/TrustedBy.tsx";
import {Footer} from "@/components/custom-components/landing/Footer.tsx";

const LandingPage = ()=>{
    return (
        <main className="min-h-screen max-w-screen-2xl bg-background overflow-auto">
            <Header />
            <Hero/>
           <FeaturesSection/>
            <KanbanShowcase/>
           <RoleBasedReports/>
            <AnalyticsSection/>
            <CollaborationSection/>
            <Footer/>
        </main>
    )
};

export default LandingPage;