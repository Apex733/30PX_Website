import { Suspense, lazy } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Skeleton } from "boneyard-js/react";
import Home from "@/pages/Home";
import ScrollToTop from "@/components/ScrollToTop";
import { SharedScrollProvider } from "@/lib/scroll-context";

const LoudMindsPortfolio = lazy(() => import("@/pages/LoudMindsPortfolio"));
const GhostTongueProject = lazy(() => import("@/pages/GhostTongueProject"));
const VitaVibeProject = lazy(() => import("@/pages/VitaVibeProject"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsOfUse = lazy(() => import("@/pages/TermsOfUse"));
const CookiePolicy = lazy(() => import("@/pages/CookiePolicy"));
const DMCA = lazy(() => import("@/pages/DMCA"));
const FAQs = lazy(() => import("@/pages/FAQs"));
const AboutUs = lazy(() => import("@/pages/AboutUs"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const FizzBlissProject = lazy(() => import("@/pages/FizzBlissProject"));
const GigiLaurentProject = lazy(() => import("@/pages/GigiLaurentProject"));
const MondlySaasProject = lazy(() => import("@/pages/MondlySaasProject"));
const OrderRequest = lazy(() => import("@/pages/OrderRequest"));
const AdminOrders = lazy(() => import("@/pages/AdminOrders"));
const WorkPage = lazy(() => import("@/pages/Work"));
const BlogPage = lazy(() => import("@/pages/Blog"));
const ServicesPage = lazy(() => import("@/pages/Services"));
const ContactPage = lazy(() => import("@/pages/Contact"));

const PAGE_REVEAL_EASE = [0.22, 1, 0.36, 1] as const;
const PAGE_TRANSITION = {
    duration: 0.44,
    ease: PAGE_REVEAL_EASE,
} as const;

function RouteSkeletonLayout() {
    return (
        <div className="min-h-screen bg-[#020817] px-6 py-10 md:px-10">
            <div className="mx-auto max-w-6xl space-y-6">
                <div className="h-10 w-48 rounded-xl bg-white/10" />
                <div className="h-6 w-72 rounded-lg bg-white/10" />
                <div className="grid gap-5 md:grid-cols-3">
                    <div className="h-48 rounded-2xl bg-white/10" />
                    <div className="h-48 rounded-2xl bg-white/10" />
                    <div className="h-48 rounded-2xl bg-white/10" />
                </div>
            </div>
        </div>
    );
}

function RouteSkeletonFallback() {
    return (
        <Skeleton
            name="route-shell"
            loading={true}
            fallback={<RouteSkeletonLayout />}
        >
            <div className="min-h-screen bg-[#020817]" />
        </Skeleton>
    );
}

function App() {
    const location = useLocation();
    const shouldReduceMotion = useReducedMotion();
    const isModal = typeof window !== 'undefined' && window.location.search.includes('modal=true');

    return (
        <SharedScrollProvider>
            <ScrollToTop />
            <div className="relative overflow-x-clip">
                <div className="pointer-events-none absolute inset-0 -z-10 opacity-0" aria-hidden="true">
                    <Skeleton name="route-shell" loading={false}>
                        <RouteSkeletonLayout />
                    </Skeleton>
                </div>
                <Suspense fallback={<RouteSkeletonFallback />}>
                    <motion.div
                        key={location.pathname}
                        className="will-change-transform"
                        initial={shouldReduceMotion || isModal ? false : { opacity: 0.94, x: 36 }}
                        animate={shouldReduceMotion || isModal ? { opacity: 1 } : { opacity: 1, x: 0 }}
                        transition={shouldReduceMotion || isModal ? { duration: 0 } : PAGE_TRANSITION}
                    >
                        <Routes location={location}>
                            <Route path="/" element={<Home />} />
                            <Route path="/portfolio/loudminds" element={<LoudMindsPortfolio />} />
                            <Route path="/portfolio/ghosttongue" element={<GhostTongueProject />} />
                            <Route path="/portfolio/vitavibe" element={<VitaVibeProject />} />
                            <Route path="/privacy" element={<PrivacyPolicy />} />
                            <Route path="/terms" element={<TermsOfUse />} />
                            <Route path="/cookies" element={<CookiePolicy />} />
                            <Route path="/dmca" element={<DMCA />} />
                            <Route path="/faqs" element={<FAQs />} />
                            <Route path="/about" element={<AboutUs />} />
                            <Route path="/pricing" element={<Pricing />} />
                            <Route path="/order" element={<OrderRequest />} />
                            <Route path="/admin/orders" element={<AdminOrders />} />
                            <Route path="/portfolio/fizzbliss" element={<FizzBlissProject />} />
                            <Route path="/portfolio/gigi-laurent" element={<GigiLaurentProject />} />
                            <Route path="/portfolio/mondly-saas" element={<MondlySaasProject />} />
                            <Route path="/work" element={<WorkPage />} />
                            <Route path="/blog" element={<BlogPage />} />
                            <Route path="/services" element={<ServicesPage />} />
                            <Route path="/contact" element={<ContactPage />} />

                            {/* Catch-all route to prevent white screen crashes on unknown URLs */}
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </motion.div>
                </Suspense>
            </div>
            {/* Added subtle bottom chin blur to the whole website */}
            {!isModal && (
                <div className="fixed bottom-0 left-0 w-full h-24 pointer-events-none z-50 backdrop-blur-md [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
            )}
        </SharedScrollProvider>
    );
}

export default App;
