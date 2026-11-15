const { chromium } = require("D:/Benchmark-SC/Benchmark-SC/node_modules/playwright");

const routes = ["/", "/products", "/products/v3", "/api", "/courses", "/news", "/research", "/community"];

(async () => {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const bad = [];
  for (const route of routes) {
    for (const width of [1440, 375]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      await page.goto("http://localhost:3000" + route, {
        waitUntil: "domcontentloaded",
        timeout: 20000,
      });
      await page.waitForTimeout(400);
      const h1 = await page.locator("h1").count();
      const overflowX = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      if (h1 !== 1 || overflowX > 0) {
        bad.push({ route, width, h1, overflowX });
      }
      await page.close();
    }
  }
  await browser.close();
  console.log("BAD", JSON.stringify(bad));
  console.log("CHECKED", routes.length * 2);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
