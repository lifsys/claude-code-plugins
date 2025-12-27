# Prompt Engineering Claude Code Plugin Suite

**The most advanced, curriculum-based prompt engineering toolkit for Claude Code**

Transform theoretical prompt engineering knowledge into practical, production-ready prompts using Anthropic's proven methodology.

## Overview

This comprehensive plugin suite implements all techniques from [Anthropic's official Prompt Engineering Interactive Tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial), providing:

- **4 Skills** for interactive prompt workflows
- **4 Sub-agents** for specialized prompt tasks
- **4 Slash Commands** for quick access
- **2 Hooks** for automated validation

## Quick Start

### Installation

```bash
# Copy to your Claude Code plugins directory
cp -r prompt-engineering-suite ~/.claude/plugins/

# Or symlink for development
ln -s "$(pwd)/prompt-engineering-suite" ~/.claude/plugins/
```

### Basic Usage

```bash
# Build a new prompt interactively
/build-prompt

# Analyze an existing prompt
/analyze-prompt

# Optimize a prompt for better performance
/optimize-prompt

# Use a template
/prompt-template
```

## Skills

### 1. prompt-builder
**Interactive guided prompt construction**

Invoke: `prompt-builder`

Guides you through building optimal prompts using the 10-element structure:
1. User Role (required)
2. Task Context
3. Tone Context
4. Detailed Task Description & Rules
5. Examples (highly recommended)
6. Input Data to Process
7. Immediate Task Description
8. Precognition/Step-by-Step Thinking
9. Output Formatting
10. Response Prefilling

**Best for**: Creating new prompts from scratch, complex workflows, production systems

### 2. prompt-analyzer
**Analyze existing prompts for quality**

Invoke: `prompt-analyzer`

Evaluates prompts against best practices:
- Clarity and directness
- Role definition
- Data/instruction separation
- Example quality and coverage
- Hallucination prevention
- Output format specification

**Best for**: Debugging failing prompts, code reviews, prompt audits

### 3. prompt-optimizer
**Optimize prompts for better performance**

Invoke: `prompt-optimizer`

Applies proven optimization techniques:
- XML tag implementation
- Few-shot example enhancement
- Step-by-step thinking injection
- Hallucination safeguards
- Format enforcement
- Clarity improvements

**Best for**: Improving accuracy, reducing ambiguity, enhancing reliability

### 4. prompt-template-library
**Access pre-built templates for common use cases**

Invoke: `prompt-template-library`

Provides production-ready templates for:
- **Content Creation**: Writing, editing, summarization
- **Data Processing**: Classification, extraction, analysis
- **Code Assistance**: Review, debugging, documentation
- **Customer Service**: Support, feedback analysis, FAQ
- **Legal/Financial**: Document analysis, research, Q&A
- **Education**: Tutoring, assessment, explanation

**Best for**: Rapid prototyping, proven patterns, learning by example

## Sub-Agents

### prompt-architect
**Design complex, multi-element prompts**

Launch: `Task tool with subagent_type="prompt-architect"`

Specializes in:
- Industry-specific prompt design (legal, financial, medical, technical)
- Multi-step workflows with prompt chaining
- Integration with tools and APIs
- RAG (Retrieval-Augmented Generation) patterns

### prompt-validator
**Validate against all best practices**

Launch: `Task tool with subagent_type="prompt-validator"`

Validates:
- Structural completeness
- XML tag usage
- Example quality
- Hallucination prevention
- Edge case coverage
- Format specification

### prompt-debugger
**Debug failing prompts**

Launch: `Task tool with subagent_type="prompt-debugger"`

Identifies:
- Common failure modes
- Ambiguity sources
- Missing context
- Inadequate examples
- Format issues
- Role confusion

### prompt-refactor
**Refactor for clarity and maintainability**

Launch: `Task tool with subagent_type="prompt-refactor"`

Improves:
- Readability
- Modularity
- Reusability
- Documentation
- Template structure

## Slash Commands

### /build-prompt [description]
Interactively build a new prompt with guided questions

```bash
/build-prompt customer feedback categorization system
```

### /analyze-prompt [file or inline]
Analyze an existing prompt for quality and best practices

```bash
/analyze-prompt path/to/prompt.md
# or paste prompt inline
```

### /optimize-prompt [file or inline]
Optimize a prompt for better performance

```bash
/optimize-prompt "Write a haiku about robots"
```

### /prompt-template [category] [use-case]
Generate a prompt from the template library

```bash
/prompt-template legal contract-analysis
/prompt-template code code-review
/prompt-template content summarization
```

## Hooks

### validate-prompt (pre-submit)
Automatically validates prompts before submission

Checks:
- Required elements present
- XML tags properly closed
- Examples provided for complex tasks
- Hallucination safeguards in place

### check-best-practices (post-tool)
Reviews tool outputs against prompt engineering standards

Monitors:
- Claude response quality
- Format compliance
- Hallucination indicators
- Improvement opportunities

## Key Concepts from Curriculum

### Foundation (Chapters 1-3)
- **Basic Structure**: User/assistant roles, system prompts, message formatting
- **Clarity**: Golden Rule - if a colleague is confused, Claude is confused
- **Role Prompting**: Assign specific roles with detailed context

### Intermediate (Chapters 4-7)
- **XML Tags**: Always separate data from instructions
- **Output Formatting**: Structure responses, use prefilling
- **Step-by-Step Thinking**: Thinking must be "out loud" in the output
- **Few-Shot Examples**: Most effective technique for desired behavior

### Advanced (Chapters 8-9)
- **Avoiding Hallucinations**:
  - Give Claude an "out"
  - Ask for evidence first
  - Use lower temperature (0-0.3)
  - Request citations
- **Complex Prompts**: 10-element structure for production systems

### Expert (Appendices)
- **Prompt Chaining**: Break tasks into steps, feed outputs as inputs
- **Tool Use**: Extend Claude's capabilities with functions
- **RAG**: Search & retrieval for enhanced knowledge

## Best Practices

### DO