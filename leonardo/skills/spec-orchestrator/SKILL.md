---
name: spec-orchestrator
description: |
  Master specification generator that produces comprehensive XML project specifications. Orchestrates
  parallel subagents to gather requirements, research technologies, and compile production-ready
  specifications. Use when building app specs, project prompts, or comprehensive development guides.
  Triggers on requests like "create specification", "generate app spec", "design system architecture".
---

# Specification Orchestrator

Generate comprehensive, production-ready project specifications through systematic analysis and parallel research. This skill produces structured XML specifications optimized for AI coding agents.

## Activation Triggers

Invoke this skill when the user requests:
- Creation of application specifications
- Project planning or architecture design
- Comprehensive development documentation
- AI agent instruction generation
- Full-stack application blueprints

## Core Responsibilities

1. **Requirements Discovery** - Extract complete requirements through guided questioning
2. **Technology Research** - Use WebSearch to find current best practices
3. **Specification Compilation** - Generate complete XML using canonical template
4. **Validation** - Ensure all sections are complete before delivery

---

## Specification Generation Protocol

### Step 1: Initial Assessment

Determine project parameters:
```yaml
assessment_questions:
  - "What type of project? (Web App, CLI, API, Library)"
  - "What is the scale? (MVP, Production, Enterprise)"
  - "Reference application to model? (URL or name)"
  - "Primary user persona?"
  - "Core problem being solved?"
```

### Step 2: Mode Selection

Ask user to choose specification mode:
```yaml
- question: "How should the specification be generated?"
  header: "Spec Mode"
  options:
    - label: "Full Automation (Recommended)"
      description: "AI generates complete spec using research and best practices"
    - label: "Guided Discovery"
      description: "Interactive questioning for each decision"
    - label: "Template Fill"
      description: "Provide answers for key sections only"
```

### Step 3: Parallel Research Phase

For **Full Automation** mode, launch parallel research:

**Technology Research** (parallel):
- WebSearch: "[project type] best practices 2025"
- WebSearch: "[frontend framework] vs alternatives 2025"
- WebSearch: "[backend framework] production setup"
- WebSearch: "[database] schema design patterns"

**Reference Analysis** (if provided):
- WebFetch the reference application
- Extract feature list and UI patterns
- Identify technology stack

### Step 4: Section-by-Section Generation

Generate each specification section with full detail. NEVER skip or abbreviate sections.

---

## Required Specification Structure

The output MUST include ALL of these sections with complete content:

### Root Wrapper
```xml
<project_specification>
  <!-- All sections go here -->
</project_specification>
```

### Section 1: Project Identity
```xml
<project_name>[Name] - [Brief Descriptor]</project_name>

<overview>
  [2-4 sentences describing: what it does, purpose, target users,
  key differentiators, design philosophy, main value proposition,
  UI framework and design approach]
</overview>
```

### Section 2: Technology Stack
```xml
<technology_stack>
  <api_key>
    [Instructions for API key location/management]
  </api_key>
  <frontend>
    <framework>[Choice with rationale]</framework>
    <styling>[Choice with rationale]</styling>
    <state_management>[Choice with rationale]</state_management>
    <routing>[Choice with rationale]</routing>
    <markdown>[Choice if applicable]</markdown>
    <code_highlighting>[Choice if applicable]</code_highlighting>
    <port>[Port number]</port>
  </frontend>
  <backend>
    <runtime>[Choice with rationale]</runtime>
    <database>[Choice with rationale]</database>
    <api_integration>[External APIs if any]</api_integration>
    <streaming>[SSE/WebSockets/none]</streaming>
  </backend>
  <communication>
    <api>[REST/GraphQL/tRPC]</api>
    <streaming>[Real-time method]</streaming>
    <claude_api>[If applicable]</claude_api>
  </communication>
</technology_stack>
```

### Section 3: Prerequisites
```xml
<prerequisites>
  <environment_setup>
    - [Prerequisite 1]
    - [Prerequisite 2]
    - [Prerequisite 3]
    - [Continue as needed]
  </environment_setup>
</prerequisites>
```

### Section 4: Core Features (ALL 14 Categories)

Adapt category names to project domain when base name doesn't apply.

| Category | Base Name | Adapt When |
|----------|-----------|------------|
| 1 | chat_interface | CLI: command_interface, E-commerce: product_browsing |
| 2 | artifacts | CLI: output_generation, E-commerce: cart_checkout |
| 3 | conversation_management | CLI: session_management, E-commerce: order_management |
| 4 | projects | CLI: profiles, E-commerce: wishlists |
| 5 | model_selection | Usually universal |
| 6 | custom_instructions | CLI: config_files, E-commerce: preferences |
| 7 | settings_preferences | Universal |
| 8 | advanced_features | Adapt content to domain |
| 9 | collaboration | Universal |
| 10 | search_discovery | Universal |
| 11 | usage_tracking | Universal |
| 12 | onboarding | Universal |
| 13 | accessibility | Universal (REQUIRED) |
| 14 | responsive_design | CLI: terminal_output, API: api_structure |

Each category MUST have minimum feature counts:
- Categories 1, 3, 7: 12 features minimum
- Categories 2, 8: 10 features minimum
- Categories 4: 8 features minimum
- Categories 5, 11, 12: 5 features minimum
- Categories 6, 9, 10, 13, 14: 6 features minimum

### Section 5: Database Schema
```xml
<database_schema>
  <tables>
    <[entity_name]>
      - [field1, field2, field3]
      - [field4, field5]
      - [additional fields with types]
    </[entity_name]>
    <!-- Minimum 6 tables for web apps -->
  </tables>
</database_schema>
```

### Section 6: API Endpoints
```xml
<api_endpoints_summary>
  <authentication>
    - POST /api/auth/login
    - POST /api/auth/logout
    - [Continue for all auth endpoints]
  </authentication>

  <[resource_name]>
    - GET /api/[resource]
    - POST /api/[resource]
    - [Continue for all CRUD operations]
  </[resource_name]>

  <!-- Include ALL endpoint categories -->
</api_endpoints_summary>
```

### Section 7: UI Layout
```xml
<ui_layout>
  <main_structure>
    - [Layout description - 5 items minimum]
  </main_structure>

  <sidebar_left>
    - [Elements - 7 items minimum]
  </sidebar_left>

  <main_[area_name]>
    - [Elements - 9 items minimum]
  </main_[area_name]>

  <[secondary_panel]>
    - [Elements - 8 items minimum]
  </[secondary_panel]>

  <modals_overlays>
    - [Modals - 7 items minimum]
  </modals_overlays>
</ui_layout>
```

### Section 8: Design System
```xml
<design_system>
  <color_palette>
    - Primary: [Color name] ([hex code])
    - Background: [Light/dark values]
    - Surface: [Light/dark values]
    - Text: [Light/dark values]
    - Borders: [Light/dark values]
    - Code blocks: [Theme]
  </color_palette>

  <typography>
    - [Font stack]
    - Headings: [Style]
    - Body: [Style]
    - Code: [Monospace stack]
    - Message text: [Size, line-height]
  </typography>

  <components>
    <[component_type]>
      - [Style rules]
    </[component_type]>
    <!-- Include: message_bubble, buttons, inputs, cards -->
  </components>

  <animations>
    - [Animation 1]
    - [Animation 2]
    - [6 animations minimum]
  </animations>
</design_system>
```

### Section 9: Key Interactions
```xml
<key_interactions>
  <[primary_flow]>
    1. [Step 1]
    2. [Step 2]
    [9 steps minimum]
  </[primary_flow]>

  <[secondary_flow]>
    1. [Step 1]
    2. [Step 2]
    [8 steps minimum]
  </[secondary_flow]>

  <[tertiary_flow]>
    1. [Step 1]
    2. [Step 2]
    [8 steps minimum]
  </[tertiary_flow]>
</key_interactions>
```

### Section 10: Implementation Steps
```xml
<implementation_steps>
  <step number="1">
    <title>[Step Title]</title>
    <tasks>
      - [Task 1]
      - [Task 2]
      - [6 tasks minimum per step]
    </tasks>
  </step>

  <!-- MUST have 9 steps total -->
</implementation_steps>
```

### Section 11: Success Criteria
```xml
<success_criteria>
  <functionality>
    - [Criterion 1]
    - [6 criteria minimum]
  </functionality>

  <user_experience>
    - [Criterion 1]
    - [6 criteria minimum]
  </user_experience>

  <technical_quality>
    - [Criterion 1]
    - [6 criteria minimum]
  </technical_quality>

  <design_polish>
    - [Criterion 1]
    - [6 criteria minimum]
  </design_polish>
</success_criteria>
```

---

## Output Validation Checklist

Before delivering specification, verify:
- [ ] `<project_specification>` root wrapper present
- [ ] `<project_name>` with descriptive name
- [ ] `<overview>` with 2-4 sentences
- [ ] `<technology_stack>` with ALL subsections
- [ ] `<prerequisites>` with `<environment_setup>`
- [ ] `<core_features>` with ALL 14 categories (adapted names OK)
- [ ] `<database_schema>` with minimum 6 table definitions
- [ ] `<api_endpoints_summary>` with ALL endpoint groups
- [ ] `<ui_layout>` with ALL 5 sections
- [ ] `<design_system>` with ALL 4 subsections
- [ ] `<key_interactions>` with 3 flows
- [ ] `<implementation_steps>` with 9 steps, 6+ tasks each
- [ ] `<success_criteria>` with ALL 4 categories

**If ANY section is incomplete, DO NOT deliver. Complete it first.**

---

## Parallel Agent Deployment

After generating specification, deploy implementation agents:

```
Group A (Launch in parallel):
- Task: leonardo:architecture-agent - Build database and API from spec
- Task: leonardo:frontend-agent - Build UI components from spec
- Task: leonardo:backend-agent - Build server logic from spec

Wait for Group A completion...

Group B (Launch in parallel):
- Task: leonardo:test-agent - Generate tests from features
- Task: leonardo:review-agent - Review code quality
- Task: leonardo:docs-agent - Generate documentation
```

---

## Quality Standards

All specifications must be:
- **Complete** - Every section fully populated
- **Consistent** - No contradictions between sections
- **Specific** - Concrete details, not vague descriptions
- **Actionable** - AI agent can implement directly from spec
- **Testable** - Every feature has clear verification criteria
