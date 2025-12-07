
import React, { useState } from 'react';
import { ExternalLink, Github, Code, Cpu, Globe, Database, Box, Terminal, Zap, Server, LayoutTemplate, Brain, MessageSquare, Image as ImageIcon, Bot, ArrowLeft, Calendar, Trophy, Target, MonitorPlay } from 'lucide-react';
import { Project } from '../types';

const majorProjects: Project[] = [
  {
    id: 'vertical-labs',
    title: 'Vertical Labs',
    role: 'Founder/CEO',
    period: '2024 - Present',
    description: 'A first-of-its-kind AI agency and innovation partner specializing in agentic AI. We are moving beyond simple chatbots to architect sophisticated multi-agent systems that empower businesses to thrive in an AI-driven world. We view AI not just as tools, but as autonomous teammates.',
    achievements: [
      'Architecting custom AI agents for business use cases — from operations automation to market intelligence.',
      'Designing intelligent dashboards and UIs for real-time agent oversight, powered by smart search, insights, and action flows.',
      'Driving innovation with R&D projects in human-digital interaction, UGC AI avatars, and verticalized assistant experiences.',
      'Deploying solutions using cutting-edge frameworks including CrewAI, Eliza, and OpenAI Swarm.'
    ],
    techStack: ['Agentic AI', 'CrewAI', 'OpenAI Swarm', 'Python', 'RAG', 'Vector DB', 'Next.js'],
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop',
    category: 'AI',
    demoUrl: 'https://verticallabs.ai'
  },
  {
    id: 'esports-one',
    title: 'Esports One',
    role: 'Founder/CEO',
    period: '2016 - 2023',
    description: 'Founded and led a pioneering technology startup from ideation to successful rounds of funding, focusing on advanced analytics and real-time data solutions for the esports industry. We revolutionized how data was captured and consumed in competitive gaming.',
    achievements: [
      'Raised over $7 million from top Venture Capital firms and Angel Investors (Eniac Ventures, Quake Capital, XSeed Capital).',
      'Spearheaded the implementation of Computer Vision and Reinforcement Learning to capture real-time data with 99.8% accuracy.',
      'Delivered analytics to Riot Games, Acer, Blizzard, EA, TakeTwo, Epic Games, NFL, and NBA.',
      'Grew platform to over 150,000 monthly active users and $140,000+ in monthly recurring revenue.',
      'Launched successful NFT membership passes across Twitch and Discord (92,000+ minted).'
    ],
    techStack: ['Computer Vision', 'Reinforcement Learning', 'Blockchain', 'NFTs', 'Real-time Analytics', 'AWS'],
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
    category: 'Esports',
    demoUrl: '#'
  },
  {
    id: 'leaguepedia',
    title: 'Leaguepedia',
    role: 'Founder/CEO',
    period: '2011 - 2014',
    description: 'Founded the global go-to resource for competitive League of Legends, which became the standard for esports information. The platform was architected from the ground up to serve millions of passionate users.',
    achievements: [
      'Doubled site traffic to 12 million monthly pageviews and 3 million MAUs within the first year.',
      'Acquired by Curse Inc. (later acquired by Twitch/Amazon) in 2014.',
      'Organized multiple charity tournaments raising tens of thousands of dollars with 190k concurrent viewers.',
      'Expanded reach by acquiring multiple companies including LoLVODs and League Fantasy.'
    ],
    techStack: ['Wiki Framework', 'PHP', 'SQL', 'Community Growth', 'Scale'],
    imageUrl: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=1200&auto=format&fit=crop',
    category: 'Web',
    demoUrl: '#'
  },
  {
    id: 'esportspedia',
    title: 'Esportspedia',
    role: 'Founder/CEO',
    period: '2015 - 2023',
    description: 'Spearheaded the launch and growth of a comprehensive esports information hub that became the premier resource in the industry. Focused on data integrity, real-time updates, and community-driven content.',
    achievements: [
      'Attracted tens of millions of monthly users through strategic content initiatives.',
      'Built and led a high-performing team of 10 employees and 100 volunteer contributors.',
      'Successfully covered all major esports titles including Call of Duty, Halo, and Smite.',
      'Forged strong partnerships with industry stakeholders including Riot Games, Twitch, and Razer.'
    ],
    techStack: ['Data Aggregation', 'MediaWiki', 'Cloud Infrastructure', 'Partnerships'],
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop',
    category: 'Web',
    demoUrl: '#'
  },
  {
    id: 'unikrn',
    title: 'Unikrn',
    role: 'Chief Product Officer',
    period: '2015 - 2016',
    description: 'Led product innovation and engineering teams for a cutting-edge esports gambling platform. Focused on driving user acquisition and retention through real-time betting technologies.',
    achievements: [
      'Designed and executed strategy for expanding real-money wagering products across Europe and Australia.',
      'Managed global development team and transitioned to agile methodologies.',
      'Navigated complex regulatory landscapes to secure necessary licenses.',
      'Significantly improved site stability and performance for high-frequency trading/betting.'
    ],
    techStack: ['FinTech', 'Betting Systems', 'Agile', 'Compliance', 'Product Strategy'],
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop',
    category: 'Web',
    demoUrl: '#'
  },
  {
    id: 'azubu',
    title: 'Azubu',
    role: 'VP Content',
    period: '2015 - 2016',
    description: 'Directed site-wide content initiatives for a leading esports streaming company, overseeing product strategy, content curation and production, and project management.',
    achievements: [
      'Led successful multi-million dollar streaming partnership with the Korean Esports Association (KeSPA).',
      'Managed over 20 teams and 200 players, including world champion Faker.',
      'Collaborated closely with Talent, Sales, Product, and Creative Departments.'
    ],
    techStack: ['Streaming', 'Content Strategy', 'Partnerships', 'Video Production'],
    imageUrl: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=1200&auto=format&fit=crop',
    category: 'Esports',
    demoUrl: '#'
  }
];

const minorProjects: Project[] = [
  {
    id: 'cainam',
    title: 'Cainam World',
    role: 'Creator',
    period: '2023',
    description: 'Architected a decentralized AI simulation framework where autonomous agents exhibit emergent social behaviors. A playground for multi-agent reinforcement learning (MARL).',
    achievements: [
      'Utilized multi-agent reinforcement learning (MARL) to simulate complex economy.',
      'Agents formed alliances, traded resources, and evolved independently.'
    ],
    techStack: ['TypeScript', 'Multi-Agent', 'Gemini 3', 'AI Simulation'],
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop',
    category: 'Crypto',
    demoUrl: '#'
  },
  {
    id: 'lacra',
    title: 'Lacra Discord Bot',
    role: 'Creator',
    period: '2024',
    description: 'Engineered a high-throughput autonomous discord agent leveraging GPT-5.1 and Imagen 3 for multimodal interactions. Implemented a custom RAG pipeline for context-aware moderation.',
    achievements: [
        'Served over 50,000 users with sub-200ms latency.',
        'Integrated dynamic image generation and context-aware chat.'
    ],
    techStack: ['Node.js', 'Discord.js', 'GPT-5.1', 'Imagen 3'],
    imageUrl: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=1200&auto=format&fit=crop', // Discordish theme
    category: 'AI'
  },
  {
    id: 'one-console',
    title: 'OneConsole',
    role: 'Creator',
    period: '2017',
    description: 'Pioneered real-time computer vision pipelines to extract game state data from live video feeds with 99.8% accuracy. Deployed reinforcement learning models to predict match outcomes.',
    achievements: [
        'Used by Riot Games and 50+ professional teams.',
        'Real-time data extraction from video feed.'
    ],
    techStack: ['Computer Vision', 'Python', 'OpenCV', 'RL'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    category: 'Esports'
  },
  {
    id: 'one-view',
    title: 'OneView',
    role: 'Creator',
    period: '2018',
    description: 'Developed a low-latency interactive overlay extension for Twitch, integrating real-time game telemetry with viewer engagement layers. Processed millions of concurrent socket events.',
    achievements: [
        'Built in partnership with Twitch.',
        'Used by hundreds of streamers to enhance viewer engagement.'
    ],
    techStack: ['Twitch API', 'WebSockets', 'Frontend', 'Real-time'],
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
    category: 'Web'
  },
  {
    id: 'nft-community',
    title: 'NFT Community',
    role: 'Creator',
    period: '2021',
    description: 'Designed and executed a token-gated community architecture integrating ERC-721 assets with Discord roles. Built a custom verification oracle handling 10,000+ members.',
    achievements: [
        'Pioneered utility-first NFT integration.',
        'Seamless verification for thousands of users.'
    ],
    techStack: ['Solidity', 'Web3.js', 'Discord', 'Community'],
    imageUrl: 'https://images.unsplash.com/photo-1621504450168-b8c4d2992561?q=80&w=1200&auto=format&fit=crop',
    category: 'Crypto'
  },
  {
    id: 'esportscalendar',
    title: 'Esportscalendar',
    role: 'Creator',
    period: '2013',
    description: 'Engineered the industry\'s first centralized aggregation engine for global esports events. Built scalable scrapers and a unified schema to normalize data from disparate sources.',
    achievements: [
        'First of its kind aggregator in the industry.',
        'Served hundreds of thousands of users monthly.'
    ],
    techStack: ['PHP', 'Scraping', 'Data Aggregation', 'Web'],
    imageUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1200&auto=format&fit=crop',
    category: 'Web'
  }
];

const getTechIcon = (tech: string) => {
  const t = tech.toLowerCase();
  
  if (t.includes('gpt') || t.includes('gemini') || t.includes('claude') || t.includes('llama')) return <Brain size={14} className="text-pink-400" />;
  if (t.includes('imagen') || t.includes('diffusion')) return <ImageIcon size={14} className="text-purple-400" />;
  if (t.includes('discord')) return <MessageSquare size={14} className="text-indigo-400" />;
  if (t.includes('agent') || t.includes('bot') || t.includes('swarm') || t.includes('crewai')) return <Bot size={14} className="text-emerald-400" />;
  if (t.includes('ai') || t.includes('learning') || t.includes('rl')) return <Cpu size={14} className="text-cyber-primary" />;
  if (t.includes('vision')) return <Zap size={14} className="text-yellow-400" />;
  if (t.includes('web') || t.includes('http') || t.includes('api')) return <Globe size={14} className="text-blue-400" />;
  if (t.includes('node') || t.includes('server') || t.includes('aws') || t.includes('cloud')) return <Server size={14} className="text-green-500" />;
  if (t.includes('react') || t.includes('next') || t.includes('vue') || t.includes('frontend')) return <LayoutTemplate size={14} className="text-cyan-400" />;
  if (t.includes('data') || t.includes('sql') || t.includes('analytics') || t.includes('rag')) return <Database size={14} className="text-orange-300" />;
  if (t.includes('nft') || t.includes('web3') || t.includes('solidity') || t.includes('block')) return <Box size={14} className="text-orange-500" />;
  if (t.includes('script') || t.includes('python') || t.includes('terminal')) return <Terminal size={14} className="text-gray-400" />;
  if (t.includes('stream') || t.includes('twitch')) return <MonitorPlay size={14} className="text-violet-400" />;
  
  return <Code size={14} className="text-gray-500" />;
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 px-6 md:px-24 w-full min-h-screen flex flex-col justify-center relative bg-gradient-to-b from-transparent to-black/80">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Header (Only show if not selected) */}
        {!selectedProject && (
          <div className="flex items-end gap-4 mb-16 border-b border-gray-800 pb-6 animate-[fadeIn_0.5s_ease-out]">
            <h2 className="text-5xl md:text-7xl font-bold text-white opacity-90">CAREER</h2>
            <span className="text-cyber-primary font-mono text-xl mb-2">/ PORTFOLIO</span>
          </div>
        )}

        {selectedProject ? (
          // Detailed Project View
          <div className="bg-black/80 backdrop-blur-md border border-gray-800 rounded-2xl overflow-hidden animate-[fadeIn_0.3s_ease-out] relative min-h-[80vh]">
             
             {/* Hero Image */}
             <div className="relative h-64 md:h-96 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                <img 
                  src={selectedProject.imageUrl} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
                
                {/* Back Button */}
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-black/50 backdrop-blur text-white px-4 py-2 rounded-full border border-gray-700 hover:border-cyber-primary hover:text-cyber-primary transition-all duration-300 group"
                >
                   <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                   <span className="font-mono text-sm">BACK TO INDEX</span>
                </button>

                {/* Title Overlay */}
                <div className="absolute bottom-8 left-8 z-20">
                   <div className="flex items-center gap-3 mb-2">
                      <span className="bg-cyber-primary text-black text-xs font-bold px-2 py-0.5 rounded uppercase font-mono tracking-wider">
                        {selectedProject.category}
                      </span>
                      {selectedProject.demoUrl && (
                        <a href={selectedProject.demoUrl} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white flex items-center gap-1 text-xs">
                          <ExternalLink size={12} /> Live Site
                        </a>
                      )}
                   </div>
                   <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 text-shadow-lg">{selectedProject.title}</h1>
                </div>
             </div>

             <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Column: Details */}
                <div className="lg:col-span-2 space-y-8">
                   <div className="prose prose-invert prose-lg">
                      <h3 className="text-2xl font-bold text-white mb-4">Mission Overview</h3>
                      <p className="text-gray-300 leading-relaxed text-lg">
                        {selectedProject.description}
                      </p>
                   </div>

                   <div>
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Trophy className="text-cyber-secondary" size={20} /> Key Achievements
                      </h3>
                      <ul className="space-y-4">
                        {selectedProject.achievements?.map((achievement, idx) => (
                           <li key={idx} className="flex items-start gap-3 text-gray-400 bg-gray-900/30 p-4 rounded-lg border border-gray-800 hover:border-cyber-primary/30 transition-colors">
                              <Target className="text-cyber-primary shrink-0 mt-1" size={18} />
                              <span>{achievement}</span>
                           </li>
                        ))}
                      </ul>
                   </div>
                </div>

                {/* Right Column: Meta */}
                <div className="space-y-8">
                   <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
                      <h4 className="text-sm font-mono text-gray-500 uppercase mb-4 tracking-wider">Project Metadata</h4>
                      
                      <div className="space-y-4">
                         <div>
                            <div className="text-xs text-gray-500 mb-1 flex items-center gap-2"><BriefcaseIcon size={12} /> Role</div>
                            <div className="text-white font-bold">{selectedProject.role}</div>
                         </div>
                         <div>
                            <div className="text-xs text-gray-500 mb-1 flex items-center gap-2"><Calendar size={12} /> Timeline</div>
                            <div className="text-white font-bold font-mono text-sm">{selectedProject.period}</div>
                         </div>
                      </div>
                   </div>

                   <div>
                      <h4 className="text-sm font-mono text-gray-500 uppercase mb-4 tracking-wider">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                         {selectedProject.techStack.map(tech => (
                           <div key={tech} className="flex items-center gap-2 bg-black border border-gray-800 px-3 py-2 rounded text-sm text-gray-300 hover:border-cyber-primary hover:text-white transition-colors cursor-default">
                              {getTechIcon(tech)}
                              {tech}
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
          </div>
        ) : (
          <div className="space-y-24">
            
            {/* Major Ventures Section */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                 <span className="w-8 h-1 bg-cyber-primary inline-block"></span>
                 MAJOR VENTURES
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {majorProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
                ))}
              </div>
            </div>

            {/* Minor Projects Section */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                 <span className="w-8 h-1 bg-cyber-secondary inline-block"></span>
                 SELECTED WORKS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {minorProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} isCompact />
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: Project; onClick: () => void; isCompact?: boolean }> = ({ project, onClick, isCompact }) => (
  <div 
    onClick={onClick}
    className={`group relative bg-gray-900 border border-gray-800 hover:border-cyber-primary/50 transition-all duration-500 overflow-hidden rounded-lg flex flex-col cursor-pointer hover:-translate-y-2 ${isCompact ? 'opacity-90 hover:opacity-100' : ''}`}
  >
    {/* Image Container */}
    <div className={`${isCompact ? 'h-40' : 'h-56'} overflow-hidden relative shrink-0`}>
      <div className="absolute inset-0 bg-cyber-secondary/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
      <img 
        src={project.imageUrl} 
        alt={project.title} 
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 grayscale group-hover:grayscale-0"
      />
      <div className="absolute top-3 right-3 z-20 bg-black/60 backdrop-blur px-2 py-1 rounded text-[10px] font-mono text-cyber-primary border border-gray-700">
          {project.period}
      </div>
    </div>
    
    <div className={`p-6 relative flex flex-col flex-grow ${isCompact ? 'p-4' : 'p-6'}`}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-mono text-cyber-primary px-2 py-1 border border-cyber-primary/30 rounded backdrop-blur-sm bg-black/30">
          {project.category}
        </span>
      </div>

      <h3 className={`${isCompact ? 'text-xl' : 'text-2xl'} font-bold text-white mb-1 group-hover:text-cyber-primary transition-colors duration-300`}>{project.title}</h3>
      <div className="text-sm text-gray-500 font-mono mb-3">{project.role}</div>
      
      {!isCompact && (
        <p className="text-gray-400 text-sm mb-6 leading-relaxed flex-grow line-clamp-3">
          {project.description}
        </p>
      )}
      
      <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-800/50">
        {project.techStack.slice(0, isCompact ? 2 : 3).map(tech => (
          <span 
            key={tech} 
            className="flex items-center gap-1.5 text-xs text-gray-500 font-mono bg-black/40 px-2 py-1 rounded border border-gray-800"
          >
            {getTechIcon(tech)}
            {tech}
          </span>
        ))}
        {project.techStack.length > (isCompact ? 2 : 3) && (
          <span className="text-xs text-gray-600 font-mono py-1 px-1">+{project.techStack.length - (isCompact ? 2 : 3)}</span>
        )}
      </div>
    </div>
  </div>
);

// Helper component for Icon
const BriefcaseIcon: React.FC<{size?: number}> = ({size=14}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
);

export default Projects;
