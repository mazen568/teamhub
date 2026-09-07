# TeamHub — Portfolio Demonstration Manifest

**Date**: September 7, 2026  
**Repository**: [https://github.com/mazen568/teamhub](https://github.com/mazen568/teamhub)  
**Git Branch**: `chore/portfolio-demo`  
**Featured Contributor**: **Shawky Elsayed** (Work Management Lead & Architect)  

---

## 1. Environment & Architecture Specifications

| Subsystem | Technology / Image | Host Binding | Status |
| :--- | :--- | :--- | :--- |
| **PostgreSQL + pgvector** | `pgvector/pgvector:pg16` | `localhost:5435:5432` | Container `teamhub-postgres` running isolated |
| **API Gateway** | Express.js / TypeScript / Prisma ORM | `http://localhost:3000` | Port 3000 healthy (`/health` returns 200 OK) |
| **Web Frontend** | Vite 5 / React 18 / TailwindCSS / Lucide | `http://localhost:5173` | Port 5173 healthy (HMR + SPA routing active) |
| **WebSocket Engine** | Socket.IO v4 (Namespace & Rooms) | `ws://localhost:3000` | Connected for realtime task & chat sync |
| **AI / Vector Engine** | Deterministic Offline Fallback + SSE Stream | `http://localhost:3000/ai/*` | Active (Zero external API dependencies needed) |

---

## 2. Seeded Test Accounts

| Full Name | Role | Email | Password | Primary Demo Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Shawky Elsayed** | **Admin / Work Mgmt Lead** | `e2etester@gmail.com` | `password123` | **Hero Account**: Board configuration, task lifecycle, sprint filters, comment collaboration |
| **Sarah Chen** | **Workspace Owner** | `sarah.chen@nexus.io` | `password123` | Role delegation, workspace settings administration, billing & delete workspace safeguards |
| **Omar Khalil** | Member (Senior Full-Stack) | `omar.khalil@nexus.io` | `password123` | Realtime messaging partner, task assignee |
| **Maya Hassan** | Member (Product Designer) | `maya.hassan@nexus.io` | `password123` | Document co-author, design channel threads |
| **Daniel Kim** | Member (Frontend Engineer) | `daniel.kim@nexus.io` | `password123` | Board collaborator, subtask assignee |
| **Lina Ahmed** | Member (QA & Release Lead) | `lina.ahmed@nexus.io` | `password123` | Review column owner, regression testing comments |
| **Alex Morgan** | Member (DevOps / Infrastructure) | `alex.morgan@nexus.io` | `password123` | Infrastructure tasks, automated CI/CD threads |

---

## 3. Seeded Workspace & Entity Registry

- **Workspace**: `Nexus Product Team`
  - **ID**: `aec037fe-be19-4cd9-9304-6e9dbd34d7a4`
  - **Slug**: `nexus-product-team`
- **Hero Kanban Board**: `Product Launch — Q4`
  - **ID**: `2a96d778-de28-48ff-9c4d-d45593977814`
  - **Columns**: `Backlog` (4 tasks), `Planned` (3 tasks), `In Progress` (3 tasks), `Review` (2 tasks), `Done` (2 tasks)
- **Hero Overdue Task**: `Redesign onboarding flow`
  - **ID**: `ee38a6a8-c70f-4894-95da-1f05ce4c2b16`
  - **Deep-Link URL**: `http://localhost:5173/workspaces/aec037fe-be19-4cd9-9304-6e9dbd34d7a4/tasks/2a96d778-de28-48ff-9c4d-d45593977814?task=ee38a6a8-c70f-4894-95da-1f05ce4c2b16`
  - **Status**: OVERDUE (Past due date, Priority: URGENT, Assignees: Shawky Elsayed & Maya Hassan)
- **Hero Document**: `Product Requirements — Analytics Dashboard`
  - **ID**: `f0a95ae5-960a-475d-9cd5-7e3cc7b7d2c5`
  - **URL**: `http://localhost:5173/workspaces/aec037fe-be19-4cd9-9304-6e9dbd34d7a4/docs/f0a95ae5-960a-475d-9cd5-7e3cc7b7d2c5`
- **Hero Discussion Channel**: `#product`
  - **ID**: `ad64caac-8063-4ce9-81d3-e9d6a254be29`
  - **URL**: `http://localhost:5173/workspaces/aec037fe-be19-4cd9-9304-6e9dbd34d7a4/channels/ad64caac-8063-4ce9-81d3-e9d6a254be29`

---

## 4. Key Application Routes

| View | Route Pattern | Target UI |
| :--- | :--- | :--- |
| Login | `/login` | Authentication form with demo pre-fill options |
| Registration | `/register` | New user onboarding and password hashing |
| Workspace Hub | `/workspaces` | Workspace switcher with member counts and logos |
| Dashboard | `/dashboard` | Sprint KPIs, team capacity bar, live activity stream |
| Work Management (Boards) | `/workspaces/:wsId/tasks` | Project boards index with status summaries |
| Kanban Board View | `/workspaces/:wsId/tasks/:boardId` | Multi-column drag-and-drop board with command center |
| Task Deep-Link Drawer | `/workspaces/:wsId/tasks/:boardId?task=:id` | Sliding task detail panel with comments & metadata |
| Channels Hub | `/workspaces/:wsId/channels` | Workspace channel list and creation modal |
| Channel Conversation | `/workspaces/:wsId/channels/:channelId` | Realtime threaded discussion with emoji reactions |
| Direct Messages | `/workspaces/:wsId/messages` | 1-on-1 team direct chat stream |
| Documents Library | `/workspaces/:wsId/documents` | Knowledge base repository with search & filters |
| Document Editor | `/workspaces/:wsId/docs/:docId` | TipTap rich-text editor with Document AI panel |
| Members Directory | `/workspaces/:wsId/members` | Team directory with RBAC role management |
| User Profile | `/settings/profile` | Avatar configuration and user preferences |
| Workspace Settings | `/settings/workspace` | Admin workspace metadata and danger zone controls |

---

## 5. Master Screenshot Catalog (32 Files)

All screenshots captured in **Desktop (1440×900 @ 1.5x DPR)** and **Mobile (390×844)** viewports:

| # | Filename | Viewport | Description |
| :--- | :--- | :--- | :--- |
| 01 | `01-login.png` | Desktop | Authentication screen with clean dark theme form inputs |
| 02 | `02-register.png` | Desktop | Account creation screen with password strength validation |
| 03 | `03-workspace-selection.png` | Desktop | Multi-workspace switcher displaying "Nexus Product Team" |
| 04 | `04-dashboard.png` | Desktop | Sprint metrics, active priority items, team capacity bar, and live feeds |
| 05 | `05-members.png` | Desktop | Team directory with 7 active members, online statuses, and roles |
| 06 | `06-member-management-admin.png` | Desktop | Admin view filtering team members with management controls |
| 07 | `07-member-role-management.png` | Desktop | Owner view (Sarah Chen) with role promotion dropdowns (`ADMIN`/`MEMBER`) |
| 08 | `08-channels.png` | Desktop | Workspace communication hub with channel browser |
| 09 | `09-channel-conversation.png` | Desktop | `#product` channel with rich messages, code blocks, and timestamps |
| 10 | `10-channel-reactions-or-live-state.png` | Desktop | Emoji reaction badges and active member typing indicators |
| 11 | `11-direct-messages.png` | Desktop | Private direct messaging interface between teammates |
| 12 | `12-documents-library.png` | Desktop | Collaborative document catalog with tag badges and author info |
| 13 | `13-document-editor.png` | Desktop | Full TipTap editor showing PRD headings, bold, lists, and metadata |
| 14 | `14-document-rich-content.png` | Desktop | Technical document view displaying formatted code blocks and checklists |
| 15 | `15-document-ai-or-summary.png` | Desktop | Document AI sidebar streaming semantic summary via SSE tokens |
| 16 | `16-boards-overview.png` | Desktop | Work Management board list with "Product Launch — Q4" card |
| 17 | `17-kanban-board.png` | Desktop | Full multi-column Kanban board with Backlog, Planned, In Progress, Review, Done |
| 18 | `18-kanban-rich-board.png` | Desktop | Polished high-density Kanban board with tags, priority badges, and avatars |
| 19 | `19-task-detail-drawer.png` | Desktop | Sliding task detail panel showing task title, status, and assignees |
| 20 | `20-task-assignees.png` | Desktop | Multi-assignee avatar cluster and assignment dropdown selector |
| 21 | `21-task-comments.png` | Desktop | Chronological task discussion feed with live comment input |
| 22 | `22-task-priority-due-date.png` | Desktop | Priority level selector (Urgent/High/Medium/Low) and date picker |
| 23 | `23-board-filters.png` | Desktop | Live filter bar isolating urgent tasks via priority dropdown query |
| 24 | `24-board-overdue-state.png` | Desktop | Red overdue badges on delayed tasks with deadline warnings |
| 25 | `25-task-deep-link.png` | Desktop | URL query parameter sync (`?task=<id>`) for direct shareable links |
| 26 | `26-board-drag-drop-result.png` | Desktop | Board state following fluid card movement across sprint columns |
| 27 | `27-board-mobile-focus-mode.png` | Mobile (390×844) | Mobile Kanban board displaying single-column focus tabs |
| 28 | `28-profile-settings.png` | Desktop | Profile customization, display name, and avatar settings |
| 29 | `29-workspace-settings-admin.png` | Desktop | Admin settings with workspace name, URL slug, and danger zone |
| 30 | `30-create-task-modal.png` | Desktop | Modal dialog for creating new tasks with column selector |
| 31 | `31-board-command-center.png` | Desktop | Header metrics widget showing Overdue, Urgent, and Due Soon tallies |
| 32 | `32-mobile-dashboard.png` | Mobile (390×844) | Mobile-responsive dashboard layout with stacked metrics |

---

## 6. Video Walkthrough Artifacts

| Filename | Resolution | Codec / Container | Duration | Size | Primary Audience |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `teamhub-demo-cv.mp4` | 1920×1080 (1080p, 30fps CFR) | H.264 (`libx264`, `yuv420p`, `+faststart`) / MP4 | 50.77 sec | 4.17 MB | Comprehensive Portfolio Walkthrough, Technical Interviewers, Hiring Managers |
| `teamhub-demo-short.mp4` | 1920×1080 (1080p, 30fps CFR) | H.264 (`libx264`, `yuv420p`, `+faststart`) / MP4 | 30.00 sec | 2.31 MB | Snappy Social Post, LinkedIn Video, Quick Recruiter Review |

- **Local Source Path**: `c:\Users\shawk\Downloads\teamhub\artifacts\demo\video\`
- **Mirror Storage Path**: `C:\Users\shawk\.gemini\antigravity-ide\brain\0a5ee4b3-f205-4b4e-91b0-9f716525f6a1\demo\video\`
- **Public Cloud Stream**: [Google Drive 1080p Walkthrough](https://drive.google.com/file/d/1tnb8HRKixMHOOI1DhhWuxmOhsymKqDql/view?usp=sharing)
- **Visual QA Quality**: 100% Zero-Freeze, Continuous Cursor Momentum, No Stalls, SPA Fluid Navigation.

---

## 7. Verification & Code Quality Metrics

- **TypeScript Compilation**: `pnpm check-types` passed with **0 errors** across all monorepo packages (`@teamhub/api`, `@teamhub/web`, `@teamhub/shared`).
- **Production Build**: `pnpm build` completed successfully; Vite bundles and Express dist artifacts generated without warnings.
- **Database Migrations**: 7 Prisma migrations applied cleanly to isolated PostgreSQL instance on port 5435.
- **Offline Reliability**: Self-contained local execution with zero third-party cloud runtime blockers.
