---
name: Contract Drafting and Review
description: Expert assistance in drafting, reviewing, and analyzing business contracts and legal agreements including NDAs, service agreements, employment contracts, partnership agreements, and vendor contracts. Use when the user needs help with any contract, agreement, legal document drafting, contract review, or understanding contract terms.
allowed-tools: Read, Grep, Glob, Write, Edit
---

# Contract Drafting and Review Skill

This skill provides comprehensive guidance on creating, reviewing, and understanding business contracts and legal agreements.

## CRITICAL: Approach Selection Required

**BEFORE proceeding with any contract work, you MUST determine the user's preferred legal approach.**

Use the `AskUserQuestion` tool with these four options:

**Question:** "What legal approach best fits your contract situation?"

**Options:**
1. **Adversarial** - "We're in a fight, help me win" (Hard bargaining, protective, zero-sum)
2. **Collaborative** - "Let's find a solution that works for everyone" (Win-win focused, relationship preservation)
3. **Preventative/Compliance** - "Help me avoid problems before they happen" (Risk mitigation, comprehensive protections)
4. **Business-Partner** - "Help me get this deal done" (Practical, balanced risk, commercial reality)

**After selection:** Adopt the selected approach for ALL contract language, negotiation recommendations, and risk assessments.

**Reference:** See `/resources/legal-approaches.md` for comprehensive documentation on each approach.

## When to Use This Skill

Activate this skill when the user:
- Needs to draft any type of contract or agreement
- Wants to review an existing contract
- Asks about contract terms or clauses
- Needs help understanding a legal agreement
- Wants to identify risks in a contract
- Asks about NDAs, service agreements, employment contracts, etc.
- Needs contract templates

## Core Principles of Contract Drafting

### Essential Elements of a Valid Contract

Every enforceable contract must have:

1. **Offer:** Clear proposal by one party
2. **Acceptance:** Unambiguous agreement by the other party
3. **Consideration:** Something of value exchanged by both parties
4. **Mutual Intent:** Both parties intend to be legally bound
5. **Capacity:** Parties are legally competent to contract
6. **Legality:** Contract purpose is legal

### Standard Contract Structure

```
1. Title
2. Date
3. Parties Identification
4. Recitals (Background/Whereas clauses)
5. Definitions
6. Agreement Terms (substantive provisions)
7. General Provisions
8. Signature Blocks
```

## Major Contract Types

### 1. Non-Disclosure Agreement (NDA)

**Purpose:** Protect confidential information shared between parties

**Key Clauses:**
- **Parties:** Disclosing party and receiving party
- **Purpose:** Why information is being shared
- **Definition of Confidential Information:**
  - Specific and clear definition
  - Include what's NOT confidential (already public, independently developed, legally obtained from third party)
  - Mark information as "Confidential" when possible
- **Obligations:**
  - Receiving party must keep information confidential
  - Use only for stated purpose
  - Return or destroy information upon request
- **Permitted Disclosures:**
  - To employees/contractors on need-to-know basis
  - When required by law (with notice if possible)
- **Term:**
  - Duration of confidentiality obligation (typically 2-5 years)
  - Term of agreement itself
- **Remedies:**
  - Injunctive relief (money damages may be inadequate)
  - Attorneys' fees provision

**Types:**
- **Unilateral NDA:** One party discloses, other receives
- **Mutual NDA:** Both parties share confidential information

**Common Issues:**
- Definition too broad or too narrow
- Term too long or too short
- Missing return/destruction obligations
- No carve-outs for public information

**Template Structure:**
```
NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into as of [DATE] ("Effective Date") by and between:

[DISCLOSING PARTY NAME], a [STATE] [ENTITY TYPE] ("Disclosing Party")

and

[RECEIVING PARTY NAME], a [STATE] [ENTITY TYPE] ("Receiving Party")

WHEREAS, Disclosing Party possesses certain confidential information related to [PURPOSE];

WHEREAS, Receiving Party desires to receive such confidential information for the purpose of [PURPOSE];

NOW, THEREFORE, in consideration of the mutual covenants and agreements contained herein, the parties agree as follows:

1. DEFINITION OF CONFIDENTIAL INFORMATION
   "Confidential Information" means...

2. OBLIGATIONS OF RECEIVING PARTY
   Receiving Party agrees to...

3. EXCLUSIONS FROM CONFIDENTIAL INFORMATION
   Confidential Information does not include information that...

4. TERM
   This Agreement shall commence on the Effective Date and continue for...

5. RETURN OF MATERIALS
   Upon termination or upon request...

6. NO LICENSE
   Nothing in this Agreement grants any license...

7. REMEDIES
   The parties acknowledge that monetary damages may be insufficient...

8. GENERAL PROVISIONS
   [Standard provisions]

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.
```

### 2. Service Agreement / Statement of Work

**Purpose:** Define services to be provided, compensation, and terms

**Key Clauses:**
- **Parties:** Service provider and client
- **Scope of Services:**
  - Detailed description of services
  - What's included and excluded
  - Deliverables with specifications
  - Performance standards
- **Compensation:**
  - Fee structure (hourly, fixed, milestone-based, retainer)
  - Payment schedule
  - Expenses (reimbursable or included)
  - Late payment penalties
  - Taxes
- **Term and Termination:**
  - Start date and duration
  - Renewal provisions
  - Termination rights (for cause and for convenience)
  - Notice period
  - Effect of termination (wind-down, payment for work completed)
- **Intellectual Property:**
  - Who owns work product
  - License grants if necessary
  - Pre-existing IP carve-out
  - Moral rights waiver
- **Warranties:**
  - Service provider warrants services will be performed professionally
  - Warranty period
  - Exclusive remedy for breach
- **Indemnification:**
  - Each party indemnifies for their breaches
  - IP indemnification by service provider
- **Limitation of Liability:**
  - Cap on damages (often 1x fees paid or 12 months of fees)
  - Exclusion of consequential damages
  - Carve-outs (can't limit liability for fraud, gross negligence, IP infringement)
- **Confidentiality:**
  - Mutual confidentiality obligations
  - Reference to separate NDA if applicable
- **Independent Contractor:**
  - Service provider is independent contractor, not employee
  - Responsible for own taxes
  - No benefits

**Red Flags to Watch For:**
- Unlimited liability
- Vague scope leading to scope creep
- Unfavorable payment terms (all fees upfront or all at end)
- Automatic renewal without clear opt-out
- Client owns all work even if not paid
- Non-compete that's too broad

**Key Provisions:**
```
SCOPE OF SERVICES
Contractor shall provide the following services ("Services"):
[Detailed list of deliverables, specifications, timelines]

COMPENSATION
Client shall pay Contractor:
- [Fee structure]: $[AMOUNT] [per hour/fixed fee/per milestone]
- Payment Schedule: [terms]
- Expenses: [reimbursable/not reimbursable]
- Invoicing: Monthly/upon completion/milestone-based
- Payment Due: Within [30] days of invoice
- Late Fees: [1.5]% per month on overdue amounts

INTELLECTUAL PROPERTY
All work product created by Contractor under this Agreement shall be [owned by Client as work made for hire / licensed to Client / owned by Contractor with license to Client].

Contractor retains all right, title and interest in pre-existing materials and grants Client a [non-exclusive/exclusive], [perpetual/term], [worldwide], [royalty-free] license to use such materials [as incorporated into the deliverables/for any purpose].
```

### 3. Employment Offer Letter / Agreement

**Purpose:** Document terms of employment relationship

**Key Clauses:**
- **Position and Duties:**
  - Job title
  - Reporting structure
  - General duties
  - Location
- **Compensation:**
  - Base salary
  - Bonus/commission structure (if applicable)
  - Pay frequency
  - Review schedule
- **Benefits:**
  - Health insurance
  - Retirement plan
  - Vacation/PTO
  - Sick leave
  - Other benefits
  - Reference to employee handbook
- **Start Date and Schedule:**
  - First day of employment
  - Work schedule/hours
  - Remote/hybrid/in-office
- **Employment Relationship:**
  - At-will statement (if applicable - not in all states/countries)
  - Probationary period (if any)
- **Contingencies:**
  - Background check
  - Drug screening
  - I-9 verification
  - Proof of eligibility to work
- **Confidentiality and IP Assignment:**
  - Protection of company confidential information
  - Assignment of inventions/work product
  - Reference to separate agreements
- **Non-Compete / Non-Solicitation (if applicable):**
  - Geographic scope
  - Duration
  - Restricted activities
  - Note: Many states restrict or ban non-competes
- **Employee Handbook:**
  - Acknowledgment that employee will receive handbook
  - Handbook policies apply
  - At-will statement in handbook
- **Other Provisions:**
  - Arbitration clause (if applicable)
  - Entire agreement
  - Governing law
- **Acceptance:**
  - Employee signature indicates acceptance
  - Deadline to accept offer

**State-Specific Considerations:**
- **California:** Non-competes generally void, strict rules on IP assignment
- **New York:** Salary threshold for exemption from overtime
- **Colorado:** Must disclose salary range in job posting
- **Many states:** Restricting non-competes for lower wage workers

**At-Will Employment Statement Example:**
```
This is an at-will employment relationship. Either you or the Company may terminate your employment at any time, with or without cause or notice. This at-will relationship cannot be changed except by a written agreement signed by you and an authorized Company representative.
```

**Confidentiality/IP Assignment:**
```
During your employment, you will have access to confidential information belonging to the Company. You agree to maintain the confidentiality of such information and not use or disclose it except as required for your job duties.

You agree that all inventions, works of authorship, and other intellectual property created during your employment and related to the Company's business shall be the sole property of the Company. You agree to execute any documents necessary to effectuate this assignment.
```

### 4. Independent Contractor Agreement

**Purpose:** Define relationship with contractor to ensure proper classification

**Key Clauses:**
- **Services:** Scope of work
- **Compensation:** Payment terms (usually project or hourly, not salary)
- **Independent Contractor Status:**
  - Contractor controls how work is performed
  - Contractor responsible for own taxes
  - No employee benefits
  - Can work for others
  - Provides own equipment
- **Term:** Duration or project-based
- **Expenses:** Who pays for what
- **IP Assignment:** Typically work-for-hire or assignment to company
- **Confidentiality**
- **Termination:** Notice requirements
- **No Non-Compete:** Be cautious - can indicate employee relationship

**IRS Test for Independent Contractor (to avoid misclassification):**

1. **Behavioral Control:**
   - Contractor controls how work is done
   - Sets own schedule
   - Provides own tools/equipment

2. **Financial Control:**
   - Paid by project or invoice
   - Can work for multiple clients
   - Has business expenses
   - Can make profit or loss

3. **Relationship Type:**
   - No benefits provided
   - Written contract describes relationship
   - Services not core to business (generally)

**Misclassification Risks:**
- Back taxes, penalties, interest
- Employee benefits claims
- Unemployment insurance claims
- Workers' comp issues
- Lawsuits

**Key Language:**
```
INDEPENDENT CONTRACTOR STATUS

Contractor is an independent contractor and not an employee of Company. Contractor shall:
a) Be solely responsible for all taxes, withholdings, and other statutory obligations
b) Provide and maintain own equipment and tools
c) Control the manner and means of performing the Services
d) Be free to provide services to other clients
e) Not be entitled to any employee benefits
f) Maintain appropriate business insurance

This Agreement does not create a partnership, joint venture, or agency relationship.
```

### 5. Partnership Agreement / LLC Operating Agreement

**Purpose:** Govern multi-owner business relationships

**Key Clauses:**
- **Formation:**
  - Entity name and purpose
  - Principal place of business
  - Term (perpetual or specific duration)
- **Capital Contributions:**
  - Initial contributions by each member/partner
  - Additional capital calls process
  - Consequences of failure to contribute
- **Ownership Interests:**
  - Percentage ownership by each member
  - Membership certificates or units
- **Management and Voting:**
  - Member-managed vs. manager-managed (LLC)
  - Voting rights and thresholds
  - Matters requiring unanimous consent vs. majority
  - Day-to-day management authority
- **Profit and Loss Allocation:**
  - Distribution percentages
  - Distribution timing and process
  - Tax allocation (may differ from distributions)
  - Retained earnings
- **Roles and Responsibilities:**
  - Specific duties of each member
  - Time commitment expectations
  - Compensation for services (if any)
- **Meetings:**
  - Annual meeting requirements
  - Notice requirements
  - Quorum
  - Voting procedures
- **Books and Records:**
  - Accounting method
  - Fiscal year
  - Access to records
  - Annual financial statements
- **Transfer Restrictions:**
  - Prohibition on transfers without consent
  - Right of first refusal
  - Drag-along rights
  - Tag-along rights
- **Buy-Sell Provisions:**
  - Triggering events (death, disability, bankruptcy, termination)
  - Valuation method
  - Payment terms
  - Funding mechanism (life insurance for death)
- **Dissolution:**
  - Events causing dissolution
  - Winding up process
  - Distribution of assets
- **Non-Compete / Non-Solicitation:**
  - During membership and after departure
  - Geographic and temporal scope
- **Dispute Resolution:**
  - Mediation/arbitration
  - Governing law

**Critical Issues to Address:**

1. **Deadlock:** What happens with 50/50 split?
   - Tie-breaking mechanism
   - Arbitration
   - Forced sale

2. **Exit Strategy:**
   - How can member exit?
   - Valuation formula
   - Payment terms

3. **New Members:**
   - Process for admitting new members
   - Dilution of existing members

**Valuation Methods for Buyout:**
- Book value (least favorable usually)
- Multiple of earnings (EBITDA)
- Fair market value (appraisal)
- Formula based on revenue
- Agreed-upon value updated annually

**Sample Profit Distribution Clause:**
```
DISTRIBUTIONS

Profits and losses shall be allocated to Members in proportion to their Ownership Percentages as follows:
- Member A: 60%
- Member B: 40%

Distributions shall be made [quarterly/annually] within [30] days after the end of each [quarter/year], provided the Company has sufficient cash flow as determined by the Members.

Tax allocations shall follow profit and loss allocations. The Company shall make tax distributions to Members sufficient to cover estimated tax liabilities on allocated income.
```

### 6. Vendor/Supplier Agreement

**Purpose:** Terms for purchasing goods or services

**Key Clauses:**
- **Products/Services:** Description of what's being purchased
- **Pricing:** Unit prices, volume discounts, price adjustments
- **Purchase Orders:** Process for ordering
- **Delivery:** Terms, location, shipping, title transfer, risk of loss
- **Inspection and Acceptance:** Right to inspect, rejection process
- **Payment Terms:** Net 30/60/90, early payment discounts
- **Warranties:** Product warranties, fitness for purpose
- **Indemnification:** Product liability, IP infringement
- **Term and Termination**
- **Limitation of Liability**
- **Confidentiality**

### 7. Client Services Agreement

**Purpose:** Ongoing relationship for services (vs. one-off project)

**Key Clauses:**
- Similar to Service Agreement but typically:
  - Longer term
  - Retainer-based or recurring fees
  - More detailed service levels
  - Service Level Agreements (SLAs)
  - Support and maintenance terms
  - Amendment process for changing scope

## Standard Contract Clauses

### Definitions Section
Clear definitions prevent disputes. Define key terms used throughout agreement:
```
DEFINITIONS

"Confidential Information" means...
"Services" means...
"Deliverables" means...
"Work Product" means...
"Business Day" means...
```

### Representations and Warranties

**Purpose:** Statements of fact that parties rely upon

**Common Warranties:**
- Party has authority to enter agreement
- Agreement doesn't violate other agreements
- Party will comply with applicable laws
- Services will be performed in professional manner
- Work product will be original and not infringe IP rights
- Party has necessary licenses and permits

**Example:**
```
REPRESENTATIONS AND WARRANTIES

Each party represents and warrants that:
a) It has full power and authority to enter into this Agreement;
b) Execution and performance will not violate any other agreement to which it is a party;
c) The individual signing has authority to bind the party.

Service Provider further represents and warrants that:
a) Services will be performed in a professional and workmanlike manner;
b) Work Product will be original and will not infringe any third-party rights;
c) It maintains all necessary licenses and certifications to perform Services.
```

### Indemnification

**Purpose:** One party agrees to defend and hold harmless the other party for certain claims

**Structure:**
- Indemnifying party agrees to defend, indemnify, and hold harmless
- Indemnified party
- Against claims arising from [specific events]
- Process: Notice, control of defense, cooperation

**Example:**
```
INDEMNIFICATION

Service Provider shall defend, indemnify, and hold harmless Client and its officers, directors, employees, and agents from and against any and all claims, damages, losses, and expenses (including reasonable attorneys' fees) arising out of or resulting from:
a) Service Provider's breach of this Agreement;
b) Service Provider's negligence or willful misconduct;
c) Claims that Work Product infringes any third-party intellectual property rights;
d) Bodily injury or property damage caused by Service Provider.

Indemnified party shall: (i) promptly notify indemnifying party of claim; (ii) cooperate in defense; (iii) allow indemnifying party to control defense and settlement (provided settlement does not impose obligations on indemnified party).
```

### Limitation of Liability

**Purpose:** Cap damages and exclude certain types of damages

**Common Structure:**
- Cap on total liability (often fees paid or 12 months fees)
- Exclusion of consequential, incidental, punitive damages
- Carve-outs where cap doesn't apply

**Example:**
```
LIMITATION OF LIABILITY

TO THE MAXIMUM EXTENT PERMITTED BY LAW:

a) IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, LOSS OF DATA, OR COST OF PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.

b) EXCEPT FOR EXCLUDED CLAIMS, EACH PARTY'S TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THIS AGREEMENT SHALL NOT EXCEED THE FEES PAID BY CLIENT IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.

c) EXCLUDED CLAIMS: The limitations in this Section do not apply to:
   - Either party's indemnification obligations
   - Breach of confidentiality
   - Infringement of intellectual property rights
   - Gross negligence or willful misconduct
   - Fraud
```

### Dispute Resolution

**Options:**
1. **Litigation:** Court system, most expensive, public record
2. **Arbitration:** Private, binding, faster than court, expensive
3. **Mediation:** Non-binding, facilitator helps parties reach agreement, lowest cost

**Example:**
```
DISPUTE RESOLUTION

Any dispute arising out of this Agreement shall be resolved as follows:

a) Good Faith Negotiation: The parties shall first attempt to resolve the dispute through good faith negotiations between senior executives.

b) Mediation: If not resolved within [30] days, the parties shall submit the dispute to mediation under the rules of [JAMS/AAA]. The parties shall share the costs of mediation equally.

c) Arbitration: If mediation fails, the dispute shall be resolved by binding arbitration under the rules of [JAMS/AAA]. The arbitration shall be conducted in [City, State]. Judgment upon the award may be entered in any court having jurisdiction.

d) Exceptions: Either party may seek injunctive relief in court for breaches of confidentiality or intellectual property rights.
```

### Termination

**Termination Rights:**
1. **For Cause:** Immediate termination for material breach (after cure period)
2. **For Convenience:** Either party can terminate with notice
3. **Automatic:** Upon certain events (bankruptcy, loss of license)

**Effect of Termination:**
- Payment for work completed
- Return of materials and property
- Survival of certain provisions
- Wind-down period

**Example:**
```
TERMINATION

a) Term: This Agreement shall commence on [DATE] and continue for [PERIOD] unless earlier terminated as provided herein.

b) Termination for Convenience: Either party may terminate this Agreement for any reason upon [30] days' written notice.

c) Termination for Cause: Either party may terminate immediately upon written notice if the other party:
   i) Materially breaches this Agreement and fails to cure within [15] days of written notice;
   ii) Becomes insolvent or files for bankruptcy;
   iii) Ceases to do business.

d) Effect of Termination:
   i) Client shall pay for Services performed through the termination date;
   ii) Each party shall return Confidential Information;
   iii) Sections [list sections that survive] shall survive termination.
```

### Governing Law and Jurisdiction

**Purpose:** Determine which state's laws apply and where disputes will be resolved

**Considerations:**
- Choose state with favorable law
- Choose neutral state for multi-state parties
- Match to arbitration location if using arbitration

**Example:**
```
GOVERNING LAW

This Agreement shall be governed by and construed in accordance with the laws of the State of [STATE], without regard to its conflicts of law principles.

JURISDICTION

Each party irrevocably consents to the exclusive jurisdiction and venue of the state and federal courts located in [COUNTY], [STATE] for any legal action arising out of this Agreement.
```

### General Provisions

**Standard Boilerplate:**

```
GENERAL PROVISIONS

a) Entire Agreement: This Agreement constitutes the entire agreement between the parties and supersedes all prior agreements and understandings, whether written or oral.

b) Amendment: This Agreement may be amended only by a written instrument signed by both parties.

c) Waiver: No waiver of any provision shall be deemed a waiver of any other provision or subsequent breach.

d) Severability: If any provision is held invalid or unenforceable, the remaining provisions shall remain in full force and effect.

e) Assignment: Neither party may assign this Agreement without the prior written consent of the other party, except that either party may assign to a successor in connection with a merger, acquisition, or sale of all or substantially all of its assets. Any attempted assignment in violation of this Section shall be void.

f) Force Majeure: Neither party shall be liable for failure or delay in performance due to causes beyond its reasonable control, including acts of God, war, strikes, or government actions.

g) Notices: All notices must be in writing and delivered to:
   [Party 1 address and contact]
   [Party 2 address and contact]

h) Counterparts: This Agreement may be executed in counterparts, each of which shall be deemed an original and all of which together shall constitute one instrument.

i) Relationship of Parties: The parties are independent contractors. This Agreement does not create a partnership, joint venture, or agency relationship.
```

## Contract Review Checklist

When reviewing a contract, check:

### 1. Parties
- [ ] Correct legal names of all parties
- [ ] Proper entity designation (Inc., LLC, etc.)
- [ ] State of formation
- [ ] Contact information current

### 2. Key Terms
- [ ] Scope clearly defined
- [ ] Deliverables specific and measurable
- [ ] Timeline reasonable and clear
- [ ] Payment terms acceptable
- [ ] Term and renewal provisions clear

### 3. Financial Terms
- [ ] Total cost clear and reasonable
- [ ] Payment schedule favorable
- [ ] Expenses allocated appropriately
- [ ] Late fees or interest rates reasonable
- [ ] Price increase provisions (if any) acceptable

### 4. IP and Confidentiality
- [ ] Ownership of work product clear
- [ ] License grants appropriate
- [ ] Pre-existing IP protected
- [ ] Confidentiality obligations reasonable
- [ ] NDA term appropriate

### 5. Liability and Risk
- [ ] Liability cap reasonable
- [ ] Indemnification balanced
- [ ] Insurance requirements (if any) reasonable
- [ ] Warranties appropriate
- [ ] Limitation of liability acceptable

### 6. Termination
- [ ] Termination rights balanced
- [ ] Notice periods reasonable
- [ ] Effect of termination clear
- [ ] Survival provisions appropriate

### 7. Dispute Resolution
- [ ] Dispute resolution method acceptable
- [ ] Governing law favorable or neutral
- [ ] Venue/jurisdiction acceptable
- [ ] Arbitration terms (if applicable) fair

### 8. Special Provisions
- [ ] Non-compete reasonable or absent
- [ ] Non-solicitation appropriate
- [ ] Exclusivity understood
- [ ] Automatic renewal acceptable
- [ ] Amendment process clear

### 9. Legal Requirements
- [ ] All required disclosures present
- [ ] Complies with applicable laws
- [ ] Force majeure clause present
- [ ] Entire agreement clause present

### 10. Execution
- [ ] Signature authority confirmed
- [ ] All blanks filled in
- [ ] Dates present
- [ ] Counterparts clause if needed

## Red Flags in Contracts

### High Priority Red Flags
1. **Unlimited liability** - No cap on damages
2. **Unfavorable indemnification** - One-sided, overly broad
3. **Vague scope** - Leads to scope creep or disputes
4. **Automatic renewal** - Without clear opt-out mechanism
5. **Unreasonable non-compete** - Too broad in scope, geography, or duration
6. **Unfair payment terms** - All payment upfront or all at end, no recourse
7. **IP assignment too broad** - Assigns all IP even if created outside scope
8. **No termination rights** - Locked in with no exit
9. **Waiver of all warranties** - "As is" with no recourse
10. **Mandatory arbitration with unfair terms** - Expensive forum, distant location, limits remedies

### Medium Priority Concerns
- Ambiguous language open to multiple interpretations
- Missing key provisions (confidentiality, IP, termination)
- Imbalanced indemnification (one party indemnifies all)
- Short cure periods (less than 15 days)
- Governing law in unfamiliar or unfavorable jurisdiction
- Integration clause that contradicts verbal promises
- Amendment only by one party
- Unilateral right to change terms

### Low Priority Issues
- Typographical errors
- Inconsistent formatting
- Missing or incorrect entity designations
- Unclear notice provisions
- No force majeure clause
- Missing severability clause

## Contract Negotiation Tips

### Leverage Points
1. **Payment terms** - Often negotiable
2. **Liability caps** - Start high, negotiate down
3. **IP ownership** - Can often split or license
4. **Termination rights** - Critical to negotiate
5. **Indemnification scope** - Narrow if possible
6. **Non-compete terms** - Often negotiable or removable

### Negotiation Strategies
- **Prioritize:** Know your must-haves vs. nice-to-haves
- **Reciprocal changes:** If they want X, ask for Y
- **Standard language:** Push back on non-standard unfavorable terms
- **Industry norms:** Reference what's typical in your industry
- **Business relationship:** Sometimes flexibility on some points builds goodwill
- **Get it in writing:** Don't rely on verbal promises

### Common Negotiation Points

**Independent contractors pushing back on:**
- IP assignment of all work (ask to carve out pre-existing work or limit to work specifically created for project)
- Broad non-compete (negotiate narrow scope, shorter duration)
- Unlimited indemnification (ask for cap)
- Right to use work in portfolio (ask for license to showcase)

**Clients pushing back on:**
- High liability caps (negotiate lower)
- Vague scope (ask for more specificity)
- Automatic renewal (ask for opt-in renewal)
- Long termination notice (ask for shorter or for-convenience termination)

## Drafting Best Practices

### 1. Use Clear Language
- **Good:** "Client shall pay $5,000 within 30 days of invoice date"
- **Bad:** "Client shall remit payment in a timely manner"

### 2. Define Ambiguous Terms
- **Good:** "Business Days" means Monday through Friday, excluding federal holidays
- **Bad:** Using "business days" without definition

### 3. Be Specific
- **Good:** "Contractor shall deliver wireframes for all 12 screens by March 15, 2025"
- **Bad:** "Contractor shall deliver designs soon"

### 4. Use Active Voice
- **Good:** "Seller warrants the products are free from defects"
- **Bad:** "It is warranted that the products are free from defects"

### 5. Avoid Legalese When Possible
- **Good:** "This agreement begins on..."
- **Bad:** "This agreement shall be deemed to have commenced upon..."

### 6. Use Consistent Terms
- Pick one term and stick with it throughout
- Don't alternate between "Client" and "Customer" for same party

### 7. Number and Label Sections
- Makes reference easy
- Professional appearance
- Easier to amend

### 8. Include Examples When Helpful
- Particularly for calculation formulas
- Payment schedules
- Deliverable specifications

## Free Contract Template Resources

Direct users to these free, reputable sources:

1. **LegalTemplates.net** - Free attorney-drafted templates
2. **LawDepot.com** - Free online legal forms
3. **Rocket Lawyer** - Free basic documents (premium for customization)
4. **PandaDoc.com** - Free agreement templates
5. **Signaturely.com** - Free contract templates in Word/PDF
6. **Genie AI** - AI-powered free templates
7. **SCORE.org** - Free business templates and agreements
8. **SBA.gov** - Government resources for business contracts

## When to Hire an Attorney

Recommend legal review for:
- **High dollar value** - Agreements over $50,000
- **Complex IP** - Custom software, patents, complex licensing
- **Long-term commitments** - Multi-year agreements
- **Unusual terms** - Anything out of the ordinary
- **Significant liability risk** - Product liability, professional services
- **Regulatory compliance** - Healthcare, finance, government contracts
- **Real estate** - Any property transactions
- **Business formations** - Partnership agreements, operating agreements
- **Employment terminations** - Severance agreements
- **International agreements** - Cross-border transactions

**Cost expectations:**
- Simple contract review: $500-$1,500
- Custom contract drafting: $1,000-$5,000
- Complex negotiations: $5,000-$25,000+

## Disclaimer Template

Always include this disclaimer:

```
IMPORTANT LEGAL DISCLAIMER

This contract/information is provided for educational and informational purposes only and does not constitute legal advice. Every legal situation is unique, and contract requirements vary by jurisdiction and specific circumstances.

You should consult with a licensed attorney in your jurisdiction before:
- Entering into any legal agreement
- Making modifications to proposed contracts
- Taking any action based on this information

No attorney-client relationship is created by reviewing this information. While efforts have been made to ensure accuracy, laws change frequently and this information may not reflect current law in your jurisdiction.
```

## Advisory Approach for Contract Requests

1. **Identify contract type** and purpose
2. **Ask clarifying questions:**
   - Who are the parties?
   - What's the transaction?
   - What are key terms (price, duration, scope)?
   - Any special concerns?
   - Jurisdiction?

3. **For contract review:**
   - Read the entire contract
   - Identify type and purpose
   - Check for red flags
   - Review each section against checklist
   - Provide summary of concerns
   - Suggest specific amendments
   - Recommend attorney review if appropriate

4. **For contract drafting:**
   - Determine appropriate template type
   - Customize with specific details
   - Include all essential clauses
   - Add relevant optional clauses
   - Include helpful annotations
   - Provide implementation checklist
   - Recommend attorney review

5. **Always include:**
   - Legal disclaimer
   - Recommendation to consult attorney for final review
   - Explanation of risk areas
   - Next steps

## Contract Storage and Management

Advise users to:
- **Store originals securely** - Fireproof safe or safety deposit box
- **Create digital backups** - Encrypted, redundant
- **Track key dates** - Renewal, termination notice, expiration
- **Organize by category** - Employment, vendors, clients, IP, etc.
- **Maintain signature authority records** - Who signed and their authority
- **Keep amendment history** - All versions and changes
- **Use contract management software** - For larger contract volumes (ContractWorks, Airtable, etc.)
