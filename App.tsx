import React, { useState, useEffect } from 'react';
import BootSequence from './components/BootSequence';
import Navbar from './components/Navbar';
import ProjectCard from './components/ProjectCard';
import TerminalChat from './components/TerminalChat';
import CustomCursor from './components/CustomCursor';
import LocationRadar from './components/LocationRadar';
import InteractiveHighlight from './components/InteractiveHighlight';
import { AppState, Project } from './types';
import { SKILLS, GITHUB_USERNAME, CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from './constants';
import { Terminal, ArrowDown, ExternalLink, ChevronDown, AlertTriangle } from 'lucide-react';
import { soundManager } from './services/soundService';
import { fetchGithubRepos } from './services/githubService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.BOOTING);
  const [showContent, setShowContent] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [visibleProjectCount, setVisibleProjectCount] = useState(4);

  const handleBootComplete = () => {
    setAppState(AppState.RUNNING);
    soundManager.init();
    requestAnimationFrame(() => {
        setTimeout(() => setShowContent(true), 100);
    });
  };

  useEffect(() => {
    if (appState === AppState.RUNNING) {
        const loadRepos = async () => {
            const data = await fetchGithubRepos(GITHUB_USERNAME);
            setProjects(data);
            setIsLoadingProjects(false);
        };
        loadRepos();
    }
  }, [appState]);

  const scrollToSection = (id: string) => {
    soundManager.playClick();
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoadMore = () => {
      soundManager.playClick();
      setVisibleProjectCount(prev => prev + 4);
  };

  if (appState === AppState.BOOTING) {
    return <BootSequence onComplete={handleBootComplete} />;
  }

  return (
    <div className="min-h-screen bg-term-bg text-gray-300 selection:bg-term-green selection:text-black font-sans relative overflow-x-hidden">
        <CustomCursor />
        
        {/* Background Effects */}
        <div className="fixed inset-0 bg-noise opacity-[0.03] pointer-events-none z-[1]"></div>
        <div className="fixed inset-0 bg-grid-pattern opacity-[0.1] pointer-events-none z-0 animate-pan-grid"></div>
        <div className="fixed inset-0 crt-overlay pointer-events-none z-[100]"></div>
        
        <Navbar />

        <main className={`relative z-10 animate-turn-on transition-opacity duration-1000 ease-in-out ${showContent ? 'opacity-100' : 'opacity-0'}`}>
            
            {/* HERO SECTION */}
            <section className="min-h-screen flex flex-col justify-center items-start px-6 md:px-24 pt-32 pb-16 border-b border-white/5 relative overflow-hidden">
                 <div className="absolute right-[-10%] top-[20%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-term-green/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>

                 <div className="space-y-4 mb-10 animate-fade-in" style={{ animationDelay: '200ms' }}>
                     <div className="flex items-center gap-3 text-term-green font-mono text-xs md:text-sm tracking-[0.2em]">
                        <span className="w-1.5 h-1.5 bg-term-green rounded-full animate-pulse shadow-[0_0_10px_#00ff41]"></span>
                        SYSTEM ONLINE
                     </div>
                     <p className="text-gray-600 font-mono text-[10px] md:text-xs tracking-widest">LOC: GREATER ST. LOUIS // STUDENT & OPTIMIZER</p>
                 </div>

                 <h1 className="text-7xl sm:text-8xl md:text-[9rem] lg:text-[11rem] leading-[0.8] font-header font-bold text-white uppercase glitch-text mb-10 mix-blend-difference select-none animate-fade-in tracking-tight" data-text="HENRY" style={{ animationDelay: '400ms' }}>
                     HENRY
                 </h1>
                 
                 <div className="max-w-3xl animate-fade-in" style={{ animationDelay: '600ms' }}>
                     <p className="text-lg md:text-2xl text-gray-400 font-light leading-relaxed">
                        Creative Technologist. Student. Vibe Coder. <br />
                        Specializing in 
                        <InteractiveHighlight text="PYTHON" />, 
                        <InteractiveHighlight text="SYSTEM OPTIMIZATION" />, and 
                        <InteractiveHighlight text="WEB ARCHITECTURE" />. 
                        Building tools that clean up the noise and improve the flow.
                     </p>
                 </div>

                 <div className="mt-16 flex flex-wrap gap-6 animate-fade-in" style={{ animationDelay: '800ms' }}>
                     <button 
                        onClick={() => scrollToSection('work')}
                        onMouseEnter={() => soundManager.playHover()}
                        className="group px-8 py-4 bg-white text-black font-mono font-bold tracking-widest hover:bg-term-green transition-all duration-300 flex items-center gap-3 text-sm md:text-base shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_#00ff41]"
                     >
                        <Terminal size={18} />
                        VIEW_PROJECTS
                     </button>
                     <button 
                        onClick={() => scrollToSection('mission-control')}
                        onMouseEnter={() => soundManager.playHover()}
                        className="px-8 py-4 border border-white/20 text-white font-mono hover:bg-white/5 transition-colors text-sm md:text-base tracking-widest hover:border-term-green/50"
                     >
                        INITIATE_LINK
                     </button>
                 </div>

                 <button 
                    onClick={() => scrollToSection('work')}
                    className="absolute bottom-12 right-8 md:right-24 animate-bounce hidden md:block text-gray-700 opacity-50 hover:text-term-green hover:opacity-100 transition-all duration-300"
                    aria-label="Scroll Down"
                 >
                    <ArrowDown size={24} />
                 </button>
            </section>

            {/* CAPABILITIES */}
            <section className="py-24 border-b border-white/5 bg-[#080808]/50 backdrop-blur-sm">
                 <div className="px-6 md:px-24 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
                     <h2 className="text-4xl md:text-5xl font-header font-bold text-white tracking-wide">
                         <span className="text-term-green text-lg md:text-xl align-top font-mono mr-3">01.</span>
                         CAPABILITIES
                     </h2>
                     <span className="font-mono text-xs text-gray-600 tracking-widest overflow-hidden">ACTIVE MODULES</span>
                 </div>

                 <div className="px-6 md:px-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-hidden">
                        {SKILLS.map((skill, idx) => (
                            <div 
                                key={idx} 
                                className="group bg-[#0a0a0a] border border-white/5 p-8 hover:border-term-green/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col gap-4 relative overflow-hidden cursor-crosshair"
                                onMouseEnter={() => soundManager.playHover()}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-term-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                <div className="flex justify-between items-start relative z-10">
                                    <div className="p-3 bg-white/5 rounded-sm text-gray-400 group-hover:text-term-green group-hover:bg-term-green/10 transition-colors duration-300">
                                        {skill.icon}
                                    </div>
                                    <div className="w-2 h-2 rounded-full bg-gray-800 group-hover:bg-term-green group-hover:shadow-[0_0_8px_#00ff41] transition-all duration-300"></div>
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-lg font-bold text-white mb-2 tracking-wide font-header group-hover:text-term-green transition-colors">{skill.name}</h3>
                                    <p className="text-xs text-gray-500 font-mono leading-relaxed group-hover:text-gray-400 transition-colors">{skill.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                 </div>
            </section>

            {/* PROJECTS GRID */}
            <section id="work" className="py-24 px-6 md:px-24 bg-term-bg relative border-b border-white/5">
                <div className="mb-20">
                     <h2 className="text-4xl md:text-5xl font-header font-bold text-white mb-6 tracking-wide">
                         <span className="text-term-green text-lg md:text-xl align-top font-mono mr-3">02.</span>
                         REPOSITORIES
                     </h2>
                     <div className="flex items-center gap-3 text-term-green font-mono text-xs tracking-widest bg-term-green/5 inline-flex px-4 py-2 rounded-full border border-term-green/10">
                        <span className={`w-1.5 h-1.5 bg-term-green rounded-full ${isLoadingProjects ? 'animate-ping' : ''}`}></span>
                        <span>{isLoadingProjects ? 'SYNCING GITHUB...' : `CONNECTED: @${GITHUB_USERNAME}`}</span>
                     </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
                    {isLoadingProjects ? (
                        [1,2,3,4].map(i => (
                            <div key={i} className="h-80 border border-white/5 bg-[#0a0a0a] animate-pulse rounded-sm"></div>
                        ))
                    ) : projects.length > 0 ? (
                        projects.slice(0, visibleProjectCount).map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))
                    ) : (
                        /* HONEST ERROR STATE - NO FAKE PROJECTS */
                        <div className="col-span-1 lg:col-span-2 border border-red-500/30 bg-red-500/5 p-12 rounded-sm flex flex-col items-center justify-center text-center gap-4 animate-fade-in">
                            <AlertTriangle className="text-red-500 mb-2" size={40} />
                            <h3 className="text-red-500 font-header text-2xl tracking-widest">UPLINK_FAILURE</h3>
                            <p className="text-gray-500 font-mono text-xs tracking-wider max-w-md leading-relaxed">
                                UNABLE TO RETRIEVE REPOSITORY DATA FROM GITHUB API.<br/>
                                CONNECTION REFUSED OR RATE LIMITED.
                            </p>
                            <a 
                                href={GITHUB_URL} 
                                target="_blank" 
                                rel="noreferrer"
                                className="mt-4 px-6 py-3 border border-red-500/50 text-red-400 hover:bg-red-500 hover:text-black font-mono text-xs tracking-widest transition-all uppercase"
                            >
                                MANUAL_OVERRIDE_ACCESS
                            </a>
                        </div>
                    )}
                </div>

                {/* LOAD MORE BUTTON */}
                {!isLoadingProjects && projects.length > 0 && visibleProjectCount < projects.length && (
                    <div className="flex justify-center">
                        <button 
                            onClick={handleLoadMore}
                            className="group flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-term-green text-gray-400 hover:text-white font-mono text-xs tracking-widest transition-all hover:bg-term-green/5"
                        >
                            <span>LOAD_ADDITIONAL_MODULES</span>
                            <ChevronDown size={14} className="group-hover:translate-y-1 transition-transform" />
                        </button>
                    </div>
                )}
            </section>

            {/* MISSION CONTROL */}
            <section id="mission-control" className="py-24 px-6 md:px-24 bg-[#080808]">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-header font-bold text-white leading-tight mb-6 tracking-wide">
                        <span className="text-term-green text-lg md:text-xl align-top font-mono mr-3">03.</span>
                        MISSION CONTROL
                    </h2>
                    <p className="text-lg text-gray-400 font-light max-w-lg leading-relaxed">
                        Access system interface or monitor regional parameters.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-6 h-auto">
                    {/* LEFT: TERMINAL */}
                    <div className="lg:col-span-7 h-[450px] md:h-[600px] lg:h-[650px]">
                        <TerminalChat />
                    </div>

                    {/* RIGHT: MAP & UPLINK */}
                    <div className="lg:col-span-5 flex flex-col h-[450px] md:h-[600px] lg:h-[650px] gap-6">
                         <div className="flex-1 w-full border border-term-border rounded-sm overflow-hidden relative">
                            <LocationRadar />
                         </div>
                         
                         {/* Distinct "Tactical Key" Button Style */}
                         <a 
                            href={`mailto:${CONTACT_EMAIL}`} 
                            className="h-[80px] bg-[#111] border-l-4 border-l-term-green hover:bg-[#1a1a1a] flex flex-col justify-center items-center gap-1 group transition-all duration-200 relative overflow-hidden shrink-0 cursor-pointer shadow-lg active:scale-[0.98]"
                            onMouseEnter={() => soundManager.playHover()}
                            onClick={() => soundManager.playClick()}
                         >
                             {/* Striped Background Pattern */}
                             <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 10px, #222 10px, #222 20px)' }}></div>
                             
                             <div className="flex items-center gap-3 relative z-10">
                                 <ExternalLink size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                                 <span className="text-sm text-gray-200 font-bold tracking-[0.25em] group-hover:text-white transition-colors">SEND_EMAIL</span>
                             </div>
                             <span className="text-[9px] text-gray-600 font-mono tracking-widest group-hover:text-term-green transition-colors relative z-10">INITIATE_UPLINK_PROTOCOL</span>
                         </a>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-20 border-t border-white/10 bg-black relative z-10 font-mono">
                <div className="max-w-7xl mx-auto px-6 md:px-24">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
                        <div className="space-y-4">
                             <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-4">About</h4>
                             <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
                                 Creative Technologist & Student based in the Midwest.
                                 Building optimized digital systems.
                             </p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-4">Explore</h4>
                            <ul className="space-y-2 text-xs text-gray-500">
                                <li><button onClick={() => scrollToSection('work')} className="hover:text-term-green transition-colors">Repositories</button></li>
                                <li><button onClick={() => scrollToSection('mission-control')} className="hover:text-term-green transition-colors">Mission Control</button></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                             <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-4">Connect</h4>
                             <ul className="space-y-2 text-xs text-gray-500">
                                 <li><a href={GITHUB_URL} target="_blank" rel="noreferrer" className="hover:text-term-green transition-colors">GitHub</a></li>
                                 <li><a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="hover:text-term-green transition-colors">LinkedIn</a></li>
                                 <li><a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-term-green transition-colors">Email</a></li>
                             </ul>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-[10px] text-gray-600 uppercase tracking-widest">
                        <p>© 2025 HENRY. SYSTEM ONLINE.</p>
                        <p className="mt-2 md:mt-0 font-mono opacity-50">V3.1-STABLE</p>
                    </div>
                </div>
            </footer>
        </main>
    </div>
  );
};

export default App;