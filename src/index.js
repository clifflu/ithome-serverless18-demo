const setup = require('./starter-kit/setup');

exports.handler = async (event, context, callback) => {
  // For keeping the browser launch
  context.callbackWaitsForEmptyEventLoop = false;
  const browser = await setup.getBrowser();
  exports.run(browser).then(
    (result) => callback(null, result)
  ).catch(
    (err) => callback(err)
  );
};

exports.run = async (browser) => {
  const page = await browser.newPage();
  await page.goto('https://www.google.com/',
   {waitUntil: ['domcontentloaded', 'networkidle0']}
  );

  await page.type('#lst-ib', '104 ');

  // https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pageclickselector-options
  await Promise.all([
    page.waitForNavigation(),
    page.click('[name=btnK]'),
  ]);

  let titles = await page.evaluate(() => Array.prototype.map.call(
      document.querySelectorAll('.rc > h3 > a'),
      (a) => a.innerText
    )
  );

  console.log(titles);
  await page.close();
  return titles;
};
