
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import ScrollToTop from "@/components/ScrollToTop";
import { SharedScrollProvider } from "@/lib/scroll-context";

const LoudMindsPortfolio = lazy(() => import("@/pages/LoudMindsPortfolio"));
const GhostTongueProject = lazy(() => import("@/pages/GhostTongueProject"));
const VitaVibeProject = lazy(() => import("@/pages/VitaVibeProject"));
const DesoraPortfolio = lazy(() => import("@/pages/DesoraPortfolio"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsOfUse = lazy(() => import("@/pages/TermsOfUse"));
const CookiePolicy = lazy(() => import("@/pages/CookiePolicy"));
const DMCA = lazy(() => import("@/pages/DMCA"));
const FAQs = lazy(() => import("@/pages/FAQs"));
const AboutUs = lazy(() => import("@/pages/AboutUs"));

function App() {
    return (
        <SharedScrollProvider>
            <ScrollToTop />
            <Suspense fallback={<div className="min-h-screen bg-[#020817]"></div>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/portfolio/loudminds" element={<LoudMindsPortfolio />} />
                    <Route path="/portfolio/ghosttongue" element={<GhostTongueProject />} />
                    <Route path="/portfolio/vitavibe" element={<VitaVibeProject />} />
                    <Route path="/portfolio/desora" element={<DesoraPortfolio />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<TermsOfUse />} />
                    <Route path="/cookies" element={<CookiePolicy />} />
                    <Route path="/dmca" element={<DMCA />} />
                    <Route path="/faqs" element={<FAQs />} />
                    <Route path="/about" element={<AboutUs />} />
                </Routes>
            </Suspense>
            {/* Subtle bottom chin fade — uses gradient instead of backdrop-blur for performance */}
            <div className="fixed bottom-0 left-0 w-full h-24 pointer-events-none z-50 bg-gradient-to-t from-white/80 to-transparent"></div>
        </SharedScrollProvider>
    );
}

export default App;
