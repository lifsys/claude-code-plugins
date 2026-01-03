# Docs Generator Skill

## Purpose

Comprehensive documentation generation for Leonardo-orchestrated projects. Produces OpenAPI specifications, README files, architecture documentation, API references, component documentation, and changelogs from project specifications and implemented code.

---

## Activation Triggers

This skill activates when:
- `/leonardo` orchestration reaches documentation phase
- `docs-agent` is deployed in Group B
- User requests documentation generation
- Code changes require documentation updates

---

## Pre-Generation Checkpoint (MANDATORY AskUserQuestion)

**BEFORE generating documentation, confirm scope with user:**

```
Use AskUserQuestion tool:
- question: "What documentation should be generated?"
  header: "Docs Scope"
  multiSelect: true
  options:
    - label: "README.md (Recommended)"
      description: "Project overview, installation, usage, and quick start"
    - label: "OpenAPI specification"
      description: "API documentation in OpenAPI 3.0 format"
    - label: "Architecture docs"
      description: "System diagrams, data flow, component hierarchy"
    - label: "Component reference"
      description: "Frontend component props, usage examples"
```

```
Use AskUserQuestion tool:
- question: "What level of detail for documentation?"
  header: "Detail"
  multiSelect: false
  options:
    - label: "Comprehensive (Recommended)"
      description: "Full documentation with examples, diagrams, and API reference"
    - label: "Essential"
      description: "README and basic API docs only"
    - label: "Minimal"
      description: "Just README.md with installation and usage"
```

---

## Documentation Types

### 1. OpenAPI Specification

Generates OpenAPI 3.0 specification from API endpoints.

**Output**: `openapi.yaml` or `openapi.json`

```yaml
openapi: 3.0.3
info:
  title: ${project_name} API
  version: ${version}
  description: ${project_overview}
  contact:
    email: ${contact_email}
  license:
    name: ${license}

servers:
  - url: ${base_url}
    description: ${environment}

paths:
  ${generated_from_api_endpoints}

components:
  schemas:
    ${generated_from_database_schema}
  securitySchemes:
    ${generated_from_auth_config}
```

**Generation Rules**:
- Extract paths from `api_endpoints_summary` in spec
- Generate schemas from `database_schema`
- Include request/response examples
- Add security schemes from authentication config
- Validate against OpenAPI 3.0 schema

### 2. README.md

Generates comprehensive project README.

**Output**: `README.md`

```markdown
# ${project_name}

${badges}

${project_overview}

## Features

${feature_list_from_spec}

## Quick Start

### Prerequisites

${prerequisites_from_spec}

### Installation

\`\`\`bash
${installation_commands}
\`\`\`

### Configuration

${environment_variables}

### Running

\`\`\`bash
${run_commands}
\`\`\`

## Documentation

- [API Reference](docs/API.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Components](docs/COMPONENTS.md)

## Development

${development_instructions}

## Testing

\`\`\`bash
${test_commands}
\`\`\`

## Deployment

${deployment_instructions}

## Contributing

${contributing_guidelines}

## License

${license_info}
```

**Badge Generation**:
```markdown
![Build Status](${ci_badge_url})
![Coverage](${coverage_badge_url})
![License](${license_badge_url})
![Version](${version_badge_url})
```

### 3. Architecture Documentation

Generates architecture overview with Mermaid diagrams.

**Output**: `docs/ARCHITECTURE.md`

```markdown
# Architecture

## Overview

${architecture_summary}

## System Diagram

\`\`\`mermaid
graph TB
    subgraph Frontend
        A[React App] --> B[Components]
        B --> C[State Management]
    end

    subgraph Backend
        D[API Layer] --> E[Services]
        E --> F[Database]
    end

    A --> D
\`\`\`

## Data Flow

\`\`\`mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant Database

    User->>Frontend: Action
    Frontend->>API: Request
    API->>Database: Query
    Database-->>API: Result
    API-->>Frontend: Response
    Frontend-->>User: Update
\`\`\`

## Database Schema

\`\`\`mermaid
erDiagram
    ${er_diagram_from_schema}
\`\`\`

## Component Architecture

${component_hierarchy}

## Technology Stack

${technology_table}

## Security Architecture

${security_overview}

## Scalability Considerations

${scalability_notes}
```

### 4. API Reference

Generates detailed API documentation.

**Output**: `docs/API.md`

```markdown
# API Reference

## Base URL

\`${base_url}\`

## Authentication

${auth_documentation}

## Endpoints

### ${category_name}

#### ${endpoint_method} ${endpoint_path}

${endpoint_description}

**Request**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
${parameters_table}

**Request Body**

\`\`\`json
${request_body_example}
\`\`\`

**Response**

| Status | Description |
|--------|-------------|
| 200 | Success |
| 400 | Bad Request |
| 401 | Unauthorized |
| 500 | Server Error |

**Success Response**

\`\`\`json
${success_response_example}
\`\`\`

**Error Response**

\`\`\`json
${error_response_example}
\`\`\`

---

${repeat_for_each_endpoint}

## Error Codes

| Code | Message | Description |
|------|---------|-------------|
${error_codes_table}

## Rate Limiting

${rate_limiting_info}

## Versioning

${api_versioning_info}
```

### 5. Component Documentation

Generates frontend component documentation.

**Output**: `docs/COMPONENTS.md`

```markdown
# Component Reference

## Component Hierarchy

\`\`\`
src/components/
├── layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Sidebar.tsx
├── features/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   └── dashboard/
│       ├── Dashboard.tsx
│       └── widgets/
└── common/
    ├── Button.tsx
    ├── Input.tsx
    └── Modal.tsx
\`\`\`

## Components

### ${ComponentName}

${component_description}

**Props**

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
${props_table}

**Usage**

\`\`\`tsx
import { ${ComponentName} } from '@/components/${path}';

<${ComponentName}
  ${example_props}
/>
\`\`\`

**Styling**

${styling_info}

**Accessibility**

${accessibility_info}

**Related Components**

${related_components}

---

${repeat_for_each_component}

## Hooks

### ${hookName}

${hook_description}

**Parameters**

${hook_parameters}

**Returns**

${hook_returns}

**Usage**

\`\`\`tsx
${hook_usage_example}
\`\`\`

---

${repeat_for_each_hook}

## Context Providers

${context_documentation}
```

### 6. Changelog

Maintains version history.

**Output**: `CHANGELOG.md`

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- ${new_features}

### Changed
- ${changes}

### Fixed
- ${bug_fixes}

### Removed
- ${removed_features}

## [${version}] - ${date}

### Added
${version_added_features}

### Changed
${version_changes}

### Fixed
${version_fixes}

---

${previous_versions}
```

---

## Generation Workflow

### Phase 1: Context Gathering

```python
def gather_documentation_context():
    context = {
        # From project specification
        "spec": read_file("project_specification.xml"),

        # From implemented code
        "api_routes": scan_api_routes("src/"),
        "components": scan_components("src/components/"),
        "database": read_schema("database/schema.sql"),

        # From package configuration
        "package": read_file("package.json"),

        # From existing docs (for updates)
        "existing_readme": read_file("README.md") if exists("README.md") else None,
        "existing_changelog": read_file("CHANGELOG.md") if exists("CHANGELOG.md") else None
    }
    return context
```

### Phase 2: Documentation Generation

```python
def generate_documentation(context):
    docs = {}

    # Generate in parallel
    docs["openapi"] = generate_openapi(context)
    docs["readme"] = generate_readme(context)
    docs["architecture"] = generate_architecture(context)
    docs["api"] = generate_api_reference(context)
    docs["components"] = generate_component_docs(context)
    docs["changelog"] = update_changelog(context)

    return docs
```

### Phase 3: Validation

```python
def validate_documentation(docs):
    validations = {
        "openapi": validate_openapi_schema(docs["openapi"]),
        "readme": validate_markdown(docs["readme"]),
        "architecture": validate_mermaid_diagrams(docs["architecture"]),
        "api": validate_endpoint_coverage(docs["api"]),
        "components": validate_component_coverage(docs["components"]),
        "changelog": validate_changelog_format(docs["changelog"])
    }

    return all(validations.values()), validations
```

### Phase 4: Output

```python
def write_documentation(docs):
    # Write files
    write_file("openapi.yaml", docs["openapi"])
    write_file("README.md", docs["readme"])
    write_file("docs/ARCHITECTURE.md", docs["architecture"])
    write_file("docs/API.md", docs["api"])
    write_file("docs/COMPONENTS.md", docs["components"])
    write_file("CHANGELOG.md", docs["changelog"])

    # Generate summary
    return {
        "files_created": 6,
        "total_lines": count_lines(docs),
        "coverage": calculate_coverage(docs)
    }
```

---

## Extraction Rules

### API Endpoint Extraction

From specification:
```xml
<api_endpoints_summary>
  <endpoint>
    <method>POST</method>
    <path>/api/auth/login</path>
    <description>Authenticate user</description>
  </endpoint>
</api_endpoints_summary>
```

From code (Express):
```javascript
// Scan for route definitions
router.post('/api/auth/login', authController.login);
```

From code (Next.js):
```typescript
// Scan app/api/ directory
// app/api/auth/login/route.ts → POST /api/auth/login
```

### Component Extraction

```typescript
// Extract from JSDoc/TSDoc comments
/**
 * Primary button component with multiple variants.
 *
 * @param variant - Button style variant
 * @param size - Button size
 * @param disabled - Whether button is disabled
 */
export const Button = ({ variant, size, disabled }: ButtonProps) => {
```

### Database Schema Extraction

```sql
-- Parse CREATE TABLE statements
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Generate ER diagram
-- users ||--o{ posts : "has many"
```

---

## Mermaid Diagram Generation

### System Architecture

```python
def generate_system_diagram(spec):
    frontend = spec.technology_stack.frontend
    backend = spec.technology_stack.backend
    database = spec.database_schema

    return f"""
graph TB
    subgraph Client
        A[{frontend.framework}]
    end

    subgraph Server
        B[{backend.framework}]
        C[{backend.api_type}]
    end

    subgraph Data
        D[{database.type}]
    end

    A -->|HTTP/WebSocket| B
    B --> C
    C --> D
"""
```

### ER Diagram

```python
def generate_er_diagram(schema):
    entities = []
    relationships = []

    for table in schema.tables:
        # Entity definition
        entity = f"{table.name} {{"
        for column in table.columns:
            entity += f"\n    {column.type} {column.name}"
        entity += "\n}"
        entities.append(entity)

        # Relationships from foreign keys
        for fk in table.foreign_keys:
            rel = f"{table.name} }}|--o{{ {fk.references} : \"{fk.name}\""
            relationships.append(rel)

    return "erDiagram\n" + "\n".join(entities + relationships)
```

### Sequence Diagram

```python
def generate_sequence_diagram(interaction):
    return f"""
sequenceDiagram
    participant User
    participant {interaction.frontend}
    participant {interaction.backend}
    participant {interaction.database}

    User->>+{interaction.frontend}: {interaction.trigger}
    {interaction.frontend}->>+{interaction.backend}: {interaction.request}
    {interaction.backend}->>+{interaction.database}: {interaction.query}
    {interaction.database}-->>-{interaction.backend}: {interaction.result}
    {interaction.backend}-->>-{interaction.frontend}: {interaction.response}
    {interaction.frontend}-->>-User: {interaction.update}
"""
```

---

## Documentation Quality Rules

### README Requirements

- [ ] Clear project title and description
- [ ] Installation instructions (complete, tested)
- [ ] Configuration section with all env vars
- [ ] Usage examples (at least 3)
- [ ] API documentation link
- [ ] License information
- [ ] Contributing guidelines

### API Documentation Requirements

- [ ] All endpoints documented
- [ ] Request/response examples for each
- [ ] Error codes documented
- [ ] Authentication clearly explained
- [ ] Rate limiting documented
- [ ] Versioning strategy explained

### Architecture Documentation Requirements

- [ ] System overview diagram
- [ ] Data flow diagram
- [ ] Database ER diagram
- [ ] Component hierarchy
- [ ] Technology stack table
- [ ] Security considerations

### Component Documentation Requirements

- [ ] All components documented
- [ ] Props table for each
- [ ] Usage examples
- [ ] Accessibility notes
- [ ] Styling information

---

## Integration with Leonardo

### Input Sources

| Source | Data Extracted |
|--------|----------------|
| `project_specification.xml` | Overview, features, tech stack, endpoints, schema |
| Source code | Actual implementations, props, types |
| Package.json | Version, dependencies, scripts |
| Existing docs | Changelog history, custom sections |

### Output Targets

| File | Directory | Purpose |
|------|-----------|---------|
| `openapi.yaml` | root | API specification |
| `README.md` | root | Project overview |
| `CHANGELOG.md` | root | Version history |
| `ARCHITECTURE.md` | docs/ | System architecture |
| `API.md` | docs/ | Endpoint reference |
| `COMPONENTS.md` | docs/ | Component library |

### Coordination with Other Agents

```yaml
dependencies:
  architecture-agent: "Provides schema and API structure"
  frontend-agent: "Provides component implementations"
  backend-agent: "Provides API implementations"

outputs_to:
  quality-guardian: "Documentation completeness check"
  review-agent: "Documentation accuracy review"
```

---

## Customization

### Template Overrides

Users can provide custom templates in `docs/templates/`:

```
docs/templates/
├── README.template.md
├── API.template.md
├── ARCHITECTURE.template.md
└── COMPONENTS.template.md
```

### Configuration

```yaml
# docs.config.yaml
documentation:
  output_format: "markdown"  # or "html", "pdf"
  include_private: false
  diagram_style: "mermaid"   # or "plantuml"
  code_examples: true
  badge_style: "flat-square"

  readme:
    sections:
      - overview
      - features
      - installation
      - usage
      - api
      - development
      - testing
      - deployment
      - contributing
      - license

  api:
    group_by: "tag"  # or "path"
    include_examples: true

  components:
    include_internal: false
    include_tests: false
```

---

## Usage

### Automatic (via Leonardo)

The skill is automatically invoked during Group B agent deployment:

```
/leonardo build "My App"
  → ... orchestration ...
  → docs-agent deploys
  → docs-generator skill activates
  → Documentation generated
```

### Manual Invocation

```
skill: docs-generator
action: generate | update | validate
scope: all | readme | api | architecture | components | changelog
```

---

## Output Summary

After generation, the skill provides a summary:

```markdown
## Documentation Generated

| Document | Status | Lines | Coverage |
|----------|--------|-------|----------|
| README.md | ✅ Created | 245 | 100% |
| openapi.yaml | ✅ Created | 1,240 | 100% |
| docs/ARCHITECTURE.md | ✅ Created | 312 | 100% |
| docs/API.md | ✅ Created | 890 | 24/24 endpoints |
| docs/COMPONENTS.md | ✅ Created | 456 | 18/18 components |
| CHANGELOG.md | ✅ Updated | 89 | N/A |

Total: 6 files, 3,232 lines
Documentation coverage: 100%
```
