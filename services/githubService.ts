import { Project } from '../types';

const CACHE_KEY = 'hjadmz_repos_v23'; 
const CACHE_DURATION = 1000 * 60 * 10; 

const cleanText = (text: string): string => {
    if (!text) return "";
    return text.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF])/g, '').trim();
};

const smartTag = (repo: any): string[] => {
    const tags = new Set<string>();
    if (repo.language) tags.add(repo.language.toUpperCase());
    if (repo.topics) repo.topics.forEach((t: string) => tags.add(t.toUpperCase()));
    return Array.from(tags).slice(0, 4);
};

export const fetchGithubRepos = async (username: string): Promise<Project[]> => {
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    const { timestamp, data } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) return data;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=pushed&direction=desc&per_page=12`);
    
    // RETURN EMPTY IF FAILED
    if (!response.ok) return [];

    const repos = await response.json();
    if (!Array.isArray(repos) || repos.length === 0) return [];

    const projects: Project[] = repos
        .filter((repo: any) => !repo.fork && !repo.archived)
        .map((repo: any) => {
            const desc = cleanText(repo.description) || `Public repository.`;

            return {
                id: String(repo.id).slice(0, 4), 
                title: repo.name.replace(/-/g, '_').toUpperCase(), 
                description: desc,
                tech: smartTag(repo),
                link: repo.html_url,
                featured: repo.stargazers_count > 0,
                stars: repo.stargazers_count
            };
        });

    localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: projects }));
    return projects;

  } catch (error) {
    console.error('GitHub Fetch Error:', error);
    return [];
  }
};