# /build-prompt - Interactive Prompt Builder

Build optimal prompts using guided questions and Anthropic's proven methodology.

## Usage

```
/build-prompt [optional: brief description]
```

## What This Does

Launches an interactive session that:
1. Asks clarifying questions about your use case
2. Determines appropriate complexity level
3. Guides you through the 10-element prompt structure
4. Generates a complete, production-ready prompt
5. Provides usage examples and testing suggestions

## Process

### Step 1: Use Case Discovery
```
What task should Claude perform?
> [Your answer]

Who will use this prompt? (developers, end-users, automated system)
> [Your answer]

What format should the output be? (text, JSON, XML, markdown)
> [Your answer]

Any constraints or requirements? (word limit, tone, accuracy needs)
> [Your answer]
```

### Step 2: Complexity Assessment
Based on your answers, I'll recommend:
- **Simple**: Direct instruction + examples
- **Medium**: Add role, XML tags, format control
- **Complex**: Full 10-element structure

### Step 3: Element-by-Element Construction

I'll help you build each element:
1. Task Context (role & goals)
2. Tone Context (if needed)
3. Task Description & Rules
4. Examples (I'll help craft 2-3)
5. Input Data Handling (XML tags)
6. Immediate Task Reminder
7. Step-by-Step Thinking (if complex)
8. Output Formatting
9. Response Prefilling (if needed)

### Step 4: Output & Testing

You'll receive:
- ✅ Complete prompt with all elements
- ✅ Usage examples with sample inputs
- ✅ Testing checklist
- ✅ Common pitfalls to avoid
- ✅ Optimization suggestions

## Example Session

```
/build-prompt customer feedback categorizer

> Great! I'll help you build a prompt for categorizing customer feedback.
>
> What categories should feedback be sorted into?

(A) Bug reports, Feature requests, General feedback
(B) Positive, Negative, Neutral
(C) Custom categories

> A

> Should Claude handle ambiguous cases?

- Assign to most likely category
- Flag as "uncertain" for human review
- Ask for more information

> Flag as uncertain for human review

> [Generates complete prompt with examples]
```

## Best For

- ✅ Creating new prompts from scratch
- ✅ Complex, multi-step workflows
- ✅ Production systems needing reliability
- ✅ Learning prompt engineering interactively
- ✅ Domain-specific applications

## Tips

1. **Be specific**: The more detail you provide, the better the prompt
2. **Think examples**: Have 2-3 real examples ready
3. **Define success**: Know what good output looks like
4. **Consider edge cases**: What unusual inputs might occur?
5. **Test iteratively**: Start simple, add complexity as needed

## Related

- `/analyze-prompt` - Analyze an existing prompt
- `/optimize-prompt` - Improve a prompt's performance
- `/prompt-template` - Start from a pre-built template
