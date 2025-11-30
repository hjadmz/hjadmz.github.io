import React, { useEffect, useRef, useState } from 'react';
import { Shield, MapPin, Wifi, Clock } from 'lucide-react';
import { soundManager } from '../services/soundService';
import { LOCATION_COORDINATES } from '../constants';

declare global {
  interface Window {
    L: any;
  }
}

const LocationRadar: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [time, setTime] = useState('');
  const [signalStrength, setSignalStrength] = useState(99.0);

  // Clock for St. Louis Time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Chicago',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Signal Jitter
  useEffect(() => {
      const interval = setInterval(() => {
          setSignalStrength(prev => {
              const variance = (Math.random() - 0.5) * 1.5;
              let next = 98.0 + variance;
              return Math.min(Math.max(next, 95.0), 99.9);
          });
      }, 2000);
      return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current || !window.L || mapInstanceRef.current) return;

    soundManager.playRadarPing();

    const { lat, lng } = LOCATION_COORDINATES;
    
    // Zoom 9 offers a good regional "Sector" view of Greater STL
    const map = window.L.map(mapContainerRef.current, {
      center: [lat, lng],
      zoom: 9, 
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      dragging: false, 
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
    });

    mapInstanceRef.current = map;

    // Dark/Hacker Tiles
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      className: 'leaflet-dark-mode'
    }).addTo(map);

    // Large Sector Circle - High Visibility
    // 35km Radius covers St. Charles + St. Louis
    window.L.circle([lat, lng], {
        color: '#00ff41',
        fillColor: '#00ff41',
        fillOpacity: 0.2, // Increased for visibility
        radius: 35000,     
        weight: 3,         // Thicker line
        opacity: 0.8,
        dashArray: '20, 10' // Tactical dash pattern
    }).addTo(map);

    // Outer Warning Ring (Massive)
    window.L.circle([lat, lng], {
        color: '#00ff41',
        fillColor: 'transparent',
        fillOpacity: 0,
        radius: 55000, 
        weight: 1,
        opacity: 0.3,
        dashArray: '5, 40'
    }).addTo(map);
    
    // Auto-resize handler to prevent grey tiles
    const resizeObserver = new ResizeObserver(() => {
        map.invalidateSize();
    });
    resizeObserver.observe(mapContainerRef.current);

    return () => {
        if (mapInstanceRef.current) {
            mapInstanceRef.current.remove();
            mapInstanceRef.current = null;
        }
        resizeObserver.disconnect();
    };
  }, []);

  return (
    <div 
        className="relative w-full h-full min-h-[350px] bg-[#050505] border border-term-border rounded-sm overflow-hidden group hover:border-term-green/30 transition-colors"
        onMouseEnter={() => soundManager.playHover()}
    >
        
        {/* Map Container */}
        <div ref={mapContainerRef} className="absolute inset-0 z-0 opacity-60 mix-blend-luminosity hover:opacity-80 transition-opacity duration-700 bg-[#050505]" />
        
        {/* Scanning Line Animation */}
        <div className="absolute inset-0 bg-scan-line z-10 pointer-events-none opacity-40"></div>
        
        {/* UI Overlay */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none z-20">
            {/* Top Bar */}
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 text-term-green bg-black/90 px-3 py-1.5 rounded-sm border border-term-green/20 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                    <Shield size={12} className="animate-pulse" />
                    <span className="text-[10px] font-mono tracking-widest font-bold">SECTOR: MIDWEST_US</span>
                </div>
                <div className="text-right bg-black/90 px-3 py-1.5 rounded-sm border border-term-green/10 backdrop-blur-md flex items-center gap-2 shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                     <Clock size={10} className="text-gray-400" />
                     <span className="text-[10px] text-white font-mono tracking-widest">{time} <span className="text-gray-500">CST</span></span>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex items-end justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-white drop-shadow-xl">
                        <MapPin size={16} className="text-term-green filter drop-shadow-[0_0_5px_rgba(0,255,65,0.8)]" />
                        <span className="font-header text-2xl tracking-wide uppercase drop-shadow-md text-white">
                            ACTIVE REGION
                        </span>
                    </div>
                    <div className="text-[9px] text-gray-400 font-mono uppercase tracking-wider flex items-center gap-2 pl-1 bg-black/50 px-2 py-1 rounded-sm w-fit">
                        <span className="w-1.5 h-1.5 bg-term-green rounded-full animate-pulse"></span>
                        SIGNAL STRENGTH: {signalStrength.toFixed(1)}%
                    </div>
                </div>
                
                <div className="hidden md:block">
                     <div className="flex items-center gap-2 text-term-green/60 text-[10px] font-mono mb-1 bg-black/50 px-2 py-1 rounded-sm">
                        <Wifi size={12} />
                        <span>SAT_UPLINK_ESTABLISHED</span>
                     </div>
                </div>
            </div>
        </div>

        {/* Static Grain Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-noise opacity-10 z-30"></div>
        
        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.9)_100%)] z-10"></div>
    </div>
  );
};

export default LocationRadar;