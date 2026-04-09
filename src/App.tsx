import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
    const isModal = typeof window !== 'undefined' && window.location.search.includes('modal=true');

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

                    {/* Catch-all route to prevent white screen crashes on unknown URLs like /services */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Suspense>
            {/* Added subtle bottom chin blur to the whole website */}
            {!isModal && (
                <div className="fixed bottom-0 left-0 w-full h-24 pointer-events-none z-50 backdrop-blur-md [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
            )}
        </SharedScrollProvider>
    );
}

export default App;
