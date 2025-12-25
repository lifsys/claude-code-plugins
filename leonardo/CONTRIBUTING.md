# Contributing to Leonardo

Thank you for your interest in contributing to Leonardo! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How to Contribute

### Reporting Issues

1. Check if the issue already exists in the [Issues](https://github.com/lifsys/leonardo-plugin/issues)
2. If not, create a new issue with:
   - Clear, descriptive title
   - Detailed description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Claude Code version
   - Operating system

### Suggesting Features

1. Open an issue with the "enhancement" label
2. Describe the feature and its use case
3. Explain why it would benefit users

### Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Test thoroughly
5. Commit with clear messages
6. Push to your fork
7. Open a Pull Request

## Development Setup

### Prerequisites

- Claude Code CLI installed
- Git
- Node.js (for Playwright tests)

### Local Development

```bash
# Clone the repository
git clone https://github.com/lifsys/leonardo-plugin.git
cd leonardo-plugin

# Install as local plugin
claude plugin install ./

# Or add to global settings
# Add to ~/.claude/settings.json:
{
  "extraKnownMarketplaces": {
    "leonardo-local": {
      "source": {
        "source": "directory",
        "path": "/path/to/leonardo-plugin"
      }
    }
  },
  "enabledPlugins": {
    "leonardo@leonardo-local": true
  }
}
```

### Testing

```bash
# Install Playwright
npx playwright install

# Run test templates
npx playwright test templates/testing/
```

## Project Structure

```
leonardo/
├── .claude-plugin/
│   ├── plugin.json          # Plugin metadata
│   └── marketplace.json     # Marketplace listing
├── agents/                   # Agent definitions
│   ├── test-agent.md
│   ├── frontend-agent.md
│   └── ...
├── commands/                 # Slash commands
│   ├── leonardo.md
│   └── test.md
├── skills/                   # Skill definitions
│   ├── frontend-design/
│   ├── quality-guardian/
│   └── ...
├── templates/               # Code templates
│   └── testing/             # Playwright test templates
├── hooks/                   # Event hooks
├── output-styles/           # Output formatting
└── references/              # Documentation
```

## Contribution Areas

### Adding New Skills

1. Create a new directory in `skills/`
2. Add `SKILL.md` with frontmatter
3. Include usage examples
4. Update `plugin.json` contributes section

### Adding New Agents

1. Create agent file in `agents/`
2. Define capabilities in frontmatter
3. Document handoff protocol
4. Add to README agent table

### Adding Test Templates

1. Create `.spec.ts` file in `templates/testing/`
2. Follow Playwright test patterns
3. Add to test-agent execution sequence
4. Update quality-guardian criteria

### Improving Documentation

- Fix typos and clarify instructions
- Add examples and use cases
- Update screenshots
- Translate documentation

## Style Guidelines

### Markdown

- Use ATX-style headers (`#`)
- Use fenced code blocks with language
- Keep lines under 100 characters
- Use tables for structured data

### Code Examples

- Include complete, runnable examples
- Add comments explaining key concepts
- Use TypeScript for test templates
- Follow Playwright best practices

### Commit Messages

```
<type>: <description>

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

## Release Process

1. Update version in `plugin.json`
2. Update version in `marketplace.json`
3. Update `CHANGELOG.md`
4. Create git tag: `git tag v2.x.x`
5. Push with tags: `git push --tags`

## Getting Help

- Open an issue for questions
- Join discussions in GitHub Discussions
- Check existing documentation

## Recognition

Contributors are recognized in:
- README.md contributors section
- Release notes
- Plugin credits

Thank you for contributing to Leonardo!
