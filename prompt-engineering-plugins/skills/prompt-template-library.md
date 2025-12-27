# prompt-template-library

**Pre-built, production-ready prompt templates based on Anthropic's curriculum and real-world patterns.**

## Purpose

This skill provides a curated library of prompt templates organized by use case, industry, and complexity level. Each template is based on proven patterns from the Anthropic curriculum and can be customized for your specific needs.

## When to Use This Skill

Use `prompt-template-library` when you:
- Want to start with a proven pattern
- Need inspiration for structuring prompts
- Want to see best practices in action
- Need to implement common use cases quickly
- Want to learn by example

## Interactive Template Selection

When a user requests a template, use the **AskUserQuestion tool** to guide them:

### Step 1: Category Selection

**Use AskUserQuestion tool:**
```
Question: "What category best fits your use case?"
Header: "Category"
multiSelect: false
Options:
1. "Content & Writing" - "Summarization, classification, sentiment analysis, writing tasks"
2. "Data & Analysis" - "Data extraction, pattern recognition, report generation"
3. "Code & Technical" - "Code review, bug detection, documentation, explanations"
4. "Customer Service" - "Ticket triage, response generation, FAQ answering"
5. "Legal & Compliance" - "Contract analysis, risk identification, compliance checking"
6. "Financial Services" - "Tax analysis, financial reports, investment research"
```

### Step 2: Specific Template Selection

Based on category selected, present relevant templates:

**Use AskUserQuestion tool with category-specific options:**
```
Question: "Which specific template do you need?"
Header: "Template"
multiSelect: false
Options: [Category-specific templates listed]
```

### Step 3: Customization Level

**Use AskUserQuestion tool:**
```
Question: "How much customization do you need?"
Header: "Customization"
multiSelect: false
Options:
1. "Use as-is" - "Template works for my use case with minimal changes"
2. "Guided customization" - "Help me adapt template step-by-step"
3. "Show me examples first" - "I want to see template in action before deciding"
4. "Combine templates" - "I need elements from multiple templates"
```

## Template Categories

### 1. Content & Writing
- Summarization
- Content classification
- Sentiment analysis
- Writing assistance
- Style transformation

### 2. Data & Analysis
- Data extraction
- Classification
- Pattern recognition
- Report generation
- Trend analysis

### 3. Code & Technical
- Code review
- Bug detection
- Documentation generation
- Code explanation
- Refactoring suggestions

### 4. Customer Service
- Support ticket triage
- Response generation
- Escalation detection
- FAQ answering
- Feedback analysis

### 5. Legal & Compliance
- Document analysis
- Risk identification
- Contract review
- Compliance checking
- Citation extraction

### 6. Financial Services
- Tax analysis
- Risk assessment
- Financial report analysis
- Investment research
- Regulatory compliance

## Template Structure

Each template includes:
- **Use Case**: What problem it solves
- **Complexity Level**: Simple | Medium | Complex
- **Curriculum Chapters**: Which techniques it uses
- **Full Prompt**: Ready-to-use prompt template
- **Variables**: Placeholders for customization
- **Examples**: Sample inputs and outputs
- **Customization Guide**: How to adapt for your needs
- **Testing Checklist**: What to test before deployment

## Available Templates

---

### Template 1: Email Classification

**Use Case**: Classify emails into categories (spam/legitimate, priority levels, departments, etc.)

**Complexity Level**: Medium

**Curriculum Chapters**: 2 (Clarity), 4 (XML Tags), 5 (Output Format), 7 (Few-Shot), 8 (Hallucination Prevention)

**Variables**:
- `{{EMAIL}}`: The email content to classify
- `{{CATEGORIES}}`: List of valid categories
- `{{CLASSIFICATION_CRITERIA}}`: Specific criteria for classification

**Full Prompt**:
```
You are an email classification assistant. Categorize emails accurately based on content and context.

<email>
{{EMAIL}}
</email>

Classify the email into one of these categories:
{{CATEGORIES}}

Consider these criteria:
{{CLASSIFICATION_CRITERIA}}

If the email doesn't clearly fit any category, respond with "uncertain" rather than guessing.

<examples>
<example>
<email>Subject: URGENT - Account Suspended
Click here immediately to restore access: http://suspicious-link.com</email>
<category>spam</category>
<reasoning>Urgent language, suspicious URL, generic content typical of phishing</reasoning>
</example>

<example>
<email>Subject: Q4 Budget Review Meeting
Hi team, let's meet Tuesday at 2pm to review Q4 budget allocations. Conference room B is booked.</email>
<category>internal-business</category>
<reasoning>Internal meeting coordination, business context, specific details</reasoning>
</example>

<example>
<email>Subject: Product inquiry
I'm interested in your enterprise plan. Can you provide pricing for 50 users?</email>
<category>sales-lead</category>
<reasoning>Legitimate product inquiry with specific details, clear business interest</reasoning>
</example>
</examples>

Provide your classification:
<classification>
<category></category>
<reasoning></reasoning>
<confidence>high|medium|low</confidence>
</classification>
```

**Customization Guide**:
1. Replace `{{CATEGORIES}}` with your specific categories (e.g., "spam, sales, support, internal")
2. Update `{{CLASSIFICATION_CRITERIA}}` with domain-specific rules
3. Customize examples to match your actual email types
4. Adjust confidence levels based on your risk tolerance
5. Add more examples for edge cases specific to your domain

**Testing Checklist**:
- [ ] Test with clear, obvious examples from each category
- [ ] Test with ambiguous emails that span multiple categories
- [ ] Test with completely unrelated content
- [ ] Verify "uncertain" responses for edge cases
- [ ] Check output format consistency

---

### Template 2: Document Summarization

**Use Case**: Create concise summaries of long documents, articles, or reports

**Complexity Level**: Medium

**Curriculum Chapters**: 2 (Clarity), 3 (Role), 4 (XML Tags), 5 (Output Format), 8 (Hallucination Prevention)

**Variables**:
- `{{DOCUMENT}}`: The document to summarize
- `{{LENGTH}}`: Desired summary length
- `{{FOCUS_AREAS}}`: Specific aspects to emphasize

**Full Prompt**:
```
You are a professional summarization assistant skilled at distilling complex documents into clear, concise summaries.

<document>
{{DOCUMENT}}
</document>

Create a {{LENGTH}} summary that covers:
{{FOCUS_AREAS}}

Rules:
- Only include information explicitly stated in the document
- Do not add interpretation or external knowledge
- If key information is missing, note "Information not provided in document"
- Maintain factual accuracy over completeness

Structure your summary:
<summary>
<main_points>
- [2-3 key points]
</main_points>

<key_details>
[{{LENGTH}} paragraph covering focus areas]
</key_details>

<notable_gaps>
[Any critical information not covered in the document]
</notable_gaps>
</summary>
```

**Customization Guide**:
1. Specify `{{LENGTH}}`: "one-paragraph", "2-3 sentences", "250 words", etc.
2. Define `{{FOCUS_AREAS}}`: "main findings", "action items", "financial data", etc.
3. Add domain-specific structure tags (e.g., `<risk_factors>` for financial docs)
4. Include examples if summarization style needs demonstration
5. Adjust hallucination safeguards based on accuracy requirements

**Testing Checklist**:
- [ ] Test with documents of varying lengths
- [ ] Verify summary stays within length constraint
- [ ] Check that focus areas are adequately covered
- [ ] Ensure no external information is added
- [ ] Validate that gaps are properly identified

---

### Template 3: Code Review Assistant

**Use Case**: Review code for bugs, style issues, security vulnerabilities, and improvement opportunities

**Complexity Level**: Complex

**Curriculum Chapters**: 3 (Role), 4 (XML Tags), 5 (Output Format), 6 (Step-by-Step), 7 (Few-Shot), 8 (Hallucination Prevention)

**Variables**:
- `{{CODE}}`: Code to review
- `{{LANGUAGE}}`: Programming language
- `{{FOCUS}}`: Specific review focus (bugs, security, style, performance)

**Full Prompt**:
```
You are an expert {{LANGUAGE}} developer conducting a thorough code review.

<code>
{{CODE}}
</code>

Review focus: {{FOCUS}}

Analyze the code step-by-step:

<analysis>
First, understand what the code is intended to do.
Then, examine for:
1. Correctness and bugs
2. Security vulnerabilities
3. Style and best practices
4. Performance considerations
5. Edge cases and error handling
</analysis>

Only flag issues you can definitively identify from the code. If something looks potentially problematic but you're uncertain, note it as "Potential concern" rather than a definite issue.

<examples>
<example>
<code>
def get_user(user_id):
    query = f"SELECT * FROM users WHERE id = {user_id}"
    return db.execute(query)
</code>
<review>
<critical>
SQL Injection vulnerability: User input directly interpolated into query string.
</critical>
<recommendation>
Use parameterized queries: `query = "SELECT * FROM users WHERE id = ?"` with `db.execute(query, (user_id,))`
</recommendation>
</review>
</example>
</examples>

Provide your review:
<review>
<summary>
[Brief overview of code quality]
</summary>

<critical_issues>
[Issues that must be fixed - bugs, security vulnerabilities]
</critical_issues>

<suggestions>
[Improvements for style, performance, maintainability]
</suggestions>

<positive>
[What the code does well]
</positive>

<overall_assessment>high_quality|acceptable|needs_improvement|major_issues</overall_assessment>
</review>
```

**Customization Guide**:
1. Specify `{{LANGUAGE}}` and update role expertise accordingly
2. Customize `{{FOCUS}}` for specific review priorities
3. Add language-specific best practices to analysis steps
4. Include examples of common issues in your codebase
5. Adjust severity levels based on your team's standards
6. Add company-specific style guide requirements

**Testing Checklist**:
- [ ] Test with correct code (should have minimal issues)
- [ ] Test with code containing obvious bugs
- [ ] Test with security vulnerabilities
- [ ] Test with style violations
- [ ] Verify step-by-step analysis is present
- [ ] Check that uncertain areas are properly flagged

---

### Template 4: Customer Support Ticket Triage

**Use Case**: Categorize support tickets by priority, department, and required action

**Complexity Level**: Medium

**Curriculum Chapters**: 2 (Clarity), 4 (XML Tags), 5 (Output Format), 7 (Few-Shot), 8 (Hallucination Prevention)

**Variables**:
- `{{TICKET}}`: Support ticket content
- `{{PRIORITY_DEFINITIONS}}`: Criteria for priority levels
- `{{DEPARTMENTS}}`: Available departments

**Full Prompt**:
```
You are a customer support triage specialist. Categorize tickets accurately to ensure customers receive prompt, appropriate assistance.

<ticket>
{{TICKET}}
</ticket>

Priority Definitions:
{{PRIORITY_DEFINITIONS}}

Available Departments:
{{DEPARTMENTS}}

If the ticket is unclear or missing critical information, flag it for human review rather than guessing.

<examples>
<example>
<ticket>
Subject: Can't log in - payment due today!
I've tried resetting my password 3 times but still can't access my account. I have a payment due today and need to submit it before 5pm or there's a late fee!
</ticket>
<triage>
<priority>high</priority>
<department>technical-support</department>
<issue_type>account-access</issue_type>
<reasoning>Time-sensitive issue with financial impact, account access problem needs immediate technical assistance</reasoning>
<suggested_action>Immediate escalation to senior support for manual account verification and password reset</suggested_action>
</triage>
</example>

<example>
<ticket>
Subject: Feature request
It would be nice if the dashboard had a dark mode option.
</ticket>
<triage>
<priority>low</priority>
<department>product</department>
<issue_type>feature-request</issue_type>
<reasoning>Non-urgent enhancement request, no blocking issues, appropriate for product team backlog</reasoning>
<suggested_action>Log as feature request for product team review</suggested_action>
</triage>
</example>
</examples>

Provide your triage assessment:
<triage>
<priority>high|medium|low</priority>
<department></department>
<issue_type></issue_type>
<reasoning></reasoning>
<suggested_action></suggested_action>
<flags>
[Any red flags: angry customer, legal threat, data breach, etc.]
</flags>
</triage>
```

**Customization Guide**:
1. Define `{{PRIORITY_DEFINITIONS}}` based on your SLA
2. List `{{DEPARTMENTS}}` that exist in your organization
3. Update examples to match your typical ticket types
4. Add custom `<flags>` for escalation triggers
5. Include domain-specific issue types
6. Adjust triage criteria for your business needs

**Testing Checklist**:
- [ ] Test with urgent, time-sensitive tickets
- [ ] Test with routine, low-priority requests
- [ ] Test with tickets spanning multiple departments
- [ ] Verify angry/escalated customers are flagged
- [ ] Check that ambiguous tickets trigger human review

---

### Template 5: Legal Contract Analysis

**Use Case**: Analyze contracts to identify key terms, obligations, risks, and potential issues

**Complexity Level**: Complex

**Curriculum Chapters**: 3 (Role), 4 (XML Tags), 5 (Output Format), 6 (Step-by-Step), 8 (Hallucination Prevention - Critical)

**Variables**:
- `{{CONTRACT}}`: Contract text
- `{{ANALYSIS_FOCUS}}`: Specific aspects to analyze
- `{{PARTY_NAME}}`: Your organization's name

**Full Prompt**:
```
You are a legal analysis assistant helping to review contracts. Your role is to identify key terms, obligations, and potential risks.

IMPORTANT: You are assisting with legal review, not providing legal advice. Always recommend consultation with a qualified attorney for final decisions.

<contract>
{{CONTRACT}}
</contract>

Analyze from the perspective of: {{PARTY_NAME}}

Focus areas: {{ANALYSIS_FOCUS}}

<analysis_process>
Step 1: Identify the parties and effective dates
Step 2: Extract key obligations for {{PARTY_NAME}}
Step 3: Identify termination clauses and conditions
Step 4: Note payment terms and financial obligations
Step 5: Identify potential risks or unfavorable terms
Step 6: Check for missing standard clauses
</analysis_process>

CRITICAL: Only cite terms that are explicitly present in the contract. If you cannot find specific information, state "Not specified in contract" rather than making assumptions.

<analysis>
<parties_and_dates>
[Who the contract is between and when it takes effect]
</parties_and_dates>

<key_obligations>
[What {{PARTY_NAME}} must do under this contract]
</key_obligations>

<termination_terms>
[How and when the contract can be ended]
</termination_terms>

<financial_terms>
[Payment amounts, schedules, penalties]
</financial_terms>

<potential_risks>
[Clauses that may be unfavorable or risky - cite specific sections]
</potential_risks>

<missing_clauses>
[Standard clauses that appear to be absent]
</missing_clauses>

<requires_attorney_review>
[Specific items that definitely need legal professional review]
</requires_attorney_review>
</analysis>

DISCLAIMER: This analysis is for informational purposes only. Consult with a qualified attorney before making any legal decisions.
```

**Customization Guide**:
1. Specify `{{PARTY_NAME}}` for perspective
2. Define `{{ANALYSIS_FOCUS}}`: liability, IP rights, confidentiality, etc.
3. Add industry-specific clauses to check for
4. Customize risk criteria based on your risk tolerance
5. Include examples if you have standard contract types
6. Add jurisdiction-specific considerations

**Testing Checklist**:
- [ ] Test with standard contracts from your industry
- [ ] Verify all obligations are correctly identified
- [ ] Check that risks are accurately flagged
- [ ] Ensure no assumptions beyond contract text
- [ ] Validate that missing clauses are noted
- [ ] Confirm attorney review recommendations appear

---

### Template 6: Financial Data Analysis

**Use Case**: Analyze financial data, tax information, or reports to answer questions and identify insights

**Complexity Level**: Complex

**Curriculum Chapters**: 3 (Role), 4 (XML Tags), 5 (Output Format), 6 (Step-by-Step), 7 (Few-Shot), 8 (Hallucination Prevention)

**Variables**:
- `{{FINANCIAL_DATA}}`: Financial documents or data
- `{{QUESTION}}`: Specific question to answer
- `{{CONTEXT}}`: Additional context (tax year, company info, etc.)

**Full Prompt**:
```
You are a financial analysis assistant with expertise in interpreting financial data and tax information.

Context: {{CONTEXT}}

<financial_data>
{{FINANCIAL_DATA}}
</financial_data>

<question>
{{QUESTION}}
</question>

Analyze step-by-step:
<thinking>
1. Identify relevant data points from the financial information
2. Perform any necessary calculations
3. Consider applicable rules or standards
4. Formulate answer based solely on provided data
</thinking>

CRITICAL: Only use information explicitly provided in the financial data. If data needed to answer the question is missing, clearly state what additional information is required.

Provide your analysis:
<analysis>
<answer>
[Direct answer to the question]
</answer>

<supporting_data>
[Relevant figures and calculations from the provided data]
</supporting_data>

<assumptions>
[Any assumptions made - these should be minimal]
</assumptions>

<limitations>
[What this analysis doesn't cover due to missing information]
</limitations>

<recommendation>
[Suggested next steps or additional analysis needed]
</recommendation>
</analysis>

DISCLAIMER: This analysis is for informational purposes. Consult with a qualified financial professional or tax advisor for personalized advice.
```

**Customization Guide**:
1. Specify `{{CONTEXT}}`: tax year, fiscal period, company type, etc.
2. Adjust analysis steps for specific financial domains
3. Add domain-specific terminology and standards
4. Include calculation formulas if standardized
5. Customize disclaimer based on regulatory requirements
6. Add examples of typical questions in your domain

**Testing Checklist**:
- [ ] Test with complete data sets
- [ ] Test with incomplete data (verify gaps are identified)
- [ ] Verify calculations are correct
- [ ] Check that no external data is assumed
- [ ] Ensure limitations are clearly stated
- [ ] Validate that recommendations are appropriate

---

### Template 7: Sentiment Analysis

**Use Case**: Analyze customer feedback, reviews, or social media posts for sentiment and key themes

**Complexity Level**: Simple to Medium

**Curriculum Chapters**: 2 (Clarity), 4 (XML Tags), 5 (Output Format), 7 (Few-Shot), 8 (Hallucination Prevention)

**Variables**:
- `{{TEXT}}`: Text to analyze
- `{{ASPECTS}}`: Specific aspects to analyze (product quality, service, price, etc.)

**Full Prompt**:
```
You are a sentiment analysis specialist. Analyze text for emotional tone and key themes.

<text>
{{TEXT}}
</text>

Analyze sentiment for these aspects:
{{ASPECTS}}

If sentiment is unclear or mixed, indicate "mixed" rather than forcing a single classification.

<examples>
<example>
<text>The product quality is amazing and exactly what I needed, but shipping took forever and customer service never responded to my inquiry.</text>
<sentiment>
<overall>mixed</overall>
<aspects>
  <product_quality>positive</product_quality>
  <shipping>negative</shipping>
  <customer_service>negative</customer_service>
</aspects>
<summary>Strong product satisfaction undermined by poor service experience</summary>
</sentiment>
</example>
</examples>

Provide your analysis:
<sentiment_analysis>
<overall_sentiment>positive|negative|neutral|mixed</overall_sentiment>

<aspects>
[Sentiment for each specified aspect]
</aspects>

<key_themes>
[Main topics or concerns mentioned]
</key_themes>

<quotes>
[Key phrases that support the sentiment assessment]
</quotes>

<confidence>high|medium|low</confidence>

<summary>
[One-sentence summary of the sentiment]
</summary>
</sentiment_analysis>
```

**Customization Guide**:
1. Define `{{ASPECTS}}` relevant to your business
2. Add more examples covering your typical content
3. Adjust granularity (3-point vs 5-point scale)
4. Add emotional intensity levels if needed
5. Include domain-specific sentiment indicators
6. Customize output format for your reporting needs

**Testing Checklist**:
- [ ] Test with clearly positive text
- [ ] Test with clearly negative text
- [ ] Test with neutral/factual text
- [ ] Test with mixed sentiment
- [ ] Test with sarcasm or ambiguity
- [ ] Verify confidence levels are appropriate

---

### Template 8: Data Extraction from Unstructured Text

**Use Case**: Extract structured information from emails, documents, forms, or other unstructured text

**Complexity Level**: Medium

**Curriculum Chapters**: 2 (Clarity), 4 (XML Tags), 5 (Output Format), 7 (Few-Shot), 8 (Hallucination Prevention)

**Variables**:
- `{{TEXT}}`: Unstructured text
- `{{FIELDS}}`: Fields to extract
- `{{FORMAT}}`: Output format (JSON, XML, etc.)

**Full Prompt**:
```
You are a data extraction specialist. Extract specific information from unstructured text accurately.

<text>
{{TEXT}}
</text>

Extract these fields:
{{FIELDS}}

Rules:
- Only extract information explicitly stated in the text
- Use null or "not provided" for missing information
- Do not infer or assume information not present
- Maintain exact values (don't paraphrase numbers, dates, names)

<examples>
<example>
<text>
From: john.doe@example.com
Date: March 15, 2024
Subject: Project Update

Hi team, the Q1 budget is $125,000 and we've spent $87,500 so far. The project is 70% complete and on track for April 30th delivery.
</text>
<extracted>
{
  "sender_email": "john.doe@example.com",
  "date": "2024-03-15",
  "budget": 125000,
  "spent": 87500,
  "completion_percent": 70,
  "deadline": "2024-04-30",
  "project_name": null
}
</extracted>
</example>
</examples>

Extract information in {{FORMAT}} format:
<extracted>
[Extracted data in specified format]
</extracted>

<extraction_notes>
<found>
[Fields successfully extracted]
</found>
<not_found>
[Fields not present in text]
</not_found>
<uncertain>
[Fields where extraction is uncertain]
</uncertain>
</extraction_notes>
```

**Customization Guide**:
1. Define `{{FIELDS}}` with expected data types
2. Specify `{{FORMAT}}`: JSON, XML, CSV, etc.
3. Add validation rules for specific fields
4. Include examples matching your document types
5. Add domain-specific extraction patterns
6. Define how to handle ambiguous values

**Testing Checklist**:
- [ ] Test with complete information
- [ ] Test with missing fields
- [ ] Test with ambiguous values
- [ ] Verify format compliance
- [ ] Check that null handling is correct
- [ ] Validate no information is fabricated

---

## Using Templates

### Basic Usage

1. **Browse templates** by category or use case
2. **Select template** that matches your needs
3. **Customize variables** with your specific values
4. **Review examples** to understand expected behavior
5. **Test with sample data** before production use
6. **Iterate** based on results

### Advanced Customization

**Combining Templates**:
- Use multiple templates in a prompt chain
- Extract data (Template 8) → Analyze sentiment (Template 7)
- Classify (Template 1) → Route to appropriate template

**Adding Complexity**:
- Start with simple template
- Add role prompting (Chapter 3)
- Add step-by-step thinking (Chapter 6)
- Increase examples (Chapter 7)
- Add domain-specific elements

**Simplifying Templates**:
- Remove optional sections
- Reduce number of examples
- Simplify output format
- Remove advanced features if not needed

## Template Customization Process

1. **Identify Requirements**
   - What problem are you solving?
   - What input will you provide?
   - What output do you need?
   - What edge cases exist?

2. **Select Base Template**
   - Find closest match by use case
   - Check complexity level
   - Review curriculum chapters used

3. **Customize Variables**
   - Replace all `{{PLACEHOLDERS}}`
   - Add domain-specific context
   - Update examples with real data

4. **Test Thoroughly**
   - Happy path scenarios
   - Edge cases
   - Error conditions
   - Output format consistency

5. **Refine Iteratively**
   - Run `prompt-analyzer` on customized version
   - Apply recommendations
   - Test again
   - Deploy when stable

## Best Practices

- **Don't skip examples**: They're the most effective technique (Chapter 7)
- **Always include hallucination safeguards**: Especially for factual domains (Chapter 8)
- **Use XML tags consistently**: Clear separation improves results (Chapter 4)
- **Test edge cases**: Templates are starting points, not final products
- **Document customizations**: Track what you changed and why
- **Version your prompts**: Keep history of changes

## Getting Help

- **Need analysis?**: Use `prompt-analyzer` on your customized template
- **Need optimization?**: Use `prompt-optimizer` after customization
- **Need guidance?**: Use `prompt-builder` for interactive help
- **Need debugging?**: Use `prompt-debugger` sub-agent

## Contributing Templates

Have a template that works well? Consider:
1. Testing it thoroughly across edge cases
2. Documenting variables and customization points
3. Including realistic examples
4. Adding to your personal template library
5. Sharing with your team
