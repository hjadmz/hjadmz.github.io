import { useState } from 'react';

export function FcaTooltip() {
  const [visible, setVisible] = useState(false);

  return (
    <span className="fca-wrap" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
      <span className="fca-chip">FCA</span>
      <span className={`fca-tooltip${visible ? ' fca-tooltip--visible' : ''}`} aria-hidden="true">
        Function &gt; Convenience &gt; Aesthetics
      </span>
    </span>
  );
}
