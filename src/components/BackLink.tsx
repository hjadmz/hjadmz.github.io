import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { cn } from '../lib/utils';

export function BackLink({ to, label, className }: { to: string; label: string; className?: string }) {
  return (
    <Link 
      to={to} 
      className={cn(
        "group inline-flex items-center gap-3 text-[var(--step--1)] text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors duration-300",
        className
      )}
    >
      <ArrowLeft className="w-4 h-4 transition-transform duration-500 ease-out group-hover:-translate-x-1" />
      <span>{label}</span>
    </Link>
  );
}
