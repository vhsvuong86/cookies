const puppeteer = require('puppeteer');
const CRED = require('./creds');
const fs = require('fs');

const sleep = async (ms) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, ms)
  });
}

const ID = {
  login: '#email',
  pass: '#pass'
};

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  let login = async () => {
    // login
    await page.goto('https://facebook.com', {
      waitUntil: 'networkidle2'
    });
     await sleep(500);
     await page.waitForSelector(ID.login);
     console.log(CRED.user);
     console.log(ID.login);
     await page.type(ID.login, CRED.user);
     await page.type(ID.pass, CRED.pass);
     await sleep(500);

     await Promise.all([
       page.waitForNavigation({ waitUntil: 'load' }),
       page.click("#loginbutton")
     ]);


     //console.log(">>>>>>>>>>>login done");
     //await page.waitForNavigation();
  }
  await login();

  console.log('>>>>>>>>>>>cookies : '+  JSON.stringify(await page.cookies()))
  fs.writeFileSync('cookies_name.json', JSON.stringify(await page.cookies()));

  /*  await page.goto('https://facebook.com', {
        waitUntil: 'networkidle2'
    });

   let cookiesArr =  JSON.parse(fs.readFileSync('cookies_name.json').toString()) ;
   if (cookiesArr.length !== 0) {
      for (let cookie of cookiesArr) {
        await page.setCookie(cookie)
      }
      console.log('Session has been loaded in the browser')
   }

   await page.goto('https://facebook.com', {
           waitUntil: 'networkidle2'
       });

  await page.screenshot({
    path: 'facebook.png'
  });*/

})();
