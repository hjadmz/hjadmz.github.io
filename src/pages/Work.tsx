import { motion, useReducedMotion } from 'motion/react';
import { MediaWrapper } from '../components/MediaWrapper';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item = (reduceMotion: boolean) => ({
  hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
});

export default function Work() {
  const shouldReduceMotion = useReducedMotion();
  const it = item(!!shouldReduceMotion);

  return (
    <div className="reading-column">
      <motion.h1 className="mb-16" initial={it.hidden} animate={it.show}>Work</motion.h1>
      
      <motion.div
        className="text-[var(--step-0)] text-[var(--fg-muted)] space-y-2"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p className="font-medium text-[var(--fg)]" variants={it}>System Status: Auditing.</motion.p>
        <motion.p variants={it}>Currently documenting case studies on static-first architecture, token discipline, and human-centered design.</motion.p>
      </motion.div>

      {/* 
        TEMPLATE FOR FUTURE POPULATION
        Uncomment and duplicate the <article> block below when adding new work.
      <div className="grid-32 mt-16 hidden">
        <article className="group cursor-pointer">
          <MediaWrapper className="aspect-[4/3] mb-6 overflow-hidden">
            <div className="absolute inset-0 bg-[var(--fg)]/5 group-hover:bg-transparent transition-colors duration-500 z-20" />
            <div className="w-full h-full bg-[var(--fg)]/10 transition-transform duration-700 ease-out group-hover:scale-105" />
            {/* Add <img /> here with referrerPolicy="no-referrer" * /}
          </MediaWrapper>
          <h2 className="text-[var(--step-1)] mb-2 transition-transform duration-500 ease-out group-hover:translate-x-1">Project Title</h2>
          <p className="text-[var(--step--1)] text-[var(--fg-muted)] transition-transform duration-500 ease-out group-hover:translate-x-1 delay-75">Project Description / Role</p>
        </article>
      </div>
      */}
    </div>
  );
}
