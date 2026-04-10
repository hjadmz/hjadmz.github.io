import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

function FCABadge() {
  const [hovered, setHovered] = useState(false);
  const prefersReduced = useReducedMotion();

  return (
    <span className="relative inline-block">
      <span
        className="fca-highlight"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        FCA
      </span>
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: prefersReduced ? 0 : 6, scale: prefersReduced ? 1 : 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: prefersReduced ? 0 : 6, scale: prefersReduced ? 1 : 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-3 py-1.5 bg-[var(--fg)] text-[var(--bg)] text-xs font-mono rounded-lg whitespace-nowrap pointer-events-none shadow-xl"
            style={{ letterSpacing: '0.01em' }}
          >
            Function &gt; Convenience &gt; Aesthetics
            <span
              className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent"
              style={{ borderTopColor: 'var(--fg)' }}
            />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

export default function Home() {
  return (
    <div className="reading-column">
      <div>
        <h1 className="mb-8">Design Engineer &<br/>Systems Architect</h1>
        <p className="text-[var(--step-0)] text-[var(--fg-muted)] max-w-[54ch] leading-relaxed">
          Bridging Human-Centered Computing with rigorous systems architecture.{' '}
          Operating under the architecture of my own <FCABadge /> protocol—where technology is sculptural,
          and power is hidden inside silence.
        </p>
        
        <div className="mt-16 grid-16">
          <div>
            <Link to="/log" className="group flex items-center gap-4 text-[var(--step-0)] w-fit">
              <span className="w-8 h-[1px] bg-[var(--fg)]/20 group-hover:bg-[var(--fg)] group-hover:w-16 transition-all duration-500 ease-out" />
              <span className="transition-transform duration-500 ease-out group-hover:translate-x-2">View log</span>
            </Link>
          </div>
          <div>
            <Link to="/work" className="group flex items-center gap-4 text-[var(--step-0)] w-fit">
              <span className="w-8 h-[1px] bg-[var(--fg)]/20 group-hover:bg-[var(--fg)] group-hover:w-16 transition-all duration-500 ease-out" />
              <span className="transition-transform duration-500 ease-out group-hover:translate-x-2">View work</span>
            </Link>
          </div>
          <div>
            <Link to="/about" className="group flex items-center gap-4 text-[var(--step-0)] w-fit">
              <span className="w-8 h-[1px] bg-[var(--fg)]/20 group-hover:bg-[var(--fg)] group-hover:w-16 transition-all duration-500 ease-out" />
              <span className="transition-transform duration-500 ease-out group-hover:translate-x-2">About me</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
