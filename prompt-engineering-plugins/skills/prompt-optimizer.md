# prompt-optimizer

**Automatically optimize prompts based on analysis findings and best practices from Anthropic's curriculum.**

## Purpose

This skill applies systematic transformations to prompts based on the findings from `prompt-analyzer`, implementing all curriculum best practices automatically while preserving the core intent.

## When to Use This Skill

Use `prompt-optimizer` when you have:
- An existing prompt that needs improvement
- Analysis results showing specific issues
- A working prompt that could be more robust
- A simple prompt that needs to scale to production

This skill is most effective when used after `prompt-analyzer` to address identified issues systematically.

## How It Works

### 1. Input Acceptance

The optimizer accepts prompts in multiple formats:
- **File path**: Reads prompt from file
- **Inline text**: Prompt pasted directly
- **With analysis**: Includes previous analysis results
- **Without analysis**: Runs analyzer first automatically

### 2. Optimization Mode Selection

**Use AskUserQuestion tool:**
```
Question: "What optimization approach do you want?"
Header: "Mode"
multiSelect: false
Options:
1. "Balanced (Recommended)" - "Apply all recommended improvements while maintaining readability"
2. "Conservative" - "Only critical fixes - minimal changes to working prompt"
3. "Aggressive" - "Maximum curriculum application - all possible improvements"
4. "Custom focus" - "Optimize specific aspects only (clarity, examples, format, etc.)"
```

**Response to selection:**
- Balanced → All three priority levels applied
- Conservative → Priority 1 only (critical issues)
- Aggressive → All priorities + additional enhancements
- Custom → Ask for specific focus areas

### 3. Focus Area Selection (if Custom selected)

**Use AskUserQuestion tool:**
```
Question: "Which aspects should we optimize?"
Header: "Focus Areas"
multiSelect: true
Options:
1. "Clarity & directness" - "Remove vague language, improve instruction clarity"
2. "Examples" - "Add or improve few-shot examples"
3. "Hallucination prevention" - "Add safeguards against made-up information"
4. "Output format" - "Improve format specification and structure"
5. "XML structure" - "Better data/instruction separation"
6. "Step-by-step thinking" - "Add reasoning scaffolding"
```

### 4. Optimization Process

#### Phase 1: Analysis (if needed)
If no analysis provided, runs `prompt-analyzer` first to identify:
- Structural issues
- Missing best practices
- Clarity problems
- Hallucination risks
- Output format issues

#### Phase 2: Systematic Transformations

Applies optimizations based on selected mode:

**Priority 1: Critical Issues** (Always applied, even in Conservative mode)
1. **Add XML tags** around user data
2. **Add hallucination safeguards** (give Claude an "out")
3. **Fix output format** specification
4. **Add immediate task reminder** before data processing

**Priority 2: High-Impact Improvements** (Balanced & Aggressive modes)
5. **Add role prompting** if task benefits from expertise context
6. **Add few-shot examples** (2-3 minimum) for complex tasks
7. **Add step-by-step thinking** for multi-step reasoning
8. **Improve clarity** by removing ambiguity

**Priority 3: Polish** (Aggressive mode or Custom with specific selections)
9. **Optimize XML structure** for better separation
10. **Add prefilling** to guide output format
11. **Refine tone context** if style matters
12. **Add edge case handling** explicitly

#### Phase 3: Review Before Applying

**Use AskUserQuestion tool:**
```
Question: "Review the proposed optimizations. Proceed?"
Header: "Apply Changes"
multiSelect: false
Options:
1. "Apply all optimizations" - "Looks good, apply all proposed changes"
2. "Apply selectively" - "Let me choose which optimizations to apply"
3. "Revise approach" - "Change optimization mode or focus areas"
4. "Cancel" - "Keep original prompt, don't optimize"
```

#### Phase 4: Validation

After transformations:
- Validates prompt still serves original intent
- Checks all curriculum best practices applied
- Ensures no regression in quality
- Verifies readability maintained

### 3. Output Format

```markdown
# Prompt Optimization Report

## Original Prompt Analysis
[Brief summary of issues found]

## Optimizations Applied

### Critical Fixes
✅ Added XML tags around user input
✅ Added hallucination safeguard
✅ Clarified output format requirement

### High-Impact Improvements
✅ Added role and context
✅ Added few-shot examples
✅ Added step-by-step thinking request
✅ Removed ambiguous language

### Polish
✅ Added response prefilling
✅ Added explicit edge case handling

## Before/After Comparison

### Original (Score: X/10)
[Original prompt]

### Optimized (Score: Y/10)
[Optimized prompt with all improvements]

## What Changed & Why
[Detailed transformation documentation]

## Testing Recommendations
[Test scenarios and expected improvements]
```

## Optimization Techniques by Curriculum Chapter

### Chapter 1: Basic Prompt Structure
- Ensures proper user/assistant role separation
- Adds system prompt if beneficial
- Validates message format

### Chapter 2: Being Clear and Direct
- Removes vague language ("process", "handle", "deal with")
- Replaces ambiguous instructions with specific directives
- Defines success criteria explicitly
- Applies "Golden Rule" test

### Chapter 3: Assigning Roles
- Adds role prompting when task benefits from expertise
- Includes relevant context about role's background
- Sets appropriate tone for role

### Chapter 4: Separating Data and Instructions
- Wraps all user data in XML tags
- Uses semantic tag names (e.g., `<email>`, `<document>`)
- Clearly separates instructions from data to process

### Chapter 5: Formatting Output
- Specifies exact output format (JSON, XML, markdown, plain text)
- Adds XML tags for structured output
- Uses prefilling to start responses correctly
- Provides output examples

### Chapter 6: Precognition (Thinking Step by Step)
- Adds explicit request for step-by-step thinking
- Provides XML tags for thinking: `<thinking>`, `<analysis>`
- Ensures thinking comes before final answer

### Chapter 7: Few-Shot Examples
- Adds 2-3 examples for complex tasks
- Wraps examples in `<examples>` tags
- Covers edge cases and variations
- Uses consistent format across examples

### Chapter 8: Avoiding Hallucinations
- Adds "out" phrases: "If you don't know, say..."
- Requests evidence before claims
- Suggests temperature settings (0-0.3 for facts)
- Adds citation requirements where appropriate

### Chapter 9: Complex Prompts
- Applies full 10-element structure when appropriate:
  1. User Role
  2. Task Context
  3. Tone Context
  4. Detailed Task Description & Rules
  5. Examples
  6. Input Data to Process
  7. Immediate Task Description
  8. Precognition/Thinking
  9. Output Formatting
  10. Response Prefilling

### Appendix 10.1: Chaining Prompts
- Identifies opportunities to break into multiple prompts
- Suggests chain structure when single prompt is too complex
- Recommends intermediate validation steps

### Appendix 10.2: Tool Use
- Identifies when tool use would be beneficial
- Suggests tool definitions for external data needs
- Recommends function calling patterns

### Appendix 10.3: Search & Retrieval
- Identifies when RAG would improve results
- Suggests retrieval strategies
- Recommends citation patterns for retrieved content

## Optimization Heuristics

### When to Add Role Prompting
- ✅ Task requires specialized knowledge (legal, medical, technical)
- ✅ Tone matters (customer service, creative writing)
- ✅ Expertise improves quality (data analysis, debugging)
- ❌ Simple classification or extraction
- ❌ Format conversion only

### When to Add Few-Shot Examples
- ✅ Always for classification tasks
- ✅ Always for format transformations
- ✅ Complex reasoning patterns
- ✅ Edge cases exist
- ❌ Task is self-explanatory from description alone

### When to Add Step-by-Step Thinking
- ✅ Multi-step reasoning required
- ✅ Math or logic problems
- ✅ Complex analysis
- ✅ Debugging or troubleshooting
- ❌ Simple retrieval or extraction
- ❌ Format conversion

### When to Add Hallucination Safeguards
- ✅ Always for factual questions
- ✅ Always when uncertainty possible
- ✅ Classification with edge cases
- ✅ Data extraction from noisy sources
- ⚠️ Optional for creative tasks where hallucination is acceptable

## Usage Examples

### Example 1: Basic Email Classification

**Input Prompt**:
```
Classify the email as spam or not spam: {{EMAIL}}
```

**Optimizer Process**:
1. Analyze: Score 3/10 - No XML, no examples, no safeguards
2. Apply transformations
3. Generate report

**Optimized Output**:
```
You are an email security expert. Classify emails as spam or legitimate.

<email>
{{EMAIL}}
</email>

Classify the email above. Consider:
- Suspicious sender addresses
- Phishing indicators
- Urgent/threatening language
- Requests for sensitive information

If uncertain, respond with "uncertain" rather than guessing.

<examples>
<example>
<email>Dear user, Your account will be suspended unless you verify immediately at http://suspicious-link.com</email>
<classification>spam</classification>
<reasoning>Urgent language, suspicious URL, generic greeting</reasoning>
</example>

<example>
<email>Hi John, Here's the quarterly report you requested. Let me know if you need clarification on any sections. -Sarah</email>
<classification>legitimate</classification>
<reasoning>Personal greeting, relevant business context, known sender</reasoning>
</example>
</examples>

Provide your classification:
<classification>
```

### Example 2: Complex Document Analysis

**Input Prompt**:
```
Analyze the contract and identify risks.
```

**Optimizer Process**:
1. Analyze: Score 2/10 - Extremely vague, no structure
2. Identify this needs full 10-element treatment
3. Apply all curriculum techniques

**Optimized Output**: [Full 10-element structured prompt with role, context, examples, safeguards, etc.]

## Best Practices for Using This Skill

1. **Provide Context**: Tell me the use case and current issues
2. **Share Failures**: If prompt isn't working, show failure examples
3. **Define Success**: Explain what good output looks like
4. **Review Changes**: Always review optimized version for intent alignment
5. **Test Iteratively**: Test optimized version, then iterate if needed

## Related Skills and Commands

- `prompt-analyzer` - Run analysis first to understand issues
- `prompt-builder` - Build from scratch with guidance
- `/optimize-prompt` - Quick command interface
- `/analyze-prompt` - Quick analysis before optimization
