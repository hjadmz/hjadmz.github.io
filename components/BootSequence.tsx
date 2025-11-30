import React, { useEffect, useState, useRef } from 'react';
import { BOOT_SEQUENCE } from '../constants';
import { soundManager } from '../services/soundService';

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    
    // Play boot ambient sound
    setTimeout(() => soundManager.playBoot(), 100);

    // Independent Memory Check Progress
    let memProgress = 0;
    const updateMemory = () => {
        if (!isMounted || memProgress >= 100) return;
        
        const jump = Math.floor(Math.random() * 8) + 1;
        memProgress = Math.min(memProgress + jump, 100);
        setProgress(memProgress);

        const nextTick = Math.random() * 50 + 20;
        setTimeout(updateMemory, nextTick);
    };
    updateMemory();

    // Async function to handle the sequential lines
    const runSequence = async () => {
        // Monitor Warm Up Delay
        await new Promise(r => setTimeout(r, 800));
        if (!isMounted) return;

        for (const line of BOOT_SEQUENCE) {
            if (!isMounted) return;

            // Jittery organic delay
            let baseDelay = Math.random() * 30 + 10;
            
            // "Heavy" lines hang slightly but not too long
            if (line.heavy) baseDelay += 400;

            await new Promise(r => setTimeout(r, baseDelay));

            if (!isMounted) return;

            setVisibleLines(prev => [...prev, line.id]);
            
            if (line.sound === 'success') soundManager.playSuccess();
            else if (line.sound === 'alert') soundManager.playAlert();
            else soundManager.playType();
        }

        // Final hold
        await new Promise(r => setTimeout(r, 800));
        if (isMounted) onComplete();
    };

    runSequence();

    return () => {
        isMounted = false;
    };
  }, [onComplete]);

  // Auto-scroll logic
  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleLines]);

  return (
    <div className="fixed inset-0 bg-black text-gray-400 font-mono p-6 md:p-12 flex flex-col items-start justify-between z-50 overflow-hidden cursor-wait select-none">
      
      {/* Cinematic CRT Scanline Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none z-20"></div>

      <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col">
        {/* BIOS HEADER */}
        <div className="mb-8 flex justify-between items-start border-b-2 border-white/20 pb-4">
            <div className="space-y-1">
                <h1 className="text-lg md:text-xl text-white font-bold tracking-widest uppercase">HJADMZ BOOTLOADER v1.0</h1>
                <p className="text-xs text-term-green">Copyright (c) 2025 HJADMZ SYSTEMS</p>
            </div>
            <div className="text-right text-xs space-y-1 font-mono text-gray-500">
                <p>HOST: <span className="text-white">HENRY-MAIN</span></p>
                <p>KERNEL: <span className="text-white">HJADMZ_KERNEL_5.15</span></p>
            </div>
        </div>

        {/* BOOT LOG */}
        <div ref={scrollRef} className="flex flex-col space-y-1 h-[50vh] overflow-hidden text-sm md:text-base">
            {visibleLines.map((id) => {
                const line = BOOT_SEQUENCE.find(l => l.id === id);
                if (!line) return null;
                return (
                    <div
                        key={line.id}
                        className={`flex gap-4 ${line.color || 'text-gray-400'}`}
                    >
                        <span className="w-16 shrink-0 opacity-30 text-right font-mono text-xs pt-0.5">
                            {`[OK]`}
                        </span>
                        <span>{line.text}</span>
                    </div>
                );
            })}
            <div className="h-4"></div> 
            {/* Blinking Cursor */}
            {visibleLines.length > 0 && (
                <div className="flex items-center gap-2 text-term-green mt-2">
                    <span>{'>'}</span>
                    <span className="animate-pulse bg-term-green w-2 h-4 block"></span>
                </div>
            )}
        </div>
      </div>

      {/* FOOTER STATUS */}
      <div className="w-full max-w-5xl mx-auto mt-8 border-t border-white/20 pt-4 flex justify-between items-end">
          <div className="flex flex-col gap-2 w-1/3">
              <span className="text-xs uppercase tracking-wider text-gray-500">Mounting /home/hjadmz</span>
              <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-term-green transition-all duration-100 ease-linear" 
                    style={{ width: `${progress}%` }}
                  ></div>
              </div>
          </div>
          
          <div className="text-right text-xs uppercase animate-pulse text-white">
             <span className="bg-white text-black px-1 mr-2">DEL</span> BIOS
             <span className="bg-white text-black px-1 ml-4 mr-2">F12</span> BOOT OPTIONS
          </div>
      </div>
    </div>
  );
};

export default BootSequence;