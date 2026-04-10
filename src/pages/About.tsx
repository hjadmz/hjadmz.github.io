import { motion, useReducedMotion } from 'motion/react';
import { Signature } from '../components/Signature';

export default function About() {
  return (
    <div className="reading-column">
      <h1 className="mb-16">About</h1>
      
      <div className="text-[var(--step-0)] space-y-8 text-[var(--fg-muted)] leading-relaxed">
        <p className="font-medium text-[var(--fg)]">
          I am Henry Adams.
        </p>
        <p>
          I am a systems thinker, a pattern-seeker, and a Design Engineer bound for Human-Centered Computing at RIT. I study the intersection of psychology and architecture because I believe the tools we use should protect our minds, not exploit them.
        </p>
        <p>
          This digital space is my rock. It operates under the Architecture of Silence. In a world optimized for noise and endless friction, true power is hidden inside quiet, intentional design. I treat technology as a sculptural object. I build environments where beauty is the natural byproduct of rigorous engineering.
        </p>
        <p>
          Whether you are an employer reviewing my systems, a friend, or a stranger who found this space, you are looking at the same foundation. My faith and my covenant-loyalty to my people are not casual preferences. They are the load-bearing walls of my life and my work. They are constraints that narrow my focus and force me to build with integrity.
        </p>
        <p>
          Everything here is governed by those constraints. Everything is intentional.
        </p>
        
        <div className="pt-6 flex justify-center">
          <Signature className="text-[var(--fg)] opacity-90" />
        </div>
      </div>
    </div>
  );
}
