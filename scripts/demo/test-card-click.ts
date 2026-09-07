import { chromium } from 'playwright';
import * as path from 'path';

async function testCardClick() {
  const statePath = path.resolve('artifacts/demo/demo-auth-state.json');
  const browser = await chromium.launch();
  const context = await browser.newContext({ storageState: statePath, viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();
  const wsId = 'aec037fe-be19-4cd9-9304-6e9dbd34d7a4';
  const q4BoardId = '2a96d778-de28-48ff-9c4d-d45593977814';

  await page.goto(`http://localhost:5173/workspaces/${wsId}/tasks/${q4BoardId}`);
  await page.waitForSelector('h1:has-text("Product Launch — Q4")');

  // Click card title directly
  const titleEl = await page.waitForSelector('h4:has-text("Redesign onboarding flow")');
  console.log('Title element found, clicking...');
  await titleEl.click();
  await page.waitForTimeout(600);
  console.log('URL after click:', page.url());
  const drawer = await page.$('h2:has-text("TASK DETAILS")');
  console.log('Drawer opened?', !!drawer);

  await browser.close();
}

testCardClick().catch(console.error);
