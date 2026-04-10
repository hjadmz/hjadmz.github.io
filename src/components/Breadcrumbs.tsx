import { useLocation, Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Mark } from './Mark';

export function Breadcrumbs({ className }: { className?: string }) {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);

  return (
    <nav className={cn("text-[var(--step--1)] text-[var(--fg-muted)] flex items-center gap-2 min-w-0", className)}>
      <Link to="/" className="hover:text-[var(--fg)] transition-colors shrink-0 inline-flex items-center gap-2">
        <Mark className="w-4 h-4 opacity-80" />
        <span>hjadmz</span>
      </Link>
      {paths.length > 0 && <span className="shrink-0">/</span>}
      {paths.map((path, index) => {
        const routeTo = `/${paths.slice(0, index + 1).join('/')}`;
        const isLast = index === paths.length - 1;
        return (
          <span key={path} className="flex items-center gap-2 min-w-0">
            {isLast ? (
              <span className="text-[var(--fg)] truncate">{path}</span>
            ) : (
              <>
                <Link to={routeTo} className="hover:text-[var(--fg)] transition-colors shrink-0">
                  {path}
                </Link>
                <span className="shrink-0">/</span>
              </>
            )}
          </span>
        );
      })}
    </nav>
  );
}
