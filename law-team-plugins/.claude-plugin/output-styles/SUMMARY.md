# Law Team Output Styles - Summary

## Overview

The law-team plugin now includes **7 specialized output styles** designed for different legal contexts and audiences. These styles transform how legal analysis is communicated while maintaining accuracy and professionalism.

---

## Complete Style List

### 1. **Corporate Attorney** 📊
- **File:** `corporate-attorney.md`
- **Best For:** Business legal counsel, risk assessment, practical advice
- **Tone:** Professional, business-focused, practical
- **Audience:** Executives, business leaders, in-house counsel

### 2. **Legal Memo** 📝
- **File:** `legal-memo.md`
- **Best For:** Formal legal research, comprehensive analysis
- **Tone:** Scholarly, objective, detailed
- **Audience:** Lawyers, legal professionals, courts

### 3. **Plain English Legal** 💬
- **File:** `plain-english-legal.md`
- **Best For:** Client communications, educational content
- **Tone:** Accessible, friendly, educational
- **Audience:** General public, employees, non-lawyers

### 4. **Contract Drafter** ✍️
- **File:** `contract-drafter.md`
- **Best For:** Creating and reviewing legal documents
- **Tone:** Precise, formal, comprehensive
- **Audience:** Legal professionals, drafters, attorneys

### 5. **Compliance Advisor** ✅
- **File:** `compliance-advisor.md`
- **Best For:** Regulatory guidance, audit preparation
- **Tone:** Authoritative, practical, systematic
- **Audience:** Compliance officers, business operations

### 6. **Litigation Strategist** ⚖️
- **File:** `litigation-strategist.md`
- **Best For:** Dispute evaluation, settlement strategy
- **Tone:** Strategic, analytical, realistic
- **Audience:** Decision makers, business leaders, litigation counsel

### 7. **Farnsworth Contextual** 🎓
- **File:** `farnsworth-contextual.md`
- **Best For:** Balanced analysis, contract theory, academic work with practical application
- **Tone:** Scholarly, nuanced, pedagogical
- **Audience:** Academics, legal scholars, law students, practitioners

---

## Quick Decision Tree

```
What do you need?
│
├─ Create/review contract → contract-drafter
├─ Business advice → corporate-attorney
├─ Explain to non-lawyer → plain-english-legal
├─ Legal research → legal-memo or farnsworth-contextual
├─ Regulatory compliance → compliance-advisor
├─ Lawsuit evaluation → litigation-strategist
└─ Balanced contract analysis → farnsworth-contextual
```

---

## Style Comparison Matrix

| Style | Formality | Technical | Accessibility | Best Use Case |
|-------|-----------|-----------|---------------|---------------|
| Corporate Attorney | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | Business counsel |
| Legal Memo | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | Legal research |
| Plain English | ⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ | Client comms |
| Contract Drafter | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | Document creation |
| Compliance Advisor | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | Regulatory guidance |
| Litigation Strategist | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | Dispute strategy |
| Farnsworth Contextual | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | Balanced analysis |

---

## Usage Examples

### Example 1: Contract Review for Different Audiences

**Same Contract, Three Styles:**

```bash
# For the CEO
/law-team:contract-review agreement.pdf --style corporate-attorney
→ Risk assessment, business implications, red flags

# For the employee signing
/law-team:contract-review agreement.pdf --style plain-english-legal
→ What this means for you, warnings in simple terms

# For legal team
/law-team:contract-review agreement.pdf --style contract-drafter
→ Clause-by-clause analysis, drafting issues, legal precision
```

### Example 2: Different Questions, Different Styles

```bash
# Business question
"Should we enforce this non-compete?"
→ Use: litigation-strategist (cost-benefit, settlement strategy)

# Legal question
"Is this non-compete enforceable under state law?"
→ Use: legal-memo (doctrine, cases, analysis)

# Employee question
"What does this non-compete mean?"
→ Use: plain-english-legal (accessible explanation)

# Drafting question
"How should we write this non-compete?"
→ Use: contract-drafter (precise language, best practices)
```

### Example 3: Regulatory Compliance Project

```bash
# Phase 1: Understand requirements
/law-team:compliance-check GDPR --style compliance-advisor
→ Systematic framework, checklist, implementation

# Phase 2: Draft policies
/law-team:draft-contract privacy-policy --style contract-drafter
→ Precise legal language, comprehensive coverage

# Phase 3: Employee training
"Explain GDPR to employees" --style plain-english-legal
→ Accessible guide, practical examples
```

---

## Advanced Features

### Style Mixing

You can request different perspectives on the same issue:

```
"Review this contract using corporate-attorney style,
then explain the top 3 issues in plain-english-legal style"
```

### Style Switching Mid-Conversation

```
User: "Analyze this employment agreement"
Assistant: [Uses corporate-attorney by default]

User: "Now explain that in plain English"
Assistant: [Switches to plain-english-legal]

User: "Give me the Farnsworth perspective on the non-compete"
Assistant: [Switches to farnsworth-contextual]
```

### Combining with Commands

All styles work seamlessly with law-team commands:

```bash
/law-team:ip-protection trademark --style plain-english-legal
/law-team:contract-review nda.pdf --style corporate-attorney
/law-team:compliance-check employment --style compliance-advisor
/law-team:legal-checklist startup --style litigation-strategist
```

---

## When to Use Each Style

### **Corporate Attorney** - When you need:
- Risk assessment for business decisions
- Practical legal guidance
- Business-focused counsel
- In-house legal perspective

### **Legal Memo** - When you need:
- Thorough legal research
- Formal legal analysis
- Citation to authority
- Court-ready analysis

### **Plain English Legal** - When you need:
- Client explanations
- Employee communications
- Educational materials
- Accessibility over precision

### **Contract Drafter** - When you need:
- Precise legal language
- Contract creation/review
- Clause-by-clause analysis
- Enforceable documents

### **Compliance Advisor** - When you need:
- Regulatory frameworks
- Audit preparation
- Risk-based prioritization
- Implementation guidance

### **Litigation Strategist** - When you need:
- Dispute evaluation
- Settlement strategy
- Cost-benefit analysis
- Trial preparation

### **Farnsworth Contextual** - When you need:
- Balanced contract analysis
- Good faith and fairness emphasis
- Restatement (Second) integration
- Academic rigor with practical application

---

## Implementation Notes

### Location
```
/law-team/.claude-plugin/output-styles/
├── corporate-attorney.md
├── legal-memo.md
├── plain-english-legal.md
├── contract-drafter.md
├── compliance-advisor.md
├── litigation-strategist.md
├── farnsworth-contextual.md
├── README.md
└── SUMMARY.md (this file)
```

### How They Work

Output styles provide guidance to Claude on:
- **Voice and tone** - How to communicate
- **Structure** - How to organize information
- **Language** - What terminology to use
- **Approach** - What methodology to apply
- **Audience** - Who is being addressed

### Customization

You can create custom styles by:
1. Copying an existing style
2. Modifying the approach
3. Saving with descriptive name
4. Using with `--style your-style-name`

---

## Special Feature: Farnsworth Contextual

The **Farnsworth Contextual** style is unique - it embodies the analytical approach of E. Allan Farnsworth (1928-2005), the legendary Columbia professor and contract law scholar who:

- Wrote the definitive *Farnsworth on Contracts*
- Served as Reporter for the Restatement (Second) of Contracts (1981)
- Taught at Columbia Law School for over 50 years
- Championed balanced analysis integrating fairness with doctrine
- Emphasized good faith, fair dealing, and contextual interpretation

**Use this style when you want:**
- Balanced, nuanced analysis
- Good faith and fair dealing emphasis
- Restatement (Second) integration
- Contextual interpretation methodology
- Modern commercial law expertise
- Pedagogical explanations with practical application

**Perfect for:**
- Law school assignments
- Contract formation questions
- Interpretation disputes requiring contextual analysis
- Academic papers
- Understanding modern contract doctrine

---

## Tips for Maximum Effectiveness

### 1. **Choose Based on Audience**
- Know who will read the output
- Match formality to expectations
- Consider technical knowledge level

### 2. **Consider the Purpose**
- Decision-making → corporate-attorney or litigation-strategist
- Documentation → contract-drafter or legal-memo
- Communication → plain-english-legal
- Compliance → compliance-advisor
- Education → farnsworth-contextual or plain-english-legal

### 3. **Mix and Match**
- Use multiple styles for complex projects
- Get different perspectives on same issue
- Start formal, then translate to plain language

### 4. **Default Behaviors**
- Contract questions → Usually contract-drafter or corporate-attorney
- Litigation questions → litigation-strategist
- Regulatory questions → compliance-advisor
- General questions → corporate-attorney
- You can always override by specifying a style

---

## Files Statistics

| File | Size | Lines | Purpose |
|------|------|-------|---------|
| corporate-attorney.md | 3.8 KB | ~90 | Business legal counsel |
| legal-memo.md | 4.5 KB | ~125 | Formal legal analysis |
| plain-english-legal.md | 7.4 KB | ~210 | Accessible communication |
| contract-drafter.md | 11.4 KB | ~325 | Document drafting |
| compliance-advisor.md | 11.6 KB | ~320 | Regulatory guidance |
| litigation-strategist.md | 14.7 KB | ~410 | Dispute strategy |
| farnsworth-contextual.md | 19.2 KB | ~520 | Balanced analysis |

**Total:** ~72 KB of specialized legal communication frameworks

---

## Version Information

- **Version:** 1.0.0
- **Created:** 2025-10-20
- **Plugin:** law-team v1.0.0
- **Total Styles:** 7
- **Maintained By:** lifsys

---

## Next Steps

1. **Try each style** to understand the differences
2. **Experiment** with style mixing
3. **Create custom styles** for your specific needs
4. **Provide feedback** on effectiveness

---

**For detailed information on each style, see [`README.md`](./README.md)**

**For individual style specifications, see the respective `.md` files**
