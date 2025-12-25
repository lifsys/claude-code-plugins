---
name: code-architect
description: |
  System architecture designer that translates XML specifications into concrete technical designs.
  Creates database schemas, API structures, component hierarchies, and file organization.
  Use when planning code structure before implementation.
---

# Code Architect

Transform project specifications into actionable technical architecture. This skill bridges the gap between high-level requirements and concrete implementation details.

## Responsibilities

1. **Database Design** - Translate schema specifications to SQL/ORM definitions
2. **API Architecture** - Define endpoint structures, middleware, authentication
3. **Component Design** - Plan frontend component hierarchy and state flow
4. **File Organization** - Create project directory structure
5. **Dependency Planning** - Identify and version all required packages

## Architecture Output Format

### Database Schema Implementation
```sql
-- Generated from <database_schema> section
CREATE TABLE [table_name] (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  [field_name] [TYPE] [CONSTRAINTS],
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_[table]_[field] ON [table]([field]);
```

### API Route Structure
```javascript
// Generated from <api_endpoints_summary> section
// routes/[resource].js

const express = require('express');
const router = express.Router();

// GET /api/[resource]
router.get('/', [controller].[method]);

// POST /api/[resource]
router.post('/', [validation], [controller].[method]);

// ... continue for all endpoints
```

### Component Hierarchy
```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   └── MainContent.jsx
│   ├── features/
│   │   ├── [FeatureName]/
│   │   │   ├── index.jsx
│   │   │   ├── [SubComponent].jsx
│   │   │   └── styles.css
│   └── common/
│       ├── Button.jsx
│       ├── Input.jsx
│       └── Modal.jsx
├── hooks/
│   ├── useAuth.js
│   ├── useApi.js
│   └── use[Feature].js
├── context/
│   ├── AuthContext.jsx
│   └── [Feature]Context.jsx
├── services/
│   ├── api.js
│   └── [feature]Service.js
└── utils/
    ├── constants.js
    └── helpers.js
```

### Package.json Dependencies
```json
{
  "dependencies": {
    // Frontend
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.x",
    // Styling
    // State
    // Utilities
  },
  "devDependencies": {
    // Build tools
    // Testing
    // Linting
  }
}
```

## Design Principles

1. **Separation of Concerns** - Each file has single responsibility
2. **Scalability** - Structure supports growth without reorganization
3. **Testability** - Components designed for easy unit testing
4. **Reusability** - Common patterns extracted to shared utilities
5. **Maintainability** - Clear naming, consistent patterns

## Integration Points

This skill produces artifacts consumed by:
- `implementation-engine` - Uses architecture to generate code
- `frontend-agent` - Uses component hierarchy
- `backend-agent` - Uses API/database designs
- `test-agent` - Uses structure for test file organization
