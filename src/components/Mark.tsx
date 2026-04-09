import { cn } from '../lib/utils';

export function Mark({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 16 16" 
      role="img" 
      aria-label="Henry Adams Mark" 
      className={cn("crisp-edges", className)}
    >
      <path fill="currentColor" d="M4 4h1v2H4V4zm7 0h1v2h-1V4zM8 4h1v4H8V4zm-1 4h2v1H7V8zm-2 2h1v1H5v-1zm5 0h1v1h-1v-1zm-4 1h4v1H6v-1z"/>
    </svg>
  );
}
