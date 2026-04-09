import { Link } from 'react-router-dom';
import { Breadcrumbs } from './Breadcrumbs';

export function Header() {
  return (
    <header className="h-32 flex items-center focus-element">
      <div className="reading-column w-full flex items-center justify-between gap-8">
        <div className="min-w-0 flex-1">
          <Breadcrumbs />
        </div>
        <nav className="flex items-center gap-5 text-[var(--step--1)] shrink-0">
          <Link to="/log" className="link-subtle pb-0.5">/log</Link>
          <Link to="/work" className="link-subtle pb-0.5">/work</Link>
          <Link to="/about" className="link-subtle pb-0.5">/about</Link>
        </nav>
      </div>
    </header>
  );
}
