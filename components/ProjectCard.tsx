import React, { useState } from 'react';
import { Project } from '../types';
import { ExternalLink, Terminal, GitBranch, Star } from 'lucide-react';
import { soundManager } from '../services/soundService';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
      setIsHovered(true);
      soundManager.playHover();
  };

  return (
    <div 
        className="group relative bg-[#0a0a0a] border border-white/10 hover:border-term-green/40 transition-all duration-500 overflow-hidden flex flex-col h-full transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Grid Hover Effect */}
      <div className="absolute inset-0 bg-term-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,255,65,0.1) 1px, transparent 0)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="p-8 flex flex-col h-full relative z-10">
          <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-sm text-term-green border border-white/5 group-hover:border-term-green transition-all duration-300 group-hover:bg-term-green/10">
                      <Terminal size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                      <h3 className="font-header text-2xl text-white tracking-wide uppercase group-hover:text-term-green transition-colors duration-300">
                          {project.title}
                      </h3>
                      <div className="text-[10px] text-gray-500 font-mono flex items-center gap-2 mt-1.5">
                        <span className="opacity-50">ID:</span>
                        <span>{project.id}</span>
                        <span className="w-1 h-1 bg-gray-600 rounded-full mx-1"></span>
                        <span className="uppercase tracking-wider text-gray-400">Public Repo</span>
                      </div>
                  </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                {project.featured && (
                    <span className="px-2 py-0.5 text-[9px] font-bold bg-term-green text-black uppercase tracking-widest rounded-sm">
                        Featured
                    </span>
                )}
                {project.stars !== undefined && project.stars > 0 && (
                    <div className="flex items-center gap-1.5 text-xs text-yellow-500/80 font-mono bg-yellow-500/10 px-2 py-1 rounded-sm border border-yellow-500/20">
                        <Star size={10} fill="currentColor" />
                        <span>{project.stars}</span>
                    </div>
                )}
              </div>
          </div>

          <p className="text-gray-400 text-sm leading-7 mb-8 flex-grow font-mono font-light opacity-80 group-hover:opacity-100 transition-opacity">
              {project.description}
          </p>

          <div className="mt-auto">
              {/* Tech Stack - Improved Wrap & Spacing & Hover Scale */}
              <div className="flex flex-wrap gap-2 mb-6 leading-tight">
                  {project.tech.map((t, idx) => (
                      <span 
                        key={t} 
                        className="text-[10px] uppercase px-2.5 py-1 bg-white/5 border border-white/10 text-gray-400 rounded-sm group-hover:border-term-green/20 group-hover:text-term-green/80 transition-all duration-300 whitespace-nowrap hover:scale-105 hover:bg-white/10 hover:text-white cursor-default"
                        style={{ transitionDelay: `${idx * 50}ms` }}
                      >
                          {t}
                      </span>
                  ))}
              </div>

              <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                   <div className="flex items-center gap-2 text-xs text-gray-600 group-hover:text-gray-400 transition-colors font-mono">
                       <GitBranch size={14} />
                       <span>main</span>
                   </div>
                   
                   <a 
                       href={project.link}
                       target="_blank"
                       rel="noreferrer"
                       className="flex items-center gap-2 text-sm font-bold text-white group-hover:translate-x-1 transition-transform duration-300 group-hover:text-term-green"
                       onClick={() => soundManager.playClick()}
                   >
                       VIEW_SOURCE <ExternalLink size={14} />
                   </a>
              </div>
          </div>
      </div>
    </div>
  );
};

export default ProjectCard;