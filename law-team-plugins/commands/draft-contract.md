---
description: Draft a contract or agreement from a template based on the specified type
argument-hint: [contract-type]
---

# Contract Drafting Assistant

Generate a customized contract or agreement based on the type specified and user's specific needs.

## CRITICAL: Approach Selection Required FIRST

**BEFORE drafting the contract, you MUST determine the user's preferred legal approach using AskUserQuestion tool:**

**Question:** "What legal approach should I use for drafting this contract?"

**Options:**
1. **Adversarial** - "Maximum protection, aggressive terms"
2. **Collaborative** - "Balanced terms that work for both parties"
3. **Preventative/Compliance** - "Comprehensive risk mitigation"
4. **Business-Partner** - "Practical, deal-enabling terms"

**After selection:** Draft contract using the selected approach's style, protective language, and risk tolerance.

**Reference:** See `/resources/legal-approaches.md` for detailed guidance.

## Instructions

1. Identify the contract type needed (from arguments or ask):
   - Non-Disclosure Agreement (NDA)
   - Service Agreement / Statement of Work
   - Employment Offer Letter
   - Independent Contractor Agreement
   - Partnership Agreement
   - Operating Agreement (LLC)
   - Client Services Agreement
   - Vendor/Supplier Agreement
   - Software License Agreement
   - Consulting Agreement
   - Freelance Agreement

2. Ask clarifying questions to gather necessary information:
   - Party names and addresses
   - Scope of work/services
   - Payment terms and amounts
   - Duration/term
   - Termination conditions
   - Special requirements or provisions

3. Generate a comprehensive contract including:

   **Standard Clauses:**
   - Parties identification
   - Recitals/background
   - Definitions
   - Scope of services/work
   - Compensation and payment terms
   - Term and termination
   - Confidentiality
   - Intellectual property rights
   - Representations and warranties
   - Indemnification
   - Limitation of liability
   - Dispute resolution
   - Governing law
   - Miscellaneous provisions:
     - Entire agreement
     - Amendments
     - Severability
     - Waiver
     - Notices
     - Assignment
     - Force majeure
   - Signature blocks

4. Customize based on contract type:

   **NDA-specific:**
   - Purpose of disclosure
   - Definition of confidential information
   - Permitted uses
   - Return/destruction obligations
   - Duration of confidentiality
   - Mutual vs. unilateral

   **Employment-specific:**
   - Position and duties
   - Compensation and benefits
   - At-will statement (if applicable)
   - Non-compete/non-solicitation (check state law)
   - Employee handbook acknowledgment
   - Background check authorization

   **Service Agreement-specific:**
   - Detailed scope of work
   - Deliverables and milestones
   - Acceptance criteria
   - Change order process
   - Performance standards

   **Partnership/Operating Agreement-specific:**
   - Capital contributions
   - Profit/loss allocation
   - Management structure
   - Voting rights
   - Buy-sell provisions
   - Dissolution procedures

5. Include helpful annotations:
   - [DRAFTING NOTE: Consider adding X if Y applies]
   - [REVIEW: This clause may need adjustment based on state law]
   - [OPTIONAL: Include this provision if Z is a concern]
   - [REQUIRED: This is mandatory in [state]]

6. Provide a checklist for review:
   - Items to customize/fill in
   - State-specific considerations
   - Optional clauses to consider
   - Attorney review recommendation

7. Add legal disclaimer:
   "This draft is provided for informational purposes only and does not constitute legal advice. It should be reviewed by a licensed attorney in your jurisdiction before use."

8. Suggest next steps:
   - Customization needed
   - Legal review
   - Negotiation points
   - Execution and storage

## Free Template Resources to Reference

When generating contracts, you can reference these free legal template sources:
- LegalTemplates.net
- LawDepot.com
- PandaDoc.com free templates
- Signaturely.com free templates
- Genie AI templates
- Rocket Lawyer (some free options)
- SCORE business templates

## Usage Examples

- /draft-contract NDA "for new software project"
- /draft-contract "service agreement"
- /draft-contract employment "marketing manager"
- /draft-contract "operating agreement" LLC
