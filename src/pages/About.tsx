import { motion, useReducedMotion } from 'motion/react';
import { Signature } from '../components/Signature';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item = (reduceMotion: boolean) => ({
  hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
});

export default function About() {
  const shouldReduceMotion = useReducedMotion();
  const it = item(!!shouldReduceMotion);

  return (
    <div className="reading-column">
      <motion.h1
        className="mb-16"
        initial={it.hidden}
        animate={it.show}
      >
        About
      </motion.h1>
      
      <motion.div
        className="text-[var(--step-0)] space-y-8 text-[var(--fg-muted)] leading-relaxed"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p className="font-medium text-[var(--fg)]" variants={it}>
          I am Henry Adams.
        </motion.p>
        <motion.p variants={it}>
          I am a systems thinker, a pattern-seeker, and a Design Engineer bound for Human-Centered Computing at RIT. I study the intersection of psychology and architecture because I believe the tools we use should protect our minds, not exploit them.
        </motion.p>
        <motion.p variants={it}>
          This digital space is my rock. It operates under the Architecture of Silence. In a world optimized for noise and endless friction, true power is hidden inside quiet, intentional design. I treat technology as a sculptural object. I build environments where beauty is the natural byproduct of rigorous engineering.
        </motion.p>
        <motion.p variants={it}>
          Whether you are an employer reviewing my systems, a friend, or a stranger who found this space, you are looking at the same foundation. My faith and my covenant-loyalty to my people are not casual preferences. They are the load-bearing walls of my life and my work. They are constraints that narrow my focus and force me to build with integrity.
        </motion.p>
        <motion.p variants={it}>
          Everything here is governed by those constraints. Everything is intentional.
        </motion.p>
        
        <motion.div className="pt-6 flex justify-center" variants={it}>
          <Signature className="text-[var(--fg)] opacity-90" />
        </motion.div>
      </motion.div>
    </div>
  );
}
