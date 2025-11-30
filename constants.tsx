
import { Project, BootLine } from './types';
import { Globe, Terminal, Code, Settings } from 'lucide-react';

export const GITHUB_USERNAME = 'hjadmz';
export const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`;
export const LINKEDIN_URL = 'https://www.linkedin.com/in/hjadmz';
export const CONTACT_EMAIL = 'hjadmz@icloud.com';

// Privacy Update: Calculated midpoint for St. Charles <-> St. Louis coverage
export const LOCATION_COORDINATES = {
  lat: 38.7400, 
  lng: -90.3800,
  label: 'SECTOR: GREATER ST. LOUIS'
};

// Fallback data: Honest profile link if GitHub fails.
export const PROJECTS: Project[] = [
  {
    id: 'LINK',
    title: 'GITHUB_PROFILE',
    description: 'Direct uplink to user repositories. Access full project history and source code.',
    tech: ['SOURCE', 'GIT', 'VERSION_CONTROL'],
    link: GITHUB_URL,
    featured: true,
    stars: 0
  }
];

// Heavy flag indicates a "processing hang" for realism
export const BOOT_SEQUENCE: (BootLine & { heavy?: boolean })[] = [
  { id: 1, text: "HJADMZ BOOTLOADER v3.1 initialized", delay: 10, sound: 'type' },
  { id: 2, text: "ACPI: Core revision 6.3", delay: 10, sound: 'type' },
  { id: 3, text: "CPU: CLOCK_SYNC ... STABLE [4.2GHz]", delay: 20, sound: 'type' },
  { id: 4, text: "MEM: INTEGRITY_CHECK ... PASSED (64GB)", delay: 30, sound: 'type' },
  { id: 5, text: "INIT: DISPLAY_CONTROLLER_DAEMON", delay: 10 },
  { id: 6, text: "  > LOADING DRIVER: NVIDIA_G0", delay: 10 },
  { id: 7, text: "  > RES: 3840x2160 @ 120Hz", delay: 10 },
  { id: 8, text: "LOADING HJADMZ KERNEL IMAGE .........", delay: 600, heavy: true }, 
  { id: 9, text: "[OK] KERNEL_LOAD_COMPLETE", delay: 20, color: "text-term-green", sound: 'success' },
  { id: 10, text: "MOUNTING /home/hjadmz ...", delay: 400, heavy: true },
  { id: 11, text: "USER_AUTH: UID_1001 (HENRY)", delay: 100, color: "text-blue-400", sound: 'type' },
  { id: 12, text: "> LOADING PROFILE CONFIG ........... DONE", delay: 100, sound: 'type' },
  { id: 13, text: "PRIVILEGE_ESCALATION: SUDO GRANTED", delay: 100, color: "text-red-500", sound: 'alert' },
  { id: 14, text: "NETWORK: RESOLVING HOSTS .........", delay: 1200, heavy: true }, 
  { id: 15, text: "UPSTREAM: CONNECTED [1Gbps]", delay: 50, color: "text-term-green", sound: 'success' },
  { id: 16, text: "STARTING INTERACTIVE SHELL ...", delay: 400, sound: 'type' },
  { id: 17, text: "ENV_VARS: LOADED", delay: 200 },
  { id: 18, text: "SYSTEM READY.", delay: 800, color: "text-white font-bold", sound: 'success' },
];

export const SKILLS = [
  { name: 'PYTHON', icon: <Code size={20} />, desc: "Scripting, Automation, Data Handling" },
  { name: 'OPTIMIZATION', icon: <Settings size={20} />, desc: "System Tuning, Workflow Efficiency" },
  { name: 'STUDENT', icon: <Globe size={20} />, desc: "React, TypeScript, Modern UI/UX" },
  { name: 'STACK', icon: <Terminal size={20} />, desc: "VS Code, Warp, Cursor, Anti-Gravity" },
];

// High-Fidelity CLI Data - 100% Accurate to Persona
export const TERMINAL_DATA = {
  BIO: `IDENTITY: Henry Joseph Adams (hjadmz)
ROLE: Student / Creative Technologist / Optimizer
LOC: Greater St. Louis Area (Midwest Sector)
AGE: 20

PROFILE:
An introspective developer obsessed with system optimization and "vibe coding."
Specializing in cleaning up digital noise, automating workflows, and building high-performance
interfaces. Currently studying at St. Charles Community College.`,

  STACK: `CORE STACK:
> LANGUAGES: Python (Primary), TypeScript (Web), Swift (Basic)
> ENVIRONMENT: VS Code, Warp Terminal, Cursor IDE, Anti-Gravity
> FOCUS: Automation, System Configuration, React, UI/UX

PHILOSOPHY:
"Optimization is not just about speed; it's about flow."`,

  CONTACT: `TRANSMISSION CHANNELS:
> EMAIL: hjadmz@icloud.com
> GITHUB: github.com/hjadmz
> LINKEDIN: linkedin.com/in/hjadmz
> STATUS: OPEN_TO_CONNECT`,

  // Accurate project list for the terminal response
  PROJECTS: `ACTIVE REPOSITORIES:
> PYTHON_SYS_OPT: System cleanup & logic scripts
> WEB_ARCH_CORE: React/TypeScript portfolio structure
> SWIFT_HAPTICS: iOS interface experiments
> DOTFILES_ZSH: Optimized environment config`,
  
  HELP: `AVAILABLE COMMANDS:
  help      : Show this menu
  about     : User identity & bio
  stack     : Tech stack & tools
  projects  : List active repos
  contact   : Communication channels
  clear     : Clear terminal
  date      : Show local system time
  
  * Execute keywords like "tech", "whoami", or "email"`
};
