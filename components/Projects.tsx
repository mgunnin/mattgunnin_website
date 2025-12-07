import React from 'react';
import { ExternalLink, Github, Code, Cpu, Globe, Database, Box, Terminal, Zap, Server, LayoutTemplate, Brain, MessageSquare, Image as ImageIcon, Bot } from 'lucide-react';
import { Project } from '../types';

const projects: Project[] = [
  {
    id: 'cainam',
    title: 'Cainam World',
    description: 'AI town simulation framework enabling autonomous agent interactions and emergent behaviors in virtual environments. Built with multi-agent architecture principles.',
    techStack: ['TypeScript', 'Multi-Agent', 'Gemini 3', 'AI Simulation'],
    imageUrl: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1632&auto=format&fit=crop',
    category: 'AI',
    demoUrl: '#',
    repoUrl: '#'
  },
  {
    id: 'lacra',
    title: 'Lacra Discord Bot',
    description: 'Next-gen Discord bot interface featuring chat completions, AI image generation, and automated moderation capabilities using the latest reasoning models.',
    techStack: ['Node.js', 'GPT-5.1', 'Discord.js', 'Imagen 3'],
    imageUrl: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=1000&auto=format&fit=crop',
    category: 'AI',
    repoUrl: '#'
  },
  {
    id: 'oneconsole',
    title: 'OneConsole',
    description: 'Real-time stats and analytics dashboard for League of Legends broadcasters. Used by Riot Games and 50+ pro teams. Built using Computer Vision and Reinforcement Learning.',
    techStack: ['Computer Vision', 'RL', 'Riot API', 'Analytics'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    category: 'Web',
    demoUrl: '#'
  },
  {
    id: 'oneview',
    title: 'OneView',
    description: 'Live engagement overlay built as an early Twitch extension. Provided viewers with live stats, trivia, and predictions. Used by hundreds of streamers.',
    techStack: ['Twitch API', 'Computer Vision', 'Frontend'],
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop',
    category: 'Web',
    demoUrl: '#'
  },
  {
    id: 'discord-community',
    title: 'NFT Community',
    description: 'Launched a 10,000+ member Discord community pioneering membership-capable NFTs. One of the first projects to integrate crypto utility directly into community management.',
    techStack: ['Discord', 'Web3', 'NFTs', 'Solidity'],
    imageUrl: 'https://images.unsplash.com/photo-1620321023374-d1a68fddadb3?q=80&w=1000&auto=format&fit=crop',
    category: 'Web',
    demoUrl: '#'
  },
  {
    id: 'esportscalendar',
    title: 'Esportscalendar',
    description: 'The first comprehensive esports event calendar (2013). Scaled to hundreds of thousands of monthly users, solving a critical discovery problem in the early industry.',
    techStack: ['Web', 'Calendar', 'Aggregation'],
    imageUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1000&auto=format&fit=crop',
    category: 'Web',
    demoUrl: '#'
  }
];

const getTechIcon = (tech: string) => {
  const t = tech.toLowerCase();
  
  // Advanced AI Models (LLMs)
  if (t.includes('gpt') || t.includes('gemini') || t.includes('claude') || t.includes('llama')) {
    return <Brain size={14} className="text-pink-400" />;
  }

  // Visual AI / Image Gen
  if (t.includes('imagen') || t.includes('diffusion') || t.includes('image gen')) {
    return <ImageIcon size={14} className="text-purple-400" />;
  }

  // Communication / Discord
  if (t.includes('discord')) {
    return <MessageSquare size={14} className="text-indigo-400" />;
  }

  // Agents / Bots / Automation
  if (t.includes('agent') || t.includes('bot') || t.includes('swarm') || t.includes('crewai')) {
    return <Bot size={14} className="text-emerald-400" />;
  }

  // General AI / ML
  if (t.includes('ai') || t.includes('learning') || t.includes('rl')) {
    return <Cpu size={14} className="text-cyber-primary" />;
  }

  if (t.includes('vision')) return <Zap size={14} className="text-yellow-400" />;
  
  // Web & Backend
  if (t.includes('web') || t.includes('http') || t.includes('api')) return <Globe size={14} className="text-blue-400" />;
  if (t.includes('node') || t.includes('server')) return <Server size={14} className="text-green-500" />;
  if (t.includes('react') || t.includes('next') || t.includes('vue') || t.includes('frontend') || t.includes('typescript')) return <LayoutTemplate size={14} className="text-cyan-400" />;
  
  // Data
  if (t.includes('data') || t.includes('sql') || t.includes('analytics') || t.includes('aggregation') || t.includes('vector') || t.includes('rag')) return <Database size={14} className="text-orange-300" />;
  
  // Web3
  if (t.includes('nft') || t.includes('web3') || t.includes('solidity') || t.includes('block')) return <Box size={14} className="text-orange-500" />;
  
  // Tools
  if (t.includes('script') || t.includes('python') || t.includes('terminal')) return <Terminal size={14} className="text-gray-400" />;
  
  return <Code size={14} className="text-gray-500" />;
};

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 px-6 md:px-24 w-full min-h-screen flex flex-col justify-center relative bg-gradient-to-b from-transparent to-black/80">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex items-end gap-4 mb-16 border-b border-gray-800 pb-6">
          <h2 className="text-5xl md:text-7xl font-bold text-white opacity-90">WORKS</h2>
          <span className="text-cyber-primary font-mono text-xl mb-2">/ SELECTED_PROJECTS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className="group relative bg-gray-900 border border-gray-800 hover:border-cyber-primary/50 transition-all duration-500 overflow-hidden rounded-lg flex flex-col"
            >
              {/* Image Container with Zoom Effect */}
              <div className="h-48 overflow-hidden relative shrink-0">
                 {/* Image Overlay */}
                <div className="absolute inset-0 bg-cyber-secondary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 grayscale group-hover:grayscale-0"
                />

                {/* Staggered Button Reveal Overlay */}
                <div className="absolute top-3 right-3 z-20 flex gap-2">
                   {project.demoUrl && (
                     <a 
                       href={project.demoUrl} 
                       target="_blank"
                       rel="noreferrer"
                       className="bg-cyber-primary text-black p-2 rounded-full shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:scale-110 transition-all duration-300 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
                       title="View Live Demo"
                     >
                       <ExternalLink size={16} />
                     </a>
                   )}
                   {project.repoUrl && (
                     <a 
                       href={project.repoUrl} 
                       target="_blank"
                       rel="noreferrer"
                       className="bg-white text-black p-2 rounded-full shadow-lg hover:scale-110 transition-all duration-300 delay-100 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
                       title="View Code"
                     >
                       <Github size={16} />
                     </a>
                   )}
                </div>
              </div>
              
              <div className="p-6 relative flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-mono text-cyber-primary px-2 py-1 border border-cyber-primary/30 rounded backdrop-blur-sm bg-black/30">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyber-primary transition-colors duration-300">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-800/50">
                  {project.techStack.map(tech => (
                    <span 
                      key={tech} 
                      className="flex items-center gap-1.5 text-xs text-gray-400 font-mono bg-black/40 px-2.5 py-1.5 rounded border border-gray-800 hover:border-gray-600 hover:bg-black/60 transition-colors cursor-default"
                    >
                      {getTechIcon(tech)}
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;