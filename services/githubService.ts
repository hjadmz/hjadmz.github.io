
import { Project } from '../types';
import { PROJECTS as FALLBACK_PROJECTS } from '../constants';

const CACHE_KEY = 'hjadmz_repos_cache_v10'; // Bumped version for clean slate
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes cache

// Determines tech stack based on keywords in repo data
const smartTag = (repo: any): string[] => {
    const tags = new Set<string>();
    
    // Add existing topics from GitHub
    if (repo.topics) {
        repo.topics.forEach((t: string) => tags.add(t.toUpperCase()));
    }
    
    // Language detection
    if (repo.language) {
        tags.add(repo.language.toUpperCase());
    }

    // Intelligent Context Inference based on text analysis
    const text = `${repo.name} ${repo.description || ''}`.toLowerCase();
    
    // Core Skills (High Priority)
    if (text.includes('swift') || text.includes('ios') || text.includes('mac')) tags.add('SWIFT');
    if (text.includes('react') || text.includes('jsx') || text.includes('tsx')) tags.add('REACT');
    if (text.includes('typescript') || text.includes('ts')) tags.add('TYPESCRIPT');
    if (text.includes('python') || text.includes('py')) tags.add('PYTHON');
    
    // Categories
    if (text.includes('ai') || text.includes('gpt') || text.includes('llm')) tags.add('AI');
    if (text.includes('config') || text.includes('dotfiles') || text.includes('zsh')) tags.add('CONFIG');
    if (text.includes('bot') || text.includes('automation') || text.includes('script')) tags.add('AUTOMATION');
    if (text.includes('api') || text.includes('server')) tags.add('BACKEND');

    // Return top 4 unique tags
    return Array.from(tags).slice(0, 4);
};

// Intelligently reformats descriptions to sound "Engineered"
const formatTechTone = (desc: string): string => {
    if (!desc) return "";
    let clean = desc;
    clean = clean.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF])/g, '');
    clean = clean.replace(/^(my|a|just a|simple|basic)\s+/i, '');
    clean = clean.trim();
    if (clean.length > 0) clean = clean.charAt(0).toUpperCase() + clean.slice(1);
    if (clean.length > 0 && !clean.endsWith('.')) clean += '.';
    return clean;
};

// True Procedural Generation for when GitHub data is missing description
const generateProceduralDescription = (name: string): string => {
    const tokens = name.toLowerCase().split(/[-_]/);
    const mainSubject = tokens.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(' ');
    return `${mainSubject} architecture. Deployed for system integration.`;
};

export const fetchGithubRepos = async (username: string): Promise<Project[]> => {
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    const { timestamp, data } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=pushed&direction=desc&type=all&per_page=100`);
    
    if (!response.ok) {
        // If API fails (rate limit/404), return the honest profile link, NOT fake projects
        console.warn(`GitHub API Error: ${response.status}`);
        return FALLBACK_PROJECTS;
    }

    const repos = await response.json();
    
    // If user has no public repos, return the honest profile link
    if (!Array.isArray(repos) || repos.length === 0) {
        return FALLBACK_PROJECTS;
    }

    const projects: Project[] = repos
        .filter((repo: any) => !repo.fork && !repo.archived && !repo.private) 
        .slice(0, 6) 
        .map((repo: any) => {
            let finalDesc = formatTechTone(repo.description);
            if (!finalDesc) {
                finalDesc = generateProceduralDescription(repo.name);
            }

            return {
                id: String(repo.id).slice(0, 4), 
                title: repo.name.replace(/-/g, '_').toUpperCase(), 
                description: finalDesc,
                tech: smartTag(repo),
                link: repo.html_url,
                featured: repo.stargazers_count > 0,
                stars: repo.stargazers_count
            };
        });

    if (projects.length === 0) {
        return FALLBACK_PROJECTS;
    }

    localStorage.setItem(CACHE_KEY, JSON.stringify({
        timestamp: Date.now(),
        data: projects
    }));

    return projects;

  } catch (error) {
    console.error('Failed to fetch from GitHub:', error);
    return FALLBACK_PROJECTS;
  }
};
