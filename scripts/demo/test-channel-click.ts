import { chromium } from 'playwright';
import * as path from 'path';

async function testChannelClick() {
  const statePath = path.resolve('artifacts/demo/demo-auth-state.json');
  const browser = await chromium.launch();
  const context = await browser.newContext({ storageState: statePath, viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();
  const wsId = 'aec037fe-be19-4cd9-9304-6e9dbd34d7a4';
  const productChId = 'ad64caac-8063-4ce9-81d3-e9d6a254be29';

  await page.goto(`http://localhost:5173/workspaces/${wsId}/channels`);
  await page.waitForTimeout(1000);
  
  const links = await page.evaluate(() => 
    Array.from(document.querySelectorAll('a')).map(a => ({ href: a.getAttribute('href'), text: a.innerText.trim() }))
  );
  console.log('Channels on page:', links);

  const link = await page.$(`a[href*="${productChId}"]`);
  console.log('Link found?', !!link);
  if (link) {
    await link.click();
    await page.waitForTimeout(1000);
    console.log('URL after click:', page.url());
    const msgInput = await page.waitForSelector('input[placeholder="Type a message..."]', { timeout: 3000 });
    console.log('Message input found?', !!msgInput);
  }
  await browser.close();
}

testChannelClick().catch(console.error);
