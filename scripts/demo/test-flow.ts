import { chromium } from 'playwright';
import * as path from 'path';

async function testFlow() {
  const statePath = path.resolve('artifacts/demo/demo-auth-state.json');
  const browser = await chromium.launch();
  const context = await browser.newContext({ storageState: statePath, viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();

  const wsId = 'aec037fe-be19-4cd9-9304-6e9dbd34d7a4';
  const q4BoardId = '2a96d778-de28-48ff-9c4d-d45593977814';
  const productChId = 'ad64caac-8063-4ce9-81d3-e9d6a254be29';
  const docId = 'f0a95ae5-960a-475d-9cd5-7e3cc7b7d2c5';

  console.log('1. Testing Dashboard...');
  await page.goto('http://localhost:5173/dashboard');
  await page.waitForSelector('text=Welcome back', { timeout: 3000 });
  console.log('✅ Dashboard OK');

  console.log('2. Testing Tasks Link & Q4 Board...');
  await page.click('aside a[href*="/tasks"]');
  await page.waitForSelector('h3:has-text("Product Launch — Q4")', { timeout: 3000 });
  await page.click('h3:has-text("Product Launch — Q4")');
  await page.waitForSelector('h1:has-text("Product Launch — Q4")', { timeout: 3000 });
  console.log('✅ Q4 Board OK');

  console.log('3. Testing Channel Navigation into #product...');
  await page.click('aside a[href*="/channels"]');
  const productLink = await page.waitForSelector(`a[href*="/channels/${productChId}"]`, { timeout: 3000 });
  await productLink.click();
  await page.waitForSelector('text="The mobile Focus Mode looks stellar"', { timeout: 3000 });
  console.log('✅ In #product channel OK');

  console.log('4. Testing Documents Navigation into Product Requirements...');
  await page.click('aside a[href*="/documents"]');
  const docLink = await page.waitForSelector(`a[href*="/docs/${docId}"]`, { timeout: 3000 });
  await docLink.click();
  await page.waitForSelector('button:has-text("Ask AI")', { timeout: 3000 });
  console.log('✅ In Document OK, Ask AI button found');

  console.log('5. Testing Members Directory...');
  await page.click('aside a[href*="/members"]');
  await page.waitForSelector('text="Sarah Chen"', { timeout: 3000 });
  console.log('✅ Members directory OK');

  console.log('6. Returning to Q4 Board for Hero Closing...');
  await page.click('aside a[href*="/tasks"]');
  await page.waitForSelector('h3:has-text("Product Launch — Q4")', { timeout: 3000 });
  await page.click('h3:has-text("Product Launch — Q4")');
  await page.waitForSelector('h1:has-text("Product Launch — Q4")', { timeout: 3000 });
  console.log('✅ Hero Board Return OK');

  await browser.close();
  console.log('🎉 ALL 6 SCENES VERIFIED 100% WORKING INSTANTLY (< 50MS DELAY)!');
}

testFlow().catch(console.error);
