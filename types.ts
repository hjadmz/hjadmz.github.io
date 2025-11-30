export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
  featured?: boolean;
  stars?: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'system';
  text: string;
  isTyping?: boolean;
}

export interface BootLine {
  id: number;
  text: string;
  delay: number;
  color?: string;
  sound?: 'type' | 'success' | 'alert';
}

export enum AppState {
  BOOTING,
  RUNNING,
}

export interface SoundContextType {
  playHover: () => void;
  playClick: () => void;
  playType: () => void;
  playSuccess: () => void;
  playAlert: () => void;
  playBoot: () => void;
  toggleSound: () => void;
  isMuted: boolean;
}