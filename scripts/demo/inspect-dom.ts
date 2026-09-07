import { chromium } from 'playwright';

async function testSelectors() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  await page.goto('http://localhost:5173/login');
  await page.fill('input[name="email"]', 'e2etester@gmail.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  
  await page.waitForSelector('button:has-text("Nexus Product Team")', { timeout: 8000 });
  await page.click('button:has-text("Nexus Product Team")');
  await page.waitForTimeout(1000);

  console.log('Current URL:', page.url());
  const tasksLink = await page.waitForSelector('nav a:has-text("Tasks")', { timeout: 3000 }).catch(() => null);
  console.log('tasksLink exists?', !!tasksLink);
  if (tasksLink) {
    const box = await tasksLink.boundingBox();
    console.log('tasksLink box:', box);
  }

  // Click tasks link
  if (tasksLink) await tasksLink.click();
  await page.waitForTimeout(1000);
  console.log('URL after clicking Tasks:', page.url());

  const q4Card = await page.waitForSelector('h3:has-text("Product Launch — Q4")', { timeout: 3000 }).catch(() => null);
  console.log('q4Card exists?', !!q4Card);
  if (q4Card) {
    const box = await q4Card.boundingBox();
    console.log('q4Card box:', box);
  }

  if (q4Card) await q4Card.click();
  await page.waitForTimeout(1200);
  console.log('URL after clicking Q4 board:', page.url());

  // Check card to drag
  const cardToDrag = await page.waitForSelector('h4:has-text("Mobile navigation accessibility")', { timeout: 3000 }).catch(() => null);
  console.log('cardToDrag exists?', !!cardToDrag);
  if (cardToDrag) {
    const box = await cardToDrag.boundingBox();
    console.log('cardToDrag box:', box);
  }

  // Check target column
  const reviewCol = await page.evaluate(() => {
    const h3s = Array.from(document.querySelectorAll('h3'));
    const reviewH3 = h3s.find(h => h.innerText.trim().toUpperCase() === 'REVIEW');
    if (!reviewH3) return null;
    const colDiv = reviewH3.closest('div[data-rbd-droppable-id], div[class*="rounded"], div');
    const rect = reviewH3.getBoundingClientRect();
    return {
      text: reviewH3.innerText,
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height
    };
  });
  console.log('reviewCol:', reviewCol);

  // Check overdue card
  const overdueCard = await page.waitForSelector('h4:has-text("Redesign onboarding flow")', { timeout: 3000 }).catch(() => null);
  console.log('overdueCard exists?', !!overdueCard);
  if (overdueCard) {
    const box = await overdueCard.boundingBox();
    console.log('overdueCard box:', box);
    await overdueCard.click();
    await page.waitForTimeout(800);
    console.log('URL after clicking overdueCard:', page.url());
  }

  // Check drawer comment input
  const commentInput = await page.waitForSelector('textarea[placeholder*="comment"], input[placeholder*="comment"]', { timeout: 3000 }).catch(() => null);
  console.log('commentInput exists?', !!commentInput);

  await browser.close();
}

testSelectors().catch(console.error);
