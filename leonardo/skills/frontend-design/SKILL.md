---
name: frontend-design
description: |
  Create distinctive, production-grade frontend interfaces with high design quality.
  Use this skill when building web components, pages, or applications.
  Generates creative, polished code that avoids generic AI aesthetics.
license: MIT
---

# Frontend Design Skill

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

## Design Thinking (MANDATORY AskUserQuestion)

**BEFORE any UI implementation, you MUST establish aesthetic direction using AskUserQuestion:**

```
Use AskUserQuestion tool:
- question: "What aesthetic direction should we take?"
  header: "Aesthetic"
  multiSelect: false
  options:
    - label: "Luxury/Refined"
      description: "Elegant typography, gold accents, sophisticated animations"
    - label: "Brutalist/Raw"
      description: "Bold typography, high contrast, industrial feel"
    - label: "Playful/Friendly"
      description: "Rounded shapes, bright colors, bouncy animations"
    - label: "Editorial/Magazine"
      description: "Serif fonts, clean layouts, sophisticated imagery"
```

```
Use AskUserQuestion tool:
- question: "What level of animation intensity?"
  header: "Motion"
  multiSelect: false
  options:
    - label: "High impact (Recommended)"
      description: "Page transitions, staggered reveals, scroll animations"
    - label: "Subtle polish"
      description: "Micro-interactions, hover states, loading states"
    - label: "Minimal motion"
      description: "Reduced motion friendly, essential animations only"
    - label: "No animations"
      description: "Static UI, maximum performance"
```

Before coding, understand the context and commit to a BOLD aesthetic direction:

- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Execute the chosen aesthetic with precision and intentionality
- **Constraints**: Technical requirements (framework, performance, accessibility)
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.

Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

## Frontend Aesthetics Guidelines

### Typography
Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics; unexpected, characterful font choices. Pair a distinctive display font with a refined body font.

**Typography Examples by Aesthetic:**
| Aesthetic | Display Font | Body Font | Effect |
|-----------|--------------|-----------|--------|
| Editorial | Playfair Display | Source Serif Pro | Sophisticated, magazine-quality |
| Brutalist | Monument Extended | JetBrains Mono | Raw, industrial power |
| Playful | Gochi Hand | Nunito | Friendly, approachable |
| Luxury | Cormorant Garamond | Lato | Elegant, refined |
| Retro-Futuristic | Orbitron | IBM Plex Sans | Sci-fi, technological |
| Art Deco | Poiret One | Josefin Sans | Geometric elegance |

### Color & Theme
Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.

**Color Strategy Examples:**
```css
/* Luxury Dark Theme */
:root {
  --bg-primary: #0a0a0a;
  --bg-secondary: #1a1a1a;
  --accent-gold: #c4a35a;
  --accent-copper: #b87333;
  --text-primary: #f5f5f5;
  --text-muted: #888888;
}

/* Vibrant Editorial */
:root {
  --bg-cream: #faf8f5;
  --accent-coral: #ff6b6b;
  --accent-navy: #1a365d;
  --text-charcoal: #2d3748;
  --highlight: #ffd93d;
}

/* Brutalist Industrial */
:root {
  --bg-concrete: #d9d9d9;
  --accent-safety-orange: #ff6600;
  --border-heavy: #000000;
  --text-black: #0f0f0f;
  --warning-yellow: #ffcc00;
}
```

### Motion & Animation

Use animations for effects and micro-interactions. Focus on high-impact moments: one well-orchestrated page load with staggered reveals creates more delight than scattered micro-interactions.

**Animation Philosophy:**
- **Cohesive Timeline**: Plan all animations as one orchestrated sequence
- **Purpose-Driven**: Every animation should serve a purpose (guide attention, provide feedback, create delight)
- **Performance-First**: Use transform and opacity (GPU-accelerated), avoid animating layout properties
- **Restraint**: Fewer, better animations beat many mediocre ones

**Library Selection:**
| Use Case | Library | Why |
|----------|---------|-----|
| Complex timelines, scroll-linked | GSAP + ScrollTrigger | Most powerful, precise control |
| React component animations | Motion (Framer Motion) | Declarative, gesture support |
| Simple CSS animations | Pure CSS | Lightweight, no dependencies |
| Floating menus, drag/drop | Motion | Spring physics, gestures |

**CSS Animation Patterns:**
```css
/* Staggered Page Load Reveal */
@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.reveal-item {
  animation: fadeSlideUp 0.6s ease-out forwards;
}
.reveal-item:nth-child(1) { animation-delay: 0.1s; }
.reveal-item:nth-child(2) { animation-delay: 0.2s; }
.reveal-item:nth-child(3) { animation-delay: 0.3s; }

/* Magnetic Hover Effect */
.magnetic-button {
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.magnetic-button:hover {
  transform: scale(1.05) translateY(-2px);
  box-shadow: 0 10px 40px rgba(0,0,0,0.15);
}

/* Scroll-Triggered Parallax */
.parallax-layer {
  transform: translateY(calc(var(--scroll-y) * 0.3));
}
```

---

## GSAP Animation System

For complex, orchestrated animations use GSAP with ScrollTrigger. All patterns work with HTML/CSS/JS only - no 3D models or complex assets required.

### GSAP Timeline (Master Animation Sequence)

```javascript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// Master timeline for page load
const masterTl = gsap.timeline();

// Header animation
masterTl.from('.nav-logo', { y: -30, opacity: 0, duration: 0.6 })
  .from('.nav-link', { y: -20, opacity: 0, stagger: 0.1 }, '-=0.3');

// Hero section (overlap with previous)
masterTl.from('.hero-title', {
  y: 80,
  opacity: 0,
  duration: 0.8,
  ease: 'power3.out'
}, '-=0.2')
.from('.hero-subtitle', { y: 40, opacity: 0, duration: 0.6 }, '-=0.5')
.from('.hero-cta', {
  scale: 0.8,
  opacity: 0,
  duration: 0.5,
  ease: 'back.out(1.7)'
}, '-=0.3');
```

### ScrollTrigger Patterns

```javascript
// Reveal on scroll (batch for performance)
ScrollTrigger.batch('.feature-card', {
  onEnter: (elements) => {
    gsap.from(elements, {
      y: 60,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power2.out'
    });
  },
  start: 'top 85%',
  once: true
});

// Parallax effect
gsap.to('.parallax-bg', {
  y: -150,
  scrollTrigger: {
    trigger: '.hero-section',
    start: 'top top',
    end: 'bottom top',
    scrub: 1  // Smooth 1s lag
  }
});

// Pinned horizontal scroll
gsap.to('.horizontal-panels', {
  x: () => -document.querySelector('.horizontal-panels').scrollWidth + window.innerWidth,
  scrollTrigger: {
    trigger: '.horizontal-section',
    start: 'top top',
    end: '+=3000',
    pin: true,
    scrub: 1
  }
});
```

### GSAP Transforms

```javascript
gsap.to('.element', {
  x: 100,           // translateX (px)
  y: 50,            // translateY (px)
  xPercent: 50,     // translateX (% of element)
  yPercent: -50,    // translateY (% of element)
  rotation: 180,    // rotate (degrees)
  scale: 1.5,       // uniform scale
  skewX: 20,        // skew (degrees)
  transformOrigin: 'center center',
  duration: 1,
  ease: 'power2.out'
});

// Staggered grid animation
gsap.from('.grid-item', {
  scale: 0,
  rotation: -180,
  opacity: 0,
  duration: 0.8,
  stagger: {
    amount: 1.5,
    from: 'center',  // Radiate from center
    grid: [4, 4]     // 4x4 grid
  }
});
```

### GSAP Easing Reference

| Ease | Character | Use For |
|------|-----------|---------|
| `power1.out` | Subtle | Micro-interactions |
| `power2.out` | Standard | General animations |
| `power3.out` | Dramatic | Hero elements |
| `power4.out` | Very dramatic | Emphasis |
| `back.out(1.7)` | Overshoot | Buttons, icons |
| `elastic.out(1, 0.3)` | Bouncy | Playful UI |
| `none` | Linear | Scroll-linked |

---

## Motion / Framer Motion System

For React component animations, gestures, and floating UI elements.

### Floating Action Menu (Fan-Out)

```jsx
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const items = [
    { icon: '📝', label: 'New' },
    { icon: '📤', label: 'Share' },
    { icon: '⚙️', label: 'Settings' },
  ];

  return (
    <div className="fixed bottom-8 right-8">
      <AnimatePresence>
        {isOpen && items.map((item, i) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, y: 0, scale: 0.3 }}
            animate={{ opacity: 1, y: -(i + 1) * 60, scale: 1 }}
            exit={{ opacity: 0, y: 0, scale: 0.3 }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 25,
              delay: i * 0.05
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute bottom-0 right-0 w-12 h-12 rounded-full
                       bg-white shadow-lg"
          >
            {item.icon}
          </motion.button>
        ))}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        animate={{ rotate: isOpen ? 45 : 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-blue-600 text-white text-2xl"
      >
        +
      </motion.button>
    </div>
  );
}
```

### Spring Physics Configuration

```jsx
// Bouncy, playful
const bouncySpring = { type: 'spring', stiffness: 400, damping: 10 };

// Smooth, professional
const smoothSpring = { type: 'spring', stiffness: 300, damping: 30 };

// Snappy, responsive
const snappySpring = { type: 'spring', stiffness: 500, damping: 25 };

// Slow, elegant
const elegantSpring = { type: 'spring', stiffness: 100, damping: 15 };
```

### Gesture Interactions

```jsx
import { motion, useDragControls } from 'motion/react';

function DraggableCard() {
  const dragControls = useDragControls();

  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      dragElastic={0.2}
      whileDrag={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      Drag me
    </motion.div>
  );
}
```

### Scroll-Linked Animations

```jsx
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';

function ParallaxSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="h-screen relative">
      <motion.div style={{ y, opacity }}>
        Parallax Content
      </motion.div>
    </section>
  );
}
```

### Stagger Children

```jsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  }
};

function StaggeredList({ items }) {
  return (
    <motion.ul variants={containerVariants} initial="hidden" animate="visible">
      {items.map((item) => (
        <motion.li key={item.id} variants={itemVariants}>
          {item.text}
        </motion.li>
      ))}
    </motion.ul>
  );
}
```

---

## Text Animation Patterns

Text should feel alive and intentional. Character and word animations create memorable experiences.

### Text Animation Philosophy

| Approach | When to Use | Effect |
|----------|-------------|--------|
| Character-by-character | Headlines, hero text | Dramatic, attention-grabbing |
| Word-by-word | Subtitles, descriptions | Readable, flowing |
| Line-by-line | Long-form content | Clean, organized |
| Clip-path reveal | Editorial, luxury | Elegant, sophisticated |
| Typewriter | Terminal, tech aesthetic | Technical, progressive |

### React Text Animation Components

```jsx
// Character-by-character animation (safe, React-based)
function AnimatedText({ text, stagger = 0.02 }) {
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: stagger } }
      }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block' }}
          variants={{
            hidden: { y: 50, opacity: 0 },
            visible: { y: 0, opacity: 1 }
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Word-by-word animation
function AnimatedWords({ text, stagger = 0.08 }) {
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: stagger } }
      }}
    >
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
          variants={{
            hidden: { y: '100%', opacity: 0 },
            visible: { y: 0, opacity: 1 }
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
```

### GSAP Text Animation

```javascript
// Character stagger with GSAP
const chars = document.querySelectorAll('.split-char');
gsap.from(chars, {
  y: 50,
  opacity: 0,
  duration: 0.5,
  stagger: 0.02,
  ease: 'power2.out'
});

// Clip-path text reveal
gsap.to('.text-reveal', {
  clipPath: 'inset(0 0% 0 0)',
  duration: 1,
  ease: 'power2.inOut'
});
```

### Text Behavior Guidelines

1. **Headlines**: Animate on page load with character stagger (0.02-0.03s)
2. **Subtitles**: Word-by-word with slight delay after headline
3. **Body text**: Fade in as a block, no character animation
4. **CTAs**: Scale + fade with spring physics
5. **Labels/Captions**: Quick fade (0.3s), no transform

---

## Animation Coordination Checklist

Before implementing animations, plan the complete sequence:

- [ ] **Page Load Timeline**: Map all entrance animations with timing
- [ ] **Scroll Triggers**: Identify which elements animate on scroll
- [ ] **Hover States**: Define hover behavior for all interactive elements
- [ ] **Exit Animations**: Plan how elements leave (with AnimatePresence)
- [ ] **Performance**: Use only transform/opacity, check 60fps
- [ ] **Reduced Motion**: Respect `prefers-reduced-motion`
- [ ] **Mobile**: Test on touch devices, adjust durations

### Spatial Composition
Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.

**Layout Techniques:**
```css
/* Asymmetric Grid */
.asymmetric-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr;
  gap: 2rem;
}

/* Overlapping Elements */
.overlap-container {
  position: relative;
}
.overlap-card {
  position: absolute;
  top: -20px;
  left: 40px;
  z-index: 10;
}

/* Diagonal Section Divider */
.diagonal-section {
  clip-path: polygon(0 0, 100% 5%, 100% 100%, 0 95%);
  margin-top: -5vw;
}

/* Generous Whitespace */
.breathable-layout {
  padding: clamp(4rem, 10vw, 12rem) clamp(2rem, 8vw, 8rem);
}
```

### Backgrounds & Visual Details
Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic.

**Background Techniques:**
```css
/* Gradient Mesh */
.gradient-mesh {
  background:
    radial-gradient(at 40% 20%, hsla(28,100%,74%,1) 0px, transparent 50%),
    radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0px, transparent 50%),
    radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%),
    radial-gradient(at 80% 50%, hsla(340,100%,76%,1) 0px, transparent 50%),
    radial-gradient(at 0% 100%, hsla(22,100%,77%,1) 0px, transparent 50%);
}

/* Noise Texture Overlay */
.noise-texture::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.05;
  pointer-events: none;
}

/* Glassmorphism Card */
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Dramatic Shadow */
.dramatic-shadow {
  box-shadow:
    0 2px 4px rgba(0,0,0,0.1),
    0 8px 16px rgba(0,0,0,0.1),
    0 24px 48px rgba(0,0,0,0.15);
}
```

## Aesthetic Direction Templates

### 1. Brutalist/Industrial
```
- Heavy black borders (3-5px)
- Monospace typography (JetBrains Mono, IBM Plex Mono)
- High contrast (black/white with safety orange accents)
- Raw, unpolished textures
- Visible grid structure
- Uppercase headers
```

### 2. Luxury/Editorial
```
- Serif typography (Playfair Display, Cormorant)
- Generous whitespace (80px+ margins)
- Gold/copper accents on dark backgrounds
- Subtle animations (0.5s+ duration)
- Magazine-style layouts
- Elegant hover states
```

### 3. Playful/Toy-like
```
- Rounded corners (16-32px)
- Bouncy animations (spring physics)
- Pastel or vibrant primary colors
- Friendly sans-serif fonts (Nunito, Poppins)
- Illustrated elements
- Emoji and iconography
```

### 4. Retro-Futuristic
```
- Geometric shapes and grids
- Neon accents on dark backgrounds
- Scanline effects
- Terminal/mono fonts
- Glitch animations
- CRT monitor aesthetics
```

### 5. Organic/Natural
```
- Earth tones (greens, browns, creams)
- Organic shapes (blobs, waves)
- Texture overlays (paper, fabric)
- Hand-drawn elements
- Warm, inviting typography
- Nature imagery
```

## What to AVOID

NEVER use generic AI-generated aesthetics:
- Overused font families (Inter, Roboto, Arial, system fonts)
- Cliched color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character
- Default shadcn/ui or Tailwind styling without customization
- Centered hero sections with stock illustrations

Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices across generations.

## Implementation Complexity

**IMPORTANT**: Match implementation complexity to the aesthetic vision:
- **Maximalist designs** need elaborate code with extensive animations and effects
- **Minimalist designs** need restraint, precision, and careful attention to spacing, typography, and subtle details
- Elegance comes from executing the vision well

## Integration with Leonardo Agents

This skill integrates with:
- `frontend-agent` - Applies aesthetic guidelines during component development
- `code-architect` - Informs component structure based on design complexity
- `implementation-engine` - Provides styling patterns for generated code
- `quality-guardian` - Validates design consistency and polish

## Example Prompts

```
"Create a dashboard for a music streaming app"
→ Consider: dark theme, waveform visualizations, album art focus, playful microinteractions

"Build a landing page for an AI security startup"
→ Consider: dark/matrix aesthetic, geometric patterns, terminal-style elements, trust indicators

"Design a settings panel with dark mode"
→ Consider: glassmorphism cards, smooth toggle animations, organized hierarchy, accessibility

"Create a portfolio for a fashion photographer"
→ Consider: editorial layout, full-bleed images, minimal text, dramatic whitespace
```

## Quality Checklist

Before completing frontend implementation:
- [ ] Clear aesthetic direction chosen and documented
- [ ] Typography is distinctive (no default fonts)
- [ ] Color palette uses CSS variables consistently
- [ ] Animations are purposeful and polished (not scattered)
- [ ] Layout has visual interest (asymmetry, overlap, or intentional structure)
- [ ] Background/textures add depth
- [ ] Hover states are surprising and delightful
- [ ] Dark/light mode (if applicable) is cohesive
- [ ] No generic AI aesthetic patterns used
- [ ] Code is production-ready and functional

---

## Reference Documentation

For complete implementation details, see:
- `references/gsap-animation-guide.md` - Full GSAP patterns with ScrollTrigger, Timeline, transforms
- `references/motion-framer-guide.md` - Complete Motion/Framer Motion guide for floating menus, gestures
- `references/nextjs-16-god-tier.md` - Bleeding-edge Next.js 16 patterns (Generative UI, R3F shaders, Lenis)

---

## Next.js 16 God Tier Integration

When building Next.js 16 applications, apply these premium patterns:

### Detection Trigger
If project uses Next.js 16 or mentions AI/streaming features, automatically apply:

| Pattern | Purpose |
|---------|---------|
| **Lenis Scroll** | Premium "weighted" scroll feel |
| **R3F Fluid Shaders** | GPU-powered fluid backgrounds |
| **Generative UI** | Stream React components from LLM |
| **Aceternity UI** | High-end Bento grids and effects |

### Implementation Notes
- Push `'use client'` to leaves, keep RSC at roots
- Use Framer Motion for client-side animations
- Pair with Geist Sans or distinctive display fonts
- See `references/nextjs-16-god-tier.md` for complete code examples

---

Remember: Claude is capable of extraordinary creative work. Don't hold back, show what can truly be created when thinking outside the box and committing fully to a distinctive vision.
