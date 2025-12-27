# /analyze-prompt - Prompt Quality Analyzer

Analyze existing prompts for clarity, structure, and best practice adherence.

## Usage

```
/analyze-prompt [file-path]
# or paste prompt inline
/analyze-prompt
```

## What This Does

Provides comprehensive analysis:
- ✅ Overall quality score (1-10)
- ✅ Strengths and weaknesses
- ✅ Critical issues that cause failures
- ✅ Prioritized recommendations
- ✅ Best practice compliance checklist
- ✅ Suggested improved version

## Analysis Criteria

### Structural Completeness
- Clear task definition
- Appropriate context
- Examples (if complex)
- XML tags for data separation
- Output format specification

### Clarity & Directness
- Unambiguous instructions
- No assumed context
- Defined success criteria
- Edge cases addressed

### Best Practices
- Role prompting (if beneficial)
- Step-by-step thinking (if complex)
- Hallucination prevention
- Few-shot examples
- Proper XML usage

## Example

```
/analyze-prompt

[Paste your prompt]

> Analyzing prompt...
>
> # Prompt Analysis Report
>
> ## Overall Score: 6/10
>
> ## Strengths
> - Clear output format specified
> - Good use of XML tags
>
> ## Critical Issues
> 1. No examples provided (complex classification task)
> 2. Missing hallucination safeguard for uncertain cases
> 3. Step-by-step thinking not requested
>
> ## High Priority Recommendations
> 1. Add 3 few-shot examples covering edge cases
> 2. Include: "If uncertain, respond with <uncertain>true</uncertain>"
> 3. Request: "Think through each criterion step by step in <analysis> tags"
>
> [Full detailed report follows]
```

## Best For

- 🔍 Debugging failing prompts
- 📊 Prompt quality audits
- 👥 Code review of prompts
- 📚 Learning what makes prompts effective
- ⚡ Quick checks before deployment

## Output Format

```markdown
# Prompt Analysis Report

## Overall Score: X/10

## Strengths
[What's working well]

## Weaknesses
[Issues found]

## Critical Issues
[Must-fix problems]

## Recommendations
### High Priority
### Medium Priority
### Low Priority

## Compliance Checklist
| Practice | Status | Notes |
|----------|--------|-------|
| ... | ✓/✗/⚠ | ... |

## Suggested Improved Version
```optimized prompt```
```

## Tips

1. **Provide context**: Tell me the use case and any issues you're experiencing
2. **Share failures**: If the prompt isn't working, share example failures
3. **Define success**: Explain what good output should look like
4. **Request specifics**: Ask about particular aspects if focused review needed

## Common Issues Detected

- ❌ Vague instructions ("process appropriately")
- ❌ Data not in XML tags
- ❌ No examples for complex tasks
- ❌ No "out" for uncertain answers
- ❌ Format specification unclear
- ❌ Assumed context not provided
- ❌ Missing step-by-step for multi-step tasks

## Related

- `/optimize-prompt` - Automatically optimize based on analysis
- `/build-prompt` - Rebuild from scratch with guidance
- `prompt-analyzer` skill - Detailed interactive analysis
