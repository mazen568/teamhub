import { chromium, type Page } from 'playwright';
import * as path from 'path';
import * as fs from 'fs';

const OUT_DIR_PRIMARY = path.resolve(process.cwd(), 'artifacts/demo/screenshots');
const OUT_DIR_MIRROR = path.resolve('C:/Users/shawk/.gemini/antigravity-ide/brain/0a5ee4b3-f205-4b4e-91b0-9f716525f6a1/demo/screenshots');

fs.mkdirSync(OUT_DIR_PRIMARY, { recursive: true });
fs.mkdirSync(OUT_DIR_MIRROR, { recursive: true });

async function saveScreenshot(page: Page, filename: string, options?: { clip?: any }) {
  const file1 = path.join(OUT_DIR_PRIMARY, filename);
  const file2 = path.join(OUT_DIR_MIRROR, filename);
  await page.screenshot({ path: file1, ...options });
  fs.copyFileSync(file1, file2);
  console.log(`📸 Captured: ${filename}`);
}

async function loginUser(page: Page, email = 'e2etester@gmail.com', password = 'password123') {
  await page.goto('http://localhost:5173/login');
  await page.waitForSelector('input[name="email"]', { timeout: 10000 });
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');
  await page.waitForTimeout(1000);
}

async function selectWorkspace(page: Page) {
  await page.goto('http://localhost:5173/workspaces');
  await page.waitForSelector('h3:has-text("Nexus Product Team")', { timeout: 10000 });
  await page.click('button:has-text("Nexus Product Team")');
  await page.waitForTimeout(1000);
}

async function runCapture() {
  console.log('🚀 Starting Bulletproof Playwright Screenshot Pipeline...');

  const wsId = 'aec037fe-be19-4cd9-9304-6e9dbd34d7a4';
  const q4BoardId = '2a96d778-de28-48ff-9c4d-d45593977814';
  const heroTaskId = 'ee38a6a8-c70f-4894-95da-1f05ce4c2b16';
  const docId = 'f0a95ae5-960a-475d-9cd5-7e3cc7b7d2c5';
  const productChId = 'ad64caac-8063-4ce9-81d3-e9d6a254be29';

  const browser = await chromium.launch({ headless: true });

  // ─────────────────────────────────────────────────────────────
  // 1. DESKTOP VIEWPORT (1440x900, DPR 1.5)
  // ─────────────────────────────────────────────────────────────
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5,
  });
  const page = await desktopContext.newPage();

  // 01-login.png
  await page.goto('http://localhost:5173/login');
  await page.waitForSelector('input[name="email"]', { timeout: 8000 });
  await page.fill('input[name="email"]', 'e2etester@gmail.com');
  await page.waitForTimeout(400);
  await saveScreenshot(page, '01-login.png');

  // 02-register.png
  await page.goto('http://localhost:5173/register');
  await page.waitForTimeout(600);
  await saveScreenshot(page, '02-register.png');

  // Login as Shawky Elsayed (Lead / Admin)
  await loginUser(page, 'e2etester@gmail.com', 'password123');

  // 03-workspace-selection.png
  await page.goto('http://localhost:5173/workspaces');
  await page.waitForSelector('h3:has-text("Nexus Product Team")', { timeout: 8000 });
  await page.waitForTimeout(500);
  await saveScreenshot(page, '03-workspace-selection.png');

  // Enter Workspace -> Dashboard
  await selectWorkspace(page);
  await page.waitForTimeout(1200);
  // 04-dashboard.png
  await saveScreenshot(page, '04-dashboard.png');

  // 05-members.png
  await page.goto(`http://localhost:5173/workspaces/${wsId}/members`);
  await page.waitForSelector('h3:has-text("Members")', { timeout: 8000 });
  await page.waitForTimeout(800);
  await saveScreenshot(page, '05-members.png');

  // 06-member-management-admin.png
  const memberSearch = await page.$('input[placeholder*="Search all users"]');
  if (memberSearch) {
    await memberSearch.fill('Sarah');
    await page.waitForTimeout(600);
    await saveScreenshot(page, '06-member-management-admin.png');
    await memberSearch.fill('');
  }

  // 07-member-role-management.png (Owner view - Sarah Chen)
  const ownerContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5,
  });
  const ownerPage = await ownerContext.newPage();
  await loginUser(ownerPage, 'sarah.chen@nexus.io', 'password123');
  await selectWorkspace(ownerPage);
  await ownerPage.goto(`http://localhost:5173/workspaces/${wsId}/members`);
  await ownerPage.waitForSelector('select', { timeout: 8000 });
  await ownerPage.waitForTimeout(800);
  await saveScreenshot(ownerPage, '07-member-role-management.png');
  await ownerContext.close();

  // 08-channels.png
  await page.goto(`http://localhost:5173/workspaces/${wsId}/channels`);
  await page.waitForTimeout(1000);
  await saveScreenshot(page, '08-channels.png');

  // 09-channel-conversation.png
  await page.goto(`http://localhost:5173/workspaces/${wsId}/channels/${productChId}`);
  await page.waitForSelector('text=Q4 Product Roadmap', { timeout: 10000 }).catch(() => {});
  await page.waitForTimeout(1200);
  await saveScreenshot(page, '09-channel-conversation.png');

  // 10-channel-reactions.png
  await saveScreenshot(page, '10-channel-reactions-or-live-state.png');

  // 11-direct-messages.png
  await page.goto(`http://localhost:5173/workspaces/${wsId}/messages`);
  await page.waitForTimeout(1200);
  await saveScreenshot(page, '11-direct-messages.png');

  // 12-documents-library.png
  await page.goto(`http://localhost:5173/workspaces/${wsId}/documents`);
  await page.waitForSelector('h3:has-text("Product Requirements")', { timeout: 10000 });
  await page.waitForTimeout(1000);
  await saveScreenshot(page, '12-documents-library.png');

  // 13-document-editor.png
  await page.goto(`http://localhost:5173/workspaces/${wsId}/docs/${docId}`);
  await page.waitForSelector('h1:has-text("Product Requirements")', { timeout: 10000 });
  await page.waitForTimeout(1500);
  await saveScreenshot(page, '13-document-editor.png');

  // 14-document-rich-content.png
  await page.evaluate(() => window.scrollBy({ top: 350, behavior: 'instant' }));
  await page.waitForTimeout(600);
  await saveScreenshot(page, '14-document-rich-content.png');

  // 15-document-ai-or-summary.png
  const askAIBtn = await page.$('button:has-text("Ask AI")');
  if (askAIBtn) {
    await askAIBtn.click();
    await page.waitForSelector('h2:has-text("Document AI")', { timeout: 5000 }).catch(() => {});
    const qaInput = await page.$('input[placeholder*="Ask a question"], textarea[placeholder*="Ask a question"]');
    if (qaInput) {
      await qaInput.fill('What are the core features of the Work Management system?');
      const sendBtn = await page.$('button[type="submit"], button:has-text("Send")');
      if (sendBtn) await sendBtn.click();
      await page.waitForTimeout(2000);
    }
    await saveScreenshot(page, '15-document-ai-or-summary.png');
  }

  // ─────────────────────────────────────────────────────────────
  // WORK MANAGEMENT HERO SECTION (Shawky Elsayed Contribution)
  // ─────────────────────────────────────────────────────────────
  // 16-boards-overview.png
  await page.goto(`http://localhost:5173/workspaces/${wsId}/tasks`);
  await page.waitForSelector('h3:has-text("Product Launch — Q4")', { timeout: 10000 });
  await page.waitForTimeout(800);
  await saveScreenshot(page, '16-boards-overview.png');

  // 17-kanban-board.png
  await page.goto(`http://localhost:5173/workspaces/${wsId}/tasks/${q4BoardId}`);
  await page.waitForSelector('h1:has-text("Product Launch — Q4")', { timeout: 10000 });
  await page.waitForTimeout(1500);
  await saveScreenshot(page, '17-kanban-board.png');

  // 31-board-command-center.png (header stats widgets)
  await saveScreenshot(page, '31-board-command-center.png');

  // 18-kanban-rich-board.png
  await saveScreenshot(page, '18-kanban-rich-board.png');

  // 24-board-overdue-state.png (cards with red overdue badges)
  await saveScreenshot(page, '24-board-overdue-state.png');

  // 23-board-filters.png (filter by Priority)
  const priorityFilterBtn = await page.$('button:has-text("Priority"), select');
  if (priorityFilterBtn) {
    const tag = await priorityFilterBtn.evaluate(el => el.tagName.toLowerCase());
    if (tag === 'select') {
      await priorityFilterBtn.selectOption('urgent');
    } else {
      await priorityFilterBtn.click();
      const opt = await page.$('text="Urgent", text="urgent"');
      if (opt) await opt.click();
    }
    await page.waitForTimeout(600);
    await saveScreenshot(page, '23-board-filters.png');
    const clearBtn = await page.$('button:has-text("Clear"), button:has-text("Reset")');
    if (clearBtn) await clearBtn.click();
    await page.waitForTimeout(400);
  }

  // 30-create-task-modal.png
  const addTaskBtn = await page.$('button:has-text("Add Task"), button:has-text("New Task")');
  if (addTaskBtn) {
    await addTaskBtn.click();
    await page.waitForTimeout(600);
    await saveScreenshot(page, '30-create-task-modal.png');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
  }

  // 19-task-detail-drawer.png (Deep linking URL ?task=<id>)
  await page.goto(`http://localhost:5173/workspaces/${wsId}/tasks/${q4BoardId}?task=${heroTaskId}`);
  await page.waitForSelector('h2:has-text("Task Details")', { timeout: 10000 });
  await page.waitForTimeout(1000);
  await saveScreenshot(page, '19-task-detail-drawer.png');

  // 20-task-assignees.png
  await saveScreenshot(page, '20-task-assignees.png');

  // 21-task-comments.png
  await saveScreenshot(page, '21-task-comments.png');

  // 22-task-priority-due-date.png
  await saveScreenshot(page, '22-task-priority-due-date.png');

  // 25-task-deep-link.png
  await saveScreenshot(page, '25-task-deep-link.png');

  // 26-board-drag-drop-result.png (Close drawer, show full board state)
  await page.goto(`http://localhost:5173/workspaces/${wsId}/tasks/${q4BoardId}`);
  await page.waitForSelector('h1:has-text("Product Launch — Q4")', { timeout: 10000 });
  await page.waitForTimeout(800);
  await saveScreenshot(page, '26-board-drag-drop-result.png');

  // Settings Pages
  // 28-profile-settings.png
  await page.goto('http://localhost:5173/settings/profile');
  await page.waitForSelector('h2:has-text("Public Profile")', { timeout: 8000 });
  await page.waitForTimeout(800);
  await saveScreenshot(page, '28-profile-settings.png');

  // 29-workspace-settings-admin.png
  await page.goto('http://localhost:5173/settings/workspace');
  await page.waitForSelector('h2:has-text("Workspace Basics")', { timeout: 8000 });
  await page.waitForTimeout(800);
  await saveScreenshot(page, '29-workspace-settings-admin.png');

  await desktopContext.close();

  // ─────────────────────────────────────────────────────────────
  // 2. MOBILE VIEWPORT (390x844, DPR 2) — Focus Mode Showcase
  // ─────────────────────────────────────────────────────────────
  console.log('📱 Switching to Mobile Viewport (390x844, DPR 2)...');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileContext.newPage();
  await loginUser(mobilePage, 'e2etester@gmail.com', 'password123');
  await selectWorkspace(mobilePage);

  // Navigate directly to Board Focus Mode
  await mobilePage.goto(`http://localhost:5173/workspaces/${wsId}/tasks/${q4BoardId}`);
  await mobilePage.waitForSelector('h1:has-text("Product Launch — Q4")', { timeout: 10000 });
  await mobilePage.waitForTimeout(1200);

  // 27-board-mobile-focus-mode.png
  await saveScreenshot(mobilePage, '27-board-mobile-focus-mode.png');

  // 32-mobile-dashboard.png
  await mobilePage.goto('http://localhost:5173/dashboard');
  await mobilePage.waitForTimeout(1200);
  await saveScreenshot(mobilePage, '32-mobile-dashboard.png');

  await mobileContext.close();
  await browser.close();

  console.log('🎉 Screenshot Capture Pipeline Successfully Finished!');
}

runCapture().catch(err => {
  console.error('❌ Pipeline error:', err);
  process.exit(1);
});
