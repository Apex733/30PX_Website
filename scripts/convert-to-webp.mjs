/**
 * convert-to-webp.mjs
 * 
 * Converts all PNG/JPG/JPEG images to optimized WebP.
 * - Resizes to max width (configurable per directory)
 * - Compresses at quality 80
 * - Deletes original files after successful conversion
 * - Skips files that already have a .webp version
 * 
 * Usage:
 *   node scripts/convert-to-webp.mjs          # Convert all
 *   node scripts/convert-to-webp.mjs --dry    # Preview only, no changes
 */

import sharp from 'sharp';
import { readdir, stat, unlink } from 'fs/promises';
import path from 'path';

// ---------------- CONFIG ----------------
const DIRS_TO_SCAN = [
    { dir: 'Work', maxWidth: 800, quality: 80 },
    { dir: 'Hero Carousel', maxWidth: 800, quality: 80 },
    { dir: 'public', maxWidth: 1200, quality: 80 },
];

const EXTENSIONS = ['.png', '.jpg', '.jpeg'];
const DRY_RUN = process.argv.includes('--dry');
// ----------------------------------------

async function findImages(dirPath) {
    const results = [];
    try {
        const entries = await readdir(dirPath, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dirPath, entry.name);
            if (entry.isDirectory()) {
                results.push(...await findImages(fullPath));
            } else if (EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
                results.push(fullPath);
            }
        }
    } catch (e) {
        // Directory doesn't exist, skip
    }
    return results;
}

async function convertFile(filePath, maxWidth, quality) {
    const ext = path.extname(filePath);
    const webpPath = filePath.replace(new RegExp(`\\${ext}$`, 'i'), '.webp');

    // Skip if webp already exists
    try {
        await stat(webpPath);
        console.log(`  ⏭  Already exists: ${path.basename(webpPath)}`);
        return { skipped: true };
    } catch {
        // webp doesn't exist, proceed
    }

    const fileStat = await stat(filePath);
    const originalSize = fileStat.size;

    try {
        const image = sharp(filePath);
        const metadata = await image.metadata();

        // Only resize if wider than maxWidth
        const pipeline = metadata.width > maxWidth
            ? image.resize({ width: maxWidth, withoutEnlargement: true })
            : image;

        if (DRY_RUN) {
            // Estimate output size without writing
            const buf = await pipeline.webp({ quality, effort: 4 }).toBuffer();
            const newSize = buf.length;
            const savings = ((1 - newSize / originalSize) * 100).toFixed(1);

            console.log(
                `  ✅ ${path.basename(filePath)} → ${path.basename(webpPath)}  ` +
                `${formatSize(originalSize)} → ${formatSize(newSize)} (${savings}% smaller) [DRY RUN]`
            );
            return { originalSize, newSize, converted: true };
        }

        await pipeline
            .webp({ quality, effort: 4 })
            .toFile(webpPath);

        const newStat = await stat(webpPath);
        const newSize = newStat.size;
        const savings = ((1 - newSize / originalSize) * 100).toFixed(1);

        await unlink(filePath);

        console.log(
            `  ✅ ${path.basename(filePath)} → ${path.basename(webpPath)}  ` +
            `${formatSize(originalSize)} → ${formatSize(newSize)} (${savings}% smaller)`
        );

        return { originalSize, newSize, converted: true };
    } catch (err) {
        console.error(`  ❌ Failed: ${path.basename(filePath)} — ${err.message}`);
        return { error: true };
    }
}

function formatSize(bytes) {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

async function main() {
    console.log(DRY_RUN ? '\n🔍 DRY RUN — no files will be changed\n' : '\n🔄 Converting images to WebP...\n');

    let totalOriginal = 0;
    let totalNew = 0;
    let totalConverted = 0;
    let totalSkipped = 0;

    for (const { dir, maxWidth, quality } of DIRS_TO_SCAN) {
        const dirPath = path.resolve(process.cwd(), dir);
        const images = await findImages(dirPath);

        if (images.length === 0) continue;

        console.log(`\n📁 ${dir}/ (${images.length} images, max ${maxWidth}px)\n`);

        for (const img of images) {
            const result = await convertFile(img, maxWidth, quality);
            if (result.converted) {
                totalOriginal += result.originalSize;
                totalNew += result.newSize;
                totalConverted++;
            }
            if (result.skipped) totalSkipped++;
        }
    }

    console.log(`\n${'─'.repeat(50)}`);
    console.log(`✅ Converted: ${totalConverted} files`);
    console.log(`⏭  Skipped:   ${totalSkipped} files`);
    if (totalConverted > 0) {
        console.log(`📦 Before:    ${formatSize(totalOriginal)}`);
        console.log(`📦 After:     ${formatSize(totalNew)}`);
        console.log(`💾 Saved:     ${formatSize(totalOriginal - totalNew)} (${((1 - totalNew / totalOriginal) * 100).toFixed(1)}%)`);
    }
    console.log();
}

main().catch(console.error);
