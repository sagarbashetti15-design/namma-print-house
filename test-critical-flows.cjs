const puppeteer = require('puppeteer-core');
const { spawn } = require('child_process');
const http = require('http');

async function waitForServer(url) {
  for (let i = 0; i < 30; i++) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(url, (res) => {
          if (res.statusCode === 200) resolve();
          else reject(new Error('Not 200'));
        });
        req.on('error', reject);
      });
      return true;
    } catch (e) {
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  return false;
}

async function runTest() {
  console.log('Starting Vite server...');
  const vite = spawn('npm', ['run', 'dev'], { shell: true, stdio: 'pipe' });
  
  const serverUp = await waitForServer('http://localhost:5173');
  if (!serverUp) {
    console.error('Vite server failed to start');
    process.exit(1);
  }

  console.log('Server is up. Launching Puppeteer...');
  const browser = await puppeteer.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: 'new'
  });
  
  const page = await browser.newPage();
  
  // Track client side errors
  let hasErrors = false;
  page.on('pageerror', err => {
    console.error('CLIENT ERROR:', err.message);
    hasErrors = true;
  });
  page.on('console', msg => {
    if (msg.type() === 'error' && msg.text().includes('React')) {
      console.error('REACT ERROR:', msg.text());
      hasErrors = true;
    }
  });

  try {
    console.log('Testing Home page...');
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
    
    console.log('Testing Product page (Valid ID)...');
    await page.goto('http://localhost:5173/product/m2', { waitUntil: 'networkidle2' });
    
    // Add to cart
    console.log('Selecting size...');
    await page.waitForSelector('.size-btn:not(.out-of-stock)', { timeout: 5000 });
    const sizeBtns = await page.$$('.size-btn:not(.out-of-stock)');
    if (sizeBtns.length > 0) {
      await sizeBtns[0].click();
      
      console.log('Adding to cart...');
      await page.click('.add-to-bag-btn');
      await new Promise(r => setTimeout(r, 1000)); // wait for toast
    }

    console.log('Testing invalid product URL...');
    await page.goto('http://localhost:5173/product/invalid-id-here', { waitUntil: 'networkidle2' });
    const bodyText = await page.evaluate(() => document.body.innerText);
    if (!bodyText.includes('Product not found')) {
      console.error('Invalid product page did not show Product not found!');
      hasErrors = true;
    }

    console.log('Testing Cart page...');
    await page.goto('http://localhost:5173/cart', { waitUntil: 'networkidle2' });

    console.log('Testing Checkout page...');
    await page.goto('http://localhost:5173/checkout', { waitUntil: 'networkidle2' });

    console.log('Tests completed.');
    
  } catch (err) {
    console.error('TEST FAILED:', err);
    hasErrors = true;
  } finally {
    await browser.close();
    vite.kill();
    
    if (hasErrors) {
      console.error('CRITICAL ISSUES FOUND');
      process.exit(1);
    } else {
      console.log('ALL TESTS PASSED SUCCESSFULLY');
      process.exit(0);
    }
  }
}

runTest();
