
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import LoudMindsPortfolio from "@/pages/LoudMindsPortfolio";
import GhostTongueProject from "@/pages/GhostTongueProject";
import VitaVibeProject from "@/pages/VitaVibeProject";
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
            </Routes>
        </>
    );
}

export default App;
