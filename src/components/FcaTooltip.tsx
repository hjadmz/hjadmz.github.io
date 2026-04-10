import { useState } from 'react';
import { Layers } from 'lucide-react';

export function FcaTooltip() {
  const [visible, setVisible] = useState(false);

  return (
    <span className="fca-wrap" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
      <span className="fca-chip">
        FCA
        <Layers className="fca-chip-icon" aria-hidden="true" />
      </span>
      <span className={`fca-tooltip${visible ? ' fca-tooltip--visible' : ''}`} aria-hidden="true">
        Function &gt; Convenience &gt; Aesthetics
      </span>
    </span>
  );
}
