import puppeteer from 'puppeteer';

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();

        let errors = [];
        page.on('console', msg => {
            if (msg.type() === 'error') {
                errors.push('CONSOLE ERROR: ' + msg.text());
            }
        });
        page.on('pageerror', err => {
            errors.push('PAGE ERROR: ' + err.toString());
        });

        await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });

        if (errors.length > 0) {
            console.log("ERRORS FOUND:\n" + errors.join("\n"));
        } else {
            console.log("No JS errors found. Finding ROOT html:");
            const rootHTML = await page.evaluate(() => document.getElementById('root')?.innerHTML || '');
            if (rootHTML.trim() === '') {
                console.log("Root is empty! No JS error caught, might be React specific.");
            } else {
                console.log("Root length: ", rootHTML.length);
            }
        }
        await browser.close();
    } catch (e) {
        console.error("Puppeteer Script Error:", e);
    }
})();
