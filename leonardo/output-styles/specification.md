---
name: specification
description: |
  Output style for XML project specifications. Ensures consistent formatting of specification
  documents with proper tag structure, indentation, and completeness.
---

# Specification Output Style

Format all project specifications using this style guide.

## XML Structure Rules

### Indentation
- Use 2 spaces for each nesting level
- Align closing tags with opening tags
- Keep content on same line for single values

### Tag Formatting
```xml
<parent_tag>
  <child_tag>Single line value</child_tag>

  <list_tag>
    - First item
    - Second item
    - Third item
  </list_tag>

  <nested_parent>
    <nested_child>
      - Nested list item 1
      - Nested list item 2
    </nested_child>
  </nested_parent>
</parent_tag>
```

### Section Separators
Use blank lines between major sections:
```xml
<project_specification>
  <project_name>Name</project_name>

  <overview>
    Description text...
  </overview>

  <technology_stack>
    ...
  </technology_stack>
</project_specification>
```

## Content Guidelines

### Project Name
Format: `[Name] - [Brief Descriptor]`
```xml
<project_name>ChatAssist - AI-Powered Customer Support Platform</project_name>
```

### Overview
- 2-4 sentences
- Include: what, purpose, users, differentiators
- Mention design philosophy
```xml
<overview>
  ChatAssist is a modern customer support platform powered by Claude AI. It enables
  support teams to handle customer inquiries efficiently with AI-assisted responses
  and automated routing. Built with React and Node.js, it emphasizes clean design
  and seamless agent-AI collaboration.
</overview>
```

### Feature Lists
- Use `-` for list items
- One feature per line
- Be specific and actionable
```xml
<chat_interface>
  - Clean, centered chat layout with message bubbles
  - Streaming message responses with typing indicator
  - Markdown rendering with proper formatting
  - Code blocks with syntax highlighting and copy button
</chat_interface>
```

### Database Tables
- List fields with types
- Group related fields
```xml
<users>
  - id INTEGER PRIMARY KEY
  - email TEXT UNIQUE NOT NULL
  - password_hash TEXT NOT NULL
  - name TEXT, avatar_url TEXT
  - created_at DATETIME, updated_at DATETIME
  - preferences JSON
</users>
```

### API Endpoints
- Format: `METHOD /path`
- Group by resource
```xml
<conversations>
  - GET /api/conversations
  - POST /api/conversations
  - GET /api/conversations/:id
  - PUT /api/conversations/:id
  - DELETE /api/conversations/:id
</conversations>
```

### Implementation Steps
- Number steps sequentially
- Include 6+ tasks per step
```xml
<step number="1">
  <title>Setup Project Foundation</title>
  <tasks>
    - Initialize Express server
    - Configure SQLite database
    - Set up authentication middleware
    - Create base API routes
    - Implement health check endpoint
    - Configure environment variables
  </tasks>
</step>
```

## Validation Rules

Before outputting specification:
1. All required sections present
2. All lists meet minimum counts
3. No placeholder text (`[TODO]`, `...`, etc.)
4. Consistent formatting throughout
5. Valid XML structure (can be parsed)

## Example Output

```xml
<project_specification>
  <project_name>TaskFlow - Team Project Management</project_name>

  <overview>
    TaskFlow is a lightweight project management tool designed for small
    development teams. It provides kanban boards, time tracking, and team
    collaboration features. Built with Vue 3 and FastAPI, it prioritizes
    speed and simplicity over feature bloat.
  </overview>

  <technology_stack>
    <frontend>
      <framework>Vue 3 with Vite</framework>
      <styling>Tailwind CSS via CDN</styling>
      <state_management>Pinia for global state</state_management>
    </frontend>
    <backend>
      <runtime>Python 3.12 with FastAPI</runtime>
      <database>PostgreSQL with SQLAlchemy</database>
    </backend>
  </technology_stack>

  <!-- Continue with all sections... -->
</project_specification>
```
