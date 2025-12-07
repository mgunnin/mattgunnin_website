
export interface Project {
  id: string;
  title: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  techStack: string[];
  imageUrl: string;
  demoUrl?: string;
  repoUrl?: string;
  category: 'AI' | 'Web' | 'Mobile' | 'Design' | 'Esports' | 'Crypto';
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'Guide' | 'Tool' | 'Post' | 'Newsletter';
  url: string;
  date: string;
  tags?: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isStreaming?: boolean;
  isThinking?: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  tech: string[];
  logo?: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'Frontend' | 'Backend' | 'AI' | 'Tools';
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
}

export type AgentStatus = 'IDLE' | 'LISTENING' | 'ANALYZING' | 'EXECUTING' | 'STREAMING';
