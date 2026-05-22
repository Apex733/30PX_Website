import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = 'E:\\AI imagery projects\\Fizz Bliss\\Final Images';
const outputDir = 'E:\\30PX-Website-Main-Files\\30PX\\Website\\public\\portfolio\\fizzbliss';

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

async function convert() {
    const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.png'));
    
    for (const file of files) {
        const inputPath = path.join(inputDir, file);
        // Rename slightly for cleaner URLs
        const newFilename = file.replace('freepik_prompt-', '').replace('.png', '.webp');
        const outputPath = path.join(outputDir, newFilename);
        
        await sharp(inputPath)
            .webp({ quality: 85 })
            .toFile(outputPath);
            
        console.log(`Converted: ${newFilename}`);
    }
}

convert().catch(console.error);
