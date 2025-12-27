# Quick Start Guide

## Get Up and Running in 5 Minutes

### Installation

```bash
# Navigate to your Claude Code plugins directory
cd ~/.claude/plugins

# Copy or symlink the plugin suite
cp -r "/Users/lifsys/Library/Mobile Documents/com~apple~CloudDocs/devhub/Training/prompt-eng-interactive-tutorial/prompt-engineering-suite" ./

# Or create a symlink for development
ln -s "/Users/lifsys/Library/Mobile Documents/com~apple~CloudDocs/devhub/Training/prompt-eng-interactive-tutorial/prompt-engineering-suite" ./prompt-engineering-suite
```

### Verify Installation

```bash
# Restart Claude Code, then check available skills
# In Claude Code, type:
# "Show me available skills"

# You should see:
# - prompt-builder
# - prompt-analyzer
# - prompt-optimizer
# - prompt-template-library
```

## Your First Prompt

### Example 1: Build a Simple Prompt

```
User: /build-prompt

Claude: I'll help you build an optimal prompt. What task should Claude perform?

User: Summarize customer reviews and extract sentiment

Claude: Great! Let me ask a few clarifying questions...
[Interactive session follows]
```

### Example 2: Analyze an Existing Prompt

```
User: /analyze-prompt

Please analyze this prompt:
"Summarize the text: {{TEXT}}"

Claude:
# Prompt Analysis Report

## Overall Score: 3/10

## Critical Issues
1. No XML tags around {{TEXT}}
2. "Summarize" is vague - what length? what focus?
3. No output format specified
4. No examples provided

## Recommended Rewrite:
You are a summarization assistant. Create concise summaries of customer feedback.

<document>
{{TEXT}}
</document>

Provide a summary in 2-3 sentences covering:
1. Main topic
2. Key sentiment (positive/negative/neutral)
3. Any action items

<example>
Input: "The product arrived late but the quality is amazing..."
Output: Customer experienced delivery delay but praised product quality. Overall positive sentiment with suggestion to improve shipping times.
</example>

Format your response as:
<summary>
[Your 2-3 sentence summary here]
</summary>

Claude: [Full detailed analysis]
```

## Common Workflows

### Workflow 1: From Scratch

1. **/build-prompt** - Create new prompt interactively
2. Test with examples
3. **/analyze-prompt** - Verify quality
4. **/optimize-prompt** - Fine-tune (when implemented)

### Workflow 2: Fix Existing

1. **/analyze-prompt** - Identify issues
2. Review recommendations
3. **/build-prompt** - Rebuild with guidance
4. Test and iterate

### Workflow 3: Use Template

1. **/prompt-template** [category] - Start with proven pattern
2. Customize for your use case
3. **/analyze-prompt** - Verify modifications
4. Deploy

## Key Commands

```bash
# Interactive builder
/build-prompt [optional description]

# Analyze quality
/analyze-prompt [file or paste inline]

# Optimize (when implemented)
/optimize-prompt [file or paste inline]

# Use template (when implemented)
/prompt-template [category] [use-case]
```

## Skill Invocation

In any Claude Code conversation:

```
User: "I need to build a prompt for analyzing legal contracts"

# Claude will automatically invoke the prompt-builder skill
# and guide you through the process
```

## Tips for Success

1. **Be Specific**: The more detail you provide, the better the prompt
2. **Use Examples**: Always provide 2-3 real examples
3. **Think Edge Cases**: What unusual inputs might occur?
4. **Test Iteratively**: Start simple, add complexity as needed
5. **Follow Recommendations**: The analyzer knows best practices

## What Each Component Does

### prompt-builder Skill
**Use when**: Creating new prompts from scratch
**Output**: Complete, production-ready prompt
**Time**: 5-10 minutes (interactive)

### prompt-analyzer Skill
**Use when**: Debugging or auditing prompts
**Output**: Scored analysis + recommendations
**Time**: 1-2 minutes

### /build-prompt Command
**Use when**: Quick access to interactive builder
**Same as**: Invoking prompt-builder skill

### /analyze-prompt Command
**Use when**: Quick prompt quality check
**Same as**: Invoking prompt-analyzer skill

## Troubleshooting

### Plugin Not Found
```bash
# Check Claude Code config
cat ~/.claude/config.json

# Verify plugins directory
ls ~/.claude/plugins/

# Restart Claude Code
```

### Skills Not Loading
```bash
# Check plugin.json is valid
cd ~/.claude/plugins/prompt-engineering-suite
cat plugin.json | python -m json.tool

# Check file permissions
ls -la skills/
```

### Commands Not Working
- Ensure you're using exact command names
- Check for typos: `/build-prompt` not `/build prompt`
- Try restarting Claude Code

## Next Steps

1. ✅ Complete this Quick Start
2. 📖 Read full README.md for detailed documentation
3. 🔧 Try building a prompt for your actual use case
4. 📊 Analyze one of your existing prompts
5. 🎯 Explore the template library (when implemented)

## Learning Resources

- **README.md** - Complete user documentation
- **skills/prompt-builder.md** - Full methodology
- **skills/prompt-analyzer.md** - Analysis framework
- **IMPLEMENTATION-GUIDE.md** - Technical details
- **Anthropic Notebooks** - Source curriculum

## Support

Issues or questions:
1. Check IMPLEMENTATION-GUIDE.md for technical details
2. Review skill files for methodology
3. Consult Anthropic's official documentation
4. Open an issue in the repository

---

**You're ready to build world-class prompts!** 🚀

Start with: `/build-prompt my first prompt`
