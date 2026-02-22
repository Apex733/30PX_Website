
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import LoudMindsPortfolio from "@/pages/LoudMindsPortfolio";
import GhostTongueProject from "@/pages/GhostTongueProject";
import VitaVibeProject from "@/pages/VitaVibeProject";
import DesoraPortfolio from "@/pages/DesoraPortfolio";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfUse from "@/pages/TermsOfUse";
import CookiePolicy from "@/pages/CookiePolicy";
import DMCA from "@/pages/DMCA";
import ScrollToTop from "@/components/ScrollToTop";

function App() {
    return (
        <>
            <ScrollToTop />
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
            </Routes>
        </>
    );
}

export default App;
