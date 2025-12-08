

export interface Project {
  id: string;
  title: string;
  role: string;
  period: string;
  description: string;
  caseStudy?: string; // HTML content for detailed view
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
  slug: string;
  date: string;
  readTime?: string;
  author?: {
    name: string;
    role: string;
    avatar: string;
  };
  content?: string; // HTML content
  toc?: { id: string; title: string }[];
  tags?: string[];
  accessLevel?: 'Public' | 'Locked';
  category?: ContentPillar;
  url?: string; // External link fallback
}

export type ContentPillar = 'AgenticAI' | 'FounderOS' | 'EsportsIntel' | 'Web3Community';

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
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
  readTime: string;
  image?: string;
}

export type AgentStatus = 'IDLE' | 'LISTENING' | 'ANALYZING' | 'EXECUTING' | 'STREAMING';
export type CognitiveMode = 'STRATEGIC' | 'TECHNICAL';

export interface NeuralInterfaceProps {
  currentSection: string;
}

// --- LAB DEMO TYPES ---

export interface AgentNode {
  id: string;
  name: string;
  role: string;
  tools: string[];
  color: string;
}

export interface AgentFlow {
  from: string;
  to: string;
  description: string;
}

export interface ArchitectureResult {
  agents: AgentNode[];
  flow: AgentFlow[];
  summary: string;
}

export interface PromptResult {
  original: string;
  optimized: string;
  score: number;
  critique: string;
  changes: string[];
}

export interface RAGResult {
  answer: string;
  citations: string[];
  confidence: number;
}

export interface PredictionResult {
  matchup: string;
  winner: string;
  probability: number;
  keyFactors: string[];
  mvpPrediction: string;
}