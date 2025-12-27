---
name: Business Structure Advisory
description: Provide expert guidance on choosing and forming business legal structures (sole proprietorship, LLC, corporation, partnership). Use when the user asks about business formation, entity selection, business structure comparison, or incorporating their business.
---

# Business Structure Advisory Skill

This skill provides comprehensive guidance on selecting and establishing the optimal business legal structure.

## CRITICAL: Approach Selection Required

**BEFORE proceeding with any business structure work, you MUST determine the user's preferred legal approach.**

Use the `AskUserQuestion` tool with these four options:

**Question:** "What legal approach best fits your business formation situation?"

**Options:**
1. **Adversarial** - "Maximize legal protection against all threats" (Asset protection, lawsuit defense priority)
2. **Collaborative** - "Structure for partnerships and joint ventures" (Flexibility, multiple stakeholders, growth)
3. **Preventative/Compliance** - "Set up properly to avoid future problems" (By-the-book formation, compliance-ready)
4. **Business-Partner** - "Get started quickly with appropriate protection" (Balanced approach, speed and protection)

**After selection:** Adopt the selected approach for ALL structure recommendations, formation guidance, and operational advice.

**Reference:** See `/resources/legal-approaches.md` for comprehensive documentation on each approach.

## When to Use This Skill

Activate this skill when the user:
- Asks about forming a business or "what type of business should I create"
- Wants to compare business structures (LLC vs. corporation, etc.)
- Is deciding between sole proprietorship, partnership, LLC, or corporation
- Asks about business registration or incorporation
- Wants to understand liability protection options
- Needs guidance on tax implications of different structures
- Is considering changing their business structure

## Core Business Structures

### 1. Sole Proprietorship

**Overview:** The simplest business structure where the business and owner are legally the same entity.

**Advantages:**
- Minimal startup costs and paperwork
- Complete control over business decisions
- Simple tax filing (Schedule C on personal return)
- Easy to dissolve
- No separate business tax return

**Disadvantages:**
- Unlimited personal liability for business debts
- Difficulty raising capital
- Business ends if owner dies
- Harder to sell or transfer
- Owner pays self-employment tax on all profits

**Best For:**
- Solo entrepreneurs testing a business idea
- Low-risk service businesses
- Freelancers and consultants
- Businesses with minimal liability exposure

**Formation Requirements:**
- Generally no formal registration needed (though may need local business license)
- DBA ("Doing Business As") filing if using a name other than your own
- Obtain necessary licenses and permits
- Apply for EIN if hiring employees

**Tax Treatment:**
- All business income/losses reported on owner's personal tax return (Form 1040, Schedule C)
- Owner pays self-employment tax (15.3% for Social Security and Medicare)
- No separate business tax return

### 2. Partnership

**Types:**
- **General Partnership (GP):** All partners share management and liability
- **Limited Partnership (LP):** Has general and limited partners
- **Limited Liability Partnership (LLP):** Partners have limited personal liability

**Advantages:**
- Relatively easy to form
- Shared financial commitment and resources
- Pass-through taxation
- More capital available than sole proprietorship
- Shared expertise and decision-making

**Disadvantages:**
- Joint and several liability in GP (each partner liable for all business debts)
- Potential for partner disputes
- Shared profits
- Partnership may dissolve when a partner leaves
- More complex than sole proprietorship

**Best For:**
- Professional services (law firms, medical practices, accounting firms)
- Real estate investments
- Businesses with 2+ owners who want pass-through taxation
- Family businesses

**Formation Requirements:**
- Partnership agreement (highly recommended, even if not legally required)
- Register with state if required
- DBA filing if needed
- Obtain EIN from IRS
- File partnership tax return (Form 1065)

**Tax Treatment:**
- Pass-through taxation - partnership files informational return (Form 1065)
- Each partner receives Schedule K-1 showing their share of income/loss
- Partners report their share on personal tax returns
- Partners pay self-employment tax on their share

### 3. Limited Liability Company (LLC)

**Overview:** A hybrid structure combining corporation liability protection with partnership tax treatment.

**Advantages:**
- Limited personal liability protection
- Flexible management structure
- Pass-through taxation (default) or can elect corporate taxation
- Fewer formalities than corporations
- Flexible profit distribution
- Credibility with customers and vendors

**Disadvantages:**
- More expensive to form than sole proprietorship/partnership
- State-specific regulations vary
- Members may owe self-employment tax on profits
- Some states have annual fees or franchise taxes
- Limited life in some states

**Best For:**
- Small to medium-sized businesses
- Real estate holdings
- Most startups not seeking venture capital
- Businesses wanting liability protection without corporate complexity
- Multi-member businesses

**Formation Requirements:**
- File Articles of Organization with state
- Create Operating Agreement (highly recommended)
- Pay filing fees ($50-$500 depending on state)
- Obtain EIN
- Comply with state annual report requirements
- May need to publish notice of formation in some states

**Tax Treatment:**
- Default: Pass-through taxation (single-member = Schedule C, multi-member = Form 1065)
- Can elect S-Corp or C-Corp taxation
- Members typically pay self-employment tax on their share of profits
- No tax at entity level (unless electing corporate taxation)

**Single-Member vs. Multi-Member:**
- Single-member: Taxed as sole proprietorship (disregarded entity)
- Multi-member: Taxed as partnership
- Both can elect S-Corp or C-Corp tax treatment

### 4. C Corporation

**Overview:** A separate legal entity owned by shareholders, with distinct tax treatment.

**Advantages:**
- Strong liability protection
- Unlimited shareholders (easier to raise capital)
- Can issue different classes of stock
- Perpetual existence
- Easier to sell or transfer ownership
- Preferred by venture capital investors
- Tax-deductible employee benefits

**Disadvantages:**
- Double taxation (corporate and shareholder level)
- Complex and expensive to form and maintain
- Extensive record-keeping requirements
- Formal corporate formalities (meetings, minutes, resolutions)
- More regulatory oversight
- Higher setup and ongoing costs

**Best For:**
- High-growth companies seeking venture capital
- Businesses planning to go public
- Companies with international operations
- Businesses wanting to reinvest profits
- Companies with complex ownership structures

**Formation Requirements:**
- File Articles of Incorporation with state
- Create corporate bylaws
- Issue stock certificates
- Hold organizational meeting
- Elect board of directors
- Obtain EIN
- Register with state tax authority
- File annual reports
- Hold regular board and shareholder meetings

**Tax Treatment:**
- Entity-level taxation at corporate tax rate (currently 21% federal)
- Shareholders taxed again on dividends (double taxation)
- Can retain earnings in corporation
- C-Corp files Form 1120
- Shareholders report dividends on personal returns

### 5. S Corporation

**Overview:** A special corporate designation that allows pass-through taxation while maintaining corporate structure.

**Advantages:**
- Limited liability protection
- Pass-through taxation (avoids double taxation)
- Potential savings on self-employment taxes
- Can split income between salary and distributions
- Corporate structure and credibility
- Easier to transfer ownership than LLC in some states

**Disadvantages:**
- Strict eligibility requirements (max 100 shareholders, all must be U.S. citizens/residents)
- Only one class of stock allowed
- Must pay reasonable salary to shareholder-employees
- Strict IRS compliance requirements
- More formalities than LLC
- Ongoing state filing requirements

**Best For:**
- Small to medium businesses with U.S.-based owners
- Service businesses where owners work in the business
- Businesses wanting corporate structure with pass-through taxation
- Companies with profits high enough to benefit from salary/distribution split

**Formation Requirements:**
- Incorporate as a C-Corp first (file Articles of Incorporation)
- File Form 2553 with IRS to elect S-Corp status (within 2 months and 15 days of formation or by March 15 for current year)
- Meet all eligibility requirements
- Maintain corporate formalities
- File annual reports
- Pay state fees

**Tax Treatment:**
- Pass-through taxation - corporation files Form 1120-S
- Shareholders receive Schedule K-1
- Shareholders report income/loss on personal returns
- Shareholder-employees must take reasonable salary (subject to payroll taxes)
- Distributions above salary not subject to self-employment tax

**Important S-Corp Considerations:**
- IRS scrutinizes salary amounts (must be "reasonable compensation")
- Savings come from paying yourself partly in distributions (no FICA tax)
- Only makes sense if business profits are substantial enough to justify the split
- Generally recommended when business profit exceeds $60,000-$80,000

### 6. Benefit Corporation (B-Corp) / Public Benefit Corporation

**Overview:** A for-profit corporate structure that includes positive social/environmental impact in its legally defined goals.

**Advantages:**
- Legal protection to consider stakeholders beyond shareholders
- Alignment with mission-driven values
- Marketing and branding benefits
- Attracts socially conscious investors and employees
- Legal framework for balancing profit and purpose

**Disadvantages:**
- Not available in all states
- Additional reporting requirements (benefit report)
- Potential for shareholder disputes over mission vs. profit
- More complex governance
- May face scrutiny if mission isn't authentic

**Best For:**
- Social enterprises
- Mission-driven companies
- Businesses prioritizing stakeholder interests
- Companies seeking B-Corp certification
- Conscious capitalism ventures

**Formation Requirements:**
- Available in 30+ states plus Washington D.C.
- File as benefit corporation in Articles of Incorporation
- State specific public benefit purpose
- Prepare annual benefit report
- Meet third-party standard assessment (for B-Corp certification)

**Tax Treatment:**
- Taxed same as C-Corp (double taxation)
- No special tax benefits solely from benefit corporation status

## Comparison Framework

### Decision Factors

When advising on business structure, consider:

1. **Liability Protection**
   - Sole Prop/GP: No protection
   - LP/LLP/LLC/Corp: Limited liability protection

2. **Taxation**
   - Pass-through: Sole Prop, Partnership, LLC (default), S-Corp
   - Entity-level: C-Corp, B-Corp

3. **Ease of Formation**
   - Easiest: Sole Prop
   - Moderate: Partnership, LLC
   - Complex: S-Corp, C-Corp

4. **Ongoing Compliance**
   - Minimal: Sole Prop, Partnership
   - Moderate: LLC
   - Extensive: S-Corp, C-Corp

5. **Raising Capital**
   - Difficult: Sole Prop, Partnership
   - Moderate: LLC, S-Corp
   - Easiest: C-Corp

6. **Ownership Transfer**
   - Difficult: Sole Prop, Partnership
   - Moderate: LLC
   - Easy: C-Corp, S-Corp

7. **Cost**
   - Cheapest: Sole Prop ($0-$100)
   - Moderate: Partnership, LLC ($100-$800)
   - Expensive: S-Corp, C-Corp ($500-$2,000+)

## Formation Process by Structure

### LLC Formation Steps

1. **Choose a business name**
   - Check name availability in your state
   - Must include "LLC" or "Limited Liability Company"
   - Cannot conflict with existing businesses

2. **Select a registered agent**
   - Required in all states
   - Must have physical address in state
   - Can be yourself, employee, or professional service

3. **File Articles of Organization**
   - File with Secretary of State (or equivalent)
   - Include: LLC name, registered agent, address, member names (in some states)
   - Pay filing fee ($50-$500 depending on state)
   - Processing time: 1 day to several weeks

4. **Create Operating Agreement**
   - Not always legally required but highly recommended
   - Outlines ownership, management, profit distribution
   - Important for multi-member LLCs
   - Helps establish LLC as separate entity

5. **Obtain EIN**
   - Apply online at IRS.gov (free)
   - Needed for taxes, banking, hiring employees
   - Immediate approval online

6. **Open business bank account**
   - Maintain separation between personal and business finances
   - Protect liability shield

7. **Comply with state/local requirements**
   - Business licenses
   - Zoning permits
   - Industry-specific permits
   - Annual report filings

8. **Consider tax elections**
   - Default tax treatment or elect S-Corp/C-Corp taxation
   - File Form 2553 for S-Corp election
   - File Form 8832 for C-Corp election

### Corporation Formation Steps

1. **Choose a corporate name**
   - Check availability
   - Must include "Corporation," "Incorporated," "Corp.," or "Inc."

2. **Appoint directors**
   - At least one director required (some states require three)
   - Directors manage corporate affairs

3. **File Articles of Incorporation**
   - File with state
   - Include: Corporate name, registered agent, shares authorized, incorporator name
   - Pay filing fee ($100-$500+)

4. **Create corporate bylaws**
   - Internal rules for running the corporation
   - Outline meetings, voting, roles, procedures

5. **Hold organizational meeting**
   - Adopt bylaws
   - Elect officers
   - Issue stock
   - Authorize corporate bank account

6. **Issue stock certificates**
   - Document ownership
   - Maintain stock ledger

7. **Obtain EIN**
   - Apply at IRS.gov

8. **File S-Corp election if desired**
   - Form 2553 within required timeframe

9. **Register for state taxes**
   - Sales tax (if applicable)
   - Payroll taxes (if employees)

10. **Maintain compliance**
    - Annual reports
    - Regular board meetings
    - Meeting minutes
    - Corporate resolutions

## State-Specific Considerations

### Popular Formation States

**Delaware:**
- Benefits: Business-friendly laws, Court of Chancery, flexible structure
- Drawbacks: Annual franchise tax, must register in home state too if doing business there
- Best for: Venture-backed startups, larger businesses

**Wyoming:**
- Benefits: No state income tax, low fees, strong privacy protection
- Drawbacks: Must register in home state if doing business there
- Best for: Holding companies, asset protection

**Nevada:**
- Benefits: No state income tax, privacy protections
- Drawbacks: Higher fees, commerce tax for larger businesses
- Best for: Businesses wanting Nevada benefits, asset protection

**Home State:**
- Benefits: Simpler (only one registration), lower cost
- Best for: Most small businesses operating in single state

**Recommendation:** Unless seeking venture capital or have specific reasons, most small businesses should form in their home state to avoid double registration fees and compliance.

## Changing Business Structure

Businesses can change structure as they grow:

**Sole Prop → LLC:**
- File Articles of Organization
- Transfer assets to LLC
- Update licenses and accounts

**LLC → Corporation:**
- Statutory conversion (if state allows)
- Or form corporation and transfer assets
- May trigger tax consequences

**LLC → S-Corp (taxation only):**
- File Form 2553 with IRS
- Maintain LLC legal structure
- Treated as S-Corp for tax purposes

## Advisory Approach

When helping users choose a structure:

1. **Ask clarifying questions:**
   - How many owners?
   - What's your revenue expectation?
   - What are your liability concerns?
   - Are you seeking outside investment?
   - What state do you operate in?
   - What's your growth plan?

2. **Present 2-3 best options** with pros/cons for their specific situation

3. **Create comparison table** showing:
   - Liability protection
   - Tax treatment
   - Formation cost and time
   - Ongoing compliance
   - Flexibility

4. **Provide next steps:**
   - Forms to file
   - Documents to prepare
   - Estimated timeline
   - Estimated costs
   - Professional help needed (attorney, CPA)

5. **Always include disclaimer:**
   "This information is for educational purposes and does not constitute legal or tax advice. Consult with a licensed attorney and tax professional before making final decisions about your business structure."

## Common Mistakes to Warn Against

- Choosing structure based only on taxes without considering liability
- Forming a corporation for a small business that doesn't need that complexity
- Not maintaining corporate formalities (piercing the corporate veil risk)
- Failing to separate personal and business finances
- Not creating an Operating Agreement or Bylaws
- Forming in Delaware when operating solely in another state
- Not considering future needs (funding, growth, exit)

## Resources to Provide

- **SBA.gov:** Business structure guides
- **IRS.gov:** Tax information for each structure
- **State Secretary of State website:** Formation requirements and forms
- **SCORE.org:** Free mentoring and templates
- **LegalZoom, Rocket Lawyer, Incfile:** Online formation services
- **Local Small Business Development Center (SBDC):** Free advising

## Key Reminders

- Business structure can be changed later, but it's easier to start with the right one
- Liability protection requires maintaining formalities and separation
- Tax treatment varies significantly - always model the numbers
- Some structures have eligibility requirements (S-Corp)
- Formation is just the beginning - ongoing compliance matters
- Professional advice is worthwhile for most businesses
