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

---

## Database Migration Strategy

### Migration Philosophy

Database migrations are versioned, reversible schema changes that enable:
- Safe production deployments
- Rollback capability
- Team collaboration on schema changes
- Audit trail of database evolution

### Migration File Structure

```
database/
├── migrations/
│   ├── 20260102_001_create_users.sql
│   ├── 20260102_002_create_posts.sql
│   ├── 20260103_001_add_avatar_to_users.sql
│   └── 20260103_002_create_comments.sql
├── seeds/
│   ├── 001_initial_users.sql
│   └── 002_sample_data.sql
└── schema.sql  (current full schema)
```

### Migration Naming Convention

```
YYYYMMDD_NNN_description.sql

Where:
- YYYYMMDD = Date of creation
- NNN = Sequence number for that day (001, 002, ...)
- description = Snake_case description of change
```

### Migration File Format

```sql
-- Migration: 20260102_001_create_users
-- Description: Create users table with authentication fields
-- Author: architecture-agent
-- Created: 2026-01-02T10:00:00Z

-- ==================== UP ====================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100),
    avatar_url TEXT,
    role VARCHAR(20) DEFAULT 'user',
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ==================== DOWN ====================

DROP TRIGGER IF EXISTS update_users_updated_at ON users;
DROP FUNCTION IF EXISTS update_updated_at_column();
DROP TABLE IF EXISTS users;
```

### Migration Types

| Type | Description | Example |
|------|-------------|---------|
| `create_table` | New table creation | `create_users.sql` |
| `add_column` | Add column to existing table | `add_avatar_to_users.sql` |
| `drop_column` | Remove column (DESTRUCTIVE) | `drop_legacy_field.sql` |
| `add_index` | Create new index | `add_email_index.sql` |
| `add_constraint` | Add foreign key, unique, etc. | `add_posts_user_fk.sql` |
| `modify_column` | Change column type/constraints | `change_role_to_enum.sql` |
| `data_migration` | Transform existing data | `migrate_avatars_to_s3.sql` |

### Rollback Procedures

#### Safe Rollback (Non-Destructive)
```sql
-- Rollback: 20260103_001_add_avatar_to_users

-- DOWN (Safe - column can be re-added)
ALTER TABLE users DROP COLUMN IF EXISTS avatar_url;
```

#### Destructive Rollback (Requires Confirmation)
```sql
-- Rollback: 20260102_001_create_users
-- WARNING: DESTRUCTIVE - All user data will be lost!

-- DOWN
DROP TABLE IF EXISTS users CASCADE;

-- Recovery: Restore from backup if needed
-- pg_restore -d mydb -t users backup.dump
```

### Migration Execution

```bash
# Apply all pending migrations
npm run migrate:up

# Rollback last migration
npm run migrate:down

# Rollback to specific version
npm run migrate:to 20260102_001

# Check migration status
npm run migrate:status

# Generate new migration
npm run migrate:create add_column_to_users
```

### Production Safety Checks

Before applying migrations in production:

```yaml
safety_checklist:
  - [ ] Migration tested in staging environment
  - [ ] DOWN migration tested and verified
  - [ ] Backup created before applying
  - [ ] No data loss in UP migration
  - [ ] Performance impact assessed (large tables)
  - [ ] Lock timeout configured for ALTER TABLE
  - [ ] Rollback plan documented
  - [ ] Team notified of deployment
```

### Large Table Migration Patterns

For tables with millions of rows:

```sql
-- Pattern 1: Add column as nullable first
ALTER TABLE large_table ADD COLUMN new_field VARCHAR(100);

-- Pattern 2: Backfill in batches
DO $$
DECLARE
    batch_size INT := 10000;
    rows_updated INT;
BEGIN
    LOOP
        UPDATE large_table
        SET new_field = 'default_value'
        WHERE new_field IS NULL
        LIMIT batch_size;

        GET DIAGNOSTICS rows_updated = ROW_COUNT;
        EXIT WHEN rows_updated = 0;

        COMMIT;
        PERFORM pg_sleep(0.1);  -- Rate limiting
    END LOOP;
END $$;

-- Pattern 3: Add constraint after backfill
ALTER TABLE large_table ALTER COLUMN new_field SET NOT NULL;
```

### Seed Data Management

```sql
-- seeds/001_initial_users.sql
-- Purpose: Create default admin user for new deployments

INSERT INTO users (email, password_hash, name, role)
VALUES ('admin@example.com', '$2b$10$...', 'Admin', 'admin')
ON CONFLICT (email) DO NOTHING;
```

### Migration Versioning Table

The system tracks applied migrations:

```sql
CREATE TABLE schema_migrations (
    version VARCHAR(100) PRIMARY KEY,
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    execution_time_ms INTEGER,
    checksum VARCHAR(64)
);
```

### Integration with Quality Guardian

Quality-guardian validates migrations:

```yaml
migration_validation:
  - syntax_check: "Migration parses without errors"
  - down_exists: "Every UP has corresponding DOWN"
  - naming_convention: "Follows YYYYMMDD_NNN pattern"
  - no_data_loss: "UP migration preserves existing data"
  - idempotent: "Can be run multiple times safely"
  - performance: "No long-running locks on production tables"
```

---

## Integration Points

This skill produces artifacts consumed by:
- `implementation-engine` - Uses architecture to generate code
- `frontend-agent` - Uses component hierarchy
- `backend-agent` - Uses API/database designs
- `test-agent` - Uses structure for test file organization
- `quality-guardian` - Validates migration safety and completeness

---

## Framework-Specific Architecture

### Next.js 16 Detection

When `technology_stack.frontend.framework` is "Next.js 16" or includes AI/streaming features:

**Apply God Tier Patterns** from `references/nextjs-16-god-tier.md`:

| Pattern | Application |
|---------|-------------|
| **Drizzle ORM** | Use Drizzle instead of Prisma for serverless environments |
| **Server Actions** | Prefer over API routes for mutations |
| **Hybrid Composition** | RSC for data, Client Components for interactivity |
| **streamUI** | For AI features, use Vercel AI SDK Generative UI |

**Architecture Adjustments:**
```
app/
├── actions/           # Server Actions (mutations)
├── db/
│   ├── schema.ts     # Drizzle schema
│   └── index.ts      # Drizzle client
├── components/
│   ├── server/       # RSC components (data fetching)
│   └── client/       # 'use client' islands
└── lib/
    └── ai/           # AI SDK integrations
```

**Detection Trigger:**
- User mentions "Next.js 16", "AI", "streaming UI", "generative"
- Spec includes `streamUI`, `Vercel AI SDK`, or `Drizzle`

→ Automatically apply god tier patterns from reference documentation.
