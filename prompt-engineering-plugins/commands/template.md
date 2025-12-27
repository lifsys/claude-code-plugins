# /prompt-template - Template Library Access

Browse and use pre-built prompt templates for common use cases.

## Usage

```
/prompt-template [category] [use-case]

# Examples:
/prompt-template                           # Browse all categories
/prompt-template content                   # Show content templates
/prompt-template data extraction           # Get data extraction template
/prompt-template customer support-triage   # Get support triage template
```

## What This Does

Provides instant access to production-ready prompt templates:
- ✅ Proven patterns from Anthropic curriculum
- ✅ Real-world tested structures
- ✅ Customization guidance included
- ✅ Examples and testing checklists
- ✅ Ready to use or adapt

## Available Categories

### 1. Content & Writing
- Summarization
- Classification
- Sentiment analysis
- Writing assistance
- Style transformation

### 2. Data & Analysis
- Data extraction
- Pattern recognition
- Report generation
- Trend analysis

### 3. Code & Technical
- Code review
- Bug detection
- Documentation generation
- Code explanation

### 4. Customer Service
- Support ticket triage
- Response generation
- Escalation detection
- FAQ answering

### 5. Legal & Compliance
- Document analysis
- Risk identification
- Contract review
- Compliance checking

### 6. Financial Services
- Tax analysis
- Risk assessment
- Financial report analysis
- Investment research

## Template Structure

Each template includes:

```markdown
# Template Name

**Use Case**: What it solves
**Complexity**: Simple | Medium | Complex
**Techniques**: Curriculum chapters used

## Variables
- {{VAR1}}: Description
- {{VAR2}}: Description

## Full Prompt
[Complete, ready-to-use prompt]

## Customization Guide
[Step-by-step adaptation instructions]

## Testing Checklist
[What to test before deployment]

## Examples
[Sample inputs and outputs]
```

## Quick Start Examples

### Example 1: Email Classification

```
/prompt-template content classification
```

**Returns**: Email classification template with:
- XML tag structure
- Few-shot examples
- Hallucination safeguards
- Output format
- Customization guide

### Example 2: Code Review

```
/prompt-template code review
```

**Returns**: Code review template with:
- Expert role
- Step-by-step analysis
- Security focus
- Output structure
- Language customization

### Example 3: Customer Support

```
/prompt-template customer support-triage
```

**Returns**: Ticket triage template with:
- Priority definitions
- Department routing
- Escalation flags
- Example tickets

## Using Templates

### Basic Workflow

1. **Find template**:
   ```
   /prompt-template [category]
   ```

2. **Review structure**:
   - Read use case and complexity
   - Check variables needed
   - Review examples

3. **Customize**:
   - Replace {{VARIABLES}} with your values
   - Update examples for your domain
   - Adjust output format if needed

4. **Test**:
   - Follow testing checklist
   - Test with real data
   - Iterate as needed

5. **Deploy**:
   - Save customized version
   - Document customizations
   - Monitor performance

### Advanced Usage

**Combining Templates**:
```
# Use multiple templates in sequence
/prompt-template data extraction
# Extract data first, then...
/prompt-template content sentiment
# Analyze extracted data
```

**Template as Starting Point**:
```
# Get template
/prompt-template content summarization

# Customize and then optimize
/optimize-prompt [customized-template]

# Or analyze
/analyze-prompt [customized-template]
```

## Browse Mode

```
/prompt-template
```

Shows interactive menu:
```
Select a category:
1. Content & Writing (5 templates)
2. Data & Analysis (4 templates)
3. Code & Technical (4 templates)
4. Customer Service (4 templates)
5. Legal & Compliance (4 templates)
6. Financial Services (4 templates)

Enter number or category name:
```

## Search Mode

```
/prompt-template search [keyword]

# Examples:
/prompt-template search sentiment
/prompt-template search legal
/prompt-template search extraction
```

## Template Details

### Content Templates

| Template | Use Case | Complexity |
|----------|----------|------------|
| Email Classification | Categorize emails | Medium |
| Document Summarization | Create summaries | Medium |
| Sentiment Analysis | Analyze sentiment | Simple |
| Content Classification | Categorize content | Medium |
| Style Transformation | Change writing style | Medium |

### Data Templates

| Template | Use Case | Complexity |
|----------|----------|------------|
| Data Extraction | Extract structured data | Medium |
| Pattern Recognition | Identify patterns | Complex |
| Report Generation | Generate reports | Complex |
| Trend Analysis | Analyze trends | Complex |

### Code Templates

| Template | Use Case | Complexity |
|----------|----------|------------|
| Code Review | Review code quality | Complex |
| Bug Detection | Find bugs | Complex |
| Documentation Gen | Generate docs | Medium |
| Code Explanation | Explain code | Medium |

### Customer Service Templates

| Template | Use Case | Complexity |
|----------|----------|------------|
| Ticket Triage | Prioritize tickets | Medium |
| Response Generation | Generate responses | Medium |
| Escalation Detection | Flag escalations | Simple |
| FAQ Answering | Answer FAQs | Simple |

### Legal Templates

| Template | Use Case | Complexity |
|----------|----------|------------|
| Contract Analysis | Analyze contracts | Complex |
| Risk Identification | Identify risks | Complex |
| Compliance Checking | Check compliance | Complex |
| Document Review | Review legal docs | Complex |

### Financial Templates

| Template | Use Case | Complexity |
|----------|----------|------------|
| Tax Analysis | Analyze tax data | Complex |
| Risk Assessment | Assess financial risk | Complex |
| Report Analysis | Analyze reports | Medium |
| Investment Research | Research investments | Complex |

## Customization Tips

### Variables
- Always replace ALL {{VARIABLES}}
- Use clear, descriptive values
- Test with actual data

### Examples
- Use real examples from your domain
- Cover edge cases
- Include both positive and negative cases
- Aim for 2-3 examples minimum

### Output Format
- Match your system requirements
- JSON, XML, or custom structure
- Include all fields you need
- Add validation rules

### Role & Context
- Customize role for your industry
- Add specific expertise areas
- Include relevant background

## Best Practices

1. **Don't use templates blindly**
   - Read customization guide
   - Understand what each part does
   - Test thoroughly

2. **Customize examples**
   - Use your actual data
   - Cover your edge cases
   - Match your domain

3. **Test before deploying**
   - Follow testing checklist
   - Test edge cases
   - Verify output format

4. **Iterate**
   - Start with template
   - Test and gather feedback
   - Refine based on results

5. **Document changes**
   - Track customizations
   - Version your prompts
   - Share learnings

## When to Use Templates

✅ **Good scenarios**:
- Starting a new prompt project
- Need proven patterns
- Want to learn best practices
- Short on time
- Common use case

❌ **Bad scenarios**:
- Highly unique requirements
- Template doesn't match use case
- Need to understand from scratch
- Learning exercise (use `/build-prompt` instead)

## Related Commands

- `/build-prompt` - Build from scratch with guidance
- `/analyze-prompt` - Analyze template customizations
- `/optimize-prompt` - Optimize customized templates
- `prompt-template-library` skill - Full library access

## Getting Help

**If template doesn't fit**:
1. Try `/prompt-template` to browse other options
2. Use `/build-prompt` for custom solution
3. Combine multiple templates
4. Customize heavily with `/optimize-prompt`

**If customization unclear**:
1. Review examples in template
2. Use `prompt-analyzer` to check your version
3. Consult skill file for details
4. Ask for help in Claude Code

## Contributing

Found a great template pattern? Consider:
1. Testing it across multiple scenarios
2. Documenting variables clearly
3. Adding comprehensive examples
4. Including customization guide
5. Sharing with your team
