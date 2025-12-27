---
description: Generate a comprehensive legal checklist for starting or maintaining a business
argument-hint: [business-type] [stage]
---

# Legal Checklist Generator

Generate a comprehensive legal compliance checklist based on the business type and stage provided.

## CRITICAL: Approach Selection Required FIRST

**BEFORE generating the checklist, you MUST determine the user's preferred legal approach using AskUserQuestion tool:**

**Question:** "What legal approach should I use for this compliance checklist?"

**Options:**
1. **Adversarial** - "Maximum protection against all threats"
2. **Collaborative** - "Balanced for partnerships and relationships"
3. **Preventative/Compliance** - "Comprehensive risk prevention"
4. **Business-Partner** - "Practical essentials for business launch"

**After selection:** Generate checklist using the selected approach's priorities and thoroughness level.

**Reference:** See `/resources/legal-approaches.md` for detailed guidance.

## Instructions

1. Identify the business type and stage from the arguments (or ask if not provided)
2. Create a detailed checklist covering:
   - Core legal foundations (business structure, registration, tax IDs)
   - Required licenses and permits (federal, state, local)
   - Intellectual property protection needs
   - Essential contracts and agreements
   - Employment law requirements (if applicable)
   - Insurance requirements
   - Privacy and data protection compliance
   - Industry-specific regulations

3. For each item, provide:
   - Description of the requirement
   - Why it's important
   - Typical timeline or deadline
   - Where to file/apply
   - Estimated costs (if applicable)

4. Organize the checklist by priority:
   - Critical (must do immediately)
   - High priority (within 30 days)
   - Medium priority (within 90 days)
   - Ongoing compliance

5. Include links to official resources and forms where applicable

## Examples

- /legal-checklist "tech startup" "pre-launch"
- /legal-checklist LLC formation
- /legal-checklist "e-commerce business" operating
