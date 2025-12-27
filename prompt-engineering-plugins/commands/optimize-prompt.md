# /optimize-prompt - Automated Prompt Optimizer

Automatically optimize prompts by applying best practices from Anthropic's curriculum.

## Usage

```
/optimize-prompt [file-path]
# or paste prompt inline
/optimize-prompt
[paste your prompt]
```

## What This Does

Automatically applies systematic improvements to your prompt:
- ✅ Adds missing XML tags
- ✅ Implements hallucination safeguards
- ✅ Adds few-shot examples where beneficial
- ✅ Improves clarity and removes ambiguity
- ✅ Adds step-by-step thinking for complex tasks
- ✅ Specifies output format clearly
- ✅ Adds role prompting if beneficial

## Process

1. **Analyze**: Runs `prompt-analyzer` to identify issues
2. **Optimize**: Applies transformations in priority order:
   - Critical fixes (XML tags, safeguards, format)
   - High-impact improvements (examples, clarity, thinking)
   - Polish (prefilling, edge cases, structure)
3. **Validate**: Ensures changes preserve original intent
4. **Report**: Shows before/after comparison with explanations

## Output

```markdown
# Prompt Optimization Report

## Original Prompt (Score: X/10)
[Your original prompt]

## Optimized Prompt (Score: Y/10)
[Improved version]

## Optimizations Applied

### Critical Fixes
✅ Added XML tags around user data
✅ Added hallucination safeguard
✅ Clarified output format

### High-Impact Improvements
✅ Added 3 few-shot examples
✅ Added role context
✅ Removed ambiguous language

### Polish
✅ Added response prefilling
✅ Added edge case handling

## What Changed & Why
[Detailed explanations of each change]

## Testing Recommendations
[Scenarios to test]

## Expected Improvements
- Consistency: ↑ 40%
- Accuracy: ↑ 25%
- Hallucination rate: ↓ 60%
```

## Optimization Modes

### Default (Balanced)
Applies all recommended improvements while maintaining readability.

### Conservative
Minimal changes - only critical fixes:
```
/optimize-prompt --mode conservative
```

### Aggressive
All possible improvements - maximum curriculum application:
```
/optimize-prompt --mode aggressive
```

## Best For

- 🔧 Fixing underperforming prompts
- 📈 Preparing prompts for production
- 🎓 Learning optimization techniques
- ⚡ Quick quality improvements
- 🔄 Iterative refinement

## Options

```
--mode [conservative|balanced|aggressive]
  How many improvements to apply

--focus [clarity|examples|hallucination|format|all]
  Specific aspect to optimize

--with-analysis
  Include detailed analysis report

--iterative
  Apply optimizations in stages for review
```

## Examples

### Example 1: Basic Optimization

```
/optimize-prompt

Classify emails as spam or not spam: {{EMAIL}}
```

**Output**: Adds XML tags, examples, hallucination safeguard, output format

### Example 2: Focused Optimization

```
/optimize-prompt --focus hallucination

Analyze the financial data and provide investment recommendations.
```

**Output**: Focuses on adding evidence requirements, citations, uncertainty handling

### Example 3: Conservative Mode

```
/optimize-prompt --mode conservative path/to/working-prompt.md
```

**Output**: Only fixes critical issues, preserves existing structure

## Tips

1. **Review Changes**: Always review optimized version for intent alignment
2. **Test Both Versions**: Compare results before fully switching
3. **Iterate**: Run optimizer → test → adjust → repeat
4. **Combine with Analysis**: Use `/analyze-prompt` first to understand issues
5. **Save Versions**: Keep both original and optimized for comparison

## Common Transformations

| Issue | Fix Applied |
|-------|-------------|
| No XML tags | Wraps data in semantic tags |
| No examples | Adds 2-3 few-shot examples |
| Vague instructions | Makes specific and actionable |
| No safeguards | Adds "out" for uncertainty |
| Missing format | Specifies XML output structure |
| No thinking | Adds step-by-step request |
| Generic role | Adds expert role context |

## When Not to Use

- ❌ Prompt is already scoring 9-10/10 on analysis
- ❌ Simplicity is critical requirement
- ❌ You need full control over every detail
- ⚠️ Working prompt that you don't fully understand (analyze first)

## Related

- `/analyze-prompt` - Understand issues before optimizing
- `/build-prompt` - Build from scratch instead
- `prompt-optimizer` skill - Full interactive optimization
- `prompt-analyzer` skill - Deep analysis

## Workflow Integration

**Typical workflow**:
1. `/analyze-prompt` - Identify issues (Score: 4/10)
2. `/optimize-prompt` - Apply fixes automatically
3. Test optimized version
4. `/analyze-prompt` again - Verify improvements (Score: 8/10)
5. Deploy if satisfied, or iterate

**Development workflow**:
1. Start with simple prompt
2. Test and gather failure examples
3. `/optimize-prompt` based on failures
4. Iterate until production-ready
