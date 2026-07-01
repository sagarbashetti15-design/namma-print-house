
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, 'dist', req.url === '/' ? 'index.html' : req.url);
  if (!fs.existsSync(filePath)) { res.writeHead(404); res.end(); return; }
  let contentType = 'text/html';
  if (filePath.endsWith('.js')) contentType = 'text/javascript';
  if (filePath.endsWith('.css')) contentType = 'text/css';
  res.writeHead(200, { 'Content-Type': contentType });
  res.end(fs.readFileSync(filePath));
});

server.listen(3002, async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\\\Program Files (x86)\\\\Microsoft\\\\Edge\\\\Application\\\\msedge.exe',
    headless: true
  });
  
  // Test Desktop
  let page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3002/');
  await new Promise(r => setTimeout(r, 1000));
  
  let titleBox = await page.evaluate(() => {
    const el = document.querySelector('.hero-title');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return { width: rect.width, height: rect.height, x: rect.x };
  });
  console.log('Desktop Title Box:', titleBox);
  
  // Test Mobile
  await page.setViewport({ width: 390, height: 844 });
  await new Promise(r => setTimeout(r, 1000));
  let mobileTitleBox = await page.evaluate(() => {
    const el = document.querySelector('.hero-title');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return { width: rect.width, height: rect.height, x: rect.x };
  });
  console.log('Mobile Title Box:', mobileTitleBox);
  
  await browser.close();
  server.close();
});

