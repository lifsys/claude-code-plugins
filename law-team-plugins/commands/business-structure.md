---
description: Get guidance on choosing the right business structure for your venture
argument-hint: [current-situation]
---

# Business Structure Advisor

Help entrepreneurs choose the optimal business structure based on their specific situation and goals.

## CRITICAL: Approach Selection Required FIRST

**BEFORE providing business structure guidance, you MUST determine the user's preferred legal approach using AskUserQuestion tool:**

**Question:** "What legal approach should I use for business structure guidance?"

**Options:**
1. **Adversarial** - "Maximum asset protection and lawsuit defense"
2. **Collaborative** - "Structure for partnerships and growth"
3. **Preventative/Compliance** - "By-the-book, compliance-ready formation"
4. **Business-Partner** - "Quick start with appropriate protection"

**After selection:** Provide guidance using the selected approach's priorities and risk profile.

**Reference:** See `/resources/legal-approaches.md` for detailed guidance.

## Instructions

1. Gather information about the business:
   - Number of owners
   - Revenue expectations
   - Liability concerns
   - Tax situation
   - Growth plans
   - Industry type
   - State of operation

2. Explain each business structure option:

   **Sole Proprietorship:**
   - Pros: Simple, low cost, complete control, minimal paperwork
   - Cons: Unlimited personal liability, harder to raise capital, no separation from owner
   - Best for: Single owner, low-risk businesses, testing business ideas
   - Tax treatment: Pass-through to personal return
   - Formation: Minimal requirements, may need DBA

   **Partnership (General/Limited):**
   - Pros: Shared resources, pass-through taxation, relatively simple
   - Cons: Joint liability (GP), potential for disputes
   - Best for: 2+ owners, professional services, real estate
   - Tax treatment: Pass-through to partners
   - Formation: Partnership agreement required

   **Limited Liability Company (LLC):**
   - Pros: Limited liability, flexible management, pass-through taxation option
   - Cons: State-specific rules, self-employment taxes
   - Best for: Small to medium businesses, real estate, most startups
   - Tax treatment: Flexible (pass-through or corporate)
   - Formation: Articles of organization, operating agreement

   **C Corporation:**
   - Pros: Limited liability, easy to raise capital, perpetual existence
   - Cons: Double taxation, complex compliance, expensive
   - Best for: High-growth companies, seeking VC funding
   - Tax treatment: Entity-level taxation
   - Formation: Articles of incorporation, bylaws, board required

   **S Corporation:**
   - Pros: Limited liability, pass-through taxation, salary + dividends
   - Cons: Ownership restrictions, strict requirements
   - Best for: Small businesses wanting corporate structure with pass-through tax
   - Tax treatment: Pass-through to shareholders
   - Formation: Incorporate then elect S status

   **Benefit Corporation / B-Corp:**
   - Pros: Social mission recognition, stakeholder consideration
   - Cons: Additional reporting, not available in all states
   - Best for: Social enterprises, mission-driven companies
   - Tax treatment: Like C-Corp
   - Formation: Special incorporation process

3. Provide a comparison table for the user's specific situation

4. Recommend the 2-3 best options with rationale

5. Outline next steps for forming the recommended structure:
   - Required filings
   - Estimated costs
   - Timeline
   - Ongoing compliance requirements

6. Remind user to consult with a business attorney and tax professional before making final decision

## Usage Examples

- /business-structure "2 co-founders planning tech startup"
- /business-structure "solo consultant"
- /business-structure
