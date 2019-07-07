const ppt = require('puppeteer');
const imdb_url = id => `https://www.imdb.com/title/${id}/`;
const TEST_ID = 'tt6763664';

const argv = require('minimist')(process.argv.slice(2));
const isHeadless = (args) => args && args.showBrowser ? false : true;

const scrapeee = async () => {
    // initiating the browser
    const browser = await ppt.launch({ headless: isHeadless(argv) });
    const webpage = await browser.newPage();

    // go to the requested page
    await webpage.goto(imdb_url(TEST_ID), { waitUntil: 'networkidle0' });

    // run js on the page
    let data = await webpage.evaluate(() => {
        let title = document.querySelector('div[class="title_wrapper"] > h1').innerText;
        
        return {
            title
        }
    });

    // show the data
    console.log(data);

    // closing the browser once complete
    await browser.close();
}

scrapeee();