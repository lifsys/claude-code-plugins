---
description: Check compliance status for business operations and identify gaps
argument-hint: [compliance-area]
---

# Compliance Status Checker

Assess current compliance status and identify gaps in business legal requirements.

## CRITICAL: Approach Selection Required FIRST

**BEFORE performing compliance check, you MUST determine the user's preferred legal approach using AskUserQuestion tool:**

**Question:** "What legal approach should I use for this compliance assessment?"

**Options:**
1. **Adversarial** - "Defend against regulatory enforcement"
2. **Collaborative** - "Work cooperatively with regulators"
3. **Preventative/Compliance** - "Comprehensive audit-ready assessment"
4. **Business-Partner** - "Practical, risk-calibrated compliance"

**After selection:** Conduct assessment using the selected approach's risk tolerance and recommendations style.

**Reference:** See `/resources/legal-approaches.md` for detailed guidance.

## Instructions

1. Determine the compliance area to check (from arguments or ask):
   - Employment law compliance
   - Data privacy compliance (GDPR, CCPA, etc.)
   - Industry-specific regulations
   - Tax compliance
   - Workplace safety (OSHA)
   - Environmental regulations
   - General business compliance

2. For the specified area, review:

   **Employment Law:**
   - Employee classification (exempt vs. non-exempt)
   - Wage and hour compliance
   - Required workplace postings
   - Employee handbook and policies
   - I-9 and employment eligibility verification
   - Anti-discrimination compliance
   - Leave policies (FMLA, state leave laws)
   - Workers' compensation insurance

   **Data Privacy:**
   - Privacy policy existence and accuracy
   - Data collection practices
   - User consent mechanisms
   - Data retention policies
   - Breach notification procedures
   - Third-party vendor agreements
   - International data transfers

   **Business Operations:**
   - Business licenses current and valid
   - Annual reports filed
   - Tax registrations up to date
   - Insurance policies active
   - Corporate formalities maintained
   - Required permits obtained

3. Generate a compliance report with:
   - Compliant items (green)
   - Items requiring attention (yellow)
   - Critical gaps or violations (red)
   - Recommended actions with timelines
   - Resources for coming into compliance

4. Prioritize by risk level:
   - High risk: Potential fines, penalties, or legal action
   - Medium risk: Could lead to issues if not addressed
   - Low risk: Best practices but not immediately critical

## Usage Examples

- /compliance-check employment
- /compliance-check "data privacy"
- /compliance-check
