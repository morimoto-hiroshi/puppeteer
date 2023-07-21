const puppeteer = require('puppeteer');

(async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({width: 600, height: 800, deviceScaleFactor: 2});
    console.log('ページ読み込み ..');
    await page.goto(`file://${process.cwd()}/sample.html`, {waitUntil: 'networkidle2'});
    console.log('さらに2秒待機 ..');
    await sleep(2000);
    console.log('画像保存 ..');
    await page.screenshot({path: './sample.jpg'});
    console.log('PDF保存 ..');
    await page.pdf({path: 'sample.pdf'});
    browser.close();
    console.log('出力完了');
})();

async function sleep(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}
