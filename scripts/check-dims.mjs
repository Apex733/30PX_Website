import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outputDir = 'E:\\30PX-Website-Main-Files\\30PX\\Website\\public\\portfolio\\fizzbliss';

async function check() {
    const files = fs.readdirSync(outputDir).filter(f => f.endsWith('.webp'));
    
    for (const file of files) {
        const p = path.join(outputDir, file);
        const metadata = await sharp(p).metadata();
        const ratio = metadata.width / metadata.height;
        let aspect = "1:1";
        if (ratio > 1.6) aspect = "16:9";
        else if (ratio > 1.2) aspect = "4:3";
        
        console.log(`${file} : w=${metadata.width}, h=${metadata.height}, ratio=${ratio.toFixed(2)}, aspect=${aspect}`);
    }
}
check().catch(console.error);
