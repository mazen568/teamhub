import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, UserStatus, WorkspaceRole, TaskPriority, ChannelType, NotificationType, MessageType } from '@prisma/client';
import bcrypt from 'bcrypt';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5435/teamhub';
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function seed() {
  console.log('🌱 Starting TeamHub Demo Seeding...');
  console.log('Connecting to:', connectionString);

  // Clean existing tables in reverse dependency order
  await prisma.attachment.deleteMany();
  await prisma.taskComment.deleteMany();
  await prisma.taskAssignee.deleteMany();
  await prisma.task.deleteMany();
  await prisma.boardColumn.deleteMany();
  await prisma.board.deleteMany();
  await prisma.document.deleteMany();
  await prisma.messageReaction.deleteMany();
  await prisma.messageMention.deleteMany();
  await prisma.message.deleteMany();
  await prisma.channelMember.deleteMany();
  await prisma.channel.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.invite.deleteMany();
  await prisma.workspaceMember.deleteMany();
  await prisma.workspace.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Cleaned existing database state.');

  const passwordHash = await bcrypt.hash('password123', 10);

  // 1. Users
  const sarah = await prisma.user.create({
    data: {
      email: 'sarah.chen@nexus.io',
      password_hash: passwordHash,
      display_name: 'Sarah Chen',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=b6e3f4',
      status: UserStatus.online,
    },
  });

  const shawky = await prisma.user.create({
    data: {
      email: 'e2etester@gmail.com', // Demo primary login matching README
      password_hash: passwordHash,
      display_name: 'Shawky Elsayed',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Shawky&backgroundColor=c0aede',
      status: UserStatus.online,
    },
  });

  const omar = await prisma.user.create({
    data: {
      email: 'omar.khalil@nexus.io',
      password_hash: passwordHash,
      display_name: 'Omar Khalil',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omar&backgroundColor=d1d4f9',
      status: UserStatus.online,
    },
  });

  const maya = await prisma.user.create({
    data: {
      email: 'maya.hassan@nexus.io',
      password_hash: passwordHash,
      display_name: 'Maya Hassan',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya&backgroundColor=ffd5dc',
      status: UserStatus.away,
    },
  });

  const daniel = await prisma.user.create({
    data: {
      email: 'daniel.kim@nexus.io',
      password_hash: passwordHash,
      display_name: 'Daniel Kim',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel&backgroundColor=ffdfbf',
      status: UserStatus.dnd,
    },
  });

  const lina = await prisma.user.create({
    data: {
      email: 'lina.ahmed@nexus.io',
      password_hash: passwordHash,
      display_name: 'Lina Ahmed',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lina&backgroundColor=c0eb75',
      status: UserStatus.online,
    },
  });

  const alex = await prisma.user.create({
    data: {
      email: 'alex.morgan@nexus.io',
      password_hash: passwordHash,
      display_name: 'Alex Morgan',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=fcc2d7',
      status: UserStatus.offline,
    },
  });

  console.log('✅ Created 7 team users.');

  // 2. Workspace
  const workspace = await prisma.workspace.create({
    data: {
      name: 'Nexus Product Team',
      slug: 'nexus-product-team',
      owner_id: sarah.id,
      plan: 'pro',
    },
  });

  // 3. Workspace Members
  await prisma.workspaceMember.createMany({
    data: [
      { workspace_id: workspace.id, user_id: sarah.id, role: WorkspaceRole.owner },
      { workspace_id: workspace.id, user_id: shawky.id, role: WorkspaceRole.admin },
      { workspace_id: workspace.id, user_id: omar.id, role: WorkspaceRole.member },
      { workspace_id: workspace.id, user_id: maya.id, role: WorkspaceRole.member },
      { workspace_id: workspace.id, user_id: daniel.id, role: WorkspaceRole.member },
      { workspace_id: workspace.id, user_id: lina.id, role: WorkspaceRole.member },
      { workspace_id: workspace.id, user_id: alex.id, role: WorkspaceRole.member },
    ],
  });

  console.log('✅ Workspace created and 7 members assigned with roles.');

  // 4. Hero Board: "Product Launch — Q4"
  const q4Board = await prisma.board.create({
    data: {
      workspaceId: workspace.id,
      name: 'Product Launch — Q4',
      description: 'Master Kanban board for Q4 core product deliverables, sprint velocity, and launch readiness.',
    },
  });

  const colBacklog = await prisma.boardColumn.create({
    data: { boardId: q4Board.id, name: 'Backlog', order: 0 },
  });
  const colPlanned = await prisma.boardColumn.create({
    data: { boardId: q4Board.id, name: 'Planned', order: 1 },
  });
  const colInProgress = await prisma.boardColumn.create({
    data: { boardId: q4Board.id, name: 'In Progress', order: 2 },
  });
  const colReview = await prisma.boardColumn.create({
    data: { boardId: q4Board.id, name: 'Review', order: 3 },
  });
  const colDone = await prisma.boardColumn.create({
    data: { boardId: q4Board.id, name: 'Done', order: 4 },
  });

  const now = new Date();
  const pastOverdue = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000); // 2 days ago (overdue)
  const tomorrow = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000);
  const inThreeDays = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  const inFiveDays = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
  const inTwoWeeks = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

  // Helper to create task with assignees & comments
  const makeTask = async (params: {
    columnId: string;
    title: string;
    description: string;
    priority: TaskPriority;
    order: number;
    dueDate?: Date;
    creatorId: string;
    assigneeIds: string[];
    comments?: Array<{ authorId: string; content: string }>;
  }) => {
    const task = await prisma.task.create({
      data: {
        boardId: q4Board.id,
        columnId: params.columnId,
        creatorId: params.creatorId,
        title: params.title,
        description: params.description,
        priority: params.priority,
        order: params.order,
        dueDate: params.dueDate,
      },
    });

    for (const userId of params.assigneeIds) {
      await prisma.taskAssignee.create({
        data: { taskId: task.id, userId },
      });
    }

    if (params.comments) {
      for (const c of params.comments) {
        await prisma.taskComment.create({
          data: { taskId: task.id, authorId: c.authorId, content: c.content },
        });
      }
    }

    return task;
  };

  // Backlog
  await makeTask({
    columnId: colBacklog.id,
    title: 'Configure deployment pipeline',
    description: 'Set up multi-stage Docker build pipeline in GitHub Actions with automated smoke testing.',
    priority: TaskPriority.medium,
    order: 0,
    dueDate: inTwoWeeks,
    creatorId: sarah.id,
    assigneeIds: [alex.id],
  });

  await makeTask({
    columnId: colBacklog.id,
    title: 'Improve workspace invitations',
    description: 'Add bulk email invitations and support custom invite expiration TTLs.',
    priority: TaskPriority.low,
    order: 1,
    dueDate: inTwoWeeks,
    creatorId: sarah.id,
    assigneeIds: [daniel.id],
  });

  await makeTask({
    columnId: colBacklog.id,
    title: 'Add notification preferences',
    description: 'Enable granular toggles for desktop alerts, mentions, and weekly digest summaries.',
    priority: TaskPriority.low,
    order: 2,
    dueDate: inTwoWeeks,
    creatorId: shawky.id,
    assigneeIds: [omar.id],
  });

  // Planned
  await makeTask({
    columnId: colPlanned.id,
    title: 'Add analytics dashboard',
    description: 'Build aggregated KPI widgets displaying active task velocity, completion throughput, and team distribution.',
    priority: TaskPriority.high,
    order: 0,
    dueDate: inFiveDays,
    creatorId: sarah.id,
    assigneeIds: [shawky.id, omar.id],
    comments: [
      { authorId: sarah.id, content: 'Let us make sure the KPI cards match the existing design tokens.' },
      { authorId: shawky.id, content: 'Already synced with Daniel on the metrics card design. Working on the aggregates endpoint.' },
    ],
  });

  await makeTask({
    columnId: colPlanned.id,
    title: 'Optimize document search',
    description: 'Tune pgvector cosine distance index and implement hybrid keyword + semantic retrieval.',
    priority: TaskPriority.medium,
    order: 1,
    dueDate: inFiveDays,
    creatorId: shawky.id,
    assigneeIds: [maya.id],
  });

  await makeTask({
    columnId: colPlanned.id,
    title: 'Regression test release candidate',
    description: 'Execute end-to-end regression suite covering authorization barriers, channel websockets, and board DnD.',
    priority: TaskPriority.high,
    order: 2,
    dueDate: inThreeDays,
    creatorId: sarah.id,
    assigneeIds: [lina.id],
  });

  // In Progress (Hero tasks!)
  const overdueHeroTask = await makeTask({
    columnId: colInProgress.id,
    title: 'Redesign onboarding flow',
    description: 'Streamline the initial workspace setup wizard, team invitations, and initial board creation steps.',
    priority: TaskPriority.urgent,
    order: 0,
    dueDate: pastOverdue, // OVERDUE for red highlight state
    creatorId: sarah.id,
    assigneeIds: [shawky.id, daniel.id],
    comments: [
      { authorId: daniel.id, content: 'Updated Figma screens with the simplified 3-step wizard.' },
      { authorId: shawky.id, content: 'Refactoring the step transitions now. Prioritizing this to clear the overdue flag.' },
      { authorId: sarah.id, content: 'Looks fantastic team, let us ship it today!' },
    ],
  });

  await makeTask({
    columnId: colInProgress.id,
    title: 'Implement OAuth session refresh',
    description: 'Integrate silent refresh token rotation to ensure zero disruption during active editing sessions.',
    priority: TaskPriority.high,
    order: 1,
    dueDate: tomorrow,
    creatorId: shawky.id,
    assigneeIds: [maya.id],
    comments: [
      { authorId: maya.id, content: 'Cookie-based refresh token rotation PR is ready for review.' },
    ],
  });

  await makeTask({
    columnId: colInProgress.id,
    title: 'Mobile navigation accessibility',
    description: 'Audit ARIA attributes and refine Focus Mode tab interaction on iOS Safari and Chrome Android.',
    priority: TaskPriority.urgent,
    order: 2,
    dueDate: tomorrow,
    creatorId: shawky.id,
    assigneeIds: [shawky.id],
    comments: [
      { authorId: lina.id, content: 'Tested on viewport 390x844 — column switcher tabs work smoothly!' },
    ],
  });

  // Review
  await makeTask({
    columnId: colReview.id,
    title: 'Complete billing webhooks',
    description: 'Handle subscription upgrades, payment failure alerts, and automated workspace tier provisioning.',
    priority: TaskPriority.high,
    order: 0,
    dueDate: inThreeDays,
    creatorId: sarah.id,
    assigneeIds: [maya.id],
  });

  await makeTask({
    columnId: colReview.id,
    title: 'Production performance audit',
    description: 'Run Lighthouse metrics and optimize Vite production vendor chunking for under 1.5s TTFB.',
    priority: TaskPriority.urgent,
    order: 1,
    dueDate: tomorrow,
    creatorId: shawky.id,
    assigneeIds: [alex.id, shawky.id],
  });

  // Done
  await makeTask({
    columnId: colDone.id,
    title: 'Prepare launch documentation',
    description: 'Draft release notes, user guides, and API integration references for team onboarding.',
    priority: TaskPriority.medium,
    order: 0,
    creatorId: sarah.id,
    assigneeIds: [sarah.id],
  });

  await makeTask({
    columnId: colDone.id,
    title: 'Setup WebSocket gateway',
    description: 'Establish Socket.io clustered gateway supporting dynamic channel rooms and board state events.',
    priority: TaskPriority.high,
    order: 1,
    creatorId: shawky.id,
    assigneeIds: [shawky.id],
  });

  await makeTask({
    columnId: colDone.id,
    title: 'Implement RBAC permission guards',
    description: 'Enforce role hierarchy (owner > admin > member) across member removals, channel moderation, and task mutations.',
    priority: TaskPriority.high,
    order: 2,
    creatorId: sarah.id,
    assigneeIds: [maya.id, shawky.id],
  });

  // Secondary Board: "Mobile App Redesign"
  const mobileBoard = await prisma.board.create({
    data: {
      workspaceId: workspace.id,
      name: 'Mobile App Redesign',
      description: 'Cross-platform mobile optimization initiative focusing on responsive touch gestures and offline caching.',
    },
  });

  const mobCol1 = await prisma.boardColumn.create({ data: { boardId: mobileBoard.id, name: 'Backlog', order: 0 } });
  const mobCol2 = await prisma.boardColumn.create({ data: { boardId: mobileBoard.id, name: 'In Dev', order: 1 } });
  const mobCol3 = await prisma.boardColumn.create({ data: { boardId: mobileBoard.id, name: 'Testing', order: 2 } });
  const mobCol4 = await prisma.boardColumn.create({ data: { boardId: mobileBoard.id, name: 'Released', order: 3 } });

  await prisma.task.create({
    data: {
      boardId: mobileBoard.id,
      columnId: mobCol2.id,
      creatorId: shawky.id,
      title: 'Haptic feedback on drag-and-drop',
      description: 'Add subtle device vibration on touch start and column drop.',
      priority: TaskPriority.medium,
      order: 0,
      dueDate: inFiveDays,
    },
  });

  console.log('✅ Created 2 rich boards with 15 realistic tasks, assignees, and comments.');

  // 5. Channels & Messages
  const chGeneral = await prisma.channel.create({
    data: { workspace_id: workspace.id, name: 'general', type: ChannelType.public, created_by_id: sarah.id },
  });
  const chProduct = await prisma.channel.create({
    data: { workspace_id: workspace.id, name: 'product', type: ChannelType.public, created_by_id: sarah.id },
  });
  const chEngineering = await prisma.channel.create({
    data: { workspace_id: workspace.id, name: 'engineering', type: ChannelType.public, created_by_id: shawky.id },
  });
  const chDesign = await prisma.channel.create({
    data: { workspace_id: workspace.id, name: 'design', type: ChannelType.public, created_by_id: daniel.id },
  });
  const chRelease = await prisma.channel.create({
    data: { workspace_id: workspace.id, name: 'release', type: ChannelType.public, created_by_id: alex.id },
  });

  // Direct Message Channel between Shawky and Sarah
  const chDM = await prisma.channel.create({
    data: { workspace_id: workspace.id, name: 'dm-shawky-sarah', type: ChannelType.dm, created_by_id: shawky.id },
  });

  // Join all members to channels
  const allUsers = [sarah, shawky, omar, maya, daniel, lina, alex];
  const allChannels = [chGeneral, chProduct, chEngineering, chDesign, chRelease];

  for (const ch of allChannels) {
    for (const u of allUsers) {
      await prisma.channelMember.create({
        data: { channel_id: ch.id, user_id: u.id },
      });
    }
  }

  await prisma.channelMember.createMany({
    data: [
      { channel_id: chDM.id, user_id: shawky.id },
      { channel_id: chDM.id, user_id: sarah.id },
    ],
  });

  // Populate realistic messages in #product
  const m1 = await prisma.message.create({
    data: {
      channelId: chProduct.id,
      senderId: sarah.id,
      content: 'Hey everyone! The Q4 Product Roadmap is published. Please review the Analytics Dashboard PRD.',
      messageType: MessageType.text,
    },
  });

  const m2 = await prisma.message.create({
    data: {
      channelId: chProduct.id,
      senderId: shawky.id,
      content: 'Reviewed the specs! The Work Management Kanban board now supports overdue indicators, multi-assignees, and deep linking via `?task=<id>`.',
      messageType: MessageType.text,
    },
  });

  const m3 = await prisma.message.create({
    data: {
      channelId: chProduct.id,
      senderId: daniel.id,
      content: 'The mobile Focus Mode looks stellar on small viewports. Eliminating horizontal scroll really elevated the UX.',
      messageType: MessageType.text,
    },
  });

  const m4 = await prisma.message.create({
    data: {
      channelId: chProduct.id,
      senderId: lina.id,
      content: 'Smoke tests on release candidate 1.4.0 passed with zero regressions. Ready for QA signoff! 🚀',
      messageType: MessageType.text,
    },
  });

  // Add reactions
  await prisma.messageReaction.createMany({
    data: [
      { messageId: m2.id, userId: sarah.id, emoji: '🔥' },
      { messageId: m2.id, userId: daniel.id, emoji: '👏' },
      { messageId: m4.id, userId: sarah.id, emoji: '🚀' },
      { messageId: m4.id, userId: shawky.id, emoji: '🎉' },
    ],
  });

  // Populate Direct Messages
  await prisma.message.create({
    data: {
      channelId: chDM.id,
      senderId: sarah.id,
      content: 'Hi Shawky, how is the Q4 board drag-and-drop feeling on mobile?',
      messageType: MessageType.text,
    },
  });
  await prisma.message.create({
    data: {
      channelId: chDM.id,
      senderId: shawky.id,
      content: 'It feels super fluid! The Focus Mode tabs allow users to isolate any column, and the sliding detail panel syncs directly with the browser URL.',
      messageType: MessageType.text,
    },
  });
  await prisma.message.create({
    data: {
      channelId: chDM.id,
      senderId: sarah.id,
      content: 'Awesome work. That makes our sprint reviews so much more efficient.',
      messageType: MessageType.text,
    },
  });

  console.log('✅ Channels, DMs, messages, and emoji reactions seeded.');

  // 6. Documents (TipTap Rich Text)
  const tipTapAnalyticsDoc = {
    type: 'doc',
    content: [
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [{ type: 'text', text: 'Product Requirements — Analytics Dashboard & Work Management' }],
      },
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: 'This specification details the end-to-end architecture and UI requirements for the ' },
          { type: 'text', marks: [{ type: 'bold' }], text: 'TeamHub Q4 Analytics & Kanban Board' },
          { type: 'text', text: ' initiative.' },
        ],
      },
      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: '1. Executive Summary & Goals' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Deliver a real-time, low-latency collaboration hub that empowers engineering and product teams to track high-velocity sprints without context switching. The primary objective is establishing visual hierarchy, seamless drag-and-drop state transitions, and responsive mobile Focus Mode.',
          },
        ],
      },
      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: '2. Core Functional Requirements' }],
      },
      {
        type: 'bulletList',
        content: [
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  { type: 'text', marks: [{ type: 'bold' }], text: 'Interactive Kanban Board: ' },
                  { type: 'text', text: 'Horizontal columns with dnd-kit drag-and-drop and statistics header widgets.' },
                ],
              },
            ],
          },
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  { type: 'text', marks: [{ type: 'bold' }], text: 'Deep Linking & URLs: ' },
                  { type: 'text', text: 'Seamless URL query parameter synchronization (?task=<uuid>) for task sharing.' },
                ],
              },
            ],
          },
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  { type: 'text', marks: [{ type: 'bold' }], text: 'Overdue Highlighting: ' },
                  { type: 'text', text: 'Automatic red warning badges on cards exceeding target delivery timestamps.' },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: '3. Technical Implementation & Data Types' }],
      },
      {
        type: 'codeBlock',
        attrs: { language: 'typescript' },
        content: [
          {
            type: 'text',
            text: 'export interface BoardColumnDTO {\n  id: string;\n  boardId: string;\n  name: string;\n  order: number;\n  tasks: TaskDTO[];\n}\n\nexport interface TaskDTO {\n  id: string;\n  columnId: string;\n  title: string;\n  priority: "low" | "medium" | "high" | "urgent";\n  dueDate: string | null;\n  assignees: UserSnippetDTO[];\n}',
          },
        ],
      },
      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: '4. Milestone Deliverables Checklist' }],
      },
      {
        type: 'taskList',
        content: [
          {
            type: 'taskItem',
            attrs: { checked: true },
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Implement Kanban Board horizontal columns layout' }] }],
          },
          {
            type: 'taskItem',
            attrs: { checked: true },
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Connect real-time socket event broadcasting for task movements' }] }],
          },
          {
            type: 'taskItem',
            attrs: { checked: true },
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Build mobile Focus Mode segmented tab switcher' }] }],
          },
          {
            type: 'taskItem',
            attrs: { checked: false },
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Finalize automated screenshot regression capture' }] }],
          },
        ],
      },
    ],
  };

  const docAnalytics = await prisma.document.create({
    data: {
      workspace_id: workspace.id,
      created_by_id: sarah.id,
      last_edited_by_id: shawky.id,
      title: 'Product Requirements — Analytics Dashboard',
      icon: '📊',
      content: tipTapAnalyticsDoc,
    },
  });

  await prisma.document.create({
    data: {
      workspace_id: workspace.id,
      created_by_id: sarah.id,
      title: 'Q4 Engineering Roadmap',
      icon: '🗺️',
      content: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: 'Q4 Engineering Roadmap' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'Quarterly strategic priorities: performance audits, WebSocket scaling, and enhanced task lifecycle automation.' }] },
        ],
      },
    },
  });

  await prisma.document.create({
    data: {
      workspace_id: workspace.id,
      created_by_id: lina.id,
      title: 'Release Checklist',
      icon: '✅',
      content: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: 'Release Candidate Checklist' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'Comprehensive pre-flight checklist covering migrations, secrets rotation, and smoke tests.' }] },
        ],
      },
    },
  });

  await prisma.document.create({
    data: {
      workspace_id: workspace.id,
      created_by_id: shawky.id,
      title: 'Architecture Notes — Work Management',
      icon: '⚡',
      content: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: 'Work Management Architecture Notes' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'Details of the dnd-kit integration, sliding panel URL state, and column portal rendering.' }] },
        ],
      },
    },
  });

  await prisma.document.create({
    data: {
      workspace_id: workspace.id,
      created_by_id: alex.id,
      title: 'Incident Response Playbook',
      icon: '🛡️',
      content: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: 'Incident Response Playbook' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'Operational guidelines for database failovers, WebSocket circuit breaking, and log triage.' }] },
        ],
      },
    },
  });

  console.log('✅ Created 5 rich TipTap documents with icons and structured content.');

  // 7. Notifications
  await prisma.notification.createMany({
    data: [
      {
        user_id: shawky.id,
        type: NotificationType.task_assigned,
        title: 'Task Assigned',
        body: 'Sarah Chen assigned you to "Redesign onboarding flow"',
        data: { taskId: overdueHeroTask.id },
      },
      {
        user_id: shawky.id,
        type: NotificationType.mention,
        title: 'Mention in #product',
        body: 'Sarah Chen mentioned you: "The Q4 Product Roadmap is published."',
        data: { channelId: chProduct.id },
      },
      {
        user_id: shawky.id,
        type: NotificationType.message,
        title: 'New Direct Message',
        body: 'Sarah Chen: "Awesome work. That makes our sprint reviews so much more efficient."',
        data: { channelId: chDM.id },
      },
    ],
  });

  console.log('✅ Seeded user notifications.');
  console.log('🎉 Demo dataset seeding complete! Ready for local execution.');
}

seed()
  .catch((err) => {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
