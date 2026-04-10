import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { CommandPalette } from './CommandPalette';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

export function Layout() {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const isPost = location.pathname.startsWith('/log/');

  useEffect(() => {
    if (!isPost) {
      document.body.classList.remove('focus-mode');
      return;
    }

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
      
      if (isAtBottom) {
        // Always show footer when at the bottom
        document.body.classList.remove('focus-mode');
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        document.body.classList.add('focus-mode');
      } else if (currentScrollY < lastScrollY - 10 || currentScrollY < 50) {
        // Scrolling up
        document.body.classList.remove('focus-mode');
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.classList.remove('focus-mode');
    };
  }, [isPost]);

  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto] px-6 md:px-16 lg:px-24">
      <div className="noise-overlay" />
      <Header />
      <CommandPalette />
      
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } }}
          exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } }}
          className="w-full py-16"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
}
