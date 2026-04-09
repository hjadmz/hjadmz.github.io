import { motion, useReducedMotion } from 'motion/react';
import { MediaWrapper } from '../components/MediaWrapper';

export default function Work() {
  return (
    <div className="reading-column">
      <h1 className="mb-16">Work</h1>
      
      <div className="text-[var(--step-0)] text-[var(--fg-muted)] space-y-2">
        <p className="font-medium text-[var(--fg)]">System Status: Auditing.</p>
        <p>Currently documenting case studies on static-first architecture, token discipline, and human-centered design.</p>
      </div>

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
