import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';

export default function Home() {
  return (
    <div className="reading-column">
      <div>
        <h1 className="mb-8">Design Engineer &<br/>Systems Architect.</h1>
        <p className="text-[var(--step-0)] text-[var(--fg-muted)] max-w-[54ch] leading-relaxed">
          Bridging Human-Centered Computing with rigorous systems architecture. 
          Operating under the Architecture of Silence protocol—where technology is sculptural, 
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
