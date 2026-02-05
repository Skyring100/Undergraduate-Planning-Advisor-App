const puppeteer = require('puppeteer');

const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'

async function connectToUrl(url){
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setUserAgent(userAgent);
    await page.goto(url, { waitUntil: 'networkidle2' });
    return [browser, page]
}

async function scrapeCourses(url) {
    [browser, page] = await connectToUrl(url);

    await browser.close();
    return
}

async function scrapeRequirements(url){
    [browser, page] = await connectToUrl(url);


    await browser.close();
    return;
}