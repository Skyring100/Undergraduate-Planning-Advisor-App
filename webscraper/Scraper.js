import { Course } from '../data_models/CourseModel';
import {CourseModel} from './data_models/CourseModel';
const puppeteer = require('puppeteer');

const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'

async function connectToUrl(url){
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setUserAgent(userAgent);
    await page.goto(url, { waitUntil: 'networkidle2' });
    return [browser, page]
}

// TODO
async function scrapeCourse(page) {
    // Manually get all information with XPath
    const baseXPath = '::-p-xpath(section[@id="results"]/ul/li'
    const title = page.$(baseXPath+'/header)');
    const course = Course(0, title, 0, 0);
    return course;
}

// TODO
/*
async function scrapeRequirements(url){
    [browser, page] = await connectToUrl(url);
    // Select all elements that have 'program-requirements' as their class
    const programReqSection = await page.$$('.program-requirements');
    var currentElement = programReqSection[0];
    do{
        // Get the next element
        currentElement = await page.evaluateHandle(el => el.nextElementSibling, currentElement);
        var tag = await page.evaluate(el => el.tagName, currentElement)
        if (tag == 'table'){
            // If this element is a table, assume it contains the required courses for this degree
            // Iterate through every row of the table to get its data
            await currentElement.$eval('tr', el => el.getProperty('textContent'))
        }
    }while (  );
    await browser.close();
    return;
}
*/