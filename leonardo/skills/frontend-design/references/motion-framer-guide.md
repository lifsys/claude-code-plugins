# Motion / Framer Motion Animation Guide

Comprehensive guide for implementing Motion (formerly Framer Motion) animations in React projects. Focus on floating menus, fan-out effects, gestures, and smooth UI interactions.

## Installation

```bash
npm install motion
# or
npm install framer-motion
```

```javascript
import { motion, AnimatePresence } from 'motion/react';
// or
import { motion, AnimatePresence } from 'framer-motion';
```

---

## Core Concepts

### Basic Motion Component

```jsx
import { motion } from 'motion/react';

function AnimatedBox() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Animated content
    </motion.div>
  );
}
```

### Animation States

```jsx
<motion.div
  initial={{ opacity: 0 }}     // Starting state
  animate={{ opacity: 1 }}     // End state
  exit={{ opacity: 0 }}        // Exit state (with AnimatePresence)
  whileHover={{ scale: 1.05 }} // Hover state
  whileTap={{ scale: 0.95 }}   // Active/pressed state
  whileFocus={{ borderColor: '#3b82f6' }}
  whileDrag={{ scale: 1.1 }}
/>
```

---

## Floating Menu UI

### Basic Floating Action Button with Fan-Out

```jsx
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

const menuItems = [
  { icon: '📝', label: 'New Note' },
  { icon: '📷', label: 'Photo' },
  { icon: '🎤', label: 'Voice' },
  { icon: '📎', label: 'Attach' },
];

function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8">
      {/* Fan-out menu items */}
      <AnimatePresence>
        {isOpen && menuItems.map((item, i) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, y: 0, scale: 0.3 }}
            animate={{
              opacity: 1,
              y: -(i + 1) * 60,
              scale: 1,
            }}
            exit={{ opacity: 0, y: 0, scale: 0.3 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 24,
              delay: i * 0.05,
            }}
            className="absolute bottom-0 right-0 w-12 h-12 rounded-full
                       bg-white shadow-lg flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.icon}
          </motion.button>
        ))}
      </AnimatePresence>

      {/* Main FAB button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="w-14 h-14 rounded-full bg-blue-600 text-white
                   shadow-xl flex items-center justify-center text-2xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        +
      </motion.button>
    </div>
  );
}
```

### Radial Fan-Out Menu

```jsx
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

function RadialMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const items = ['🏠', '⚙️', '👤', '📊', '🔔'];
  const radius = 80;

  return (
    <div className="relative w-14 h-14">
      <AnimatePresence>
        {isOpen && items.map((item, i) => {
          // Calculate position on arc
          const angle = (i / (items.length - 1)) * Math.PI - Math.PI / 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.button
              key={i}
              initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
              animate={{ opacity: 1, x, y, scale: 1 }}
              exit={{ opacity: 0, x: 0, y: 0, scale: 0 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25,
                delay: i * 0.03,
              }}
              className="absolute top-0 left-0 w-10 h-10 rounded-full
                         bg-gray-800 text-white flex items-center justify-center"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {item}
            </motion.button>
          );
        })}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        animate={{ rotate: isOpen ? 180 : 0 }}
        className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-br
                   from-purple-600 to-blue-600 text-white shadow-2xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ☰
      </motion.button>
    </div>
  );
}
```

### Slide-Out Dock Menu

```jsx
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

function DockMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const items = ['Home', 'Search', 'Profile', 'Settings'];

  return (
    <motion.nav
      initial={{ width: 60 }}
      animate={{ width: isOpen ? 200 : 60 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed left-0 top-0 h-screen bg-gray-900 overflow-hidden"
      onHoverStart={() => setIsOpen(true)}
      onHoverEnd={() => setIsOpen(false)}
    >
      {items.map((item, i) => (
        <motion.a
          key={item}
          href="#"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center gap-4 p-4 text-white hover:bg-gray-800"
          whileHover={{ x: 5 }}
        >
          <span className="w-6 text-center">📌</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            className="whitespace-nowrap"
          >
            {item}
          </motion.span>
        </motion.a>
      ))}
    </motion.nav>
  );
}
```

---

## Spring Physics

### Spring Configuration

```jsx
// Bouncy, playful spring
const bouncySpring = {
  type: 'spring',
  stiffness: 400,
  damping: 10,
};

// Smooth, professional spring
const smoothSpring = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

// Snappy, responsive spring
const snappySpring = {
  type: 'spring',
  stiffness: 500,
  damping: 25,
};

// Slow, elegant spring
const elegantSpring = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
};

// Usage
<motion.div
  whileHover={{ scale: 1.1 }}
  transition={bouncySpring}
/>
```

### useSpring for Dynamic Values

```jsx
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect } from 'react';

function MagneticButton({ children }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="px-8 py-4 bg-black text-white rounded-full"
    >
      {children}
    </motion.button>
  );
}
```

---

## Gesture Handling

### Drag Interactions

```jsx
import { motion } from 'motion/react';
import { useRef } from 'react';

function DraggableCard() {
  const constraintsRef = useRef(null);

  return (
    <div ref={constraintsRef} className="w-full h-96 bg-gray-100 rounded-xl">
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.2}
        whileDrag={{
          scale: 1.05,
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          cursor: 'grabbing',
        }}
        className="w-32 h-32 bg-white rounded-xl shadow-lg cursor-grab
                   flex items-center justify-center"
      >
        Drag me
      </motion.div>
    </div>
  );
}
```

### Drag with Velocity Detection

```jsx
import { motion, useMotionValue, useTransform } from 'motion/react';

function SwipeCard({ onSwipeLeft, onSwipeRight }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);

  const handleDragEnd = (_, info) => {
    if (info.offset.x > 100) {
      onSwipeRight?.();
    } else if (info.offset.x < -100) {
      onSwipeLeft?.();
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      style={{ x, rotate, opacity }}
      onDragEnd={handleDragEnd}
      whileDrag={{ cursor: 'grabbing' }}
      className="w-64 h-80 bg-white rounded-2xl shadow-xl cursor-grab"
    />
  );
}
```

### Custom Drag Controls

```jsx
import { motion, useDragControls } from 'motion/react';

function DraggablePanel() {
  const dragControls = useDragControls();

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      className="w-80 bg-white rounded-xl shadow-xl overflow-hidden"
    >
      {/* Drag handle */}
      <div
        onPointerDown={(e) => dragControls.start(e)}
        className="h-10 bg-gray-100 cursor-grab active:cursor-grabbing
                   flex items-center justify-center"
      >
        <div className="w-10 h-1 bg-gray-300 rounded-full" />
      </div>

      {/* Content - not draggable */}
      <div className="p-4">
        <p>Panel content here</p>
      </div>
    </motion.div>
  );
}
```

---

## Hover Effects

### Magnetic Hover

```jsx
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

function MagneticElement({ children }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const rotateX = useTransform(ySpring, [-50, 50], [10, -10]);
  const rotateY = useTransform(xSpring, [-50, 50], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        x: xSpring,
        y: ySpring,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      className="perspective-1000"
    >
      {children}
    </motion.div>
  );
}
```

### Expanding Card Hover

```jsx
function ExpandingCard({ title, description }) {
  return (
    <motion.div
      initial={{ height: 100 }}
      whileHover={{ height: 200 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="bg-white rounded-xl p-6 overflow-hidden cursor-pointer"
    >
      <h3 className="font-bold text-lg">{title}</h3>
      <motion.p
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="mt-4 text-gray-600"
      >
        {description}
      </motion.p>
    </motion.div>
  );
}
```

---

## Layout Animations

### Shared Layout Animation

```jsx
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

function ExpandableList() {
  const [selectedId, setSelectedId] = useState(null);

  const items = [
    { id: 1, title: 'Card 1', content: 'Detailed content...' },
    { id: 2, title: 'Card 2', content: 'More details...' },
    { id: 3, title: 'Card 3', content: 'Even more...' },
  ];

  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <motion.div
          key={item.id}
          layoutId={`card-${item.id}`}
          onClick={() => setSelectedId(item.id === selectedId ? null : item.id)}
          className="bg-white rounded-xl p-4 cursor-pointer"
        >
          <motion.h3 layoutId={`title-${item.id}`}>
            {item.title}
          </motion.h3>

          <AnimatePresence>
            {selectedId === item.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <p className="mt-4">{item.content}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
```

### Reorder Animation

```jsx
import { Reorder } from 'motion/react';
import { useState } from 'react';

function ReorderableList() {
  const [items, setItems] = useState([
    { id: 1, text: 'Item 1', color: '#f87171' },
    { id: 2, text: 'Item 2', color: '#60a5fa' },
    { id: 3, text: 'Item 3', color: '#34d399' },
    { id: 4, text: 'Item 4', color: '#fbbf24' },
  ]);

  return (
    <Reorder.Group
      axis="y"
      values={items}
      onReorder={setItems}
      className="space-y-2"
    >
      {items.map((item) => (
        <Reorder.Item
          key={item.id}
          value={item}
          whileDrag={{
            scale: 1.03,
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            cursor: 'grabbing',
          }}
          className="p-4 rounded-lg cursor-grab"
          style={{ backgroundColor: item.color }}
        >
          {item.text}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
```

---

## Scroll Animations

### Scroll Progress

```jsx
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0%' }}
      className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-50"
    />
  );
}
```

### Element Scroll Tracking

```jsx
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

function ParallaxSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="h-screen relative overflow-hidden">
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <h2 className="text-6xl font-bold">Parallax Content</h2>
      </motion.div>
    </section>
  );
}
```

### Scroll-Triggered Reveal

```jsx
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

function RevealOnScroll({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 75 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 75 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
```

---

## Stagger Animations

### Stagger Children

```jsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
};

function StaggeredList({ items }) {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item) => (
        <motion.li key={item.id} variants={itemVariants}>
          {item.text}
        </motion.li>
      ))}
    </motion.ul>
  );
}
```

### Direction-Aware Stagger

```jsx
const staggerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: 1, // 1 = forward, -1 = reverse
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};
```

---

## AnimatePresence Patterns

### Exit Animations

```jsx
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

function Modal({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2
                       md:-translate-x-1/2 md:-translate-y-1/2
                       bg-white rounded-xl z-50 p-6"
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

### Page Transitions

```jsx
import { motion, AnimatePresence } from 'motion/react';

const pageVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

function PageWrapper({ children, key }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={key}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

---

## Complete Floating Menu Example

```jsx
import { motion, AnimatePresence, useDragControls } from 'motion/react';
import { useState, useRef } from 'react';

function FloatingActionMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const constraintsRef = useRef(null);
  const dragControls = useDragControls();

  const menuItems = [
    { icon: '📝', label: 'New', action: () => console.log('New') },
    { icon: '📤', label: 'Share', action: () => console.log('Share') },
    { icon: '⚙️', label: 'Settings', action: () => console.log('Settings') },
    { icon: '❓', label: 'Help', action: () => console.log('Help') },
  ];

  return (
    <div ref={constraintsRef} className="fixed inset-0 pointer-events-none">
      <motion.div
        drag
        dragControls={dragControls}
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        onDrag={(_, info) => setPosition({ x: info.point.x, y: info.point.y })}
        className="fixed bottom-8 right-8 pointer-events-auto"
        style={{ touchAction: 'none' }}
      >
        {/* Menu items */}
        <AnimatePresence>
          {isOpen && menuItems.map((item, i) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, scale: 0, y: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: -(i + 1) * 56,
              }}
              exit={{ opacity: 0, scale: 0, y: 0 }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
                delay: i * 0.05,
              }}
              onClick={item.action}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="absolute bottom-0 right-0 w-12 h-12 rounded-full
                         bg-white shadow-lg flex items-center justify-center
                         text-xl hover:shadow-xl transition-shadow"
            >
              {item.icon}

              {/* Tooltip */}
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="absolute right-14 bg-gray-900 text-white text-sm
                           px-2 py-1 rounded whitespace-nowrap"
              >
                {item.label}
              </motion.span>
            </motion.button>
          ))}
        </AnimatePresence>

        {/* Main button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-br
                     from-blue-500 to-purple-600 text-white shadow-2xl
                     flex items-center justify-center cursor-grab
                     active:cursor-grabbing"
        >
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="text-2xl"
          >
            +
          </motion.span>
        </motion.button>
      </motion.div>
    </div>
  );
}

export default FloatingActionMenu;
```

---

## Performance Tips

1. **Use `layout` prop sparingly** - Only on elements that change position
2. **Prefer `transform` and `opacity`** - GPU-accelerated properties
3. **Use `layoutId` for shared element transitions** - Smoother than manual calculations
4. **Set `initial={false}`** - Skip initial animation on page load when not needed
5. **Use `useReducedMotion`** - Respect user preferences
   ```jsx
   import { useReducedMotion } from 'motion/react';

   function Component() {
     const prefersReducedMotion = useReducedMotion();

     return (
       <motion.div
         animate={prefersReducedMotion ? {} : { scale: 1.1 }}
       />
     );
   }
   ```
