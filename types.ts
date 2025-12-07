export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  demoUrl?: string;
  repoUrl?: string;
  category: 'AI' | 'Web' | 'Mobile' | 'Design';
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