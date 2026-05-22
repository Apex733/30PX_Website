import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputPath = 'E:\\AI imagery projects\\Mondly_SaaS\\Hero.png';
const outputDir = 'E:\\30PX-Website-Main-Files\\30PX\\Website\\public\\portfolio\\mondly-saas';

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, 'hero.avif');

async function convert() {
    await sharp(inputPath)
        .avif({ quality: 100, lossless: true, effort: 9 })
        .toFile(outputPath);
        
    console.log(`Converted to: ${outputPath} with maximum quality`);
}

convert().catch(console.error);
