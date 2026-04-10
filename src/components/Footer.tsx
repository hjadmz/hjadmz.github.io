import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  timeZoneName: 'short',
});

function getFormattedTime() {
  return timeFormatter.format(new Date());
}

export function Footer() {
  const [time, setTime] = useState<string>(getFormattedTime);

  useEffect(() => {
    const updateTime = () => setTime(getFormattedTime());
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="border-t border-[var(--fg)]/10 py-12 focus-element">
      <div className="reading-column flex flex-col items-center gap-6 text-center">
        <div>
          <a href="mailto:henryjosephadams@icloud.com" className="text-[var(--step-0)] text-[var(--fg)] hover:opacity-70 transition-opacity duration-300">
            henryjosephadams@icloud.com
          </a>
        </div>
        <div className="text-[var(--fg-muted)] text-xs font-mono flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <span className="footer-motto-script">Soli Deo Gloria</span>
          <span className="hidden md:inline opacity-30">|</span>
          <span className="opacity-60">{time}</span>
          <span className="hidden md:inline opacity-30">|</span>
          <Link to="/spec" className="opacity-40 hover:opacity-100 transition-opacity duration-300">
            SPEC
          </Link>
        </div>
      </div>
    </footer>
  );
}
