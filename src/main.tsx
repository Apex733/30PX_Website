// main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// Initialize Lenis smooth scrolling
const lenis = new Lenis();

function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <HelmetProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </HelmetProvider>
    </React.StrictMode>,
)
