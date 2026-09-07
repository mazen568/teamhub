import { chromium, type Page } from 'playwright';
import * as path from 'path';
import * as fs from 'fs';
import { execSync } from 'child_process';

const AUTH_STATE = path.resolve('artifacts/demo/demo-auth-state.json');
const RAW_DIR = path.resolve('artifacts/demo/video/raw');
const FINAL_CV_MP4 = path.resolve('artifacts/demo/video/teamhub-demo-cv.mp4');
const FINAL_SHORT_MP4 = path.resolve('artifacts/demo/video/teamhub-demo-short.mp4');

const MIRROR_CV_MP4 = path.resolve('C:/Users/shawk/.gemini/antigravity-ide/brain/0a5ee4b3-f205-4b4e-91b0-9f716525f6a1/demo/video/teamhub-demo-cv.mp4');
const MIRROR_SHORT_MP4 = path.resolve('C:/Users/shawk/.gemini/antigravity-ide/brain/0a5ee4b3-f205-4b4e-91b0-9f716525f6a1/demo/video/teamhub-demo-short.mp4');

fs.mkdirSync(RAW_DIR, { recursive: true });
fs.mkdirSync(path.dirname(MIRROR_CV_MP4), { recursive: true });

let currentPos = { x: 960, y: 540 };

function ensureAuthState() {
  if (!fs.existsSync(AUTH_STATE)) {
    console.log('Generating auth state before recording...');
    execSync('npx tsx scripts/demo/prepare-auth.ts', { stdio: 'inherit' });
  }
}

async function injectOverlay(page: Page) {
  await page.evaluate((pos) => {
    if (!document.getElementById('demo-styles')) {
      const style = document.createElement('style');
      style.id = 'demo-styles';
      style.innerHTML = `
        @keyframes demo-ripple {
          0% { transform: translate(-50%, -50%) scale(0.3); opacity: 0.95; }
          100% { transform: translate(-50%, -50%) scale(2.4); opacity: 0; }
        }
        @keyframes demo-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
        @keyframes demo-halo {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.45; }
          50% { transform: translate(-50%, -50%) scale(1.35); opacity: 0.85; }
        }
      `;
      document.head.appendChild(style);
    }

    let cursor = document.getElementById('demo-cursor');
    if (!cursor) {
      cursor = document.createElement('div');
      cursor.id = 'demo-cursor';
      cursor.style.cssText = `
        position: fixed;
        left: ${pos.x}px;
        top: ${pos.y}px;
        width: 18px;
        height: 18px;
        border: 2px solid #818cf8;
        background: rgba(99, 102, 241, 0.45);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999999;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 14px rgba(129, 140, 248, 0.85);
        transition: background 0.08s ease, border-color 0.08s ease;
      `;
      
      const halo = document.createElement('div');
      halo.id = 'demo-cursor-halo';
      halo.style.cssText = `
        position: absolute;
        left: 50%;
        top: 50%;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(129, 140, 248, 0.4) 0%, rgba(99, 102, 241, 0) 70%);
        transform: translate(-50%, -50%);
        pointer-events: none;
        animation: demo-halo 1.8s infinite ease-in-out;
      `;
      cursor.appendChild(halo);
      document.body.appendChild(cursor);

      window.addEventListener('mousemove', (e) => {
        if (cursor) {
          cursor.style.left = e.clientX + 'px';
          cursor.style.top = e.clientY + 'px';
        }
      });

      window.addEventListener('mousedown', (e) => {
        if (cursor) {
          cursor.style.background = 'rgba(99, 102, 241, 0.95)';
          cursor.style.borderColor = '#c7d2fe';
        }
        const ripple = document.createElement('div');
        ripple.style.cssText = `
          position: fixed;
          left: ${e.clientX}px;
          top: ${e.clientY}px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid #c7d2fe;
          background: rgba(129, 140, 248, 0.35);
          pointer-events: none;
          z-index: 9999998;
          animation: demo-ripple 0.35s ease-out forwards;
        `;
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 350);
      });

      window.addEventListener('mouseup', () => {
        if (cursor) {
          cursor.style.background = 'rgba(99, 102, 241, 0.45)';
          cursor.style.borderColor = '#818cf8';
        }
      });
    }

    let badge = document.getElementById('demo-feature-badge');
    if (!badge) {
      badge = document.createElement('div');
      badge.id = 'demo-feature-badge';
      badge.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 24px;
        padding: 8px 18px;
        background: rgba(15, 23, 42, 0.92);
        border: 1px solid rgba(255, 255, 255, 0.16);
        border-radius: 12px;
        color: #f8fafc;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.015em;
        z-index: 9999990;
        backdrop-filter: blur(14px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.55);
        display: flex;
        align-items: center;
        gap: 10px;
        opacity: 0;
        transition: opacity 0.22s ease, transform 0.22s ease;
        transform: translateY(6px);
      `;
      badge.innerHTML = `<span style="width:8px;height:8px;border-radius:50%;background:#818cf8;box-shadow:0 0 10px #818cf8;animation:demo-pulse 1.6s infinite;"></span><span id="demo-feature-text">TeamHub</span>`;
      document.body.appendChild(badge);
    }
  }, currentPos);
}

async function showBadge(page: Page, text: string) {
  await page.evaluate((t) => {
    const badge = document.getElementById('demo-feature-badge');
    const label = document.getElementById('demo-feature-text');
    if (badge && label) {
      label.textContent = t;
      badge.style.opacity = '1';
      badge.style.transform = 'translateY(0)';
    }
  }, text);
}

// Fluid continuous 60fps eased cursor motion
async function glide(page: Page, toX: number, toY: number, durationMs = 240) {
  const steps = Math.max(6, Math.floor(durationMs / 16));
  const startX = currentPos.x;
  const startY = currentPos.y;

  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const ease = 1 - Math.pow(1 - t, 3);
    const x = Math.round(startX + (toX - startX) * ease);
    const y = Math.round(startY + (toY - startY) * ease);
    await page.mouse.move(x, y);
    await page.waitForTimeout(16);
  }
  currentPos = { x: toX, y: toY };
}

// Multi-point seamless sweep (continuous fluid trajectory)
async function sweep(page: Page, waypoints: { x: number; y: number; durationMs?: number }[]) {
  for (const wp of waypoints) {
    await glide(page, wp.x, wp.y, wp.durationMs ?? 200);
  }
}

// Continuous micro-scan to maintain visual vitality
async function humanScan(page: Page, deltaX: number, deltaY: number, durationMs = 280) {
  await glide(page, currentPos.x + deltaX, currentPos.y + deltaY, durationMs);
}

async function smoothClick(page: Page, selector: string, options: { delayAfter?: number } = {}) {
  const delayAfter = options.delayAfter ?? 80;
  const el = await page.waitForSelector(selector, { timeout: 3000, state: 'visible' }).catch(() => null);
  if (!el) return false;
  const box = await el.boundingBox();
  if (!box) return false;

  const targetX = Math.round(box.x + box.width / 2);
  const targetY = Math.round(box.y + box.height / 2);
  await glide(page, targetX, targetY, 220);
  await page.waitForTimeout(25);
  await page.mouse.down();
  await page.waitForTimeout(35);
  await page.mouse.up();
  if (delayAfter > 0) {
    await humanScan(page, 12, 0, delayAfter);
  }
  return true;
}

async function smoothType(page: Page, selector: string, text: string, clearFirst = false) {
  const el = await page.waitForSelector(selector, { timeout: 3000 }).catch(() => null);
  if (!el) return;
  const box = await el.boundingBox();
  if (box) {
    await glide(page, Math.round(box.x + Math.min(30, box.width / 2)), Math.round(box.y + box.height / 2), 200);
  }
  await el.click();
  if (clearFirst) {
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');
  }
  await el.type(text, { delay: 24 }); // Fast, fluid 24ms keystrokes
  await humanScan(page, 10, 2, 80);
}

async function smoothScroll(page: Page, totalY: number, durationMs = 350) {
  const steps = Math.max(6, Math.floor(durationMs / 20));
  const stepY = totalY / steps;
  for (let i = 0; i < steps; i++) {
    await page.evaluate((dy) => window.scrollBy({ top: dy, behavior: 'instant' }), stepY);
    await page.waitForTimeout(20);
  }
}

async function recordWalkthrough() {
  console.log('🎥 Initializing Production Video Recording (1920x1080 @ 30fps)...');
  ensureAuthState();

  const wsId = 'aec037fe-be19-4cd9-9304-6e9dbd34d7a4';
  const q4BoardId = '2a96d778-de28-48ff-9c4d-d45593977814';
  const heroTaskId = 'ee38a6a8-c70f-4894-95da-1f05ce4c2b16';
  const productChId = 'ad64caac-8063-4ce9-81d3-e9d6a254be29';
  const docId = 'f0a95ae5-960a-475d-9cd5-7e3cc7b7d2c5';

  const browser = await chromium.launch({ headless: true });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    storageState: AUTH_STATE,
    recordVideo: {
      dir: RAW_DIR,
      size: { width: 1920, height: 1080 },
    },
  });

  const page = await context.newPage();

  // Load Dashboard immediately (already authenticated via storageState)
  await page.goto('http://localhost:5173/dashboard');
  await page.waitForSelector('text=Welcome back', { timeout: 8000 });
  await injectOverlay(page);

  currentPos = { x: 960, y: 320 };
  await page.mouse.move(currentPos.x, currentPos.y);

  // ─────────────────────────────────────────────────────────────
  // SCENE 1: DASHBOARD & SPRINT VELOCITY (Continuous, ~6s)
  // ─────────────────────────────────────────────────────────────
  console.log('🎬 Scene 1: Dashboard & Sprint Velocity...');
  await showBadge(page, 'TeamHub — Collaborative Full-Stack Workspace & AI Engine');
  
  await sweep(page, [
    { x: 380, y: 290, durationMs: 260 },  // My Tasks card
    { x: 500, y: 290, durationMs: 240 },  // 2 To Do / Overdue count
    { x: 620, y: 290, durationMs: 240 },  // Capacity workload bar
    { x: 800, y: 290, durationMs: 240 },  // Workload details
    { x: 1400, y: 560, durationMs: 300 }, // Team Status roster
    { x: 1450, y: 640, durationMs: 280 }, // Shawky Elsayed (Admin)
  ]);

  await showBadge(page, 'Sprint Velocity — Real-Time KPIs & Team Workload');
  await sweep(page, [
    { x: 1200, y: 600, durationMs: 220 },
    { x: 550, y: 550, durationMs: 260 }, // Active Priority Tasks
    { x: 120, y: 175, durationMs: 260 }, // Glide to sidebar Tasks link
  ]);

  // ─────────────────────────────────────────────────────────────
  // SCENE 2: WORK MANAGEMENT HERO — Shawky Elsayed (~26s)
  // ─────────────────────────────────────────────────────────────
  console.log('🎬 Scene 2: Work Management & Kanban Subsystem (Shawky Elsayed Spotlight)...');
  await showBadge(page, 'Work Management — Project Boards Overview');

  // SPA navigation via sidebar link
  await smoothClick(page, 'aside a[href*="/tasks"]', { delayAfter: 100 });
  await page.waitForSelector('h3:has-text("Product Launch — Q4")', { timeout: 3000 });
  await injectOverlay(page);

  // Glide to the Q4 Board card & click
  await sweep(page, [
    { x: 450, y: 300, durationMs: 220 },
    { x: 580, y: 310, durationMs: 220 },
  ]);
  await smoothClick(page, 'h3:has-text("Product Launch — Q4")', { delayAfter: 100 });
  await page.waitForSelector('h1:has-text("Product Launch — Q4")', { timeout: 3000 });
  await injectOverlay(page);

  // 1. Kanban Multi-Column Architecture Sweep
  await showBadge(page, 'Interactive Kanban Board — 60fps Multi-Column Workflow');
  await sweep(page, [
    { x: 340, y: 440, durationMs: 220 },  // Backlog
    { x: 580, y: 440, durationMs: 200 },  // Planned
    { x: 820, y: 440, durationMs: 200 },  // In Progress
    { x: 1100, y: 440, durationMs: 200 }, // Review
    { x: 1380, y: 440, durationMs: 220 }, // Done
  ]);

  // 2. Command Center Status Widgets
  await showBadge(page, 'Sprint Command Center — Overdue, Urgent & Due Soon Signals');
  await sweep(page, [
    { x: 380, y: 180, durationMs: 240 }, // Overdue chip
    { x: 440, y: 180, durationMs: 200 }, // Urgent chip
    { x: 500, y: 180, durationMs: 200 }, // Due soon chip
  ]);

  // 3. Instant Smart Filter Engine
  await showBadge(page, 'Smart Filter Engine — Instant Client-Side Querying');
  await smoothType(page, 'input[placeholder*="Search tasks"]', 'accessibility');
  await sweep(page, [
    { x: 350, y: 360, durationMs: 220 }, // Hover over filtered card
    { x: 400, y: 380, durationMs: 200 },
  ]);
  // Clear filter fluidly
  await smoothClick(page, 'input[placeholder*="Search tasks"]');
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Backspace');
  await humanScan(page, 20, 0, 100);

  // 4. Fluid Drag and Drop (dnd-kit) — Drag "Regression test release candidate" from Planned to In Progress
  await showBadge(page, 'Smooth Drag-and-Drop — dnd-kit State Transitions');
  const cardToDrag = await page.waitForSelector('h4:has-text("Regression test release candidate")', { timeout: 3000 }).catch(() => null);
  const targetCol = await page.evaluate(() => {
    const h3s = Array.from(document.querySelectorAll('h3'));
    const inProgressH3 = h3s.find(h => h.innerText.trim().toUpperCase() === 'IN PROGRESS');
    if (!inProgressH3) return null;
    const rect = inProgressH3.getBoundingClientRect();
    return { x: rect.x + rect.width / 2, y: rect.y + 160 };
  });

  if (cardToDrag && targetCol) {
    const box1 = await cardToDrag.boundingBox();
    if (box1) {
      await glide(page, Math.round(box1.x + box1.width / 2), Math.round(box1.y + box1.height / 2), 220);
      await page.mouse.down();
      await page.waitForTimeout(40);
      await glide(page, Math.round(targetCol.x), Math.round(targetCol.y), 360);
      await page.waitForTimeout(50);
      await page.mouse.up();
      await humanScan(page, 15, -10, 120);
    }
  }

  // 5. Task Detail Drawer & Deep Linking (?task=<id>)
  await showBadge(page, 'Task Detail Drawer — Deep-Linked State & Overdue Indicators');
  // Click the overdue card "Redesign onboarding flow" directly on its title
  const heroCardTitle = await page.waitForSelector('h4:has-text("Redesign onboarding flow")', { timeout: 3000 });
  const cbox = await heroCardTitle.boundingBox();
  if (cbox) {
    await glide(page, Math.round(cbox.x + cbox.width / 2), Math.round(cbox.y + cbox.height / 2), 220);
  }
  await heroCardTitle.click();
  await page.waitForSelector('h2:has-text("TASK DETAILS")', { timeout: 3000 });
  await injectOverlay(page);

  await showBadge(page, 'Direct URL Synchronization (?task=<id>) — Shareable Deep Links');
  await sweep(page, [
    { x: 1720, y: 275, durationMs: 240 }, // Overdue indicator & Due Date
    { x: 1750, y: 350, durationMs: 220 }, // Assignee avatars (Shawky Elsayed)
    { x: 1680, y: 440, durationMs: 220 }, // Comments section
  ]);

  // 6. Real-Time Task Comments
  await showBadge(page, 'Task Collaboration — Threaded Comments & Realtime Broadcast');
  await smoothType(page, 'textarea[placeholder*="comment"]', 'Verified responsive Focus Mode across all columns. Ready to ship!');
  
  await page.evaluate(() => {
    const btn = document.querySelector('form button[type="submit"]') as HTMLButtonElement | null;
    if (btn) btn.click();
  });
  await sweep(page, [
    { x: 1680, y: 580, durationMs: 240 }, // Look at newly posted comment
    { x: 1640, y: 640, durationMs: 220 },
  ]);

  // Dismiss drawer smoothly via X button
  await sweep(page, [
    { x: 1510, y: 55, durationMs: 220 },
  ]);
  await page.evaluate(() => {
    const closeBtn = document.querySelector('div.fixed button:has(svg.lucide-x)') as HTMLButtonElement | null;
    if (closeBtn) closeBtn.click();
  });
  await humanScan(page, -40, 10, 120);

  // ─────────────────────────────────────────────────────────────
  // SCENE 3: REAL-TIME CHANNELS (Continuous, ~7s)
  // ─────────────────────────────────────────────────────────────
  console.log('🎬 Scene 3: Team Channels & Messaging...');
  await showBadge(page, 'Team Channels — WebSocket Message Distribution & Reactions');

  // SPA navigation via sidebar
  await smoothClick(page, 'aside a[href*="/channels"]', { delayAfter: 80 });
  await page.waitForSelector(`a[href*="/channels/${productChId}"]`, { timeout: 3000 });
  await injectOverlay(page);

  // Click into #product channel
  await smoothClick(page, `a[href*="/channels/${productChId}"]`, { delayAfter: 80 });
  await page.waitForSelector('input[placeholder="Type a message..."]', { timeout: 3000 });
  await injectOverlay(page);

  await showBadge(page, 'Real-Time Channels (#product) — Threaded Chat & Live Reactions');
  await sweep(page, [
    { x: 550, y: 380, durationMs: 240 }, // Sarah Chen message
    { x: 620, y: 480, durationMs: 240 }, // Shawky Elsayed message & reaction pills
    { x: 820, y: 540, durationMs: 220 }, // Reaction pill hover
  ]);

  // Send interactive chat message
  await smoothType(page, 'input[placeholder="Type a message..."]', 'Sprint update: Work Management board and overdue flags are live! 🚀');
  await page.keyboard.press('Enter');
  await humanScan(page, 20, -15, 120);

  // ─────────────────────────────────────────────────────────────
  // SCENE 4: DOCUMENT HUB (Continuous, ~7s)
  // ─────────────────────────────────────────────────────────────
  console.log('🎬 Scene 4: Document Hub & Knowledge Base...');
  await showBadge(page, 'Document Hub — TipTap Collaborative Editor & Knowledge Base');

  // SPA navigation via sidebar
  await smoothClick(page, 'aside a[href*="/documents"]', { delayAfter: 80 });
  await page.waitForSelector(`a[href*="/docs/${docId}"]`, { timeout: 3000 });
  await injectOverlay(page);

  // Click into document
  await smoothClick(page, `a[href*="/docs/${docId}"]`, { delayAfter: 80 });
  await page.waitForSelector('h1:has-text("Product Requirements")', { timeout: 3000 });
  await injectOverlay(page);

  await showBadge(page, 'TipTap Rich Text Editor — Hierarchies, Checklists & Code Blocks');
  await sweep(page, [
    { x: 600, y: 350, durationMs: 240 }, // Title & metadata
    { x: 650, y: 440, durationMs: 240 }, // Goals
  ]);
  await smoothScroll(page, 320, 360);
  await sweep(page, [
    { x: 700, y: 420, durationMs: 240 }, // Code block & requirements
    { x: 750, y: 500, durationMs: 240 },
  ]);

  // ─────────────────────────────────────────────────────────────
  // SCENE 5: MEMBERS DIRECTORY & RBAC (Continuous, ~5s)
  // ─────────────────────────────────────────────────────────────
  console.log('🎬 Scene 5: Members Directory & RBAC...');
  await showBadge(page, 'Granular RBAC — Owner, Admin & Member Role Governance');

  // SPA navigation via sidebar
  await smoothClick(page, 'aside a[href*="/members"]', { delayAfter: 80 });
  await page.waitForSelector('text="Sarah Chen"', { timeout: 3000 });
  await injectOverlay(page);

  await showBadge(page, 'Team Directory — Workspace Roles & Status Tracking');
  await sweep(page, [
    { x: 600, y: 250, durationMs: 240 }, // Sarah Chen (Owner)
    { x: 600, y: 350, durationMs: 240 }, // Shawky Elsayed (Admin)
    { x: 800, y: 350, durationMs: 200 },
  ]);

  // ─────────────────────────────────────────────────────────────
  // SCENE 6: HERO CLOSING FRAME ON KANBAN BOARD (Shawky Spotlight, ~5s)
  // ─────────────────────────────────────────────────────────────
  console.log('🎬 Scene 6: Hero Closing Frame on Master Kanban Board...');
  await smoothClick(page, 'aside a[href*="/tasks"]', { delayAfter: 80 });
  await page.waitForSelector('h3:has-text("Product Launch — Q4")', { timeout: 3000 });
  await smoothClick(page, 'h3:has-text("Product Launch — Q4")', { delayAfter: 80 });
  await page.waitForSelector('h1:has-text("Product Launch — Q4")', { timeout: 3000 });
  await injectOverlay(page);

  await showBadge(page, 'Shawky Elsayed — Work Management, Kanban & Full-Stack Architecture');
  // Elegant sweeping hero arc across the finished multi-column board
  await sweep(page, [
    { x: 380, y: 350, durationMs: 260 },
    { x: 680, y: 380, durationMs: 260 },
    { x: 980, y: 350, durationMs: 260 },
    { x: 1280, y: 380, durationMs: 260 },
    { x: 960, y: 500, durationMs: 320 },
  ]);

  // Finish recording cleanly
  await context.close();
  await browser.close();

  console.log('✅ Browser recording finished! Processing video files...');

  const files = fs.readdirSync(RAW_DIR).filter(f => f.endsWith('.webm'));
  if (files.length === 0) throw new Error('No raw webm file found!');

  const sortedFiles = files
    .map(f => ({ name: f, time: fs.statSync(path.join(RAW_DIR, f)).mtimeMs }))
    .sort((a, b) => b.time - a.time);

  const rawWebm = path.join(RAW_DIR, sortedFiles[0].name);
  console.log('Transcoding most recent recording:', rawWebm);

  // Transcode to CFR 30fps web-optimized 1080p H.264 MP4
  console.log('🎞️ Transcoding to web-optimized 1080p H.264 MP4 (CFR 30fps, progressive)...');
  const ffmpegCvCmd = `ffmpeg -y -i "${rawWebm}" -c:v libx264 -preset slow -crf 18 -vsync cfr -r 30 -pix_fmt yuv420p -movflags +faststart "${FINAL_CV_MP4}"`;
  execSync(ffmpegCvCmd, { stdio: 'inherit' });
  fs.copyFileSync(FINAL_CV_MP4, MIRROR_CV_MP4);

  // Generate short cut (~30s highlight of Kanban board & hero actions)
  console.log('🎞️ Generating short cut (30s)...');
  const ffmpegShortCmd = `ffmpeg -y -ss 00:00:06 -i "${FINAL_CV_MP4}" -t 00:00:30 -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -movflags +faststart "${FINAL_SHORT_MP4}"`;
  execSync(ffmpegShortCmd, { stdio: 'inherit' });
  fs.copyFileSync(FINAL_SHORT_MP4, MIRROR_SHORT_MP4);

  console.log('🎉 Production Complete!');
  console.log('CV Video:', FINAL_CV_MP4);
  console.log('Short Video:', FINAL_SHORT_MP4);
}

recordWalkthrough().catch(err => {
  console.error('❌ Video production failed:', err);
  process.exit(1);
});
