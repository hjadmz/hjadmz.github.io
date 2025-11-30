import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Send } from 'lucide-react';
import { ChatMessage } from '../types';
import { soundManager } from '../services/soundService';
import { TERMINAL_DATA, GITHUB_USERNAME } from '../constants';
import { fetchGithubRepos } from '../services/githubService';

const TerminalChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'system',
      text: '> READY. Type "help" to view command list.'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
      soundManager.playType();
  };

  const typeWriterEffect = async (text: string, msgId: string) => {
    let currentText = '';
    const typeSpeed = 8; 

    for (let i = 0; i < text.length; i++) {
        currentText += text[i];
        setMessages(prev => prev.map(msg => 
            msg.id === msgId ? { ...msg, text: currentText } : msg
        ));
        if (i % 4 === 0) soundManager.playType();
        await new Promise(resolve => setTimeout(resolve, typeSpeed));
    }
    
    setMessages(prev => prev.map(msg => 
      msg.id === msgId ? { ...msg, isTyping: false } : msg
    ));
  };

  const processCommand = async (cmd: string): Promise<{ text: string, delay: number, action?: string }> => {
      const lower = cmd.toLowerCase().trim();

      if (lower === 'help' || lower === 'commands' || lower === '?') 
        return { text: TERMINAL_DATA.HELP, delay: 200 };
      
      if (lower.includes('about') || lower.includes('who') || lower.includes('bio') || lower === 'hjadmz') 
        return { text: TERMINAL_DATA.BIO, delay: 600 };
      
      if (lower.includes('stack') || lower.includes('tech') || lower.includes('tool') || lower === 'code') 
        return { text: TERMINAL_DATA.STACK, delay: 500 };
      
      if (lower.includes('contact') || lower.includes('email') || lower.includes('link')) 
        return { text: TERMINAL_DATA.CONTACT, delay: 300 };
      
      // LIVE GITHUB FETCH
      if (lower.includes('project') || lower.includes('repo') || lower.includes('work')) {
          const repos = await fetchGithubRepos(GITHUB_USERNAME);
          
          if (!repos || repos.length === 0) {
              return { text: 'ERR: NO PUBLIC REPOSITORIES FOUND ON UPLINK.', delay: 400 };
          }

          const topRepos = repos.slice(0, 5);
          let output = `FETCHING LIVE REPOSITORIES...\n\n`;
          
          topRepos.forEach(repo => {
              output += `> ${repo.title} [★ ${repo.stars || 0}]\n  ${repo.description.substring(0, 60)}${repo.description.length > 60 ? '...' : ''}\n\n`;
          });

          if (repos.length > 5) {
              output += `...and ${repos.length - 5} more available on GitHub.`;
          }
          
          return { text: output.trim(), delay: 800 };
      }
      
      if (lower === 'clear' || lower === 'cls') 
        return { text: '', delay: 0, action: 'CLEAR' };

      if (lower === 'date' || lower === 'time')
        return { text: `SYSTEM_TIME: ${new Date().toLocaleString()}`, delay: 100 };

      if (lower.startsWith('sudo'))
        return { text: `PERMISSION DENIED: User 'hjadmz' is not in the sudoers file. This incident will be reported.`, delay: 400 };

      return { 
        text: `ERR: UNKNOWN_PROTOCOL "${cmd}"\n> Type "help" for valid commands.`, 
        delay: 200 
      };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    soundManager.playClick();
    const cmd = input.trim();
    
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: cmd };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Initial loading message
    const modelMsgId = (Date.now() + 1).toString();
    const loadingPhrases = [
        '> PROCESSING...',
        '> EXECUTING...',
        '> QUERYING SYSTEM...',
    ];
    const loadingText = loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)];

    setMessages(prev => [...prev, {
        id: modelMsgId,
        role: 'system',
        text: loadingText, 
        isTyping: true
    }]);

    // Process command (async)
    const result = await processCommand(cmd);

    if (result.action === 'CLEAR') {
        setTimeout(() => {
            setMessages([]);
            setIsLoading(false);
            soundManager.playSuccess();
        }, 200);
        return;
    }

    await new Promise(r => setTimeout(r, result.delay));
    
    // Clear loading text before typing result
    setMessages(prev => prev.map(msg => 
        msg.id === modelMsgId ? { ...msg, text: '' } : msg
    ));

    if (cmd.toLowerCase().startsWith('sudo')) soundManager.playAlert();
    else soundManager.playSuccess();
    
    await typeWriterEffect(result.text, modelMsgId);
    
    setIsLoading(false);
  };

  return (
    <div 
        className="relative w-full h-full border border-term-border bg-[#050505]/95 rounded-sm flex flex-col overflow-hidden shadow-2xl shadow-black backdrop-blur-md group hover:border-term-green/30 transition-colors duration-500"
        onMouseEnter={() => soundManager.playHover()}
    >
      <div className="bg-[#080808] border-b border-white/5 p-3 flex items-center justify-between select-none z-30 h-12 shrink-0">
        <div className="flex items-center gap-4">
            <div className="flex gap-1.5 opacity-30">
                <div className="w-2.5 h-2.5 rounded-full bg-[#333]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#333]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#333]"></div>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono tracking-wider">
                <TerminalIcon size={12} className="text-term-green" />
                <span className="group-hover:text-white transition-colors">hjadmz@system:~</span>
            </div>
        </div>
      </div>

      <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 font-mono text-sm scrollbar-thin scrollbar-track-black scrollbar-thumb-term-border z-10 relative"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>

        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-fade-in`}>
            <span className="text-[9px] text-gray-600 uppercase tracking-widest mb-1 opacity-50">
                {msg.role === 'user' ? 'USER_INPUT' : 'SYS_OUTPUT'}
            </span>
            <div className={`max-w-[90%] md:max-w-[80%] p-3 md:p-4 border relative shadow-lg ${
              msg.role === 'user' 
                ? 'bg-white/5 border-white/10 text-gray-200 rounded-sm rounded-tr-none' 
                : 'bg-term-green/5 border-term-green/20 text-term-green rounded-sm rounded-tl-none shadow-[0_0_15px_rgba(0,255,65,0.05)]'
            }`}>
              <div className="whitespace-pre-wrap leading-relaxed drop-shadow-[0_0_8px_rgba(0,255,65,0.4)]">
                  {msg.role === 'system' && (
                      <span className="mr-2 opacity-50 select-none font-bold text-xs">{'>'}</span>
                  )}
                  {msg.text}
                  {msg.isTyping && (
                    <span className="inline-block w-2 h-4 bg-term-green ml-1 animate-cursor-blink align-middle shadow-[0_0_5px_#00ff41]"></span>
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-0 bg-[#080808] border-t border-white/10 z-30 relative shrink-0">
        <div className="flex items-center gap-3 bg-black/50 p-3 focus-within:bg-black transition-colors focus-within:shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-blue-500">hjadmz@system</span>
                <span className="text-gray-600 font-bold">{'>'}</span>
            </div>
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Enter command..."
                disabled={isLoading}
                className="flex-1 bg-transparent border-none outline-none text-gray-200 font-mono text-sm placeholder-gray-800 caret-term-green"
                autoComplete="off"
                spellCheck="false"
            />
            <button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="text-gray-500 hover:text-term-green disabled:opacity-30 transition-colors"
            >
                <Send size={14} />
            </button>
        </div>
      </form>
    </div>
  );
};

export default TerminalChat;