---
name: prompt-builder
description: |
  Comprehensive prompt specification builder for AI coding agents. This skill guides users through
  structured questioning to produce detailed, production-ready prompt specifications using XML tags.
  Use when users want to create application specifications, project prompts, agent instructions, or
  comprehensive development guides. Triggers on requests like "build a prompt", "create an app spec",
  "help me write instructions for an AI agent", or "I need a detailed project specification".
---

# Prompt Builder Skill

Build comprehensive, production-ready prompt specifications through guided questioning. This skill
produces structured specifications using XML tags optimized for AI coding agents.

## Reference Input Format

**Canonical Example**: `/Users/lifsys/Repos/Linear-Coding-Agent-Harness/prompts/app_spec.txt`

This file demonstrates the exact XML tagging format that ALL output must follow.

## Output Format Requirements

**CRITICAL**: Output MUST use XML tags with `-` list items. Example:

```xml
<section_name>
  - First item description
  - Second item description
  - Third item description
</section_name>
```

For nested structures:

```xml
<parent_tag>
  <child_tag>Value or description</child_tag>
  <another_child>
    - List item one
    - List item two
  </another_child>
</parent_tag>
```

---

## Complete Tag Structure

The output specification MUST include ALL of the following tags. Additional project-specific tags
may be added as needed, but these are the minimum required structure.

### Root Structure

```xml
<project_specification>
  <!-- All content goes here -->
</project_specification>
```

### Required Top-Level Tags

```xml
<project_name>[Project Name] - [Brief Descriptor]</project_name>

<overview>
  [2-4 sentences describing what the project does, its purpose, target users,
  and key differentiators. Include the design philosophy and main value proposition.]
</overview>
```

### Technology Stack Tags

```xml
<technology_stack>
  <api_key>
    [Instructions for API key location/management]
  </api_key>
  <frontend>
    <framework>[React with Vite | Vue 3 | Svelte | Next.js | etc.]</framework>
    <styling>[Tailwind CSS (via CDN) | CSS Modules | styled-components | etc.]</styling>
    <state_management>[React hooks and context | Redux | Zustand | etc.]</state_management>
    <routing>[React Router | Vue Router | SvelteKit routing | etc.]</routing>
    <markdown>[React Markdown | marked | etc.]</markdown>
    <code_highlighting>[Prism | highlight.js | Shiki]</code_highlighting>
    <port>Only launch on port {frontend_port}</port>
  </frontend>
  <backend>
    <runtime>[Node.js with Express | Python with FastAPI | Go with Gin | etc.]</runtime>
    <database>[SQLite with better-sqlite3 | PostgreSQL | MongoDB | etc.]</database>
    <api_integration>[Claude API | OpenAI API | etc.]</api_integration>
    <streaming>[Server-Sent Events | WebSockets | none]</streaming>
  </backend>
  <communication>
    <api>[RESTful endpoints | GraphQL | tRPC]</api>
    <streaming>[SSE for real-time streaming | WebSockets]</streaming>
    <claude_api>[Integration with Claude API using Anthropic SDK]</claude_api>
  </communication>
</technology_stack>
```

### Prerequisites Tags

```xml
<prerequisites>
  <environment_setup>
    - [First prerequisite]
    - [Second prerequisite]
    - [Third prerequisite]
    - [Additional prerequisites as needed]
  </environment_setup>
</prerequisites>
```

### Core Features Tags

```xml
<core_features>
  <chat_interface>
    - [Feature 1]
    - [Feature 2]
    - [12 features minimum]
  </chat_interface>

  <artifacts>
    - [Feature 1]
    - [Feature 2]
    - [10 features minimum]
  </artifacts>

  <conversation_management>
    - [Feature 1]
    - [Feature 2]
    - [12 features minimum]
  </conversation_management>

  <projects>
    - [Feature 1]
    - [Feature 2]
    - [8 features minimum]
  </projects>

  <model_selection>
    - [Feature 1]
    - [Feature 2]
    - [6 features minimum]
  </model_selection>

  <custom_instructions>
    - [Feature 1]
    - [Feature 2]
    - [5 features minimum]
  </custom_instructions>

  <settings_preferences>
    - [Feature 1]
    - [Feature 2]
    - [10 features minimum]
  </settings_preferences>

  <advanced_features>
    - [Feature 1]
    - [Feature 2]
    - [10 features minimum]
  </advanced_features>

  <collaboration>
    - [Feature 1]
    - [Feature 2]
    - [6 features minimum]
  </collaboration>

  <search_discovery>
    - [Feature 1]
    - [Feature 2]
    - [6 features minimum]
  </search_discovery>

  <usage_tracking>
    - [Feature 1]
    - [Feature 2]
    - [5 features minimum]
  </usage_tracking>

  <onboarding>
    - [Feature 1]
    - [Feature 2]
    - [5 features minimum]
  </onboarding>

  <accessibility>
    - [Feature 1]
    - [Feature 2]
    - [6 features minimum]
  </accessibility>

  <responsive_design>
    - [Feature 1]
    - [Feature 2]
    - [6 features minimum]
  </responsive_design>
</core_features>
```

### Database Schema Tags

```xml
<database_schema>
  <tables>
    <users>
      - [field1, field2, field3]
      - [field4, field5]
      - [additional fields]
    </users>

    <projects>
      - [field1, field2, field3]
      - [additional fields]
    </projects>

    <conversations>
      - [field1, field2, field3]
      - [additional fields]
    </conversations>

    <messages>
      - [field1, field2, field3]
      - [additional fields]
    </messages>

    <artifacts>
      - [field1, field2, field3]
      - [additional fields]
    </artifacts>

    <shared_conversations>
      - [field1, field2, field3]
      - [additional fields]
    </shared_conversations>

    <prompt_library>
      - [field1, field2, field3]
      - [additional fields]
    </prompt_library>

    <conversation_folders>
      - [field1, field2, field3]
      - [additional fields]
    </conversation_folders>

    <conversation_folder_items>
      - [field1, field2]
    </conversation_folder_items>

    <usage_tracking>
      - [field1, field2, field3]
      - [additional fields]
    </usage_tracking>

    <api_keys>
      - [field1, field2, field3]
      - [additional fields]
    </api_keys>

    <!-- Additional tables as needed for the project -->
  </tables>
</database_schema>
```

### API Endpoints Tags

```xml
<api_endpoints_summary>
  <authentication>
    - POST /api/auth/login
    - POST /api/auth/logout
    - GET /api/auth/me
    - PUT /api/auth/profile
  </authentication>

  <conversations>
    - GET /api/conversations
    - POST /api/conversations
    - GET /api/conversations/:id
    - PUT /api/conversations/:id
    - DELETE /api/conversations/:id
    - [additional endpoints]
  </conversations>

  <messages>
    - GET /api/conversations/:id/messages
    - POST /api/conversations/:id/messages
    - PUT /api/messages/:id
    - DELETE /api/messages/:id
    - [additional endpoints]
  </messages>

  <artifacts>
    - GET /api/conversations/:id/artifacts
    - GET /api/artifacts/:id
    - PUT /api/artifacts/:id
    - DELETE /api/artifacts/:id
    - [additional endpoints]
  </artifacts>

  <projects>
    - GET /api/projects
    - POST /api/projects
    - GET /api/projects/:id
    - PUT /api/projects/:id
    - DELETE /api/projects/:id
    - [additional endpoints]
  </projects>

  <sharing>
    - POST /api/conversations/:id/share
    - GET /api/share/:token
    - DELETE /api/share/:token
    - [additional endpoints]
  </sharing>

  <prompts>
    - GET /api/prompts/library
    - POST /api/prompts/library
    - GET /api/prompts/:id
    - [additional endpoints]
  </prompts>

  <search>
    - GET /api/search/conversations?q=query
    - GET /api/search/messages?q=query
    - GET /api/search/artifacts?q=query
    - [additional endpoints]
  </search>

  <folders>
    - GET /api/folders
    - POST /api/folders
    - PUT /api/folders/:id
    - DELETE /api/folders/:id
    - [additional endpoints]
  </folders>

  <usage>
    - GET /api/usage/daily
    - GET /api/usage/monthly
    - GET /api/usage/by-model
    - [additional endpoints]
  </usage>

  <settings>
    - GET /api/settings
    - PUT /api/settings
    - GET /api/settings/custom-instructions
    - PUT /api/settings/custom-instructions
  </settings>

  <claude_api>
    - POST /api/claude/chat
    - POST /api/claude/chat/stream
    - GET /api/claude/models
    - [additional endpoints]
  </claude_api>

  <!-- Additional endpoint groups as needed -->
</api_endpoints_summary>
```

### UI Layout Tags

```xml
<ui_layout>
  <main_structure>
    - [Layout description 1]
    - [Layout description 2]
    - [5 items minimum]
  </main_structure>

  <sidebar_left>
    - [Element 1]
    - [Element 2]
    - [7 items minimum]
  </sidebar_left>

  <main_chat_area>
    - [Element 1]
    - [Element 2]
    - [9 items minimum]
  </main_chat_area>

  <artifacts_panel>
    - [Element 1]
    - [Element 2]
    - [8 items minimum]
  </artifacts_panel>

  <modals_overlays>
    - [Modal 1]
    - [Modal 2]
    - [7 items minimum]
  </modals_overlays>
</ui_layout>
```

### Design System Tags

```xml
<design_system>
  <color_palette>
    - Primary: [Color name] ([hex code])
    - Background: [Description with hex codes for light/dark]
    - Surface: [Description with hex codes]
    - Text: [Description with hex codes]
    - Borders: [Description with hex codes]
    - Code blocks: [Theme name]
  </color_palette>

  <typography>
    - [Font stack description]
    - Headings: [weight/style]
    - Body: [weight/style]
    - Code: [Monospace font stack]
    - Message text: [size and line-height]
  </typography>

  <components>
    <message_bubble>
      - User messages: [Style description]
      - Assistant messages: [Style description]
      - [Additional styling details]
    </message_bubble>

    <buttons>
      - Primary: [Style description]
      - Secondary: [Style description]
      - Icon buttons: [Style description]
      - Disabled state: [Style description]
    </buttons>

    <inputs>
      - [Style description 1]
      - [Style description 2]
      - [Additional styling details]
    </inputs>

    <cards>
      - [Style description 1]
      - [Style description 2]
      - [Additional styling details]
    </cards>
  </components>

  <animations>
    - [Animation 1]
    - [Animation 2]
    - [6 animations minimum]
  </animations>
</design_system>
```

### Key Interactions Tags

```xml
<key_interactions>
  <message_flow>
    1. [Step 1]
    2. [Step 2]
    3. [Step 3]
    [9 steps minimum]
  </message_flow>

  <artifact_flow>
    1. [Step 1]
    2. [Step 2]
    3. [Step 3]
    [8 steps minimum]
  </artifact_flow>

  <conversation_management>
    1. [Step 1]
    2. [Step 2]
    3. [Step 3]
    [8 steps minimum]
  </conversation_management>
</key_interactions>
```

### Implementation Steps Tags

```xml
<implementation_steps>
  <step number="1">
    <title>[Step Title]</title>
    <tasks>
      - [Task 1]
      - [Task 2]
      - [Task 3]
      - [6 tasks minimum per step]
    </tasks>
  </step>

  <step number="2">
    <title>[Step Title]</title>
    <tasks>
      - [Task 1]
      - [Task 2]
      - [6 tasks minimum per step]
    </tasks>
  </step>

  <!-- Continue through step number="9" -->
</implementation_steps>
```

### Success Criteria Tags

```xml
<success_criteria>
  <functionality>
    - [Criterion 1]
    - [Criterion 2]
    - [6 criteria minimum]
  </functionality>

  <user_experience>
    - [Criterion 1]
    - [Criterion 2]
    - [6 criteria minimum]
  </user_experience>

  <technical_quality>
    - [Criterion 1]
    - [Criterion 2]
    - [6 criteria minimum]
  </technical_quality>

  <design_polish>
    - [Criterion 1]
    - [Criterion 2]
    - [6 criteria minimum]
  </design_polish>
</success_criteria>
```

---

## Section Adaptation Rules

### Development Process Tags (Never Rename)

These tags are meta-instructions for the AI coding agent:

```xml
<technology_stack>   <!-- What technologies to use -->
<prerequisites>      <!-- Environment setup -->
<implementation_steps>  <!-- Build sequence -->
<success_criteria>   <!-- Completion verification -->
```

### Output Project Tags (Adapt to Domain)

These tags describe the application being built. Rename when the base name doesn't apply:

| Base Tag | Adapt To | When Project Is... |
|----------|----------|-------------------|
| `<chat_interface>` | `<command_interface>`, `<product_browsing>`, `<dashboard_view>` | CLI, e-commerce, analytics |
| `<artifacts>` | `<output_generation>`, `<cart_checkout>`, `<report_panel>` | CLI, e-commerce, analytics |
| `<conversation_management>` | `<session_management>`, `<order_management>`, `<report_management>` | CLI, e-commerce, analytics |
| `<projects>` | `<profiles>`, `<wishlists>`, `<dashboards>` | CLI, e-commerce, analytics |
| `<custom_instructions>` | `<config_files>`, `<preferences>`, `<data_sources>` | CLI, e-commerce, analytics |

---

## Workflow

### Phase 0: Mode Selection

Ask user:
- **Full Automation**: Claude fills ALL sections using provided info + web research
- **Guided with Claude Determines**: Each decision includes AI-assisted option
- **Fully Manual**: User answers every question

### Phase 1: Project Foundation

Gather:
- Project type (Web App, CLI, API, Library)
- Project scope (MVP, Production, Enterprise)
- Reference application (if cloning/inspired by existing app)

### Phase 2: Technology Stack

Determine all technology choices for:
- Frontend framework, styling, state management, routing
- Backend runtime, database, API integration, streaming
- Communication methods

### Phase 3: Core Features

For each of the 14 feature categories, determine specific features. Adapt tag names based on project type.

### Phase 4: Data Architecture

Define:
- Database tables with fields
- API endpoints by category

### Phase 5: UI/UX

Specify:
- Layout structure
- Design system (colors, typography, components, animations)
- Key interaction flows

### Phase 6: Implementation

Create 9 implementation steps with 6+ tasks each.

### Phase 7: Success Criteria

Define criteria for functionality, user experience, technical quality, and design polish.

---

## Output Generation

After ALL phases complete, generate:

1. **Complete XML Specification** - Using the tag structure defined above
2. **Feature List JSON** - Use `assets/feature_list_template.json`
3. **Progress Tracking File** - Use `assets/progress_template.txt`
4. **Initialization Script** - Use `assets/init_script_template.sh`

---

## Validation Checklist

Before presenting final specification, verify ALL tags are present:

- [ ] `<project_specification>` root wrapper
- [ ] `<project_name>` with descriptive name
- [ ] `<overview>` with 2-4 sentences
- [ ] `<technology_stack>` with ALL subsections
- [ ] `<prerequisites>` with `<environment_setup>`
- [ ] `<core_features>` with ALL 14 categories (adapted names OK)
- [ ] `<database_schema>` with `<tables>` and minimum 6 table definitions
- [ ] `<api_endpoints_summary>` with ALL endpoint groups
- [ ] `<ui_layout>` with ALL 5 sections
- [ ] `<design_system>` with ALL 4 subsections
- [ ] `<key_interactions>` with ALL 3 flows
- [ ] `<implementation_steps>` with 9 steps, 6+ tasks each
- [ ] `<success_criteria>` with ALL 4 categories

**If ANY section is incomplete, DO NOT present to user. Complete it first.**

---

## Resources

- **Canonical Input Example**: `/Users/lifsys/Repos/Linear-Coding-Agent-Harness/prompts/app_spec.txt`
- **Question Bank**: `references/question_bank.md`
- **Feature Patterns**: `references/feature_patterns.md`
- **Feature List Template**: `assets/feature_list_template.json`
- **Progress Template**: `assets/progress_template.txt`
- **Init Script Template**: `assets/init_script_template.sh`
