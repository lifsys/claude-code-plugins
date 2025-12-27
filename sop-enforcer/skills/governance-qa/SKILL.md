# Governance Q&A Skill

**Purpose:** Interactive SOP development and governance guidance

**Invocation:** Use skill "governance-qa" to start interactive SOP development

---

## When to Use This Skill

Use this skill when you need to:
- **Develop a new SOP** - Interactive Q&A to ensure completeness
- **Understand governance rules** - Ask questions about authority, violations, compliance
- **Review SOP quality** - Check if existing SOP meets standards
- **Navigate governance system** - Find relevant SOPs, understand hierarchy

**Examples:**
```
User: "I need to create an SOP for deployment process"
→ Use governance-qa skill

User: "Can I modify ARCHITECTURE.md?"
→ Use governance-qa skill (authority check)

User: "Is this SOP complete?"
→ Use governance-qa skill (quality review)
```

---

## What This Skill Does

When activated, this skill:

1. **Invokes sop-architect agent** for interactive development
2. **Provides governance context** from all relevant SOPs
3. **Asks clarifying questions** using Socratic method
4. **Validates completeness** against SOP patterns
5. **Guides through structure** section by section
6. **Checks quality** before finalization

---

## Workflow

### Mode 1: New SOP Development

**Step 1: Discovery**
```
I'll help you develop this SOP. Let me start with discovery questions:

1. Purpose: What problem does this SOP solve?
2. Scope: What's in scope? Out of scope?
3. Audience: Who will use this?
4. Authority: What governance level? (0-4)
5. Enforcement: How will this be enforced?
6. Dependencies: What does this depend on?
```

**Step 2: Structure Proposal**
```
Based on your answers, I propose this structure:

# ###-SOP-[NAME]

[Show proposed sections]

Does this structure work for you? Should we add/modify anything?
```

**Step 3: Section-by-Section Development**
```
Let's develop the Purpose section:

Based on what you told me, here's a draft:

"This SOP governs [X] to ensure [Y] by defining [Z]."

Does this capture your intent? Any modifications?
```

**Step 4: Validation**
```
Let me validate completeness:

Checklist:
  ✅ Purpose clearly defined
  ✅ Scope has in/out boundaries
  ⚠️  Missing: Enforcement mechanism
  ✅ Examples provided
  ✅ Success criteria measurable

Should we add an enforcement section?
```

**Step 5: Finalization**
```
SOP development complete. I'll save this as:

content/drafts/###-SOP-[NAME].md

Next steps:
1. Review draft yourself
2. Request PRB review if significant
3. Deploy to specs/core/ when approved
4. Update indexes
```

### Mode 2: Authority Check

**Quick Response:**
```
You asked: "Can I modify ARCHITECTURE.md?"

Session Type: feature-dev
File: ARCHITECTURE.md
Authority Level: DRAFT (can draft, requires approval)

Answer: You can draft changes in content/drafts/, but cannot modify
        ARCHITECTURE.md directly. After drafting, request review.

Reference: 208-SOP-SESSION-DOCUMENTATION-AUTHORITY
```

### Mode 3: Quality Review

**Analysis:**
```
Reviewing: specs/core/###-SOP-NAME.md

Quality Checklist:
  ✅ Purpose: Clear and actionable
  ✅ Scope: Well-defined boundaries
  ❌ Examples: Missing (add 2-3 examples)
  ⚠️  Success Criteria: Vague (make measurable)
  ✅ Cross-references: Accurate
  ✅ Naming: Follows conventions

Score: 80/100 (GOOD - minor improvements needed)

Recommended changes:
1. Add examples for Rules 3 and 5
2. Make success criteria measurable (use numbers)
3. Consider adding failure mode section
```

### Mode 4: Navigation Help

**Guidance:**
```
You asked: "Where do I find rules about file naming?"

Relevant SOPs:
1. 001-SOP-NAMING-CONVENTIONS (Primary authority)
   Location: specs/core/001-SOP-NAMING-CONVENTIONS.md
   Covers: File, directory, SOP naming patterns

2. 002-SOP-FILE-ORGANIZATION (Related)
   Location: specs/core/002-SOP-FILE-ORGANIZATION.md
   Covers: Directory structure, file placement

3. Validation: src/tools/validate-naming.sh
   Use to check compliance

Quick answer: All SOP files follow ###-SOP-NAME.md pattern
```

---

## Tools This Skill Uses

**Agents:**
- sop-architect (primary - interactive development)
- sop-enforcer (for authority checks)

**Direct Tools:**
- Read (to examine existing SOPs)
- Grep (to search for patterns)
- Glob (to find related files)

**Does NOT use:**
- Write (agents handle writing)
- Edit (no direct modification)

---

## Example Interactions

### Example 1: Complete SOP Development

**User:** "I need an SOP for API versioning"

**Skill Response:**
```
I'll help you develop a comprehensive API Versioning SOP.

Let me start with discovery:

1. **Purpose Questions:**
   - Why do you need API versioning? (Breaking changes? Multiple clients?)
   - What problems have you had without versioning?
   - What should versioning enable?

2. **Scope Questions:**
   - All APIs (REST, GraphQL, WebSocket)?
   - Internal APIs only, or public too?
   - Existing APIs, or new ones only?

3. **Technical Approach:**
   - URL-based (/v1/, /v2/)?
   - Header-based (Accept: application/vnd.api+json; version=2)?
   - Both?

Let's start with purpose - why do you need this SOP?
```

*User answers...*

```
Perfect. Based on your answers:

# 210-SOP-API-VERSIONING

**Purpose:** Ensure backward compatibility and smooth API evolution through
            systematic versioning for all public REST APIs

**Scope:**
In Scope:
- All public REST APIs (/api/ prefix)
- Breaking changes requiring new version
- Deprecation timeline (min 6 months)

Out of Scope:
- Internal microservice APIs (use semver)
- WebSocket APIs (separate SOP)
- Experimental APIs (/api/beta/)

Does this scope work? Should I adjust anything?
```

*Continue iterating...*

### Example 2: Authority Check

**User:** "Can I update the README?"

**Skill Response:**
```
Checking authority for: README.md

Session Type: feature-dev (detected from agent card)
File: README.md
Authority: PROPOSE (can draft, requires review)

✅ You CAN:
   - Draft changes in proposals/PROPOSAL-README-UPDATE.md
   - Propose changes for review

❌ You CANNOT:
   - Modify README.md directly
   - Deploy changes without approval

Recommended workflow:
1. Draft your changes in proposals/
2. Request strategos-session review
3. After approval, strategos will update README.md

Reference: 208-SOP-SESSION-DOCUMENTATION-AUTHORITY (Authority Matrix)
```

### Example 3: Quality Review

**User:** "Review specs/core/205-SOP-TESTING.md"

**Skill Response:**
```
Analyzing: 205-SOP-TESTING.md

═══════════════════════════════════════════════════════
QUALITY REVIEW REPORT
═══════════════════════════════════════════════════════

Overall Score: 75/100 (NEEDS IMPROVEMENT)

Completeness:
  ✅ Purpose: Clear
  ✅ Scope: Well-defined
  ❌ Examples: Missing entirely
  ⚠️  Success Criteria: Present but vague
  ✅ Structure: Follows pattern
  ❌ Enforcement: Not defined

Clarity:
  ✅ Language: Clear and concise
  ⚠️  Technical terms: Some undefined (TDD, BDD)
  ✅ Formatting: Consistent

Actionability:
  ⚠️  Rules: Some are philosophical, not actionable
  ❌ No code examples for test patterns
  ✅ Clear ownership defined

CRITICAL ISSUES:
1. No examples - Add 3-5 test examples
2. No enforcement mechanism - How is compliance checked?
3. Vague success criteria - "More tests" is not measurable

RECOMMENDATIONS:
1. Add test examples (unit, integration, e2e)
2. Define enforcement (pre-commit hook? CI check?)
3. Make success criteria measurable:
   - "Coverage >80%" instead of "Good coverage"
   - "Test run <5min" instead of "Fast tests"

Would you like me to help address these issues?
```

---

## Configuration

**Settings in plugin.json:**
```json
{
  "qa_mode": "interactive",
  "depth": "comprehensive",
  "validation_strictness": "high",
  "auto_fix_suggestions": true
}
```

**qa_mode options:**
- `interactive`: Full Q&A (default)
- `quick`: Fast checks only
- `guided`: Step-by-step with examples

**depth options:**
- `comprehensive`: All sections validated
- `standard`: Core sections only
- `minimal`: Basic checks

---

## Success Metrics

**This skill is successful if:**
- ✅ SOPs developed are complete (no missing sections)
- ✅ Sessions understand what's needed through Q&A
- ✅ Quality improves (higher scores on review)
- ✅ Time to complete SOP decreases (efficiency)

**This skill has failed if:**
- ❌ SOPs still incomplete after using skill
- ❌ Sessions confused about process
- ❌ Low-quality SOPs still produced
- ❌ Takes longer than manual development

---

## Invocation Examples

**From Command Line:**
```bash
# Start interactive SOP development
claude --skill governance-qa

# Quick authority check
claude --skill governance-qa --check-authority specs/REQUIREMENTS.md

# Review existing SOP
claude --skill governance-qa --review specs/core/###-SOP-NAME.md
```

**From Chat:**
```
User: "Use governance-qa skill to create deployment SOP"
Assistant: [Activates skill, starts Q&A]

User: "Can I modify this file?"
Assistant: [Uses skill for authority check]
```

---

**Remember:** This skill is your gateway to governance expertise. It combines sop-architect's knowledge with sop-enforcer's rules to provide comprehensive guidance.

**When in doubt about governance, use this skill.**
