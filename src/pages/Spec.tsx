import { motion, useReducedMotion } from 'motion/react';
import { BackLink } from '../components/BackLink';

export default function Spec() {
  return (
    <div className="reading-column">
      <div className="mb-12">
        <BackLink to="/" label="Back to Home" />
      </div>
      <h1 className="mb-16">Technical Spec</h1>
      
      <div className="space-y-16 font-mono text-sm text-[var(--fg-muted)]">
        <section>
          <h2 className="text-[var(--step-0)] font-sans font-medium text-[var(--fg)] mb-6">I. Chromatic Silence</h2>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between border-b border-[var(--fg)]/10 pb-3">
              <span>Navy</span>
              <span>#020617</span>
            </div>
            <div className="flex justify-between border-b border-[var(--fg)]/10 pb-3">
              <span>Off-white</span>
              <span>#F9FAFB</span>
            </div>
          </div>
          <p className="mt-4 opacity-60 text-xs">Luminance variation ±5%. CIELABΔE&lt;8.</p>
        </section>

        <section>
          <h2 className="text-[var(--step-0)] font-sans font-medium text-[var(--fg)] mb-6">II. Fluid Scale (Major Third 1.25)</h2>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between border-b border-[var(--fg)]/10 pb-3">
              <span>Step 5</span>
              <span>clamp(3.05rem, 2.59rem + 2.30vw, 4.20rem)</span>
            </div>
            <div className="flex justify-between border-b border-[var(--fg)]/10 pb-3">
              <span>Step 4</span>
              <span>clamp(2.44rem, 2.14rem + 1.50vw, 3.19rem)</span>
            </div>
            <div className="flex justify-between border-b border-[var(--fg)]/10 pb-3">
              <span>Step 3</span>
              <span>clamp(1.95rem, 1.76rem + 0.95vw, 2.42rem)</span>
            </div>
            <div className="flex justify-between border-b border-[var(--fg)]/10 pb-3">
              <span>Step 2</span>
              <span>clamp(1.56rem, 1.44rem + 0.60vw, 1.86rem)</span>
            </div>
            <div className="flex justify-between border-b border-[var(--fg)]/10 pb-3">
              <span>Step 1</span>
              <span>clamp(1.25rem, 1.18rem + 0.35vw, 1.43rem)</span>
            </div>
            <div className="flex justify-between border-b border-[var(--fg)]/10 pb-3">
              <span>Step 0</span>
              <span>clamp(1.00rem, 0.96rem + 0.20vw, 1.10rem)</span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-[var(--step-0)] font-sans font-medium text-[var(--fg)] mb-6">III. Kinetic Physics</h2>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between border-b border-[var(--fg)]/10 pb-3">
              <span>Type</span>
              <span>Spring</span>
            </div>
            <div className="flex justify-between border-b border-[var(--fg)]/10 pb-3">
              <span>Mass</span>
              <span>2</span>
            </div>
            <div className="flex justify-between border-b border-[var(--fg)]/10 pb-3">
              <span>Stiffness</span>
              <span>300</span>
            </div>
            <div className="flex justify-between border-b border-[var(--fg)]/10 pb-3">
              <span>Damping</span>
              <span>49</span>
            </div>
          </div>
          <p className="mt-4 opacity-60 text-xs">d = sqrt(4mk) for critical damping. Signifies physical reliability.</p>
        </section>

        <section>
          <h2 className="text-[var(--step-0)] font-sans font-medium text-[var(--fg)] mb-6">IV. Architecture & Accessibility</h2>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between border-b border-[var(--fg)]/10 pb-3">
              <span>State</span>
              <span>Stateless / Static-First</span>
            </div>
            <div className="flex justify-between border-b border-[var(--fg)]/10 pb-3">
              <span>Focus Mode</span>
              <span>Scroll-Directional Opacity</span>
            </div>
            <div className="flex justify-between border-b border-[var(--fg)]/10 pb-3">
              <span>Reduced Motion</span>
              <span>Supported (OS-Level)</span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-[var(--step-0)] font-sans font-medium text-[var(--fg)] mb-6">V. Typographic System</h2>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between border-b border-[var(--fg)]/10 pb-3">
              <span>Primary (UI & Prose)</span>
              <span>Inter</span>
            </div>
            <div className="flex justify-between border-b border-[var(--fg)]/10 pb-3">
              <span>Secondary (Data & Code)</span>
              <span>JetBrains Mono</span>
            </div>
            <div className="flex justify-between border-b border-[var(--fg)]/10 pb-3">
              <span>Measure (Line Length)</span>
              <span>66ch</span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-[var(--step-0)] font-sans font-medium text-[var(--fg)] mb-6">VI. Spatial Geometry</h2>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between border-b border-[var(--fg)]/10 pb-3">
              <span>Base Unit</span>
              <span>8px / 0.5rem</span>
            </div>
            <div className="flex justify-between border-b border-[var(--fg)]/10 pb-3">
              <span>Container Max Width</span>
              <span>Responsive (px-6 to px-24)</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
