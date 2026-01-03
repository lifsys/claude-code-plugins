# God Tier Next.js 16 Architecture

**Reference**: Bleeding-edge patterns for premium web applications
**Use Case**: When Leonardo agents need guidance on Next.js 16, Generative UI, WebGL, and high-end polish

---

## 1. The Core Stack: Bleeding Edge Foundation

| Layer | The Choice | Why it's the best |
|-------|-----------|-------------------|
| **Framework** | **Next.js 16 (Canary)** | **PPR** (Partial Pre-Rendering), `use cache`, `next/after`, and Turbopack by default |
| **AI Runtime** | **Vercel AI SDK (RSC)** | The only library capable of **Generative UI** (streaming React components from the LLM) |
| **UI Primitives** | **Shadcn UI** | Accessible, unstyled, copy-paste components. You own the code |
| **Visuals** | **Aceternity UI + R3F** | High-end Bento grids and WebGL shaders |
| **Database** | **Supabase (Postgres)** | Real-time subscriptions and Vector embeddings (pgvector) ready to go |
| **ORM** | **Drizzle ORM** | Zero-cold-start, highly typed SQL. Superior to Prisma in serverless environments |
| **Smooth Scroll** | **Lenis** | Essential for that "premium" feel. Native browser scrolling is too jagged for high-end creative sites |

---

## 2. Advanced Implementation Patterns

### A. The "Generative UI" Pattern (Optimistic Streaming)

Standard apps wait for data. Top-tier apps stream the UI *as* the data resolves. We use Next.js Server Actions combined with the Vercel AI SDK to stream fully interactive components (not just text) from the server.

**The Strategy:**

1. User inputs a prompt
2. Server immediately flushes a stream
3. LLM calls a tool (`getWeather`)
4. Server yields a `Skeleton` component *instantly* while the API call finishes
5. Server replaces Skeleton with final UI when data arrives

```tsx
// actions/generate-ui.ts
'use server'
import { streamUI } from 'ai/rsc';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { WeatherCard } from '@/components/weather-card';
import { LoadingSkeleton } from '@/components/skeletons';

export async function submitUserRequest(input: string) {
  const result = await streamUI({
    model: openai('gpt-4o'),
    prompt: input,
    text: ({ content }) => <div className="prose text-zinc-400">{content}</div>,
    tools: {
      getWeather: {
        description: 'Get the weather for a location',
        parameters: z.object({ location: z.string() }),
        generate: async ({ location }) => {
          // 1. YIELD LOADING STATE (Fast)
          yield <LoadingSkeleton location={location} />;

          // 2. FETCH DATA (Slow)
          const weatherData = await fetchWeatherAPI(location);

          // 3. RENDER FINAL COMPONENT
          return <WeatherCard data={weatherData} />;
        },
      },
    },
  });

  return result.value;
}
```

### B. The "Hybrid" Composition Pattern

Avoid the "use client" trap at the root level. Keep your app shell static (RSC) for SEO and initial load speed. Push interactivity to the leaves.

* **Server Components (Roots):** Handle Auth checks, DB calls (Drizzle), and Layouts
* **Client Components (Leaves):** Handle Framer Motion, 3D Canvas, and Form inputs

**Technique:** Pass data from Server to Client as serialized props.

```tsx
// app/dashboard/page.tsx (Server Component)
import { db } from '@/db';
import { InteractiveGrid } from '@/components/interactive-grid';

export default async function Dashboard() {
  // Direct DB access (Fastest)
  const data = await db.query.projects.findMany();

  return (
    <main>
      {/* Pass data to the "Island" of interactivity */}
      <InteractiveGrid initialData={data} />
    </main>
  );
}
```

---

## 3. "New Age" Graphics: The Fluid Shader

This is how you get that "oily," expensive-looking background seen on Awwwards sites. We use **React Three Fiber (R3F)** to inject a custom GLSL shader. This runs on the GPU, leaving the main thread free for scrolling and interactions.

```tsx
// components/FluidBackground.tsx
'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// The "Oily" Logic
const FluidShader = {
  uniforms: {
    uTime: { value: 0 },
    uColorStart: { value: new THREE.Color('#4f46e5') }, // Indigo
    uColorEnd: { value: new THREE.Color('#ec4899') }    // Pink
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColorStart;
    uniform vec3 uColorEnd;
    varying vec2 vUv;

    // Simplex Noise Function (Simplified)
    float noise(vec2 st) { return sin(st.x * 10.0 + uTime) * cos(st.y * 10.0 + uTime); }

    void main() {
      float n = noise(vUv + uTime * 0.2);
      vec3 color = mix(uColorStart, uColorEnd, n * 0.5 + 0.5);
      gl_FragColor = vec4(color, 1.0);
    }
  `
};

function GradientMesh() {
  const mesh = useRef<THREE.Mesh>(null);

  // Animate the Uniforms
  useFrame((state) => {
    if (mesh.current) {
      const material = mesh.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={mesh} scale={[1.5, 1.5, 1]}>
      <planeGeometry args={[10, 10, 32, 32]} />
      <shaderMaterial attach="material" args={[FluidShader]} wireframe={false} />
    </mesh>
  );
}

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <GradientMesh />
      </Canvas>
    </div>
  );
}
```

---

## 4. The "Vibe" Polish

A stack is nothing without feel. The final 10% of effort creates 90% of the perceived value.

### Lenis Scroll
Standard scrolling is jerky. Lenis interpolates the scroll position for a "weighted" feel.

```bash
npm install lenis
```

```tsx
// app/providers.tsx
'use client';
import { ReactLenis } from 'lenis/react';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2 }}>
      {children}
    </ReactLenis>
  );
}
```

### Nuqs (URL State)
Never use `useState` for filters or tabs. Use `nuqs` to sync state with the URL automatically. This makes every state shareable.

```tsx
import { useQueryState } from 'nuqs';

export function FilterTabs() {
  const [tab, setTab] = useQueryState('tab', { defaultValue: 'all' });

  return (
    <div>
      <button onClick={() => setTab('all')}>All</button>
      <button onClick={() => setTab('active')}>Active</button>
    </div>
  );
}
```

### Font Optimization
Use `next/font` with `Geist Sans` or `Inter` (Variable) to prevent layout shift.

```tsx
// app/layout.tsx
import { GeistSans } from 'geist/font/sans';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>{children}</body>
    </html>
  );
}
```

---

## 5. Dependencies (package.json)

```json
{
  "dependencies": {
    "next": "canary",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",

    "ai": "^4.0.0",
    "@ai-sdk/openai": "^1.0.0",

    "@supabase/supabase-js": "^2.45.0",
    "drizzle-orm": "^0.35.0",

    "@react-three/fiber": "^8.17.0",
    "@react-three/drei": "^9.114.0",
    "three": "^0.170.0",

    "framer-motion": "^11.11.0",
    "lenis": "^1.1.0",
    "nuqs": "^2.0.0",

    "tailwindcss": "^3.4.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.5.0",

    "zod": "^3.23.0",
    "lucide-react": "^0.454.0",
    "geist": "^1.3.0"
  },
  "devDependencies": {
    "typescript": "^5.6.0",
    "@types/react": "^18.3.0",
    "@types/node": "^22.0.0",
    "@types/three": "^0.170.0",
    "drizzle-kit": "^0.27.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

---

## 6. Summary: The "God Stack"

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **UI** | Aceternity UI + Shadcn | The Look |
| **Logic** | Next.js 16 Server Actions + Zod | The Brains |
| **AI** | Vercel AI SDK `streamUI` | The Magic |
| **DB** | Drizzle + Supabase | The Memory |
| **Vibe** | Lenis Scroll + R3F Fluid Shaders | The Soul |

---

## Integration with Leonardo

When generating Next.js 16 applications, Leonardo agents should:

1. **backend-agent**: Use Drizzle ORM for database, Server Actions for mutations
2. **frontend-agent**: Implement Hybrid Composition pattern, push `'use client'` to leaves
3. **test-agent**: Include R3F shader tests in `visual.spec.ts`
4. **spec-orchestrator**: When Next.js 16 detected, include Generative UI features

### Detection Trigger

If project specification includes:
- `technology_stack.frontend.framework: "Next.js 16"` OR
- `core_features` mentioning "AI", "streaming", "generative"

→ Apply God Tier patterns automatically.
