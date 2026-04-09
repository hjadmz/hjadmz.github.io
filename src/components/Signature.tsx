import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../lib/utils';

type SignatureProps = {
  className?: string;
};

export function Signature({ className }: SignatureProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={cn("text-center", className)}>
      <motion.span
        className="inline-block font-['Mrs_Saint_Delafield'] text-5xl md:text-6xl lg:text-7xl leading-none select-none"
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
        }}
        aria-label="Henry Adams signature"
      >
        Henry Adams
      </motion.span>
    </div>
  );
}
