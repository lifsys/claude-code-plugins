---
name: implementation-engine
description: |
  Core code generation engine that transforms architectural designs into production code.
  Generates complete, working implementations following established patterns and best practices.
  Use when ready to write actual code from specifications or architecture documents.
---

# Implementation Engine

Generate production-quality code from specifications and architectural designs. This skill produces complete, working implementations - not scaffolds or stubs.

## Code Generation Standards

### Completeness Requirements
- Every function fully implemented (no TODO comments)
- All error handling in place
- All edge cases considered
- All imports/dependencies included
- Ready to run without modification

### Quality Standards
- ESLint/Prettier compliant
- TypeScript strict mode compatible
- Proper error boundaries
- Performance optimized
- Security best practices

## Implementation Patterns

### React Component Pattern
```jsx
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './[Component].module.css';

/**
 * [Component Description]
 * @param {Object} props
 * @param {string} props.[propName] - [description]
 */
export function [ComponentName]({ [props] }) {
  // State
  const [state, setState] = useState(initialState);

  // Effects
  useEffect(() => {
    // Side effect logic
    return () => {
      // Cleanup
    };
  }, [dependencies]);

  // Handlers
  const handleEvent = useCallback((event) => {
    // Handler logic
  }, [dependencies]);

  // Render
  return (
    <div className={styles.container}>
      {/* Component content */}
    </div>
  );
}

[ComponentName].propTypes = {
  [propName]: PropTypes.[type].isRequired,
};

export default [ComponentName];
```

### Express API Pattern
```javascript
const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

/**
 * [Endpoint Description]
 * @route [METHOD] /api/[resource]
 * @access [Public/Private]
 */
router.[method](
  '/',
  [
    // Validation middleware
    body('[field]').[validators](),
  ],
  async (req, res, next) => {
    try {
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Business logic
      const result = await service.[method](req.body);

      // Response
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
```

### Database Service Pattern
```javascript
const db = require('../config/database');

class [Entity]Service {
  /**
   * Create new [entity]
   * @param {Object} data - [Entity] data
   * @returns {Object} Created [entity]
   */
  static async create(data) {
    const stmt = db.prepare(`
      INSERT INTO [table] ([fields])
      VALUES ([placeholders])
    `);

    const result = stmt.run([...Object.values(data)]);
    return this.findById(result.lastInsertRowid);
  }

  /**
   * Find [entity] by ID
   * @param {number} id - [Entity] ID
   * @returns {Object|null} [Entity] or null
   */
  static async findById(id) {
    const stmt = db.prepare('SELECT * FROM [table] WHERE id = ?');
    return stmt.get(id);
  }

  /**
   * Find all [entities] with pagination
   * @param {Object} options - Query options
   * @returns {Array} List of [entities]
   */
  static async findAll({ page = 1, limit = 20, ...filters } = {}) {
    const offset = (page - 1) * limit;
    const stmt = db.prepare(`
      SELECT * FROM [table]
      WHERE 1=1
      ${this.buildWhereClause(filters)}
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `);
    return stmt.all(limit, offset);
  }

  // Additional CRUD methods...
}

module.exports = [Entity]Service;
```

## Implementation Workflow

### Step 1: Foundation Setup
1. Create package.json with all dependencies
2. Initialize database schema
3. Set up configuration files
4. Create directory structure

### Step 2: Backend Implementation
1. Database models/services
2. API routes with validation
3. Authentication middleware
4. Error handling middleware
5. Streaming endpoints (if applicable)

### Step 3: Frontend Implementation
1. Layout components
2. Feature components
3. State management setup
4. API service layer
5. Routing configuration

### Step 4: Integration
1. Connect frontend to backend
2. Set up environment variables
3. Create init script
4. Test end-to-end flow

## Verification Protocol

After implementation, verify:
- [ ] Server starts without errors
- [ ] Database migrations run successfully
- [ ] All API endpoints respond correctly
- [ ] Frontend renders without console errors
- [ ] Authentication flow works
- [ ] Core features functional

## Output Integration

This skill produces code consumed by:
- `test-agent` - Generates tests for implemented code
- `review-agent` - Reviews code quality
- `quality-guardian` - Validates against success criteria
