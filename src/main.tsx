// main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './bones/registry'
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { configureBoneyard } from 'boneyard-js/react';

configureBoneyard({
    animate: 'shimmer',
    color: '#1f2937',
    darkColor: '#111827',
    shimmerColor: '#374151',
    darkShimmerColor: '#1f2937',
    speed: '1.6s',
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <HelmetProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </HelmetProvider>
    </React.StrictMode>,
)
