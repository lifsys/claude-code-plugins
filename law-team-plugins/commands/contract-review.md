---
description: Review a contract or agreement for potential issues and red flags
argument-hint: [contract-type]
allowed-tools: Read, Grep, Glob
---

# Contract Review Assistant

Perform a thorough review of a contract or agreement, identifying potential issues, missing clauses, and areas of concern.

## CRITICAL: Approach Selection Required FIRST

**BEFORE reviewing the contract, you MUST determine the user's preferred legal approach using AskUserQuestion tool:**

**Question:** "What legal approach should I use for this contract review?"

**Options:**
1. **Adversarial** - "Find every risk and protect me aggressively"
2. **Collaborative** - "Balanced review that preserves business relationship"
3. **Preventative/Compliance** - "Comprehensive review focused on risk prevention"
4. **Business-Partner** - "Practical review focused on deal flow"

**After selection:** Conduct review using the selected approach's tone, risk tolerance, and recommendations style.

**Reference:** See `/resources/legal-approaches.md` for detailed guidance.

## Instructions

1. If a file path is referenced, read the contract using the Read tool
2. Identify the contract type (if not provided as an argument):
   - Employment agreement
   - Service agreement
   - Partnership/operating agreement
   - Non-disclosure agreement (NDA)
   - Vendor/supplier contract
   - Client contract
   - Licensing agreement
   - Other

3. Review for the following elements:

   **Essential Clauses:**
   - Clear identification of parties
   - Scope of work/services
   - Payment terms and schedule
   - Term and termination conditions
   - Liability and indemnification
   - Dispute resolution/arbitration
   - Governing law and jurisdiction
   - Signatures and dates

   **Red Flags:**
   - Vague or ambiguous language
   - Unfair or one-sided terms
   - Missing termination rights
   - Unclear liability limits
   - Inadequate IP protection
   - Non-compete/non-solicitation concerns
   - Automatic renewal clauses
   - Penalty clauses

   **Missing Protections:**
   - Confidentiality provisions
   - Intellectual property assignment
   - Warranties and representations
   - Force majeure clause
   - Amendment procedures
   - Notice requirements

4. Provide a summary with:
   - Overall assessment (favorable/neutral/unfavorable)
   - Critical issues requiring immediate attention
   - Recommended additions or modifications
   - Questions to ask the other party
   - Suggested next steps

5. Note: This is for informational purposes only and does not constitute legal advice. Recommend consulting a licensed attorney for final review.

## Usage Examples

- /contract-review employment @contracts/offer-letter.pdf
- /contract-review NDA
- /contract-review "service agreement"
