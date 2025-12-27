# Law Team Output Styles

This directory contains specialized output styles for legal analysis and communication. Each style provides a distinct lens and communication approach for different legal contexts.

## Available Output Styles

### 1. **corporate-attorney.md**
**Use When:** Providing business-focused legal counsel, contract review, or risk assessment

**Characteristics:**
- Corporate counsel perspective
- IRAC methodology
- Risk assessment framework
- Business-practical advice
- Professional disclaimers

**Best For:**
- Contract analysis
- Business risk assessment
- Legal compliance guidance
- Corporate decision support

---

### 2. **legal-memo.md**
**Use When:** Formal legal analysis requiring comprehensive research and structured reasoning

**Characteristics:**
- Traditional legal memo format
- IRAC/CREAC analysis
- Formal citations
- Objective analysis
- Detailed legal reasoning

**Best For:**
- Complex legal questions
- Precedent analysis
- Formal legal opinions
- Litigation support research

---

### 3. **plain-english-legal.md**
**Use When:** Explaining legal concepts to non-lawyers, clients, or general audiences

**Characteristics:**
- Accessible language
- Jargon translation
- Examples and analogies
- Visual organization
- Action-oriented guidance

**Best For:**
- Client communications
- Educational content
- Contract explanations
- Legal concept tutorials
- Warning letters to individuals

---

### 4. **contract-drafter.md**
**Use When:** Drafting or reviewing contracts, agreements, and legal documents

**Characteristics:**
- Precise legal language
- Consistent terminology
- Comprehensive coverage
- Clear operative language ("shall," "may," "must")
- Modern plain language preferences

**Best For:**
- Contract drafting
- Agreement templates
- Policy documents
- Terms of service
- Legal document review

---

### 5. **compliance-advisor.md**
**Use When:** Addressing regulatory compliance, audit preparation, or risk management

**Characteristics:**
- Regulatory framework focus
- Risk-based prioritization
- Audit readiness approach
- Documentation emphasis
- Practical implementation guidance

**Best For:**
- Compliance assessments
- Regulatory analysis
- Policy development
- Audit preparation
- Risk management programs

---

### 6. **litigation-strategist.md**
**Use When:** Evaluating disputes, litigation strategy, or settlement analysis

**Characteristics:**
- Case assessment framework
- Strategic cost-benefit analysis
- Settlement strategy
- Trial preparation guidance
- Honest risk evaluation

**Best For:**
- Dispute evaluation
- Settlement negotiations
- Litigation strategy
- Pre-trial analysis
- Case merits assessment

---

### 7. **farnsworth-contextual.md**
**Use When:** Balanced contract analysis requiring fairness, flexibility, and practical application

**Characteristics:**
- Contextual methodology (balancing rules with fairness)
- Good faith and fair dealing emphasis
- Restatement (Second) integration
- Balanced, nuanced analysis
- Modern commercial law expertise
- Columbia professorial pedagogy

**Best For:**
- Complex contract formation issues
- Interpretation disputes requiring contextual analysis
- Scholarly legal analysis with practical application
- Contract doctrine education
- Modern commercial transaction analysis
- UCC and contemporary business practice

---

## Usage Guidelines

### Selecting the Right Style

**Question:** What type of legal issue are you addressing?

- **Business transaction or contract?** → Use `corporate-attorney` or `contract-drafter`
- **Complex legal research?** → Use `legal-memo`
- **Explaining to non-lawyers?** → Use `plain-english-legal`
- **Regulatory compliance issue?** → Use `compliance-advisor`
- **Potential dispute or lawsuit?** → Use `litigation-strategist`

### Combining Styles

Some situations benefit from multiple perspectives:

**Example: Contract Review**
1. Use `contract-drafter` to analyze specific language
2. Use `corporate-attorney` to assess business risks
3. Use `plain-english-legal` to explain findings to client

**Example: Compliance Issue**
1. Use `compliance-advisor` to assess regulatory requirements
2. Use `litigation-strategist` to evaluate enforcement risk
3. Use `plain-english-legal` to communicate to affected employees

### Style Switching

You can request a different output style mid-conversation:

- "Explain that in plain English"
- "Give me a formal legal memo format"
- "What would a litigation strategist say about this?"
- "Draft that as an actual contract provision"

## Style Characteristics Comparison

| **Style** | **Formality** | **Technical Detail** | **Audience** | **Purpose** |
|-----------|---------------|---------------------|--------------|-------------|
| Corporate Attorney | High | High | Business Leaders | Counsel & Risk Assessment |
| Legal Memo | Very High | Very High | Lawyers | Research & Analysis |
| Plain English | Low | Low-Medium | General Public | Education & Communication |
| Contract Drafter | Very High | Very High | Legal Professionals | Document Creation |
| Compliance Advisor | Medium-High | High | Compliance/Business | Regulatory Guidance |
| Litigation Strategist | High | High | Decision Makers | Dispute Strategy |
| Farnsworth Contextual | Very High | Very High | Scholars/Academics | Balanced Analysis |

## Tips for Effective Use

### 1. **Match Style to Audience**
- Lawyers and legal professionals: `legal-memo`, `contract-drafter`
- Business executives: `corporate-attorney`, `litigation-strategist`
- General employees/public: `plain-english-legal`
- Compliance officers: `compliance-advisor`

### 2. **Consider the Context**
- **Proactive/Planning**: `corporate-attorney`, `contract-drafter`, `compliance-advisor`
- **Reactive/Problem**: `litigation-strategist`, `corporate-attorney`
- **Educational**: `plain-english-legal`
- **Formal/Official**: `legal-memo`, `contract-drafter`

### 3. **Combine with Commands**
The output styles work seamlessly with law-team commands:

```bash
# Contract review in plain English
/law-team:contract-review employment-agreement.pdf --style plain-english-legal

# Compliance check with formal memo output
/law-team:compliance-check employment --style legal-memo

# IP protection guidance for business leaders
/law-team:ip-protection trademark --style corporate-attorney
```

### 4. **Specify Format Needs**
- Need executive summary? → `corporate-attorney`
- Need detailed citations? → `legal-memo`
- Need action checklist? → `plain-english-legal` or `compliance-advisor`
- Need contract language? → `contract-drafter`
- Need settlement framework? → `litigation-strategist`

## Customization

These output styles can be customized by:
1. Creating a copy of an existing style
2. Modifying the approach or formatting
3. Saving with a descriptive name (e.g., `startup-attorney.md`)
4. Using with `--style your-custom-style` flag

## Contributing

When adding new output styles:
- Follow the existing format with `---` frontmatter
- Include clear description in frontmatter
- Organize with clear section headings
- Provide usage examples
- Update this README with the new style

## Examples

### Example 1: Contract Review
**Input:** Review this employment contract
**Style:** `corporate-attorney`
**Output:** Structured risk assessment with red flags, missing protections, and business implications

### Example 2: Same Contract, Different Audience
**Input:** Review this employment contract
**Style:** `plain-english-legal`
**Output:** Accessible explanation of terms, what they mean for the employee, warnings in simple language

### Example 3: Compliance Question
**Input:** What are our obligations under GDPR?
**Style:** `compliance-advisor`
**Output:** Regulatory requirements, gap analysis, remediation steps, documentation needs, timeline

### Example 4: Litigation Assessment
**Input:** Should we sue this vendor for breach?
**Style:** `litigation-strategist`
**Output:** Merits assessment, cost-benefit analysis, settlement strategy, recommendation with risk evaluation

---

## Quick Reference

| **Need** | **Use This Style** |
|----------|-------------------|
| Draft a contract | `contract-drafter` |
| Review a contract for business | `corporate-attorney` |
| Explain a contract to someone | `plain-english-legal` |
| Research a legal question | `legal-memo` or `farnsworth-contextual` |
| Check regulatory compliance | `compliance-advisor` |
| Evaluate a lawsuit | `litigation-strategist` |
| General legal advice | `corporate-attorney` |
| Employee training materials | `plain-english-legal` |
| Balanced contract analysis | `farnsworth-contextual` |
| Academic legal scholarship | `farnsworth-contextual` or `legal-memo` |

---

**Version:** 1.0.0
**Last Updated:** 2025-10-20
**Maintained By:** law-team plugin
