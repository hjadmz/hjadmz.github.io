import React, { useEffect, useState, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices
    if (matchMedia('(pointer:coarse)').matches) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      if (cursorRef.current && trailerRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        
        // Trailer lag effect
        trailerRef.current.animate({
            transform: `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`
        }, { duration: 500, fill: "forwards" });
      }

      const target = e.target as HTMLElement;
      const isClickable = target.tagName.toLowerCase() === 'a' || 
                          target.tagName.toLowerCase() === 'button' ||
                          target.closest('a') || 
                          target.closest('button');
                          
      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision Center Dot */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-term-green rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ marginTop: '-3px', marginLeft: '-3px' }}
      ></div>
      
      {/* Outer Ring / Trailer */}
      <div 
        ref={trailerRef}
        className={`fixed top-0 left-0 w-6 h-6 border border-term-green rounded-full pointer-events-none z-[9998] transition-all duration-200 ease-out mix-blend-difference ${isHovering ? 'scale-150 bg-term-green/20 border-transparent' : 'scale-100'}`}
      ></div>
    </>
  );
};

export default CustomCursor;