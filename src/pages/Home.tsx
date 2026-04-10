import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { FcaTooltip } from '../components/FcaTooltip';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.04 } },
};

const item = (reduceMotion: boolean) => ({
  hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
});

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const it = item(!!shouldReduceMotion);

  return (
    <div className="reading-column">
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.h1 className="mb-8" variants={it}>
          Design Engineer &<br/>Systems Architect
        </motion.h1>
        <motion.p
          className="text-[var(--step-0)] text-[var(--fg-muted)] max-w-[54ch] leading-relaxed"
          variants={it}
        >
          Bridging Human-Centered Computing with rigorous systems architecture. 
          Operating under the architecture of my own <FcaTooltip /> protocol—where technology is sculptural, 
          and power is hidden inside silence.
        </motion.p>
        
        <motion.div className="mt-16 grid-16" variants={container}>
          <motion.div variants={it}>
            <Link to="/log" className="group flex items-center gap-4 text-[var(--step-0)] w-fit">
              <span className="w-8 h-[1px] bg-[var(--fg)]/20 group-hover:bg-[var(--fg)] group-hover:w-16 transition-all duration-500 ease-out" />
              <span className="transition-transform duration-500 ease-out group-hover:translate-x-2">View log</span>
            </Link>
          </motion.div>
          <motion.div variants={it}>
            <Link to="/work" className="group flex items-center gap-4 text-[var(--step-0)] w-fit">
              <span className="w-8 h-[1px] bg-[var(--fg)]/20 group-hover:bg-[var(--fg)] group-hover:w-16 transition-all duration-500 ease-out" />
              <span className="transition-transform duration-500 ease-out group-hover:translate-x-2">View work</span>
            </Link>
          </motion.div>
          <motion.div variants={it}>
            <Link to="/about" className="group flex items-center gap-4 text-[var(--step-0)] w-fit">
              <span className="w-8 h-[1px] bg-[var(--fg)]/20 group-hover:bg-[var(--fg)] group-hover:w-16 transition-all duration-500 ease-out" />
              <span className="transition-transform duration-500 ease-out group-hover:translate-x-2">About me</span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
