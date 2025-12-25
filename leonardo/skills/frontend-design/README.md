# Frontend Design Skill

Generates distinctive, production-grade frontend interfaces that avoid generic AI aesthetics.

## What It Does

This skill guides the creation of frontend interfaces with exceptional aesthetic quality. It provides:

- **Bold Aesthetic Direction**: Clear conceptual choices (brutalist, luxury, playful, etc.)
- **Distinctive Typography**: Characterful fonts that elevate the design
- **Strategic Color Systems**: Dominant colors with sharp accents using CSS variables
- **High-Impact Animations**: Staggered reveals, magnetic hovers, scroll-triggered effects
- **Atmospheric Depth**: Gradient meshes, noise textures, glassmorphism

## Usage

The `frontend-agent` automatically loads this skill before implementing any UI components.

### Manual Activation

Reference this skill when building:
- Landing pages
- Dashboards
- Settings panels
- Component libraries
- Full applications

### Example Prompts

```
"Create a dashboard for a music streaming app"
→ Dark theme, waveform visualizations, album art focus, playful microinteractions

"Build a landing page for an AI security startup"
→ Dark/matrix aesthetic, geometric patterns, terminal-style elements

"Design a settings panel with dark mode"
→ Glassmorphism cards, smooth toggle animations, organized hierarchy

"Create a portfolio for a fashion photographer"
→ Editorial layout, full-bleed images, minimal text, dramatic whitespace
```

## Aesthetic Directions

| Aesthetic | Characteristics |
|-----------|-----------------|
| Brutalist | Heavy borders, monospace fonts, high contrast, raw textures |
| Luxury/Editorial | Serif typography, generous whitespace, gold accents, elegant animations |
| Playful/Toy-like | Rounded corners, bouncy animations, pastels, friendly fonts |
| Retro-Futuristic | Geometric grids, neon accents, scanlines, terminal aesthetics |
| Organic/Natural | Earth tones, organic shapes, paper textures, hand-drawn elements |

## What to Avoid

The skill explicitly prevents:
- Generic fonts (Inter, Roboto, Arial, system fonts)
- Cliched color schemes (purple gradients on white)
- Predictable layouts without context-specific character
- Default shadcn/ui or Tailwind styling without customization
- Cookie-cutter centered hero sections

## Integration

This skill integrates with:
- `frontend-agent`: Primary consumer for UI implementation
- `code-architect`: Informs component structure complexity
- `implementation-engine`: Provides styling patterns
- `quality-guardian`: Validates design consistency

## Reference

Based on the [Frontend Aesthetics Cookbook](https://github.com/anthropics/claude-cookbooks/blob/main/coding/prompting_for_frontend_aesthetics.ipynb) methodology.

## Animation Libraries

This skill includes comprehensive guides for two animation systems:

### GSAP + ScrollTrigger
For complex, orchestrated animations:
- Master timelines for page load sequences
- ScrollTrigger for scroll-linked effects
- Parallax, pinning, horizontal scroll
- Text animations (character/word stagger)
- Transform sequences

### Motion / Framer Motion
For React component animations:
- Floating action menus with fan-out
- Spring physics configurations
- Gesture interactions (drag, hover, tap)
- Layout animations
- Scroll-linked effects

Both systems require NO 3D models, complex images, or SVG assets - pure HTML/CSS/JS.

## Files

```
frontend-design/
├── SKILL.md                        # Complete skill definition
├── README.md                       # This documentation
└── references/
    ├── gsap-animation-guide.md     # Full GSAP patterns
    └── motion-framer-guide.md      # Complete Motion/Framer guide
```
