import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const routes = [
  { name: 'Home', path: '/' },
  { name: 'Log', path: '/log' },
  { name: 'Work', path: '/work' },
  { name: 'About', path: '/about' },
  { name: 'Technical Spec', path: '/spec' },
];

const fuse = new Fuse(routes, { keys: ['name'] });

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const results = query ? fuse.search(query).map((r) => r.item).slice(0, 5) : routes.slice(0, 5);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[var(--bg)]/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', mass: 2, stiffness: 300, damping: 49 }}
            className="relative w-full max-w-lg overflow-hidden border border-[var(--fg)]/10 bg-[var(--bg)] shadow-2xl"
          >
            <input
              autoFocus
              className="w-full border-b border-[var(--fg)]/10 bg-transparent p-4 text-[var(--step-0)] outline-none placeholder:text-[var(--fg-muted)]"
              placeholder="Where to? (Cmd+K)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <ul className="max-h-[60vh] overflow-y-auto p-2">
              {results.map((route, i) => (
                <li key={route.path}>
                  <button
                    className={cn(
                      "w-full text-left p-3 text-[var(--step--1)] hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors",
                      i === 0 && query && "bg-[var(--fg)]/5"
                    )}
                    onClick={() => {
                      navigate(route.path);
                      setIsOpen(false);
                      setQuery('');
                    }}
                  >
                    {route.name}
                  </button>
                </li>
              ))}
              {results.length === 0 && (
                <li className="p-4 text-center text-[var(--step--1)] text-[var(--fg-muted)]">
                  No routes found.
                </li>
              )}
            </ul>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
