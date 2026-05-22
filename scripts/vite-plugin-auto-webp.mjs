/**
 * vite-plugin-auto-webp.mjs
 * 
 * Vite plugin that watches for new PNG/JPG files added to
 * Work/, Hero Carousel/, and public/ directories during dev,
 * and auto-converts them to WebP.
 * 
 * Also runs a one-time scan at server start.
 */

import sharp from 'sharp';
import { stat, unlink, readdir } from 'fs/promises';
import path from 'path';
import { watch } from 'fs';

const WATCHED_DIRS = ['Work', 'Hero Carousel', 'public'];
const EXTENSIONS = ['.png', '.jpg', '.jpeg'];
const MAX_WIDTH = 800;
const QUALITY = 80;

function isAppleMetadataFile(fileName) {
    const baseName = path.basename(fileName);
    return baseName === '.DS_Store' || baseName.startsWith('._');
}

async function convertIfNeeded(filePath) {
    if (isAppleMetadataFile(filePath)) return;

    const ext = path.extname(filePath).toLowerCase();
    if (!EXTENSIONS.includes(ext)) return;

    const webpPath = filePath.replace(new RegExp(`\\${ext}$`, 'i'), '.webp');

    // Skip if webp already exists
    try {
        await stat(webpPath);
        return; // Already converted
    } catch {
        // Proceed
    }

    try {
        // Wait briefly for file to finish writing
        await new Promise(r => setTimeout(r, 500));

        const image = sharp(filePath);
        const metadata = await image.metadata();

        const maxW = filePath.includes('public') ? 1200 : MAX_WIDTH;

        const pipeline = metadata.width > maxW
            ? image.resize({ width: maxW, withoutEnlargement: true })
            : image;

        await pipeline
            .webp({ quality: QUALITY, effort: 4 })
            .toFile(webpPath);

        await unlink(filePath);

        const baseName = path.basename(filePath);
        const webpName = path.basename(webpPath);
        console.log(`  🔄 Auto-converted: ${baseName} → ${webpName}`);
    } catch (err) {
        // Silently skip errors (file might be in use, etc.)
    }
}

async function scanDir(dirPath) {
    try {
        const entries = await readdir(dirPath, { withFileTypes: true });
        for (const entry of entries) {
            if (isAppleMetadataFile(entry.name)) continue;
            const fullPath = path.join(dirPath, entry.name);
            if (entry.isDirectory()) {
                await scanDir(fullPath);
            } else {
                await convertIfNeeded(fullPath);
            }
        }
    } catch {
        // Directory doesn't exist
    }
}

export default function autoWebpPlugin() {
    const watchers = [];

    return {
        name: 'vite-plugin-auto-webp',

        async configureServer() {
            const root = process.cwd();

            // Initial scan
            for (const dir of WATCHED_DIRS) {
                const dirPath = path.resolve(root, dir);
                await scanDir(dirPath);
            }

            // Watch for new files
            for (const dir of WATCHED_DIRS) {
                const dirPath = path.resolve(root, dir);
                try {
                    const watcher = watch(dirPath, { recursive: true }, (event, filename) => {
                        if (event === 'rename' && filename) {
                            if (isAppleMetadataFile(filename)) return;
                            const ext = path.extname(filename).toLowerCase();
                            if (EXTENSIONS.includes(ext)) {
                                const fullPath = path.resolve(dirPath, filename);
                                convertIfNeeded(fullPath);
                            }
                        }
                    });
                    watchers.push(watcher);
                } catch {
                    // Dir doesn't exist yet
                }
            }
        },

        closeBundle() {
            watchers.forEach(w => w.close());
        }
    };
}
