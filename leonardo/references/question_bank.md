# Question Bank

Comprehensive library of questions organized by phase for building project specifications.
This covers ALL 14 feature categories from the spec template.

**CRITICAL**: NO section may be skipped. ALL elements must be comprehensively completed.

---

## Automation Mode (ALWAYS ASK FIRST)

```yaml
- question: "How would you like to build this specification?"
  header: "Build Mode"
  multiSelect: false
  options:
    - label: "Full Automation with Commentary (Recommended)"
      description: "Claude fills ALL answers using provided info + web research, with explanations"
    - label: "Guided with Claude Determines Option"
      description: "Each question includes 'Claude Determines' choice for AI-assisted decisions"
    - label: "Fully Manual"
      description: "You answer every question yourself"
```

### Mode Behavior

**Full Automation**: Skip all questions. Claude uses:
- User's initial description
- Reference app analysis (if provided)
- WebSearch for current best practices
- Anthropic's harness recommendations
Then generates complete specification with commentary.

**Guided with Claude Determines**: For EVERY question below, add this option:
```yaml
- label: "Claude Determines (Research-Based)"
  description: "Claude will use web search to determine the best current approach"
```

When selected, Claude will:
1. Use WebSearch to research current best practices
2. Search patterns: "[topic] best practices 2025", "[option A] vs [option B]"
3. Cite sources and explain reasoning
4. Select based on: recency, authority, consensus, compatibility

**Fully Manual**: Ask all questions as written below.

---

## Phase 1: Project Foundation

### Project Identity

```yaml
- question: "What type of project are you building?"
  header: "Project Type"
  multiSelect: false
  options:
    - label: "Web Application"
      description: "Full-stack web app with frontend and backend"
    - label: "CLI Tool"
      description: "Command-line interface application"
    - label: "API Service"
      description: "Backend API or microservice"
    - label: "Library/SDK"
      description: "Reusable code package for other developers"
```

```yaml
- question: "What is the scale and complexity of this project?"
  header: "Scope"
  multiSelect: false
  options:
    - label: "MVP/Prototype"
      description: "Minimal viable product for validation"
    - label: "Production App"
      description: "Full-featured production-ready application"
    - label: "Enterprise System"
      description: "Large-scale system with complex requirements"
```

```yaml
- question: "Is there an existing application this should clone or be inspired by?"
  header: "Reference"
  multiSelect: false
  options:
    - label: "Yes, clone existing app"
      description: "Replicate an existing application's features"
    - label: "Yes, inspired by"
      description: "Take inspiration but with modifications"
    - label: "No, original design"
      description: "Building something new from scratch"
```

### Project Description (Free-form questions)
- "In one sentence, what does this application do?"
- "Who is the primary user of this application?"
- "What problem does this solve for users?"
- "What makes this different from existing solutions?"
- "If cloning an app, which app and what URL?"

---

## Phase 2: Technology Stack

### Frontend (Web Applications)

```yaml
- question: "Which frontend framework should be used?"
  header: "Framework"
  multiSelect: false
  options:
    - label: "React with Vite (Recommended)"
      description: "Popular, fast builds, large ecosystem"
    - label: "Vue 3"
      description: "Progressive framework, gentle learning curve"
    - label: "Svelte/SvelteKit"
      description: "Compile-time framework, smaller bundles"
    - label: "Next.js"
      description: "React with SSR/SSG, file-based routing"
```

```yaml
- question: "What styling approach do you prefer?"
  header: "Styling"
  multiSelect: false
  options:
    - label: "Tailwind CSS via CDN (Recommended)"
      description: "Utility-first, rapid development, no build step"
    - label: "Tailwind CSS installed"
      description: "Utility-first with full build integration"
    - label: "CSS Modules"
      description: "Scoped CSS, traditional approach"
    - label: "styled-components"
      description: "CSS-in-JS, component-scoped"
```

```yaml
- question: "How should application state be managed?"
  header: "State"
  multiSelect: false
  options:
    - label: "React hooks + Context (Recommended)"
      description: "Built-in, sufficient for most apps"
    - label: "Redux/Redux Toolkit"
      description: "Predictable state, time-travel debugging"
    - label: "Zustand"
      description: "Lightweight, minimal boilerplate"
    - label: "Jotai/Recoil"
      description: "Atomic state management"
```

```yaml
- question: "What routing library should be used?"
  header: "Routing"
  multiSelect: false
  options:
    - label: "React Router (Recommended)"
      description: "Standard for React applications"
    - label: "TanStack Router"
      description: "Type-safe, modern router"
    - label: "Wouter"
      description: "Minimal, hook-based router"
    - label: "None needed"
      description: "Single page, no routing required"
```

```yaml
- question: "Does the app need markdown rendering?"
  header: "Markdown"
  multiSelect: false
  options:
    - label: "React Markdown (Recommended)"
      description: "Full markdown support with plugins"
    - label: "marked"
      description: "Fast, lightweight parser"
    - label: "MDX"
      description: "Markdown with JSX components"
    - label: "Not needed"
      description: "No markdown content"
```

```yaml
- question: "Does the app need code syntax highlighting?"
  header: "Code Highlighting"
  multiSelect: false
  options:
    - label: "Yes, with copy button"
      description: "Syntax highlighting plus copy functionality"
    - label: "Yes, basic highlighting"
      description: "Syntax highlighting only"
    - label: "Not needed"
      description: "No code blocks to display"
```

### Backend

```yaml
- question: "Which backend runtime/framework?"
  header: "Backend"
  multiSelect: false
  options:
    - label: "Node.js with Express (Recommended)"
      description: "JavaScript/TypeScript, large ecosystem"
    - label: "Python with FastAPI"
      description: "Modern Python, automatic OpenAPI"
    - label: "Go with Gin/Echo"
      description: "High performance, simple deployment"
    - label: "Rust with Actix/Axum"
      description: "Maximum performance, memory safety"
```

```yaml
- question: "Which database should be used?"
  header: "Database"
  multiSelect: false
  options:
    - label: "SQLite with better-sqlite3 (Recommended)"
      description: "Zero config, file-based, easy setup"
    - label: "PostgreSQL"
      description: "Full-featured relational, production-ready"
    - label: "MongoDB"
      description: "Document database, flexible schemas"
    - label: "MySQL/MariaDB"
      description: "Widely supported relational database"
```

```yaml
- question: "What API style should be used?"
  header: "API Style"
  multiSelect: false
  options:
    - label: "RESTful endpoints (Recommended)"
      description: "Standard HTTP methods, resource-based"
    - label: "GraphQL"
      description: "Flexible queries, single endpoint"
    - label: "tRPC"
      description: "End-to-end typesafe, TypeScript only"
    - label: "gRPC"
      description: "High performance, protocol buffers"
```

```yaml
- question: "Does the app need real-time streaming?"
  header: "Streaming"
  multiSelect: false
  options:
    - label: "Server-Sent Events (SSE)"
      description: "Server-to-client streaming responses"
    - label: "WebSockets"
      description: "Bidirectional real-time communication"
    - label: "Both SSE and WebSockets"
      description: "Multiple real-time channels"
    - label: "Not needed"
      description: "Standard request/response only"
```

```yaml
- question: "Does the app integrate with external APIs?"
  header: "External API"
  multiSelect: false
  options:
    - label: "Claude API (Anthropic SDK)"
      description: "AI chat completions via Anthropic"
    - label: "OpenAI API"
      description: "GPT models via OpenAI"
    - label: "Other external API"
      description: "Custom third-party integration"
    - label: "No external APIs"
      description: "Self-contained backend only"
```

### CLI Tools

```yaml
- question: "Which language for the CLI tool?"
  header: "Language"
  multiSelect: false
  options:
    - label: "Python (Recommended)"
      description: "Rich ecosystem, easy to write"
    - label: "Node.js/TypeScript"
      description: "JavaScript ecosystem, npm distribution"
    - label: "Rust"
      description: "Fast, single binary distribution"
    - label: "Go"
      description: "Simple, fast, single binary"
```

```yaml
- question: "How should CLI arguments be handled?"
  header: "Arguments"
  multiSelect: false
  options:
    - label: "Click (Python)"
      description: "Declarative, well-documented"
    - label: "Typer (Python)"
      description: "Modern, type hints based"
    - label: "Commander (Node)"
      description: "Standard Node.js CLI library"
    - label: "Clap (Rust)"
      description: "Powerful Rust argument parser"
```

---

## Phase 3: Core Features (All 14 Categories)

### Category 1: Chat Interface / Main Interaction

```yaml
- question: "What chat/interaction features are needed?"
  header: "Chat Interface"
  multiSelect: true
  options:
    - label: "Message bubbles layout"
      description: "Clean, centered chat with user/assistant messages"
    - label: "Streaming responses"
      description: "Real-time word-by-word message display"
    - label: "Markdown rendering"
      description: "Rich text formatting in messages"
    - label: "Code blocks with highlighting"
      description: "Syntax-highlighted code with copy button"
```

```yaml
- question: "What additional chat features?"
  header: "Chat Extended"
  multiSelect: true
  options:
    - label: "LaTeX/math rendering"
      description: "Mathematical equation display"
    - label: "Image upload in messages"
      description: "Attach and display images"
    - label: "Message editing"
      description: "Edit sent messages"
    - label: "Message regeneration"
      description: "Re-generate assistant responses"
```

```yaml
- question: "What input features are needed?"
  header: "Input Area"
  multiSelect: true
  options:
    - label: "Auto-resize textarea"
      description: "Input grows with content"
    - label: "Character/token count"
      description: "Show input length estimation"
    - label: "Stop generation button"
      description: "Cancel in-progress responses"
    - label: "Keyboard shortcuts"
      description: "Enter to send, Shift+Enter for newline"
```

### Category 2: Artifacts / Output Panel

```yaml
- question: "Does the app need an artifacts/preview panel?"
  header: "Artifacts"
  multiSelect: false
  options:
    - label: "Yes, full artifact system"
      description: "Code preview, HTML render, versioning"
    - label: "Yes, basic preview"
      description: "Simple code/content display"
    - label: "Not needed"
      description: "No secondary output panel"
```

```yaml
- question: "What artifact types should be supported?"
  header: "Artifact Types"
  multiSelect: true
  options:
    - label: "Code with syntax highlighting"
      description: "Display code artifacts"
    - label: "HTML/SVG live preview"
      description: "Render HTML and SVG content"
    - label: "React component preview"
      description: "Live React component rendering"
    - label: "Mermaid diagrams"
      description: "Flowcharts and diagrams"
```

```yaml
- question: "What artifact features are needed?"
  header: "Artifact Features"
  multiSelect: true
  options:
    - label: "Artifact editing"
      description: "Edit artifact content inline"
    - label: "Re-prompting"
      description: "Iterate on artifacts with Claude"
    - label: "Full-screen view"
      description: "Expand artifact to full screen"
    - label: "Download content"
      description: "Save artifacts locally"
    - label: "Version history"
      description: "Track artifact versions"
```

### Category 3: Conversation/Item Management

```yaml
- question: "What conversation management features?"
  header: "Conversations"
  multiSelect: true
  options:
    - label: "Create new conversations"
      description: "Start fresh chat sessions"
    - label: "Conversation list in sidebar"
      description: "Browse all conversations"
    - label: "Rename conversations"
      description: "Edit conversation titles"
    - label: "Delete conversations"
      description: "Remove unwanted chats"
```

```yaml
- question: "What additional conversation features?"
  header: "Conv Extended"
  multiSelect: true
  options:
    - label: "Search by title/content"
      description: "Find conversations quickly"
    - label: "Pin important conversations"
      description: "Keep favorites at top"
    - label: "Archive conversations"
      description: "Hide without deleting"
    - label: "Folder organization"
      description: "Group into folders"
```

```yaml
- question: "What export/import features?"
  header: "Export"
  multiSelect: true
  options:
    - label: "Export to JSON"
      description: "Machine-readable format"
    - label: "Export to Markdown"
      description: "Human-readable format"
    - label: "Export to PDF"
      description: "Printable document"
    - label: "Duplicate conversation"
      description: "Clone existing chats"
```

```yaml
- question: "What metadata to track?"
  header: "Metadata"
  multiSelect: true
  options:
    - label: "Timestamps"
      description: "Created and updated times"
    - label: "Unread indicators"
      description: "Show new messages"
    - label: "Message count"
      description: "Number of messages"
    - label: "Token usage"
      description: "API token consumption"
```

### Category 4: Projects / Workspaces

```yaml
- question: "Does the app need project/workspace organization?"
  header: "Projects"
  multiSelect: false
  options:
    - label: "Yes, full project system"
      description: "Projects with settings and knowledge base"
    - label: "Yes, simple grouping"
      description: "Basic conversation grouping"
    - label: "Not needed"
      description: "No project organization"
```

```yaml
- question: "What project features are needed?"
  header: "Project Features"
  multiSelect: true
  options:
    - label: "Create/edit projects"
      description: "CRUD for projects"
    - label: "Project knowledge base"
      description: "Upload documents to project"
    - label: "Project custom instructions"
      description: "Per-project system prompts"
    - label: "Move conversations between projects"
      description: "Reorganize chats"
```

```yaml
- question: "What advanced project features?"
  header: "Project Advanced"
  multiSelect: true
  options:
    - label: "Project templates"
      description: "Reusable project configurations"
    - label: "Project analytics"
      description: "Usage stats per project"
    - label: "Share projects (mock)"
      description: "Team sharing UI"
    - label: "Project settings panel"
      description: "Configure project options"
```

### Category 5: Model / Service Selection

```yaml
- question: "Does the app need model selection?"
  header: "Model Selection"
  multiSelect: false
  options:
    - label: "Yes, with full details"
      description: "Selector with capabilities and pricing"
    - label: "Yes, simple dropdown"
      description: "Basic model picker"
    - label: "Single model only"
      description: "No model selection needed"
```

```yaml
- question: "What model selector features?"
  header: "Model Features"
  multiSelect: true
  options:
    - label: "Model capabilities display"
      description: "Show what each model can do"
    - label: "Context window indicator"
      description: "Display token limits"
    - label: "Pricing info"
      description: "Show cost per token"
    - label: "Switch mid-conversation"
      description: "Change model during chat"
    - label: "Model comparison view"
      description: "Side-by-side model details"
```

### Category 6: Custom Instructions / System Prompts

```yaml
- question: "Does the app need custom instructions?"
  header: "Instructions"
  multiSelect: false
  options:
    - label: "Yes, multi-level"
      description: "Global, project, and conversation level"
    - label: "Yes, global only"
      description: "Single global instruction set"
    - label: "Not needed"
      description: "No custom instructions"
```

```yaml
- question: "What custom instruction features?"
  header: "Instruction Features"
  multiSelect: true
  options:
    - label: "Global custom instructions"
      description: "Apply to all conversations"
    - label: "Project-specific instructions"
      description: "Per-project system prompts"
    - label: "Conversation-specific prompts"
      description: "Override per conversation"
    - label: "Instruction templates"
      description: "Reusable instruction presets"
    - label: "Preview effect"
      description: "See how instructions affect output"
```

### Category 7: Settings and Preferences

```yaml
- question: "What settings/preferences are needed?"
  header: "Settings"
  multiSelect: true
  options:
    - label: "Theme selection"
      description: "Light, Dark, Auto modes"
    - label: "Font size adjustment"
      description: "Text size preferences"
    - label: "Message density"
      description: "Compact, comfortable, spacious"
    - label: "Code theme selection"
      description: "Syntax highlighting theme"
```

```yaml
- question: "What additional settings?"
  header: "Settings Extended"
  multiSelect: true
  options:
    - label: "Language preferences"
      description: "UI language selection"
    - label: "Accessibility options"
      description: "A11y customizations"
    - label: "Keyboard shortcuts reference"
      description: "Show available shortcuts"
    - label: "Data export options"
      description: "Export user data"
    - label: "Privacy settings"
      description: "Data handling preferences"
    - label: "API key management"
      description: "Manage API credentials"
```

### Category 8: Advanced / Power User Features

```yaml
- question: "What advanced/power user features?"
  header: "Advanced"
  multiSelect: true
  options:
    - label: "Temperature control"
      description: "Adjust response randomness"
    - label: "Max tokens adjustment"
      description: "Control response length"
    - label: "Top-p control"
      description: "Nucleus sampling parameter"
    - label: "System prompt override"
      description: "Direct system prompt access"
```

```yaml
- question: "What additional advanced features?"
  header: "Advanced Extended"
  multiSelect: true
  options:
    - label: "Thinking/reasoning mode"
      description: "Toggle extended thinking"
    - label: "Multi-modal input"
      description: "Text plus images"
    - label: "Voice input (mock)"
      description: "Speech-to-text UI"
    - label: "Response suggestions"
      description: "Suggested follow-ups"
    - label: "Conversation branching"
      description: "Fork conversation paths"
```

### Category 9: Collaboration / Sharing

```yaml
- question: "What sharing/collaboration features?"
  header: "Sharing"
  multiSelect: true
  options:
    - label: "Share via link"
      description: "Read-only share URLs"
    - label: "Export formats"
      description: "Multiple export options"
    - label: "Conversation templates"
      description: "Shareable chat templates"
    - label: "Prompt library"
      description: "Reusable prompt collection"
```

```yaml
- question: "What additional collaboration?"
  header: "Collaboration"
  multiSelect: true
  options:
    - label: "Share artifacts"
      description: "Share generated content"
    - label: "Team workspaces (mock)"
      description: "Multi-user workspace UI"
    - label: "Public share view"
      description: "Anonymous viewing"
    - label: "Share expiration"
      description: "Time-limited shares"
```

### Category 10: Search and Discovery

```yaml
- question: "What search/discovery features?"
  header: "Search"
  multiSelect: true
  options:
    - label: "Search all conversations"
      description: "Full-text conversation search"
    - label: "Filter by project"
      description: "Project-based filtering"
    - label: "Filter by date"
      description: "Time-based filtering"
    - label: "Filter by model"
      description: "Model-based filtering"
```

```yaml
- question: "What additional discovery features?"
  header: "Discovery"
  multiSelect: true
  options:
    - label: "Prompt library with categories"
      description: "Organized prompt collection"
    - label: "Example conversations"
      description: "Sample chats to explore"
    - label: "Quick actions menu"
      description: "Common actions dropdown"
    - label: "Command palette (Cmd+K)"
      description: "Keyboard-driven navigation"
```

### Category 11: Usage Tracking / Analytics

```yaml
- question: "What usage tracking features?"
  header: "Usage"
  multiSelect: true
  options:
    - label: "Token usage per message"
      description: "Show tokens consumed"
    - label: "Cost estimation"
      description: "Estimated API costs"
    - label: "Daily usage dashboard"
      description: "Daily consumption view"
    - label: "Monthly usage dashboard"
      description: "Monthly summary"
```

```yaml
- question: "What additional tracking?"
  header: "Tracking Extended"
  multiSelect: true
  options:
    - label: "Usage limits/warnings"
      description: "Alert on high usage"
    - label: "API quota tracking"
      description: "Monitor API limits"
    - label: "Per-model breakdown"
      description: "Usage by model type"
    - label: "Export usage data"
      description: "Download analytics"
```

### Category 12: Onboarding / Help

```yaml
- question: "What onboarding/help features?"
  header: "Onboarding"
  multiSelect: true
  options:
    - label: "Welcome screen"
      description: "First-time user greeting"
    - label: "Feature tour"
      description: "Guided feature highlights"
    - label: "Example prompts"
      description: "Getting started suggestions"
    - label: "Quick tips"
      description: "Best practices hints"
    - label: "Keyboard shortcuts tutorial"
      description: "Learn shortcuts interactively"
```

### Category 13: Accessibility

```yaml
- question: "What accessibility features?"
  header: "Accessibility"
  multiSelect: true
  options:
    - label: "Full keyboard navigation"
      description: "Use entire app via keyboard"
    - label: "Screen reader support"
      description: "Works with assistive tech"
    - label: "ARIA labels and roles"
      description: "Proper semantic markup"
    - label: "High contrast mode"
      description: "Enhanced visibility option"
```

```yaml
- question: "What additional accessibility?"
  header: "A11y Extended"
  multiSelect: true
  options:
    - label: "Focus management"
      description: "Logical focus flow"
    - label: "Reduced motion support"
      description: "Respect motion preferences"
    - label: "Skip links"
      description: "Jump to main content"
    - label: "Error announcements"
      description: "Screen reader alerts"
```

### Category 14: Responsive Design

```yaml
- question: "What responsive/mobile features?"
  header: "Responsive"
  multiSelect: true
  options:
    - label: "Mobile-first layout"
      description: "Optimized for small screens"
    - label: "Touch-optimized interface"
      description: "Large touch targets"
    - label: "Collapsible sidebar"
      description: "Hide nav on mobile"
    - label: "Swipe gestures"
      description: "Navigation via swipe"
```

```yaml
- question: "What additional responsive features?"
  header: "Responsive Extended"
  multiSelect: true
  options:
    - label: "Adaptive artifact display"
      description: "Resize artifacts for screen"
    - label: "PWA support"
      description: "Progressive Web App features"
    - label: "Offline capabilities"
      description: "Work without connection"
    - label: "Install prompt"
      description: "Add to home screen"
```

---

## Phase 4: Data Architecture

### Entity Discovery

```yaml
- question: "What are the main data entities?"
  header: "Entities"
  multiSelect: true
  options:
    - label: "Users/Accounts"
      description: "User profiles and authentication"
    - label: "Projects/Workspaces"
      description: "Grouping containers"
    - label: "Conversations/Chats"
      description: "Primary content objects"
    - label: "Messages"
      description: "Individual chat messages"
```

```yaml
- question: "What additional entities?"
  header: "Entities Extended"
  multiSelect: true
  options:
    - label: "Artifacts/Outputs"
      description: "Generated content items"
    - label: "Folders"
      description: "Organization containers"
    - label: "Shared Items"
      description: "Public share records"
    - label: "Prompt Library"
      description: "Saved prompts"
    - label: "Usage Records"
      description: "API consumption tracking"
    - label: "API Keys"
      description: "User API credentials"
```

### Relationship Questions (Free-form)
- "How do users relate to projects? (one-to-many, many-to-many)"
- "How do conversations relate to projects?"
- "Do messages support branching/threading?"
- "What data should be soft-deleted vs hard-deleted?"
- "What JSON fields are needed for flexible storage?"

---

## Phase 5: UI/UX Specifications

### Layout Structure

```yaml
- question: "What is the primary layout structure?"
  header: "Layout"
  multiSelect: false
  options:
    - label: "Three Column"
      description: "Sidebar + main content + artifacts panel"
    - label: "Two Column"
      description: "Sidebar + main content"
    - label: "Single Column"
      description: "Focused, linear flow"
    - label: "Dashboard Grid"
      description: "Multiple widgets/cards layout"
```

```yaml
- question: "What sidebar features?"
  header: "Sidebar"
  multiSelect: true
  options:
    - label: "New chat button"
      description: "Prominent action button"
    - label: "Project selector"
      description: "Dropdown for projects"
    - label: "Search input"
      description: "Filter conversations"
    - label: "Date-grouped list"
      description: "Today, Yesterday, etc."
    - label: "Folder tree"
      description: "Collapsible folders"
    - label: "Settings at bottom"
      description: "Gear icon access"
```

```yaml
- question: "What main area features?"
  header: "Main Area"
  multiSelect: true
  options:
    - label: "Editable title"
      description: "Click to rename"
    - label: "Model badge"
      description: "Show current model"
    - label: "Scrollable messages"
      description: "Message history"
    - label: "Welcome/empty state"
      description: "New conversation view"
    - label: "Suggested prompts"
      description: "Starter suggestions"
```

```yaml
- question: "What modals/overlays?"
  header: "Modals"
  multiSelect: true
  options:
    - label: "Settings modal (tabbed)"
      description: "Multi-section settings"
    - label: "Share modal"
      description: "Share link generation"
    - label: "Export options"
      description: "Format selection"
    - label: "Project settings"
      description: "Project configuration"
    - label: "Prompt library"
      description: "Browse saved prompts"
    - label: "Command palette"
      description: "Keyboard navigation overlay"
    - label: "Shortcuts reference"
      description: "Keyboard shortcuts list"
```

### Design System

```yaml
- question: "What color scheme?"
  header: "Colors"
  multiSelect: false
  options:
    - label: "Claude-style (orange accent)"
      description: "Primary: #CC785C, clean grays"
    - label: "Blue accent"
      description: "Professional blue scheme"
    - label: "Green accent"
      description: "Fresh green scheme"
    - label: "Custom colors"
      description: "Specify custom palette"
```

```yaml
- question: "What typography approach?"
  header: "Typography"
  multiSelect: false
  options:
    - label: "System font stack"
      description: "Inter, SF Pro, Roboto, system-ui"
    - label: "Custom font"
      description: "Specific font family"
```

```yaml
- question: "What component styles?"
  header: "Components"
  multiSelect: true
  options:
    - label: "Message bubbles"
      description: "User right, assistant left"
    - label: "Rounded buttons"
      description: "Primary and secondary styles"
    - label: "Focus ring inputs"
      description: "Clear focus states"
    - label: "Card shadows"
      description: "Subtle elevation"
```

```yaml
- question: "What animations?"
  header: "Animations"
  multiSelect: true
  options:
    - label: "Smooth transitions (150-300ms)"
      description: "Polished state changes"
    - label: "Fade in messages"
      description: "New message animation"
    - label: "Slide in panels"
      description: "Sidebar/artifact animation"
    - label: "Typing indicator"
      description: "Animated waiting state"
    - label: "Skeleton loaders"
      description: "Content placeholders"
```

### Themes

```yaml
- question: "Should the app support themes?"
  header: "Themes"
  multiSelect: false
  options:
    - label: "Light + Dark + Auto"
      description: "All three options"
    - label: "Light + Dark"
      description: "Both with manual toggle"
    - label: "Light only"
      description: "Single light theme"
    - label: "Dark only"
      description: "Single dark theme"
```

---

## Phase 6: Implementation Priorities

### Step Ordering

```yaml
- question: "What should be built first?"
  header: "Priority"
  multiSelect: false
  options:
    - label: "Backend first"
      description: "API and data layer, then UI"
    - label: "Frontend first"
      description: "UI with mocked data, then backend"
    - label: "Full-stack features"
      description: "Complete vertical slices"
    - label: "Core feature focus"
      description: "Most important feature end-to-end"
```

### Testing Requirements

```yaml
- question: "What testing approach is needed?"
  header: "Testing"
  multiSelect: true
  options:
    - label: "Unit Tests"
      description: "Individual function/component tests"
    - label: "Integration Tests"
      description: "API and database integration"
    - label: "E2E Tests"
      description: "Browser-based user flow tests"
    - label: "Manual Testing"
      description: "Human verification only"
```

---

## Phase 7: Success Criteria

### Functionality Criteria

```yaml
- question: "What functionality must work?"
  header: "Functionality"
  multiSelect: true
  options:
    - label: "Streaming responses work smoothly"
      description: "Real-time message display"
    - label: "Artifact detection accurate"
      description: "Correctly identifies artifacts"
    - label: "Conversation management reliable"
      description: "CRUD operations work"
    - label: "Project organization useful"
      description: "Grouping functions correctly"
    - label: "Image upload working"
      description: "Can attach images"
    - label: "All CRUD functional"
      description: "Create, read, update, delete work"
```

### User Experience Criteria

```yaml
- question: "What UX standards must be met?"
  header: "UX"
  multiSelect: true
  options:
    - label: "Matches reference design"
      description: "Visual consistency with target"
    - label: "Responsive all devices"
      description: "Works on mobile/tablet/desktop"
    - label: "Smooth animations"
      description: "Polished transitions"
    - label: "Fast response times"
      description: "Minimal lag"
    - label: "Intuitive navigation"
      description: "Easy to find features"
    - label: "Clear feedback"
      description: "User knows what's happening"
```

### Technical Quality Criteria

```yaml
- question: "What technical standards?"
  header: "Tech Quality"
  multiSelect: true
  options:
    - label: "Clean code structure"
      description: "Maintainable, organized"
    - label: "Proper error handling"
      description: "Graceful failure modes"
    - label: "Secure API key management"
      description: "Keys protected properly"
    - label: "Optimized queries"
      description: "Efficient database access"
    - label: "Efficient streaming"
      description: "Low-latency real-time"
    - label: "Comprehensive tests"
      description: "Good test coverage"
```

### Design Polish Criteria

```yaml
- question: "What design polish is required?"
  header: "Design"
  multiSelect: true
  options:
    - label: "Consistent visual design"
      description: "Unified look and feel"
    - label: "Beautiful typography"
      description: "Proper fonts and spacing"
    - label: "Smooth micro-interactions"
      description: "Polished small animations"
    - label: "Excellent contrast/accessibility"
      description: "Readable by all users"
    - label: "Professional appearance"
      description: "Production-ready look"
    - label: "Dark mode fully implemented"
      description: "Complete dark theme"
```

---

## Question Flow Patterns

### Conditional Questions
Based on project type, show relevant questions:

| Project Type | Show Phases |
|-------------|-------------|
| Web App | All phases (1-7) |
| CLI Tool | 1, 2 (CLI), 3 (simplified), 6, 7 |
| API Service | 1, 2 (Backend), 3, 4, 6, 7 |
| Library/SDK | 1, 2 (Language), 3 (API design), 6, 7 |

### Feature Category Mapping

| If User Selects | Ask These Category Questions |
|----------------|------------------------------|
| Chat Interface | Categories 1, 8 |
| Artifacts | Category 2 |
| Conversations | Category 3 |
| Projects | Category 4 |
| Model Selection | Category 5 |
| Custom Instructions | Category 6 |
| Settings | Category 7 |
| Advanced Features | Category 8 |
| Sharing | Category 9 |
| Search | Category 10 |
| Usage Tracking | Category 11 |
| Onboarding | Category 12 |
| Accessibility | Category 13 |
| Responsive | Category 14 |

### Iterative Deepening
For each feature category selected:
1. Show category-specific detail questions
2. Ask about edge cases
3. Clarify security requirements
4. Define success criteria for that feature

### Validation Questions
Before generating specification:
1. "Are there any features we haven't covered?"
2. "Any specific integrations needed?"
3. "Any specific models to include in model selector?"
4. "What port numbers for frontend/backend?"
5. "Any API key location requirements?"
