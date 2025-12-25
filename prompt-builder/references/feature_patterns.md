# Feature Patterns

Complete feature implementation patterns covering ALL 13 OUTPUT categories from the specification template.
Use these as templates when building specifications.

**Note**: `<model_selection>` is a DEVELOPMENT PROCESS section (meta-instruction for the AI agent),
not an output feature category. It specifies which Claude model should BUILD the project.

---

## Section Adaptation by Project Type

The 13 output categories represent **universal structural patterns**. Rename them to match
your project domain when the base name doesn't apply.

### Quick Reference: Pattern Adaptations

| # | Base Pattern | Structural Purpose | CLI | E-commerce | Dashboard | CMS | API |
|---|--------------|-------------------|-----|------------|-----------|-----|-----|
| 1 | `chat_interface` | Main interaction UI | `command_interface` | `product_browsing` | `dashboard_view` | `content_editor` | `endpoint_interface` |
| 2 | `artifacts` | Secondary output panel | `output_generation` | `cart_checkout` | `report_panel` | `preview_panel` | `documentation` |
| 3 | `conversation_management` | Item CRUD & organization | `session_management` | `order_management` | `report_management` | `content_management` | `resource_management` |
| 4 | `projects` | Grouping containers | `profiles` | `wishlists` | `dashboards` | `sites` | `api_versions` |
| 5 | `custom_instructions` | User customization | `config_files` | `preferences` | `data_sources` | `templates` | `middleware_config` |
| 6 | `settings_preferences` | App configuration | *(universal)* | *(universal)* | *(universal)* | *(universal)* | *(universal)* |
| 7 | `advanced_features` | Power user features | *(adapted)* | *(adapted)* | *(adapted)* | *(adapted)* | *(adapted)* |
| 8 | `collaboration` | Sharing/export | *(universal)* | *(universal)* | *(universal)* | *(universal)* | *(universal)* |
| 9 | `search_discovery` | Search/filter | *(universal)* | *(universal)* | *(universal)* | *(universal)* | *(universal)* |
| 10 | `usage_tracking` | Analytics | *(universal)* | *(universal)* | *(universal)* | *(universal)* | *(universal)* |
| 11 | `onboarding` | New user guidance | *(universal)* | *(universal)* | *(universal)* | *(universal)* | *(universal)* |
| 12 | `accessibility` | A11y compliance | *(universal)* | *(universal)* | *(universal)* | *(universal)* | *(universal)* |
| 13 | `responsive_design` | Layout adaptation | `terminal_output` | *(universal)* | *(universal)* | *(universal)* | `api_structure` |

**Legend:**
- *(universal)* = Keeps base name, applies to all project types
- *(adapted)* = Keeps base name but content is project-specific
- Specific name = Rename to this for the project type

---

## Category 1: Main Interaction Pattern

### Base: Chat Interface (for AI/Chat apps)
```xml
<chat_interface>
  - Clean, centered chat layout with message bubbles
  - Streaming message responses with typing indicator
  - Markdown rendering with proper formatting
  - Code blocks with syntax highlighting and copy button
  - LaTeX/math equation rendering
  - Image upload and display in messages
  - Multi-turn conversations with context
  - Message editing and regeneration
  - Stop generation button during streaming
  - Input field with auto-resize textarea
  - Character count and token estimation
  - Keyboard shortcuts (Enter to send, Shift+Enter for newline)
</chat_interface>
```

### Adapted: Command Interface (for CLI tools)
```xml
<command_interface>
  - Clear command prompt with input area
  - Argument parsing with validation
  - Help text and usage display
  - Command history navigation (up/down arrows)
  - Tab completion for commands and paths
  - Progress indicators for long operations
  - Colored output formatting
  - Interactive mode support
  - Piping and redirection support
  - Quiet/verbose mode flags
  - Error messages with exit codes
  - Signal handling (Ctrl+C, Ctrl+D)
</command_interface>
```

### Adapted: Product Browsing (for E-commerce)
```xml
<product_browsing>
  - Product grid with responsive layout
  - Product cards with image, title, price
  - Quick view modal
  - Sorting options (price, rating, newest)
  - Faceted filtering (category, brand, price range)
  - Search with autocomplete
  - Product detail page
  - Image gallery with zoom
  - Size/variant selection
  - Add to cart button
  - Wishlist toggle
  - Related products section
</product_browsing>
```

### Adapted: Dashboard View (for Analytics)
```xml
<dashboard_view>
  - Widget grid layout
  - KPI cards with metrics
  - Line/bar/pie charts
  - Data tables with sorting/filtering
  - Date range selector
  - Real-time data updates
  - Drill-down capability
  - Export to CSV/PDF
  - Dashboard customization
  - Widget resize/reorder
  - Full-screen widget view
  - Auto-refresh intervals
</dashboard_view>
```

### Adapted: Content Editor (for CMS)
```xml
<content_editor>
  - WYSIWYG editor
  - Markdown support
  - Block-based editing
  - Media embedding
  - Image upload and gallery
  - Link insertion
  - Table creation
  - Code block insertion
  - Undo/redo
  - Autosave
  - Revision history
  - SEO metadata editing
</content_editor>
```

---

## Category 2: Secondary Output Pattern

### Base: Artifacts (for AI/Chat apps)
```xml
<artifacts>
  - Artifact detection and rendering in side panel
  - Code artifact viewer with syntax highlighting
  - HTML/SVG preview with live rendering
  - React component preview
  - Mermaid diagram rendering
  - Text document artifacts
  - Artifact editing and re-prompting
  - Full-screen artifact view
  - Download artifact content
  - Artifact versioning and history
</artifacts>
```

**Database Tables:**
```
artifacts:
  - id, message_id, conversation_id
  - type (code/html/svg/react/mermaid/text)
  - title, identifier, language
  - content, version
  - created_at, updated_at
```

**Key Interactions - Artifact Flow:**
```
1. Assistant generates artifact in response
2. Artifact panel slides in from right
3. Content renders (code with highlighting or live preview)
4. User can edit artifact inline
5. "Re-prompt" button to iterate with Claude
6. Download or copy artifact content
7. Full-screen mode for detailed work
8. Close panel to return to chat focus
```

**API Endpoints:**
```
- GET /api/conversations/:id/artifacts
- GET /api/artifacts/:id
- PUT /api/artifacts/:id
- DELETE /api/artifacts/:id
- POST /api/artifacts/:id/fork
- GET /api/artifacts/:id/versions
```

**UI Layout - Artifacts Panel:**
```
- Artifact header with title and type badge
- Code editor or preview pane
- Tabs for multiple artifacts
- Full-screen toggle
- Download button
- Edit/Re-prompt button
- Version selector
- Close panel button
```

### Adapted: Output Generation (for CLI tools)
```xml
<output_generation>
  - File output to specified paths
  - Multiple format support (JSON, CSV, XML, YAML)
  - Stdout/stderr handling
  - Report generation
  - Log file creation
  - Progress output during generation
  - Template-based output
  - Batch output processing
  - Output validation
  - Checksum/hash generation
</output_generation>
```

### Adapted: Cart/Checkout (for E-commerce)
```xml
<cart_checkout>
  - Shopping cart sidebar/modal
  - Cart item list with quantities
  - Price calculations and totals
  - Promo code input
  - Shipping options
  - Payment method selection
  - Order summary
  - Checkout flow steps
  - Order confirmation
  - Receipt generation
</cart_checkout>
```

### Adapted: Report Panel (for Analytics)
```xml
<report_panel>
  - Report viewer panel
  - PDF/Excel export
  - Print-optimized layout
  - Chart snapshots
  - Data table export
  - Scheduled report generation
  - Report templates
  - Custom report builder
  - Report sharing
  - Historical report archive
</report_panel>
```

---

## Category 3: Item Management Pattern

### Base: Conversation Management (for AI/Chat apps)
```xml
<conversation_management>
  - Create new conversations
  - Conversation list in sidebar
  - Rename conversations
  - Delete conversations
  - Search conversations by title/content
  - Pin important conversations
  - Archive conversations
  - Conversation folders/organization
  - Duplicate conversation
  - Export conversation (JSON, Markdown, PDF)
  - Conversation timestamps (created, last updated)
  - Unread message indicators
</conversation_management>
```

**Key Interactions - Conversation Management:**
```
1. Click "New Chat" to start fresh conversation
2. Conversations auto-save with first message
3. Auto-generate title from first exchange
4. Click title to rename inline
5. Drag conversations into folders
6. Right-click for context menu (pin, archive, delete, export)
7. Search filters conversations in real-time
8. Click conversation to switch context
```

**API Endpoints:**
```
- GET /api/conversations
- POST /api/conversations
- GET /api/conversations/:id
- PUT /api/conversations/:id
- DELETE /api/conversations/:id
- POST /api/conversations/:id/duplicate
- POST /api/conversations/:id/export
- PUT /api/conversations/:id/archive
- PUT /api/conversations/:id/pin
- POST /api/conversations/:id/branch
```

**Database Tables:**
```
conversation_folders:
  - id, user_id, project_id, name, parent_folder_id
  - created_at, position

conversation_folder_items:
  - id, folder_id, conversation_id
```

### Adapted: Session Management (for CLI tools)
```xml
<session_management>
  - Create named sessions
  - Session list with history
  - Restore previous sessions
  - Clear session
  - Session search by command history
  - Save session to file
  - Load session from file
  - Session aliases
  - Duplicate session
  - Export session log
  - Session timestamps
  - Active session indicator
</session_management>
```

### Adapted: Order Management (for E-commerce)
```xml
<order_management>
  - Create orders from cart
  - Order list with status
  - View order details
  - Cancel orders (if allowed)
  - Search orders by ID/date/product
  - Track order status
  - Archive completed orders
  - Order folders (e.g., Returns, Completed)
  - Reorder from history
  - Export order history (CSV, PDF)
  - Order timestamps
  - New order indicators
</order_management>
```

### Adapted: Report Management (for Analytics)
```xml
<report_management>
  - Create new reports
  - Report list in sidebar
  - Rename reports
  - Delete reports
  - Search reports by title/metrics
  - Pin favorite reports
  - Archive old reports
  - Report folders/categories
  - Duplicate report
  - Export report (PDF, Excel, CSV)
  - Report timestamps
  - Scheduled report indicators
</report_management>
```

### Adapted: Content Management (for CMS)
```xml
<content_management>
  - Create new posts/pages
  - Content list with status (draft/published)
  - Edit content metadata
  - Delete/trash content
  - Search by title/content/tags
  - Feature important content
  - Archive old content
  - Content categories/taxonomies
  - Duplicate content
  - Export content (HTML, Markdown)
  - Created/modified timestamps
  - Scheduled publish indicators
</content_management>
```

---

## Category 4: Grouping/Workspace Patterns

### Base: Projects (for AI/Chat apps)
```xml
<projects>
  - Create projects to group related conversations
  - Project knowledge base (upload documents)
  - Project-specific custom instructions
  - Share projects with team (mock feature)
  - Project settings and configuration
  - Move conversations between projects
  - Project templates
  - Project analytics (usage stats)
</projects>
```

**Database Tables:**
```
projects:
  - id, user_id, name, description, color
  - custom_instructions, knowledge_base_path
  - created_at, updated_at
  - is_archived, is_pinned
```

**API Endpoints:**
```
- GET /api/projects
- POST /api/projects
- GET /api/projects/:id
- PUT /api/projects/:id
- DELETE /api/projects/:id
- POST /api/projects/:id/knowledge
- GET /api/projects/:id/conversations
- PUT /api/projects/:id/settings
```

### Adapted: Profiles (for CLI tools)
```xml
<profiles>
  - Create named profiles for different use cases
  - Profile-specific configuration files
  - Profile-specific environment variables
  - Switch between profiles
  - Profile settings and options
  - Link sessions to profiles
  - Profile templates
  - Profile usage statistics
</profiles>
```

### Adapted: Wishlists/Collections (for E-commerce)
```xml
<wishlists>
  - Create wishlists to group saved products
  - Wishlist description and notes
  - Wishlist-specific sharing settings
  - Share wishlists with others
  - Wishlist visibility (public/private)
  - Move products between wishlists
  - Wishlist templates (e.g., "Wedding Registry")
  - Wishlist analytics (price tracking)
</wishlists>
```

### Adapted: Dashboards (for Analytics)
```xml
<dashboards>
  - Create dashboards to group related reports
  - Dashboard data sources
  - Dashboard-specific filters
  - Share dashboards with team
  - Dashboard settings and refresh rates
  - Move widgets between dashboards
  - Dashboard templates
  - Dashboard view statistics
</dashboards>
```

### Adapted: Sites/Channels (for CMS)
```xml
<sites>
  - Create sites to group related content
  - Site-specific media library
  - Site-specific templates and themes
  - Multi-site management
  - Site settings and domains
  - Move content between sites
  - Site templates
  - Site analytics (traffic, engagement)
</sites>
```

---

## Category 5: Customization/User Preferences Pattern

### Base: Custom Instructions (for AI/Chat apps)
```xml
<custom_instructions>
  - Global custom instructions
  - Project-specific custom instructions
  - Conversation-specific system prompts
  - Custom instruction templates
  - Preview how instructions affect responses
</custom_instructions>
```

**Storage Pattern:**
```
users.custom_instructions (global)
projects.custom_instructions (per-project)
conversations.settings.system_prompt (per-conversation)
```

**API Endpoints:**
```
- GET /api/settings/custom-instructions
- PUT /api/settings/custom-instructions
```

### Adapted: Config Files (for CLI tools)
```xml
<config_files>
  - Global config file (~/.toolrc)
  - Project-specific config (.toolrc.local)
  - Command-specific overrides
  - Config templates
  - Validate config syntax
</config_files>
```

### Adapted: User Preferences (for E-commerce)
```xml
<user_preferences>
  - Default shipping address
  - Payment method preferences
  - Size/fit preferences
  - Brand preferences
  - Communication preferences
  - Preview how preferences affect recommendations
</user_preferences>
```

### Adapted: Data Sources (for Analytics)
```xml
<data_sources>
  - Global data connections
  - Dashboard-specific data sources
  - Query-specific overrides
  - Connection templates
  - Test data connections
</data_sources>
```

### Adapted: Templates (for CMS)
```xml
<templates>
  - Global site templates
  - Page-specific templates
  - Component templates
  - Template library
  - Preview template rendering
</templates>
```

---

## Category 6: Application Settings Pattern

Settings/Preferences typically remain consistent across project types (always called settings_preferences).

### Base: Settings & Preferences (Universal)
```xml
<settings_preferences>
  - Theme selection (Light, Dark, Auto)
  - Font size adjustment
  - Message density (compact, comfortable, spacious)
  - Code theme selection
  - Language preferences
  - Accessibility options
  - Keyboard shortcuts reference
  - Data export options
  - Privacy settings
  - API key management
</settings_preferences>
```

**Database Tables:**
```
users:
  - preferences (JSON: theme, font_size, etc.)

api_keys:
  - id, user_id, key_name, api_key_hash
  - created_at, last_used_at
  - is_active
```

**API Endpoints:**
```
- GET /api/settings
- PUT /api/settings
```

**UI Layout - Settings Modal:**
```
- Settings modal (tabbed interface)
- Appearance tab: theme, font, density
- Editor tab: code theme, syntax options
- Accessibility tab: a11y options
- Privacy tab: data settings
- API Keys tab: key management
- Export tab: data export options
```

**Note:** Settings rarely need adaptation - all apps have theme, language, and accessibility settings.

---

## Category 7: Advanced/Power User Features Pattern

### Base: Advanced Features (for AI/Chat apps)
```xml
<advanced_features>
  - Temperature control slider
  - Max tokens adjustment
  - Top-p (nucleus sampling) control
  - System prompt override
  - Thinking/reasoning mode toggle
  - Multi-modal input (text + images)
  - Voice input (optional, mock UI)
  - Response suggestions
  - Related prompts
  - Conversation branching
</advanced_features>
```

**Storage Pattern:**
```
conversations.settings (JSON):
  - temperature: 0.0-1.0
  - max_tokens: number
  - top_p: 0.0-1.0
  - thinking_mode: boolean
```

**UI Components:**
```
- Temperature slider (0-1)
- Max tokens input
- Top-p slider
- System prompt textarea
- Thinking mode toggle
- Image attachment button
- Voice input button (mock)
```

### Adapted: Advanced Features (for CLI tools)
```xml
<advanced_features>
  - Verbose output levels (-v, -vv, -vvv)
  - Debug mode
  - Dry-run mode
  - Parallel execution
  - Custom output formats
  - Pipeline integration
  - Environment variable overrides
  - Plugin/extension system
  - Scripting hooks
  - Batch processing
</advanced_features>
```

### Adapted: Advanced Features (for E-commerce)
```xml
<advanced_features>
  - Price alerts
  - Inventory notifications
  - Advanced product filtering
  - Bulk ordering
  - API access for integrations
  - Custom pricing tiers
  - B2B features
  - Tax exemption handling
  - Multi-currency support
  - Scheduled orders
</advanced_features>
```

### Adapted: Advanced Features (for Analytics)
```xml
<advanced_features>
  - Custom SQL queries
  - Advanced formula builder
  - Predictive analytics
  - Machine learning models
  - Real-time streaming
  - Custom visualizations
  - API integrations
  - Alert thresholds
  - Anomaly detection
  - Drill-through reports
</advanced_features>
```

---

## Category 8: Collaboration/Sharing Pattern

Collaboration typically remains consistent across project types (always called collaboration).

### Base: Collaboration (Universal)
```xml
<collaboration>
  - Share conversation via link (read-only)
  - Export conversation formats
  - Conversation templates
  - Prompt library
  - Share artifacts
  - Team workspaces (mock UI)
</collaboration>
```

**Database Tables:**
```
shared_conversations:
  - id, conversation_id, share_token
  - created_at, expires_at, view_count
  - is_public

prompt_library:
  - id, user_id, title, description
  - prompt_template, category, tags (JSON)
  - is_public, usage_count
  - created_at, updated_at
```

**API Endpoints:**
```
- POST /api/conversations/:id/share
- GET /api/share/:token
- DELETE /api/share/:token
- PUT /api/share/:token/settings
```

**Note:** Collaboration features (share, export, team) apply universally across all project types.

---

## Category 9: Search and Discovery Pattern

Search/Discovery typically remains consistent across project types (always called search_discovery).

### Base: Search & Discovery (Universal)
```xml
<search_discovery>
  - Search across all conversations
  - Filter by project, date, model
  - Prompt library with categories
  - Example conversations
  - Quick actions menu
  - Command palette (Cmd/Ctrl+K)
</search_discovery>
```

**API Endpoints:**
```
- GET /api/search/conversations?q=query
- GET /api/search/messages?q=query
- GET /api/search/artifacts?q=query
- GET /api/search/prompts?q=query
- GET /api/prompts/library
- GET /api/prompts/categories
- GET /api/prompts/examples
```

**Implementation Notes:**
- Use SQLite FTS5 or PostgreSQL full-text search
- Debounce search input (300ms typical)
- Return snippets with highlighted matches
- Cache popular searches

**UI Components:**
```
- Search input in sidebar
- Filter dropdowns (project, date, model)
- Command palette overlay (Cmd+K)
- Quick actions menu
- Prompt library modal
```

**Note:** Search features apply universally - all apps need search and filtering capabilities.

---

## Category 10: Usage/Analytics Tracking Pattern

Usage tracking typically remains consistent across project types (always called usage_tracking).

### Base: Usage Tracking (Universal)
```xml
<usage_tracking>
  - Token usage display per message
  - Conversation cost estimation
  - Daily/monthly usage dashboard
  - Usage limits and warnings
  - API quota tracking
</usage_tracking>
```

**Database Tables:**
```
usage_tracking:
  - id, user_id, conversation_id, message_id
  - model, input_tokens, output_tokens
  - cost_estimate, created_at
```

**API Endpoints:**
```
- GET /api/usage/daily
- GET /api/usage/monthly
- GET /api/usage/by-model
- GET /api/usage/conversations/:id
```

**UI Components:**
```
- Token count per message
- Cost estimation display
- Usage dashboard with charts
- Limit warnings/alerts
- Quota meter
```

**Note:** Usage tracking applies universally - all apps benefit from analytics and usage monitoring.

---

## Category 11: Onboarding Pattern

Onboarding typically remains consistent across project types (always called onboarding).

### Base: Onboarding (Universal)
```xml
<onboarding>
  - Welcome screen for new users
  - Feature tour highlights
  - Example prompts to get started
  - Quick tips and best practices
  - Keyboard shortcuts tutorial
</onboarding>
```

**UI Components:**
```
- Welcome modal for first visit
- Tooltips for feature highlights
- Example prompt cards
- Tips banner/toast
- Shortcuts modal
```

**Implementation Pattern:**
```
- Store onboarding state in user preferences
- Show welcome screen on first visit
- Feature tour with step indicators
- Dismissible tips
- Accessible shortcuts reference
```

**Note:** Onboarding applies universally - all apps need new user guidance and feature discovery.

---

## Category 12: Accessibility Pattern

Accessibility is universal and applies to ALL project types (always called accessibility).

### Base: Accessibility (Universal - REQUIRED)
```xml
<accessibility>
  - Full keyboard navigation
  - Screen reader support
  - ARIA labels and roles
  - High contrast mode
  - Focus management
  - Reduced motion support
</accessibility>
```

**Implementation Checklist:**
- [ ] All interactive elements focusable
- [ ] Visible focus indicators
- [ ] Semantic HTML structure
- [ ] ARIA labels on buttons/inputs
- [ ] Alt text for images
- [ ] Color not sole indicator
- [ ] 4.5:1 text contrast ratio
- [ ] Touch targets >= 44px
- [ ] Error messages associated with fields
- [ ] Skip links for navigation
- [ ] Respect prefers-reduced-motion
- [ ] Live regions for dynamic content

**Note:** Accessibility is MANDATORY for all projects. Never skip or rename this section.

---

## Category 13: Responsive/Layout Design Pattern

### Base: Responsive Design (for Web apps)
```xml
<responsive_design>
  - Mobile-first responsive layout
  - Touch-optimized interface
  - Collapsible sidebar on mobile
  - Swipe gestures for navigation
  - Adaptive artifact display
  - Progressive Web App (PWA) support
</responsive_design>
```

**Breakpoints:**
```
- Mobile: < 640px (single column)
- Tablet: 640px - 1024px (two column)
- Desktop: > 1024px (three column)
```

**Layout Adaptations:**
```
Mobile:
  - Single column layout
  - Bottom navigation
  - Full-screen modals
  - Collapsible sidebar (hamburger)
  - Simplified artifact view

Tablet:
  - Two column (sidebar + main)
  - Overlay artifact panel
  - Condensed sidebar

Desktop:
  - Three column (sidebar + main + artifacts)
  - Resizable panels
  - Full feature set
```

### Adapted: Terminal Output (for CLI tools)
```xml
<terminal_output>
  - Terminal width detection
  - Adaptive column formatting
  - Text wrapping modes
  - Color/no-color modes
  - Compact vs verbose output
  - Pager integration (less/more)
</terminal_output>
```

### Adapted: API Structure (for API services)
```xml
<api_structure>
  - RESTful resource hierarchy
  - Pagination patterns
  - Response format options (JSON, XML)
  - Field selection/filtering
  - Versioning strategy
  - Rate limiting responses
</api_structure>
```

**Note:** Layout/responsive patterns adapt significantly by project type. CLI tools focus on terminal output, APIs focus on response structure.

---

## UI Layout Patterns

### Three-Column Layout
```xml
<ui_layout>
  <main_structure>
    - Three-column layout: sidebar (conversations), main (chat), panel (artifacts)
    - Collapsible sidebar with resize handle
    - Responsive breakpoints: mobile (single column), tablet (two column), desktop (three column)
    - Persistent header with project/model selector
    - Bottom input area with send button and options
  </main_structure>

  <sidebar_left>
    - New chat button (prominent)
    - Project selector dropdown
    - Search conversations input
    - Conversations list (grouped by date: Today, Yesterday, Previous 7 days, etc.)
    - Folder tree view (collapsible)
    - Settings gear icon at bottom
    - User profile at bottom
  </sidebar_left>

  <main_chat_area>
    - Conversation title (editable inline)
    - Model selector badge
    - Message history (scrollable)
    - Welcome screen for new conversations
    - Suggested prompts (empty state)
    - Input area with formatting toolbar
    - Attachment button for images
    - Send button with loading state
    - Stop generation button
  </main_chat_area>

  <artifacts_panel>
    - Artifact header with title and type badge
    - Code editor or preview pane
    - Tabs for multiple artifacts
    - Full-screen toggle
    - Download button
    - Edit/Re-prompt button
    - Version selector
    - Close panel button
  </artifacts_panel>

  <modals_overlays>
    - Settings modal (tabbed interface)
    - Share conversation modal
    - Export options modal
    - Project settings modal
    - Prompt library modal
    - Command palette overlay
    - Keyboard shortcuts reference
  </modals_overlays>
</ui_layout>
```

---

## Design System Patterns

### Complete Design System
```xml
<design_system>
  <color_palette>
    - Primary: Orange/amber accent (#CC785C claude-style)
    - Background: White (light mode), Dark gray (#1A1A1A dark mode)
    - Surface: Light gray (#F5F5F5 light), Darker gray (#2A2A2A dark)
    - Text: Near black (#1A1A1A light), Off-white (#E5E5E5 dark)
    - Borders: Light gray (#E5E5E5 light), Dark gray (#404040 dark)
    - Code blocks: Monaco editor theme
  </color_palette>

  <typography>
    - Sans-serif system font stack (Inter, SF Pro, Roboto, system-ui)
    - Headings: font-semibold
    - Body: font-normal, leading-relaxed
    - Code: Monospace (JetBrains Mono, Consolas, Monaco)
    - Message text: text-base (16px), comfortable line-height
  </typography>

  <components>
    <message_bubble>
      - User messages: Right-aligned, subtle background
      - Assistant messages: Left-aligned, no background
      - Markdown formatting with proper spacing
      - Inline code with bg-gray-100 background
      - Code blocks with syntax highlighting
      - Copy button on code blocks
    </message_bubble>

    <buttons>
      - Primary: Orange/amber background, white text, rounded
      - Secondary: Border style with hover fill
      - Icon buttons: Square with hover background
      - Disabled state: Reduced opacity, no pointer events
    </buttons>

    <inputs>
      - Rounded borders with focus ring
      - Textarea auto-resize
      - Placeholder text in gray
      - Error states in red
      - Character counter
    </inputs>

    <cards>
      - Subtle border or shadow
      - Rounded corners (8px)
      - Padding: p-4 to p-6
      - Hover state: slight shadow increase
    </cards>
  </components>

  <animations>
    - Smooth transitions (150-300ms)
    - Fade in for new messages
    - Slide in for sidebar
    - Typing indicator animation
    - Loading spinner for generation
    - Skeleton loaders for content
  </animations>
</design_system>
```

---

## Implementation Step Patterns

### Complete 9-Step Web App Progression

**Step 1: Setup Project Foundation and Database**
```
- Initialize Express server with SQLite database
- Set up Claude API client with streaming support
- Create database schema with migrations
- Implement authentication endpoints
- Set up basic CORS and middleware
- Create health check endpoint
```

**Step 2: Build Core Chat Interface**
```
- Create main layout with sidebar and chat area
- Implement message display with markdown rendering
- Add streaming message support with SSE
- Build input area with auto-resize textarea
- Add code block syntax highlighting
- Implement stop generation functionality
- Add typing indicators and loading states
```

**Step 3: Conversation Management**
```
- Create conversation list in sidebar
- Implement new conversation creation
- Add conversation switching
- Build conversation rename functionality
- Implement delete with confirmation
- Add conversation search
- Create conversation grouping by date
```

**Step 4: Artifacts System**
```
- Build artifact detection from Claude responses
- Create artifact rendering panel
- Implement code artifact viewer
- Add HTML/SVG live preview
- Build artifact editing interface
- Add artifact versioning
- Implement full-screen artifact view
```

**Step 5: Projects and Organization**
```
- Create projects CRUD endpoints
- Build project selector UI
- Implement project-specific custom instructions
- Add folder system for conversations
- Create drag-and-drop organization
- Build project settings panel
```

**Step 6: Advanced Features**
```
- Add model selection dropdown
- Implement temperature and parameter controls
- Build image upload functionality
- Create message editing and regeneration
- Add conversation branching
- Implement export functionality
```

**Step 7: Settings and Customization**
```
- Build settings modal with tabs
- Implement theme switching (light/dark)
- Add custom instructions management
- Create keyboard shortcuts
- Build prompt library
- Add usage tracking dashboard
```

**Step 8: Sharing and Collaboration**
```
- Implement conversation sharing with tokens
- Create public share view
- Add export to multiple formats
- Build prompt templates
- Create example conversations
```

**Step 9: Polish and Optimization**
```
- Optimize for mobile responsiveness
- Add command palette (Cmd+K)
- Implement comprehensive keyboard navigation
- Add onboarding flow
- Create accessibility improvements
- Performance optimization and caching
```

---

## Success Criteria Patterns

### Complete Success Criteria
```xml
<success_criteria>
  <functionality>
    - Streaming chat responses work smoothly
    - Artifact detection and rendering accurate
    - Conversation management intuitive and reliable
    - Project organization clear and useful
    - Image upload and display working
    - All CRUD operations functional
  </functionality>

  <user_experience>
    - Interface matches [reference app] design language
    - Responsive on all device sizes
    - Smooth animations and transitions
    - Fast response times and minimal lag
    - Intuitive navigation and workflows
    - Clear feedback for all actions
  </user_experience>

  <technical_quality>
    - Clean, maintainable code structure
    - Proper error handling throughout
    - Secure API key management
    - Optimized database queries
    - Efficient streaming implementation
    - Comprehensive testing coverage
  </technical_quality>

  <design_polish>
    - Consistent with [reference app] visual design
    - Beautiful typography and spacing
    - Smooth animations and micro-interactions
    - Excellent contrast and accessibility
    - Professional, polished appearance
    - Dark mode fully implemented
  </design_polish>
</success_criteria>
```
