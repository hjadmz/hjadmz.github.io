import React, { useState, useRef } from 'react';
import { soundManager } from '../services/soundService';

interface InteractiveHighlightProps {
  text: string;
  color?: string;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&[]{}<>";

const InteractiveHighlight: React.FC<InteractiveHighlightProps> = ({ text, color = "text-term-green" }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scramble = () => {
    // Calculate total duration based on length (e.g. 50ms per char, min 300ms, max 800ms)
    const duration = Math.min(Math.max(text.length * 50, 300), 800);
    const frameRate = 30; // Update every 30ms
    const totalFrames = duration / frameRate;
    
    let frame = 0;
    
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    // Trigger calculated sound burst
    soundManager.playScramble(duration);

    intervalRef.current = setInterval(() => {
      frame++;
      
      const progress = frame / totalFrames;
      const charsToResolve = Math.floor(progress * text.length);

      setDisplayText(
        text.split("").map((char, index) => {
          if (index < charsToResolve) {
            return text[index]; // Resolved char
          }
          // Scrambling char
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join("")
      );
      
      if (frame >= totalFrames) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text); // Ensure final state is clean
      }
    }, frameRate);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    scramble();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Don't stop immediately, let the animation finish for "weight", or reset if you prefer snappy
    // For premium feel, usually we let it resolve or just reset cleanly
    // setDisplayText(text); 
    // if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <span 
      className={`relative inline-block cursor-crosshair font-bold px-1 mx-1 rounded-sm transition-all duration-300 ${isHovered ? 'bg-term-green/10 text-term-green shadow-[0_0_15px_rgba(0,255,65,0.3)]' : 'text-white'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={scramble}
    >
      <span className="relative z-10 font-mono tracking-wide">{displayText}</span>
      
      {/* Animated Underline */}
      <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-term-green transition-all duration-300 ease-out origin-left ${isHovered ? 'scale-x-100' : 'scale-x-0'}`}></span>
      
      {/* RGB Split Glitch Effect on Text Shadow */}
      <span className={`absolute inset-0 z-0 pointer-events-none opacity-0 ${isHovered ? 'opacity-50 animate-glitch' : ''}`}></span>
    </span>
  );
};

export default InteractiveHighlight;