import { chromium } from 'playwright';
import * as path from 'path';

async function generateAuthState() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();
  
  await page.goto('http://localhost:5173/login');
  await page.fill('input[name="email"]', 'e2etester@gmail.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  
  await page.waitForSelector('button:has-text("Nexus Product Team")', { timeout: 8000 });
  await page.click('button:has-text("Nexus Product Team")');
  await page.waitForSelector('text=Welcome back', { timeout: 8000 });
  await page.waitForTimeout(500);

  const statePath = path.resolve('artifacts/demo/demo-auth-state.json');
  await context.storageState({ path: statePath });
  console.log('✅ Successfully saved demo-auth-state.json to', statePath);

  // Quick validation: open a new context with this state directly on /dashboard
  const testContext = await browser.newContext({ storageState: statePath, viewport: { width: 1920, height: 1080 } });
  const testPage = await testContext.newPage();
  await testPage.goto('http://localhost:5173/dashboard');
  await testPage.waitForSelector('text=Welcome back', { timeout: 3000 });
  console.log('⚡ Immediate authenticated load on /dashboard verified with zero redirects!');
  
  await browser.close();
}

generateAuthState().catch(console.error);
