const puppeteer = require('puppeteer');

(async() => {
    await capture(`file://${process.cwd()}/sample.html`, 600, 800, 'sample');
    await capture('https://techcrunch.com/2023/08/09/researchers-watched-100-hours-of-hackers-hacking-honeypot-computers/', 1280, 2560, 'sample2');
})();

async function capture(url, width, height, filename) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({width: width, height: height, deviceScaleFactor: 2});
    console.log('ページ読み込み ..', `${width}x${height}`, url);
    await page.goto(url, {waitUntil: 'networkidle2'});
    console.log('さらに2秒待機 ..');
    await sleep(2000);
    console.log('画像保存 ..');
    await page.screenshot({path: `./${filename}.jpg`});
    console.log('PDF保存 ..');
    await page.pdf({path: `${filename}.pdf`});
    browser.close();
    console.log('出力完了');
}

async function sleep(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}
