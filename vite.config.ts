import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import autoWebpPlugin from './scripts/vite-plugin-auto-webp.mjs';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        ViteImageOptimizer({
            /* pass your config */
        }),
        autoWebpPlugin(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor-react': ['react', 'react-dom', 'framer-motion', 'motion'],
                    'vendor-three': ['three', '@types/three'],
                    'vendor-ui': ['@radix-ui/react-accordion', '@radix-ui/react-slot', 'lucide-react', 'clsx', 'tailwind-merge'],
                },
            },
        },
    },
})
