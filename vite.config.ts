import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { readdir, rm } from 'fs/promises'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import autoWebpPlugin from './scripts/vite-plugin-auto-webp.mjs';

const appleMetadataFile = /(^|[\\/])(?:\._[^\\/]+|\.DS_Store)$/;

async function removeAppleMetadataFiles(dir: string) {
    let entries;
    try {
        entries = await readdir(dir, { withFileTypes: true });
    } catch {
        return;
    }

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            await removeAppleMetadataFiles(fullPath);
            continue;
        }
        if (entry.name === '.DS_Store' || entry.name.startsWith('._')) {
            await rm(fullPath, { force: true });
        }
    }
}

function stripAppleMetadataPlugin() {
    return {
        name: 'strip-apple-metadata-files',
        apply: 'build' as const,
        generateBundle(_options, bundle) {
            for (const fileName of Object.keys(bundle)) {
                if (appleMetadataFile.test(fileName)) {
                    delete bundle[fileName];
                }
            }
        },
        async writeBundle(options) {
            await removeAppleMetadataFiles(path.resolve(options.dir || 'dist'));
        },
    };
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        ViteImageOptimizer({
            exclude: appleMetadataFile,
        }),
        autoWebpPlugin(),
        stripAppleMetadataPlugin(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        proxy: {
            "/api": {
                target: "http://127.0.0.1:8787",
                changeOrigin: true,
            },
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor-react': ['react', 'react-dom', 'framer-motion', 'motion'],
                    'vendor-three': ['three'],
                    'vendor-ui': ['@radix-ui/react-accordion', '@radix-ui/react-slot', 'lucide-react', 'clsx', 'tailwind-merge'],
                },
            },
        },
    },
})
