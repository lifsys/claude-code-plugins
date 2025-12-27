# Law Team Plugin for Claude Code

A comprehensive legal assistance plugin providing expert guidance on business law, contracts, intellectual property, compliance, and operational legalities.

## Overview

The Law Team plugin extends Claude Code with specialized legal capabilities to help entrepreneurs and business owners navigate the legal aspects of starting and running a business. This plugin provides educational legal information (not legal advice) across critical areas including business formation, contract drafting, intellectual property protection, employment law compliance, and regulatory requirements.

### Adaptive Legal Approach System

**NEW:** The law-team plugin now features an intelligent approach selection system that tailors tone, style, and recommendations to your specific situation. Before performing any legal work, you'll be asked to select from four distinct legal approaches:

1. **Adversarial Approach** - Formal, combative, protective. Best for disputes, litigation, and aggressive protection needs.
2. **Collaborative Approach** - Cooperative, relationship-focused, win-win oriented. Best for partnerships and ongoing business relationships.
3. **Preventative/Compliance Approach** - Methodical, risk-averse, process-oriented. Best for compliance programs and risk prevention.
4. **Business-Partner Approach** - Pragmatic, results-driven, commercially focused. Best for daily operations and deal enablement.

This ensures you receive legal guidance that matches your context, risk tolerance, and business objectives. See [Legal Approaches Guide](resources/legal-approaches.md) for detailed information on each approach.

## Features

### Slash Commands

The plugin provides six powerful slash commands for common legal tasks:

- **`/legal-checklist [business-type] [stage]`** - Generate comprehensive legal compliance checklists
- **`/contract-review [contract-type]`** - Review contracts for potential issues and red flags
- **`/compliance-check [compliance-area]`** - Check compliance status and identify gaps
- **`/business-structure [current-situation]`** - Get guidance on choosing the right business structure
- **`/ip-protection [ip-type]`** - Get guidance on protecting intellectual property
- **`/draft-contract [contract-type]`** - Draft customized contracts from templates

### Agent Skills

Four comprehensive skills provide deep expertise:

1. **Business Structure Advisory** - Expert guidance on choosing and forming business entities (sole proprietorship, LLC, corporation, partnership)

2. **Contract Drafting and Review** - Assistance in creating, reviewing, and analyzing business contracts and legal agreements

3. **Intellectual Property Protection** - Comprehensive guidance on trademarks, patents, copyrights, and trade secrets

4. **Business Compliance and Regulatory Guidance** - Employment law, data privacy, workplace safety, tax compliance, and industry regulations

### Specialized Agent

**Legal Advisor Agent** - A comprehensive legal advisor providing strategic coordination across all legal areas with capabilities in:
- Business structure guidance and formation advice
- Contract drafting and review
- Intellectual property protection strategy
- Employment law compliance
- Data privacy and regulatory compliance
- Risk assessment and mitigation

### Resource Library

Extensive documentation of free legal resources including:
- Contract template platforms
- Compliance guides and tools
- Legal research databases
- Government resources (USPTO, Copyright Office, SBA, DOL, IRS, OSHA)
- Data privacy resources (CCPA, GDPR)
- Professional assistance directories
- Educational materials

## Installation

### From Marketplace

1. Add the law-team marketplace:
   ```
   /plugin marketplace add [marketplace-url]
   ```

2. Install the plugin:
   ```
   /plugin install law-team
   ```

### For Development/Testing

1. Clone or download this plugin to your local machine

2. Create a local marketplace (if you don't have one):
   ```
   mkdir -p ~/law-team-marketplace
   cd ~/law-team-marketplace
   ```

3. Create `marketplace.json`:
   ```json
   {
     "name": "law-team-plugins",
     "plugins": [
       {
         "source": "/path/to/law-team"
       }
     ]
   }
   ```

4. Add the local marketplace:
   ```
   /plugin marketplace add ~/law-team-marketplace
   ```

5. Install the plugin:
   ```
   /plugin install law-team@law-team-plugins
   ```

## How Approach Selection Works

When you use any law-team feature (command, skill, or agent), you'll first be prompted to select your legal approach:

**Example:**
```
> /contract-review vendor-agreement.pdf

Claude: "What legal approach should I use for this contract review?"

Options:
1. Adversarial - "Find every risk and protect me aggressively"
2. Collaborative - "Balanced review that preserves business relationship"
3. Preventative/Compliance - "Comprehensive review focused on risk prevention"
4. Business-Partner - "Practical review focused on deal flow"

[You select: Business-Partner]

Claude proceeds with practical, deal-focused review...
```

Your selection determines:
- **Communication tone** - Aggressive vs. cooperative vs. methodical vs. pragmatic
- **Risk tolerance** - What level of risk is acceptable
- **Recommendations** - How protective vs. enabling
- **Contract language** - How aggressive vs. balanced
- **Enforcement posture** - Litigation-ready vs. relationship-preserving

You can change approaches mid-session by explicitly requesting: "Switch to adversarial approach" or similar.

## Usage Examples

### Starting a New Business

```
> /legal-checklist "tech startup" "pre-launch"
```

After selecting your approach, Claude will generate a comprehensive checklist covering:
- Business structure selection
- Registration requirements
- Tax IDs and registrations
- Intellectual property protection
- Essential contracts
- Employment considerations
- Insurance needs
- Privacy compliance
- Industry-specific regulations

### Reviewing a Contract

```
> /contract-review NDA @contracts/vendor-nda.pdf
```

Claude will analyze the NDA and provide:
- Overall assessment
- Red flags and concerns
- Missing clauses
- Recommended modifications
- Questions to ask the other party

### Business Formation Decision

```
> Can you help me decide between LLC and S-Corp for my new consulting business?
```

The Business Structure Skill will activate automatically and provide:
- Detailed comparison of LLC vs. S-Corp
- Tax implications
- Liability protection
- Formation requirements and costs
- Ongoing compliance obligations
- Recommendation based on your situation

### Intellectual Property Protection

```
> I want to trademark my business name and logo. How do I start?
```

The IP Protection Skill will guide you through:
- Trademark search process
- Federal vs. state registration
- Application requirements
- Timeline and costs
- Maintenance requirements
- Use of ® vs. ™ symbols

### Employment Law Compliance

```
> /compliance-check employment
```

The Compliance Skill will assess:
- Employee vs. contractor classification
- Exempt vs. non-exempt determination
- Wage and hour compliance
- Required postings
- Anti-discrimination requirements
- Leave policies (FMLA, state requirements)
- I-9 compliance
- Recommended actions

### Contract Drafting

```
> /draft-contract "service agreement" for web development project
```

Claude will create a customized service agreement including:
- Scope of services
- Compensation terms
- Intellectual property provisions
- Warranties and indemnification
- Termination rights
- All standard clauses
- Helpful annotations for customization

## Plugin Structure

```
law-team/
├── .claude-plugin/
│   └── plugin.json                    # Plugin manifest
├── commands/                           # Slash commands
│   ├── legal-checklist.md
│   ├── contract-review.md
│   ├── compliance-check.md
│   ├── business-structure.md
│   ├── ip-protection.md
│   └── draft-contract.md
├── skills/                             # Agent Skills
│   ├── business-structure/
│   │   └── SKILL.md
│   ├── contract-drafting/
│   │   └── SKILL.md
│   ├── ip-protection/
│   │   └── SKILL.md
│   └── compliance/
│       └── SKILL.md
├── agents/                             # Specialized agents
│   └── legal-advisor.md
├── resources/                          # Reference documentation
│   └── legal-resources.md
└── README.md                          # This file
```

## Coverage Areas

### Core Legal Foundations

- **Business Structure**: Sole proprietorship, partnership, LLC, S-Corp, C-Corp, B-Corp
- **Business Registration**: Name registration, DBA, state filing
- **Tax IDs**: EIN, state tax registrations
- **Licenses and Permits**: Federal, state, and local requirements
- **Intellectual Property**: Trademarks, patents, copyrights, trade secrets

### Contracts and Agreements

- Non-Disclosure Agreements (NDAs)
- Service Agreements / Statements of Work
- Employment Agreements and Offer Letters
- Independent Contractor Agreements
- Partnership Agreements / LLC Operating Agreements
- Vendor/Supplier Agreements
- Client Services Agreements
- Software License Agreements
- Consulting and Freelance Agreements

### Intellectual Property

- **Trademarks**: Search, registration, maintenance, enforcement
- **Patents**: Utility, design, plant patents; provisional and non-provisional applications
- **Copyrights**: Registration, work-made-for-hire, fair use, DMCA
- **Trade Secrets**: Protection measures, NDAs, best practices

### Employment Law and Compliance

- Employee vs. Independent Contractor classification
- Exempt vs. Non-exempt determination
- Wage and hour compliance (FLSA)
- Anti-discrimination laws (Title VII, ADA, ADEA)
- Family and Medical Leave Act (FMLA)
- Workers' compensation
- Unemployment insurance
- I-9 and employment eligibility
- Employee handbooks and policies

### Data Privacy and Security

- California Consumer Privacy Act (CCPA/CPRA)
- General Data Protection Regulation (GDPR)
- Privacy policy requirements
- Data security best practices
- Breach notification and response

### Operational Legalities

- Workplace safety (OSHA)
- Business licenses and permits
- Tax compliance (income, payroll, sales tax)
- Industry-specific regulations (HIPAA, FDA, TTB, etc.)
- Corporate governance and formalities

## Important Legal Disclaimers

### Not Legal Advice

**This plugin provides legal information for educational purposes only and does not constitute legal advice.**

- No attorney-client relationship is created
- Information is general in nature and may not apply to your specific situation
- Laws vary by jurisdiction and change frequently
- Always consult with a licensed attorney in your jurisdiction for legal advice

### When to Hire an Attorney

You should consult with a licensed attorney for:
- Complex legal situations
- High-value transactions (typically over $50,000)
- Litigation or legal disputes
- Government investigations or enforcement actions
- Regulated industries (healthcare, financial services, etc.)
- Multi-state or international business
- Business formations with complex ownership
- Intellectual property disputes
- Employment terminations or disputes
- Any situation where legal risk is significant

### Limitations

- This plugin cannot provide legal advice
- It cannot represent you in legal proceedings
- It cannot file legal documents on your behalf
- It is not a substitute for a licensed attorney
- Information may become outdated as laws change

## Free Legal Resources

The plugin references and recommends numerous free legal resources:

**Contract Templates:**
- LegalTemplates.net
- LawDepot.com
- PandaDoc.com
- Rocket Lawyer
- SCORE.org

**Government Resources:**
- SBA.gov (Small Business Administration)
- USPTO.gov (Trademarks and Patents)
- Copyright.gov (Copyright Office)
- IRS.gov (Tax information)
- DOL.gov (Employment law)
- OSHA.gov (Workplace safety)

**Legal Research:**
- Justia.com
- Cornell Legal Information Institute
- State bar associations

**Education:**
- Nolo.com legal guides
- SCORE mentoring
- Small Business Development Centers (SBDCs)

See `resources/legal-resources.md` for comprehensive directory.

## Professional Service Costs

For reference, typical costs when you do need professional assistance:

**Attorneys:**
- Initial consultation: $200-$500
- Simple contract review: $500-$1,500
- Custom contract drafting: $1,000-$5,000
- Business formation: $1,500-$5,000
- Trademark filing: $1,000-$2,000 per class
- Patent application: $8,000-$15,000+

**CPAs/Tax Professionals:**
- Tax return preparation: $200-$1,000+
- Tax planning: $200-$500/hour
- Payroll setup: $500-$1,500

**Other Professionals:**
- HR consultant: $150-$300/hour
- Compliance consultant: Varies by industry
- Insurance broker: Usually commission-based (no upfront cost)

## Contributing

Contributions to improve this plugin are welcome:

1. **Report Issues**: If you find errors or outdated information
2. **Suggest Improvements**: Ideas for new features or better explanations
3. **Update Resources**: New free legal resources or tools
4. **Add Examples**: Real-world usage examples

## Version History

### Version 1.0.0 (2025-01)
- Initial release
- 6 slash commands
- 4 comprehensive skills
- 1 specialized legal advisor agent
- Complete legal resources directory
- Coverage of business law, contracts, IP, employment, and compliance

## Support and Feedback

For issues, questions, or feedback:
- File issues on the GitHub repository
- Consult the resource documentation in `resources/`
- Review the skill documentation in `skills/` for detailed guidance

## License

MIT License - See LICENSE file for details

## Acknowledgments

This plugin was created to democratize access to legal information for small businesses and entrepreneurs. While it cannot replace the expertise of a licensed attorney, it aims to:
- Educate business owners on legal requirements
- Help identify when professional legal help is needed
- Provide practical guidance on common legal matters
- Direct users to appropriate free and paid resources

**Remember**: When in doubt, consult a licensed attorney. The cost of professional legal advice is almost always less than the cost of legal problems.

---

**Disclaimer**: This plugin is provided "as is" without warranty of any kind. The authors and contributors are not liable for any damages arising from use of this plugin. Always verify legal information with current laws and consult licensed professionals for legal advice.
