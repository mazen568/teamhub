# TeamHub

**Real-time workspace collaboration with Kanban project management, threaded messaging, rich documents, and AI-powered knowledge workflows.**

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/PostgreSQL-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/Docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</p>

<p align="center">
  <a href="https://drive.google.com/file/d/1tnb8HRKixMHOOI1DhhWuxmOhsymKqDql/view?usp=sharing">
    <img src="https://img.shields.io/badge/▶%20Featured%20Demo-Watch%20Video%20(51s)-E50914?style=for-the-badge&logo=googledrive&logoColor=white" alt="Watch Featured Demo on Google Drive" />
  </a>
  <a href="https://teamhub-one.vercel.app/login">
    <img src="https://img.shields.io/badge/🌐%20Live%20App-teamhub--one.vercel.app-2563EB?style=for-the-badge" alt="Live App" />
  </a>
</p>

<p align="center">
  <a href="https://drive.google.com/file/d/1tnb8HRKixMHOOI1DhhWuxmOhsymKqDql/view?usp=sharing"><strong>🎬 Featured Video Demo (51s)</strong></a> &nbsp;·&nbsp;
  <a href="https://teamhub-one.vercel.app/login"><strong>🌐 Live App</strong></a> &nbsp;·&nbsp;
  <a href="#-system-architecture"><strong>🏗 Architecture</strong></a> &nbsp;·&nbsp;
  <a href="#-my-contribution--work-management"><strong>🎯 My Contribution</strong></a>
</p>

---

## 🎬 Featured Product Demo

<p align="center">
  <a href="https://drive.google.com/file/d/1tnb8HRKixMHOOI1DhhWuxmOhsymKqDql/view?usp=sharing">
    <img src="docs/assets/readme/demo-video-poster.png" alt="TeamHub 51-Second Product Walkthrough Demo — Click to watch on Google Drive" width="100%" />
  </a>
  <br/>
  <strong><a href="https://drive.google.com/file/d/1tnb8HRKixMHOOI1DhhWuxmOhsymKqDql/view?usp=sharing">▶ Watch the 51-second Product Walkthrough on Google Drive (1080p HD) ↗</a></strong>
  &nbsp;·&nbsp;
  <a href="artifacts/demo/video/teamhub-demo-short.mp4"><strong>⚡ 30s Quick Cut (Local MP4)</strong></a>
</p>

```mermaid
timeline
    title 51-Second Product Walkthrough
    00‥00 : Executive Dashboard
    00‥06 : Boards Overview
    00‥12 : Kanban Drag-and-Drop
    00‥18 : Task Detail Drawer
    00‥28 : Priority Filters
    00‥34 : Real-Time Channels
    00‥40 : TipTap Documents
    00‥46 : Members and RBAC
    00‥50 : Closing Board View
```

TeamHub is a containerized monorepo platform for agile engineering teams. It combines drag-and-drop Kanban boards with sub-50ms optimistic updates, Socket.IO real-time synchronization, a TipTap collaborative document editor, and a RAG-powered AI pipeline using LangGraph agents and pgvector semantic search.

---

## ✨ Product Experience

<table>
  <tr>
    <td align="center" width="50%">
      <strong>Kanban Sprint Board</strong><br/>
      <a href="docs/assets/readme/kanban-board.png">
        <img src="docs/assets/readme/kanban-board.png" alt="Multi-column Kanban board with drag-and-drop task cards, priority badges, assignee avatars, and sprint metrics" width="100%" />
      </a>
      <sub>Drag-and-drop task management with priorities, assignees, due dates, overdue alerts, filters, and real-time sync.</sub>
    </td>
    <td align="center" width="50%">
      <strong>Task Detail Drawer</strong><br/>
      <a href="docs/assets/readme/task-detail.png">
        <img src="docs/assets/readme/task-detail.png" alt="Sliding task detail panel showing title, priority, assignees, comments thread, and deep-link URL sync" width="100%" />
      </a>
      <sub>Sliding panel with live comments, priority selectors, multi-assignee clusters, and URL deep linking (<code>?task=uuid</code>).</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <strong>Real-Time Channels</strong><br/>
      <a href="docs/assets/readme/channels.png">
        <img src="docs/assets/readme/channels.png" alt="Team messaging channel with threaded discussions, emoji reactions, and code block formatting" width="100%" />
      </a>
      <sub>Socket.IO messaging with emoji reactions, typing indicators, code blocks, and optimistic delivery.</sub>
    </td>
    <td align="center" width="50%">
      <strong>Document Editor</strong><br/>
      <a href="docs/assets/readme/documents.png">
        <img src="docs/assets/readme/documents.png" alt="TipTap rich-text document editor with headings, checklists, code blocks, and AI summary panel" width="100%" />
      </a>
      <sub>TipTap editor with headings, checklists, code blocks, debounced auto-save, and Markdown/PDF export.</sub>
    </td>
  </tr>
</table>

<p align="center">
  <img src="docs/assets/readme/teamhub-kanban-preview.gif" alt="Animated preview of Kanban board drag-and-drop interaction showing task card movement between columns" width="80%" />
  <br/>
  <sub>Animated preview — Kanban drag-and-drop with optimistic column updates</sub>
</p>

---

## 🧩 Core Capabilities

```mermaid
mindmap
  root((TeamHub))
    Work Management
      Kanban Boards
      Drag-and-Drop
      Task Priorities
      Due Dates & Overdue
      Assignees
      Comments & Discussion
      Filters & Search
      Deep-Link Drawers
      Mobile Focus Mode
    Collaboration
      Public & Private Channels
      Direct Messages
      Emoji Reactions
      Typing Indicators
      Optimistic UI
    Knowledge
      TipTap Rich Editor
      Debounced Auto-Save
      Markdown Export
      PDF Export
      Cover & Icon Picker
    AI Agents
      RAG Document Q&A
      Semantic Search
      Document Summaries
      Task Extraction
      Auto-Assignment
      SSE Streaming
    Administration
      RBAC Roles
      Workspace Management
      Member Directory
      Profile Settings
      Notifications
```

---

## 🏗 System Architecture

```mermaid
flowchart LR
  subgraph CLIENT["Client Layer"]
    WEB["React + Vite SPA"]
  end

  subgraph SERVICES["Application Services"]
    API["Express.js API Gateway"]
    SOCKET["Socket.IO Server"]
    AI["FastAPI AI Microservice"]
  end

  subgraph DATA["Data Layer"]
    DB[("PostgreSQL + Prisma")]
    VECTOR[("pgvector Embeddings")]
  end

  subgraph INTELLIGENCE["AI & Search"]
    GRAPH["LangGraph Agents"]
    RAG["RAG Pipeline"]
    LLM["Groq LLM (Llama-3)"]
    EMB["SentenceTransformers"]
  end

  WEB <-->|HTTP + REST| API
  WEB <-->|WebSocket| SOCKET
  WEB -->|SSE Stream| AI
  API --> DB
  API <-->|X-Service-Token| AI
  AI --> VECTOR
  AI --> GRAPH
  GRAPH --> RAG
  RAG --> EMB
  RAG --> VECTOR
  RAG --> LLM
```

---

## 🔄 Real-Time Task Synchronization

How a task drag-and-drop propagates across concurrent sessions:

```mermaid
sequenceDiagram
    actor User as User
    participant UI as React Client
    participant API as Express API
    participant DB as PostgreSQL
    participant WS as Socket.IO
    participant Peer as Team Member

    User->>UI: Drag task to new column
    UI->>UI: Optimistic DOM update
    UI->>API: PATCH /tasks/:id (column, order)
    API->>DB: UPDATE task SET columnId, order
    DB-->>API: Updated task
    API-->>UI: 200 OK (confirmed)
    API->>WS: Emit TASK_MOVED event
    WS-->>Peer: Broadcast board update
    Peer->>Peer: Reconcile board state
```

---

## 🎯 My Contribution — Work Management

**Shawky Elsayed** — Feature Architect 

I designed and implemented the complete Work Management system: the interactive Kanban board, task lifecycle engine, real-time synchronization, filtering system, and responsive mobile architecture.

### Component Architecture

```mermaid
flowchart TB
    BP["BoardPage"]
    BP --> Header["BoardCommandCenter<br/><sub>Overdue · Urgent · Due Soon metrics</sub>"]
    BP --> Filters["BoardFilters<br/><sub>Priority · Assignee · Date · Search</sub>"]
    BP --> DND["BoardDragDropProvider<br/><sub>@dnd-kit/core + sortable</sub>"]
    DND --> Columns["BoardColumn × 5<br/><sub>Backlog · Planned · In Progress · Review · Done</sub>"]
    Columns --> Cards["TaskCard<br/><sub>Priority badge · Avatars · Due date</sub>"]
    Cards --> Drawer["TaskDetailPanel<br/><sub>Sliding drawer · URL sync</sub>"]
    Drawer --> Comments["TaskComments<br/><sub>Threaded discussion</sub>"]
    Drawer --> Meta["Priority · Due Date · Assignees"]
    Drawer --> URL["Deep Link<br/><sub>?task=uuid</sub>"]
    DND --> Optimistic["Optimistic Updates<br/><sub>Instant DOM → async API</sub>"]
    Optimistic --> APISync["Task API"]
    APISync --> Socket["Socket.IO<br/><sub>TASK_MOVED · TASK_UPDATED</sub>"]
    Socket --> BP
```

### Engineering Highlights

| Decision | Implementation | Impact |
| :--- | :--- | :--- |
| **Optimistic drag-and-drop** | `@dnd-kit/core` + `@dnd-kit/sortable` with TanStack Query cache mutation | Sub-50ms visual feedback; API sync runs asynchronously |
| **Deep-linked task drawer** | URL query parameter sync via React Router (`?task=uuid`) | Direct shareable links to specific task discussions |
| **Overdue state machine** | Client-side date arithmetic comparing `dueDate` against UTC clock | Automatic red badges on delayed tasks without manual toggles |
| **Mobile Focus Mode** | Single-column tabbed layout replacing horizontal scroll on ≤640px | Usable board experience on 390×844 mobile viewports |
| **Drag locks on filter** | Disabled `DndContext` sensors when `activeFilters.length > 0` | Prevents index corruption from reordering filtered subsets |
| **Real-time sync** | Socket.IO listeners (`TASK_MOVED`, `TASK_UPDATED`, `TASK_COMMENT_ADDED`) | Concurrent teammates see board changes instantly |

<p align="center">
  <img src="docs/assets/readme/board-filters.png" alt="Board filter bar isolating urgent-priority tasks with real-time result count" width="48%" />
  <img src="docs/assets/readme/overdue-state.png" alt="Board showing red overdue badges on delayed tasks with deadline warnings" width="48%" />
</p>

> 📄 Full technical documentation: [Work Management Docs](docs/Shawky%20Ahmad%20Shawky/)

---

## 🤖 AI & RAG Pipeline

```mermaid
flowchart LR
    DOC["Workspace<br/>Document"] --> CHUNK["Text<br/>Chunking"]
    CHUNK --> EMB["MiniLM-L6-v2<br/>Embeddings"]
    EMB --> VDB[("pgvector<br/>Store")]

    QUERY["User<br/>Question"] --> SEMB["Query<br/>Embedding"]
    SEMB --> RET["Cosine<br/>Similarity"]
    VDB --> RET
    RET --> CTX["Retrieved<br/>Context"]

    CTX --> PROMPT["System Prompt<br/>+ Context + Question"]
    QUERY --> PROMPT
    PROMPT --> LLM["Groq<br/>Llama-3"]
    LLM --> SSE["SSE Token<br/>Stream"]
    SSE --> UI["React<br/>Client"]
```

The AI microservice (FastAPI + LangGraph) provides:
- **Document Q&A**: Semantic retrieval over pgvector embeddings → Llama-3 grounded answer via SSE streaming
- **Summaries**: Short/Medium/Long document summaries generated from extracted text
- **Task extraction agent**: LangGraph workflow that parses document content into structured task drafts with human-in-the-loop clarification via `interrupt()`
- **Auto-assignment agent**: Calculates member workload points (Low: 1pt → Urgent: 5pts) and proposes balanced task distribution

---

## 🗄 Data Model

```mermaid
erDiagram
    USER ||--o{ WORKSPACE_MEMBER : joins
    WORKSPACE ||--o{ WORKSPACE_MEMBER : has
    WORKSPACE ||--o{ BOARD : contains
    WORKSPACE ||--o{ CHANNEL : contains
    WORKSPACE ||--o{ DOCUMENT : contains

    BOARD ||--o{ BOARD_COLUMN : has
    BOARD_COLUMN ||--o{ TASK : contains
    TASK ||--o{ TASK_ASSIGNEE : assigned
    TASK ||--o{ TASK_COMMENT : discussed

    CHANNEL ||--o{ MESSAGE : contains
    MESSAGE ||--o{ REACTION : receives

    WORKSPACE ||--o{ AI_EMBEDDING : vectorizes

    USER {
        uuid id PK
        string email UK
        string display_name
    }
    WORKSPACE {
        uuid id PK
        string name
        string slug UK
    }
    BOARD {
        uuid id PK
        string name
    }
    TASK {
        uuid id PK
        string title
        enum priority
        datetime dueDate
    }
    CHANNEL {
        uuid id PK
        string name
        enum type
    }
    DOCUMENT {
        uuid id PK
        string title
        json content
    }
    AI_EMBEDDING {
        uuid id PK
        text chunk_text
        vector embedding
    }
```

---

## 🛠 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite 5, TypeScript, Tailwind CSS, TanStack Query v5, Zustand, TipTap, Lucide Icons |
| **Backend** | Node.js, Express.js, Prisma ORM v7, TypeScript |
| **Real-time** | Socket.IO v4 (namespaced rooms, typed events) |
| **AI & Search** | FastAPI (Python 3.11), LangGraph, LangChain, Groq Cloud API (Llama-3) |
| **Embeddings** | HuggingFace SentenceTransformers (`all-MiniLM-L6-v2`), PostgreSQL `pgvector` |
| **Database** | PostgreSQL 16, `pgvector` extension |
| **Infrastructure** | Docker Compose, Nginx, Turborepo monorepo |

---

## 📸 Product Gallery

<table>
  <tr>
    <td align="center"><strong>Executive Dashboard</strong><br/><img src="docs/assets/readme/dashboard.png" alt="Sprint dashboard with velocity metrics, team capacity bar, and activity feed" width="360"/></td>
    <td align="center"><strong>Kanban Board</strong><br/><img src="docs/assets/readme/kanban-board.png" alt="Five-column Kanban board with prioritized task cards" width="360"/></td>
  </tr>
  <tr>
    <td align="center"><strong>Task Detail & Comments</strong><br/><img src="docs/assets/readme/task-detail.png" alt="Sliding task detail panel with comment thread and metadata" width="360"/></td>
    <td align="center"><strong>Real-Time Channels</strong><br/><img src="docs/assets/readme/channels.png" alt="Team channel with threaded messages and emoji reactions" width="360"/></td>
  </tr>
  <tr>
    <td align="center"><strong>Document Editor & AI</strong><br/><img src="docs/assets/readme/document-ai.png" alt="TipTap document editor with AI summary sidebar streaming tokens" width="360"/></td>
    <td align="center"><strong>Members & RBAC</strong><br/><img src="docs/assets/readme/members.png" alt="Team member directory with online status badges and role management" width="360"/></td>
  </tr>
  <tr>
    <td align="center"><strong>Board Filters</strong><br/><img src="docs/assets/readme/board-filters.png" alt="Filter bar isolating tasks by priority with live result counts" width="360"/></td>
    <td align="center"><strong>Mobile Focus Mode</strong><br/><img src="docs/assets/readme/mobile-focus.png" alt="Mobile single-column tabbed board navigation on 390x844 viewport" width="180"/></td>
  </tr>
</table>

---

## 🚀 Getting Started

<details>
<summary><strong>🐳 Docker (Recommended — no setup required)</strong></summary>

```bash
git clone https://github.com/mazen568/teamhub.git
cd teamhub
docker compose up
```

| Service | URL |
| :--- | :--- |
| Frontend | http://localhost:5173 |
| API Gateway | http://localhost:3000 |
| AI Service | http://localhost:8000 |

**Default login**: `e2etester@gmail.com` / `password123`

</details>

<details>
<summary><strong>🏃 Local Development (Node.js + Python)</strong></summary>

**Prerequisites**: Node.js 18+, pnpm 9+, Python 3.11+, PostgreSQL with `pgvector`

```bash
# Install dependencies
pnpm install

# Configure environment
cp .env.example .env
cp apps/api/.env.example apps/api/.env
cp apps/ai/.env.example apps/ai/.env

# Setup Python AI service
cd apps/ai && python -m venv .venv && .venv/Scripts/Activate.ps1 && pip install -e ".[dev]" && cd ../..

# Run migrations
pnpm prisma:migrate
cd apps/ai && alembic upgrade head && cd ../..

# Start all services
pnpm dev
```

| Service | URL |
| :--- | :--- |
| Frontend | http://localhost:5173 |
| API Gateway | http://localhost:3000 |
| AI Docs | http://localhost:8000/docs |

</details>

---

## 👥 Team & Credits

| Member | Area | Key Contributions |
| :--- | :--- | :--- |
| **Mazen Raafat** | Auth & Workspace | JWT auth with httpOnly refresh rotation, workspace CRUD, Zod validation schemas |
| **Hassan Muhammad** | Members & Channels | Member directory with RBAC, channel management, DM transactions, search integration |
| **Moamen Soltan** | Real-Time Chat | WebSocket message delivery, cursor-based pagination, typing indicators, chat bubble alignment |
| **Shawky Elsayed** | **Work Management** | **Kanban board, drag-and-drop, task lifecycle, deep-linked drawer, filters, overdue states, mobile Focus Mode, real-time board sync** |
| **Hassan Abdelhamed** | Documents, AI & Assets | TipTap editor, Markdown/PDF export, Cloudinary uploads, notifications, RAG engine, LangGraph agents |

---

## 📚 Documentation

| Document | Description |
| :--- | :--- |
| [Featured Demo Video](https://drive.google.com/file/d/1tnb8HRKixMHOOI1DhhWuxmOhsymKqDql/view?usp=sharing) | Full 51-second 1080p HD product walkthrough stream on Google Drive |
| [Work Management — Technical Docs](docs/Shawky%20Ahmad%20Shawky/) | Feature documentation, API flows, UI/UX decisions, validation & QA |
| [Demo Manifest](artifacts/demo/manifests/DEMO_MANIFEST.md) | Complete demo environment specification, test accounts, entity registry |
| [Hero Screenshots Breakdown](artifacts/demo/manifests/HERO_SCREENSHOTS.md) | Technical analysis of each captured view |
