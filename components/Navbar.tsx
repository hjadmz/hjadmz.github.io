
import React, { useState } from 'react';
import { GITHUB_URL } from '../constants';
import { Github, Volume2, VolumeX } from 'lucide-react';
import { soundManager } from '../services/soundService';

const Navbar: React.FC = () => {
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);

  const handleToggleSound = () => {
    const newState = !isMuted;
    setIsMuted(newState);
    soundManager.setMute(newState);
    if (!newState) soundManager.playClick();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-black/70 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex justify-between items-center font-mono relative">
        
        {/* LOGO SECTION - POPPET EFFECT */}
        <div 
            className="flex items-center gap-4 group cursor-pointer relative" 
            onMouseEnter={() => {
                soundManager.playHover();
                setIsHoveringLogo(true);
            }}
            onMouseLeave={() => setIsHoveringLogo(false)}
        >
            {/* Standard Logo (Small) - Exact User SVG - Floating Cleanly */}
            <div className="w-10 h-10 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" shapeRendering="crispEdges" className="w-full h-full drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                  <g fill="#F9FAFB">
                    <rect x="4" y="4" width="1" height="1"/>
                    <rect x="4" y="5" width="1" height="1"/>
                    <rect x="11" y="4" width="1" height="1"/>
                    <rect x="11" y="5" width="1" height="1"/>
                    <rect x="8" y="4" width="1" height="1"/>
                    <rect x="8" y="5" width="1" height="1"/>
                    <rect x="8" y="6" width="1" height="1"/>
                    <rect x="8" y="7" width="1" height="1"/>
                    <rect x="7" y="8" width="1" height="1"/>
                    <rect x="8" y="8" width="1" height="1"/>
                    <rect x="5" y="10" width="1" height="1"/>
                    <rect x="10" y="10" width="1" height="1"/>
                    <rect x="6" y="11" width="1" height="1"/>
                    <rect x="7" y="11" width="1" height="1"/>
                    <rect x="8" y="11" width="1" height="1"/>
                    <rect x="9" y="11" width="1" height="1"/>
                  </g>
                </svg>
            </div>
            
            <div className="flex flex-col leading-tight">
                <span className="text-[10px] text-gray-500 tracking-widest uppercase">Identity</span>
                <span className="text-white font-bold tracking-wider group-hover:text-term-green transition-colors text-sm">
                    HENRY
                </span>
            </div>

            {/* IDENTITY POP-OUT (Poppet) */}
            <div className={`absolute top-full left-0 mt-4 bg-[#0a0a0a] border border-term-green/30 p-4 rounded-sm shadow-[0_0_30px_rgba(0,255,65,0.15)] flex gap-4 items-center w-[260px] z-50 transition-all duration-300 origin-top-left ${isHoveringLogo ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 -translate-y-4 pointer-events-none'}`}>
                 <div className="w-16 h-16 bg-black border border-white/10 rounded-sm overflow-hidden shrink-0 flex items-center justify-center">
                     {/* Enlarged Avatar with Glitch Effect */}
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" shapeRendering="crispEdges" className="w-full h-full animate-pulse-slow p-2">
                        <g fill="#00ff41">
                            <rect x="4" y="4" width="1" height="1"/>
                            <rect x="4" y="5" width="1" height="1"/>
                            <rect x="11" y="4" width="1" height="1"/>
                            <rect x="11" y="5" width="1" height="1"/>
                            <rect x="8" y="4" width="1" height="1"/>
                            <rect x="8" y="5" width="1" height="1"/>
                            <rect x="8" y="6" width="1" height="1"/>
                            <rect x="8" y="7" width="1" height="1"/>
                            <rect x="7" y="8" width="1" height="1"/>
                            <rect x="8" y="8" width="1" height="1"/>
                            <rect x="5" y="10" width="1" height="1"/>
                            <rect x="10" y="10" width="1" height="1"/>
                            <rect x="6" y="11" width="1" height="1"/>
                            <rect x="7" y="11" width="1" height="1"/>
                            <rect x="8" y="11" width="1" height="1"/>
                            <rect x="9" y="11" width="1" height="1"/>
                        </g>
                    </svg>
                 </div>
                 <div className="flex flex-col gap-1">
                     <span className="text-xs text-term-green font-bold tracking-widest glitch-text" data-text="HJADMZ">HJADMZ</span>
                     <span className="text-[10px] text-gray-400 font-mono">Creative Technologist</span>
                     <span className="text-[9px] text-gray-600 font-mono uppercase mt-1 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-term-green rounded-full animate-pulse"></span>
                        Status: ONLINE
                     </span>
                 </div>
                 {/* Decorative Corner */}
                 <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-term-green"></div>
                 <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-term-green"></div>
            </div>
        </div>

        {/* STATUS INDICATORS - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-8">
            <div className="flex flex-col items-end group">
                <span className="text-[10px] text-gray-500 uppercase tracking-wider group-hover:text-term-green transition-colors">Environment</span>
                <span className="text-white text-xs font-bold">PROD_ENV_v3.1</span>
            </div>
             <div className="flex flex-col items-end group">
                <span className="text-[10px] text-gray-500 uppercase tracking-wider group-hover:text-term-green transition-colors">Link Status</span>
                <div className="flex items-center gap-2 text-white text-xs">
                     <span className="w-1.5 h-1.5 rounded-full bg-term-green animate-pulse shadow-[0_0_8px_rgba(0,255,65,0.8)]"></span>
                     CONNECTED
                </div>
            </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
            <button 
                onClick={handleToggleSound}
                className="p-2 text-gray-400 hover:text-term-green transition-colors transform hover:scale-110 active:scale-95"
                aria-label="Toggle Sound"
            >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>

            <a 
                href={GITHUB_URL} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 hover:border-term-green hover:text-term-green hover:bg-term-green/10 transition-all rounded-sm group text-xs md:text-sm tracking-wide"
                aria-label="GitHub Profile"
                onMouseEnter={() => soundManager.playHover()}
                onClick={() => soundManager.playClick()}
            >
                <Github size={16} className="group-hover:rotate-12 transition-transform" />
                <span className="hidden sm:inline font-bold">SOURCE_CODE</span>
            </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
