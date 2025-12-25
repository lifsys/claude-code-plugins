# GSAP Animation Guide

Comprehensive guide for implementing GSAP animations in frontend projects. All patterns work with HTML/CSS/JS only - no 3D models, complex assets, or SVG dependencies required.

## Installation

```bash
npm install gsap
```

```javascript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react'; // For React

gsap.registerPlugin(ScrollTrigger);
```

---

## Core Animation Methods

### gsap.to() - Animate TO destination values

```javascript
// Basic animation
gsap.to('.element', {
  x: 100,
  rotation: 360,
  opacity: 1,
  duration: 1,
  ease: 'power2.out'
});

// With callbacks
gsap.to('.element', {
  y: 50,
  duration: 0.8,
  onStart: () => console.log('Animation started'),
  onComplete: () => console.log('Animation complete'),
  onUpdate: (self) => console.log('Progress:', self.progress())
});
```

### gsap.from() - Animate FROM starting values

```javascript
// Elements animate FROM these values to their current state
gsap.from('.hero-title', {
  y: 100,
  opacity: 0,
  duration: 1,
  ease: 'power3.out'
});

// Great for page load reveals
gsap.from('.card', {
  scale: 0.8,
  opacity: 0,
  duration: 0.6,
  stagger: 0.1 // Each card delays 0.1s after previous
});
```

### gsap.fromTo() - Full control over start AND end

```javascript
gsap.fromTo('.element',
  { x: -100, opacity: 0 },      // FROM values
  { x: 0, opacity: 1, duration: 1 } // TO values
);
```

---

## Timeline Sequencing

Timelines are the backbone of complex, orchestrated animations.

### Basic Timeline

```javascript
const tl = gsap.timeline();

tl.to('.header', { y: 0, opacity: 1, duration: 0.5 })
  .to('.hero-text', { y: 0, opacity: 1, duration: 0.6 })
  .to('.cta-button', { scale: 1, opacity: 1, duration: 0.4 })
  .to('.features', { y: 0, opacity: 1, duration: 0.5 });
```

### Timeline with Position Control

```javascript
const tl = gsap.timeline();

// Absolute positioning (seconds from start)
tl.to('.a', { x: 100 }, 0)      // Starts at 0s
  .to('.b', { x: 100 }, 0.5)    // Starts at 0.5s
  .to('.c', { x: 100 }, 1);     // Starts at 1s

// Relative positioning
tl.to('.a', { x: 100 })
  .to('.b', { x: 100 }, '-=0.3')  // Overlaps previous by 0.3s
  .to('.c', { x: 100 }, '+=0.2'); // Delays 0.2s after previous

// Label-based positioning
tl.addLabel('section2', 2)
  .to('.element', { x: 100 }, 'section2')
  .to('.other', { x: 100 }, 'section2+=0.3');
```

### Timeline Defaults

```javascript
const tl = gsap.timeline({
  defaults: {
    duration: 0.6,
    ease: 'power2.out',
    opacity: 0,
    y: 30
  }
});

// All children inherit defaults
tl.from('.title', {})
  .from('.subtitle', {}, '-=0.4')
  .from('.content', {}, '-=0.3');
```

### Nested Timelines (Modular)

```javascript
// Create reusable timeline functions
function heroAnimation() {
  return gsap.timeline()
    .from('.hero-bg', { scale: 1.2, duration: 1.5 })
    .from('.hero-title', { y: 100, opacity: 0 }, '-=1')
    .from('.hero-subtitle', { y: 50, opacity: 0 }, '-=0.5');
}

function featuresAnimation() {
  return gsap.timeline()
    .from('.feature-card', {
      y: 60,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8
    });
}

// Compose master timeline
const master = gsap.timeline();
master
  .add(heroAnimation())
  .add(featuresAnimation(), '-=0.3');
```

---

## ScrollTrigger

Link animations to scroll position for immersive experiences.

### Basic ScrollTrigger

```javascript
gsap.to('.element', {
  x: 500,
  scrollTrigger: {
    trigger: '.element',
    start: 'top center',    // When top of element hits center of viewport
    end: 'bottom center',   // When bottom of element hits center
    scrub: true,            // Link animation to scroll position
    markers: true           // Debug markers (remove in production)
  }
});
```

### ScrollTrigger Configuration

```javascript
gsap.to('.parallax-layer', {
  y: -200,
  scrollTrigger: {
    trigger: '.section',
    start: 'top bottom',     // Element top meets viewport bottom
    end: 'bottom top',       // Element bottom meets viewport top
    scrub: 1,                // Smooth 1s lag behind scroll
    pin: false,              // Don't pin the element
    toggleActions: 'play pause resume reverse',
    // Actions for: onEnter, onLeave, onEnterBack, onLeaveBack
  }
});
```

### Pinning Sections

```javascript
gsap.to('.pinned-content', {
  x: -1000,
  scrollTrigger: {
    trigger: '.horizontal-section',
    start: 'top top',
    end: '+=2000',           // Pin for 2000px of scroll
    pin: true,               // Pin the trigger element
    scrub: 1,
    anticipatePin: 1         // Reduce jitter on pin start
  }
});
```

### Reveal on Scroll Pattern

```javascript
// Batch reveal for multiple elements
ScrollTrigger.batch('.reveal-item', {
  onEnter: (elements) => {
    gsap.from(elements, {
      y: 60,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out'
    });
  },
  start: 'top 85%'
});
```

### Parallax Layers

```javascript
// Multi-layer parallax (no images required)
gsap.to('.bg-layer-1', {
  y: -100,
  scrollTrigger: {
    trigger: '.parallax-section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true
  }
});

gsap.to('.bg-layer-2', {
  y: -200,
  scrollTrigger: {
    trigger: '.parallax-section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true
  }
});

gsap.to('.content-layer', {
  y: -50,
  scrollTrigger: {
    trigger: '.parallax-section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true
  }
});
```

---

## Text Animations

Animate text character-by-character or word-by-word without SplitText plugin.

### React Text Split Component (Safe)

```jsx
// TextSplit.jsx - Safe React component for text animation
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export function AnimatedText({ text, className, stagger = 0.02 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const chars = containerRef.current.querySelectorAll('.char');
    gsap.from(chars, {
      y: 50,
      opacity: 0,
      duration: 0.5,
      stagger: stagger,
      ease: 'power2.out'
    });
  }, [stagger]);

  return (
    <span ref={containerRef} className={className}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="char"
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

// Word-by-word variant
export function AnimatedWords({ text, className, stagger = 0.08 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const words = containerRef.current.querySelectorAll('.word');
    gsap.from(words, {
      y: '100%',
      opacity: 0,
      duration: 0.6,
      stagger: stagger,
      ease: 'power3.out'
    });
  }, [stagger]);

  return (
    <span ref={containerRef} className={className}>
      {text.split(' ').map((word, i) => (
        <span
          key={i}
          className="word"
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
```

### Typewriter Effect

```javascript
function typewriter(element, speed = 0.05) {
  const text = element.dataset.text || element.textContent;
  element.textContent = '';

  const tl = gsap.timeline();

  text.split('').forEach((char, i) => {
    tl.to(element, {
      textContent: text.substring(0, i + 1),
      duration: speed,
      ease: 'none'
    });
  });

  return tl;
}
```

### Text Reveal with Clip Path

```javascript
// CSS: .text-reveal { clip-path: inset(0 100% 0 0); }

gsap.to('.text-reveal', {
  clipPath: 'inset(0 0% 0 0)',
  duration: 1,
  ease: 'power2.inOut'
});
```

### Scramble Text Effect (Pure JS - Safe)

```javascript
function scrambleText(element, duration = 1) {
  const finalText = element.dataset.text || element.textContent;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let iteration = 0;

  const interval = setInterval(() => {
    element.textContent = finalText
      .split('')
      .map((char, index) => {
        if (index < iteration) return char;
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join('');

    iteration += 1 / 3;

    if (iteration >= finalText.length) {
      clearInterval(interval);
      element.textContent = finalText;
    }
  }, duration * 1000 / (finalText.length * 3));
}
```

---

## Transform Animations

### 2D Transforms

```javascript
gsap.to('.element', {
  x: 100,           // translateX
  y: 50,            // translateY
  xPercent: 50,     // translateX as percentage of element width
  yPercent: -50,    // translateY as percentage of element height
  rotation: 180,    // rotate in degrees
  scale: 1.5,       // uniform scale
  scaleX: 2,        // horizontal scale
  scaleY: 0.5,      // vertical scale
  skewX: 20,        // skew in degrees
  skewY: 10,
  transformOrigin: 'center center', // pivot point
  duration: 1
});
```

### Staggered Transforms

```javascript
gsap.from('.grid-item', {
  scale: 0,
  rotation: -180,
  opacity: 0,
  duration: 0.8,
  stagger: {
    amount: 1.5,        // Total stagger time
    from: 'center',     // Start from center, radiate outward
    grid: [4, 4],       // 4x4 grid layout
    ease: 'power2.out'
  }
});
```

### Morphing Shapes (CSS only)

```javascript
// Animate between border-radius values
gsap.to('.shape', {
  borderRadius: '50%',   // Circle
  duration: 1,
  ease: 'power2.inOut',
  yoyo: true,
  repeat: -1
});

// Animate clip-path for complex shapes
gsap.fromTo('.morph-element',
  { clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' },  // Diamond
  { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 1 }  // Square
);
```

---

## Easing Reference

```javascript
// Power eases (1-4, higher = more dramatic)
ease: 'power1.out'    // Subtle
ease: 'power2.out'    // Standard
ease: 'power3.out'    // Dramatic
ease: 'power4.out'    // Very dramatic

// Directional variants
ease: 'power2.in'     // Slow start, fast end
ease: 'power2.out'    // Fast start, slow end (most common)
ease: 'power2.inOut'  // Slow start and end

// Special eases
ease: 'elastic.out(1, 0.3)'  // Bouncy overshoot
ease: 'back.out(1.7)'        // Slight overshoot
ease: 'bounce.out'           // Bouncing ball effect
ease: 'circ.out'             // Circular acceleration
ease: 'expo.out'             // Exponential (very fast start)

// None
ease: 'none'  // Linear (use for scroll-linked)
```

---

## React Integration

### useGSAP Hook

```jsx
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

function AnimatedComponent() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // All GSAP animations in here are automatically cleaned up
    gsap.from('.item', {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6
    });

    // ScrollTrigger automatically cleaned up too
    gsap.to('.parallax', {
      y: -100,
      scrollTrigger: {
        trigger: '.section',
        scrub: true
      }
    });
  }, { scope: containerRef }); // Scope to container

  return (
    <div ref={containerRef}>
      <div className="item">Item 1</div>
      <div className="item">Item 2</div>
      <div className="section">
        <div className="parallax">Parallax Content</div>
      </div>
    </div>
  );
}
```

### Timeline with Dependencies

```jsx
import { useGSAP } from '@gsap/react';
import { useRef, useState } from 'react';

function Component() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const tlRef = useRef(null);

  useGSAP(() => {
    tlRef.current = gsap.timeline({ paused: true })
      .from('.menu-item', {
        x: -50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4
      });
  }, { scope: menuRef });

  useGSAP(() => {
    if (isOpen) {
      tlRef.current.play();
    } else {
      tlRef.current.reverse();
    }
  }, { dependencies: [isOpen] });

  return (
    <div ref={menuRef}>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      <nav className="menu">
        <div className="menu-item">Home</div>
        <div className="menu-item">About</div>
        <div className="menu-item">Contact</div>
      </nav>
    </div>
  );
}
```

---

## Performance Best Practices

1. **Use transforms over layout properties**
   ```javascript
   // Good - GPU accelerated
   gsap.to(el, { x: 100, y: 50, scale: 1.2, rotation: 45 });

   // Avoid - triggers layout
   gsap.to(el, { width: 200, height: 100, top: 50, left: 100 });
   ```

2. **Use `will-change` sparingly**
   ```css
   .will-animate {
     will-change: transform, opacity;
   }
   ```

3. **Kill animations on cleanup**
   ```javascript
   const tween = gsap.to('.el', { x: 100 });
   // Later:
   tween.kill();

   // Or kill by target
   gsap.killTweensOf('.el');
   ```

4. **Use `immediateRender: false` for scroll animations**
   ```javascript
   gsap.from('.el', {
     y: 100,
     immediateRender: false,
     scrollTrigger: { ... }
   });
   ```

5. **Batch ScrollTrigger refreshes**
   ```javascript
   ScrollTrigger.refresh();  // Call once after DOM changes
   ```

---

## Complete Page Animation Example

```javascript
// Master timeline for page load
const masterTl = gsap.timeline();

// Header animation
masterTl.from('.nav-logo', {
  y: -30,
  opacity: 0,
  duration: 0.6
})
.from('.nav-link', {
  y: -20,
  opacity: 0,
  stagger: 0.1,
  duration: 0.4
}, '-=0.3');

// Hero section
masterTl.from('.hero-title', {
  y: 80,
  opacity: 0,
  duration: 0.8,
  ease: 'power3.out'
}, '-=0.2')
.from('.hero-subtitle', {
  y: 40,
  opacity: 0,
  duration: 0.6
}, '-=0.5')
.from('.hero-cta', {
  scale: 0.8,
  opacity: 0,
  duration: 0.5,
  ease: 'back.out(1.7)'
}, '-=0.3');

// Scroll-triggered sections
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

// Parallax background
gsap.to('.bg-gradient', {
  y: -150,
  scrollTrigger: {
    trigger: 'body',
    start: 'top top',
    end: 'bottom top',
    scrub: 1
  }
});
```
