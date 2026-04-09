import { ReactNode } from 'react';
import { cn } from '../lib/utils';

export function MediaWrapper({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden border border-[var(--fg)]/10 bg-[var(--bg)]/50 backdrop-blur-md", className)}>
      {/* Monochrome filter overlay to force content into the aesthetic */}
      <div className="absolute inset-0 pointer-events-none mix-blend-luminosity bg-[var(--bg)]/10 z-10" />
      <div className="relative z-0 grayscale contrast-125">
        {children}
      </div>
    </div>
  );
}
