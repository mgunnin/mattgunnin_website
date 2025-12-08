import React, { useState, useEffect } from 'react';
import { ExternalLink, Code, Cpu, Globe, Database, Box, Terminal, Zap, Server, LayoutTemplate, Brain, MessageSquare, Image as ImageIcon, Bot, ArrowLeft, Calendar, Trophy, Target, MonitorPlay, ChevronRight, Share2 } from 'lucide-react';
import { Project } from '../types';

const majorProjects: Project[] = [
  {
    id: 'vertical-labs',
    title: 'Vertical Labs',
    role: 'Founder/CEO',
    period: '2024 - Present',
    description: 'A first-of-its-kind AI agency and innovation partner specializing in agentic AI. We are moving beyond simple chatbots to architect sophisticated multi-agent systems that empower businesses to thrive in an AI-driven world.',
    caseStudy: `
      <h3 class="text-2xl font-bold text-white mb-4 border-l-4 border-cyber-primary pl-4">The Agentic Moment</h3>
      <p class="text-gray-300 leading-relaxed mb-6">
        The "Chatbot Era" is ending. Businesses no longer just want AI that talks; they want AI that <strong>works</strong>. We founded Vertical Labs to capitalize on the emergence of Agentic AI—systems capable of reasoning, planning, and executing tasks autonomously, rather than just generating text.
      </p>

      <h3 class="text-2xl font-bold text-white mb-4 border-l-4 border-cyber-primary pl-4">The Architecture</h3>
      <p class="text-gray-300 leading-relaxed mb-6">
        We architect sophisticated multi-agent systems using cutting-edge frameworks like <strong>CrewAI</strong>, <strong>Eliza</strong>, and <strong>OpenAI Swarm</strong>. Unlike monolithic LLM applications, our agents operate in collaborative swarms:
      </p>
      <ul class="list-disc pl-6 mb-6 space-y-2 text-gray-400">
        <li><strong>Researcher Agents:</strong> Scour internal vector databases (RAG) for context.</li>
        <li><strong>Analyst Agents:</strong> Process data patterns and insights.</li>
        <li><strong>Executor Agents:</strong> Trigger API calls to perform actions (e.g., booking, coding, deployment).</li>
      </ul>

      <h3 class="text-2xl font-bold text-white mb-4 border-l-4 border-cyber-primary pl-4">Service-as-Software</h3>
      <p class="text-gray-300 leading-relaxed mb-6">
        We are pioneering a new delivery model. Instead of selling tools for humans to use (SaaS), we build <strong>autonomous digital employees</strong> that integrate directly into enterprise workflows. This shift from SaaS to "Service-as-Software" dramatically increases ROI by reducing human operational overhead.
      </p>
    `,
    achievements: [
      'Architecting custom AI agents for business use cases — from operations automation to market intelligence.',
      'Designing intelligent dashboards and UIs for real-time agent oversight.',
      'Driving innovation with R&D projects in human-digital interaction and UGC AI avatars.',
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
    description: 'Founded and led a pioneering technology startup focusing on advanced analytics and real-time data solutions for the esports industry. Revolutionized data capture using Computer Vision.',
    caseStudy: `
      <h3 class="text-2xl font-bold text-white mb-4 border-l-4 border-cyber-primary pl-4">The Problem</h3>
      <p class="text-gray-300 leading-relaxed mb-6">
        In 2016, esports data was trapped in video pixels. Unlike traditional sports which had robust APIs for every play, esports data existed only on the screen. Teams, broadcasters, and fantasy platforms lacked a real-time "source of truth."
      </p>

      <h3 class="text-2xl font-bold text-white mb-4 border-l-4 border-cyber-primary pl-4">AI Innovation</h3>
      <p class="text-gray-300 leading-relaxed mb-6">
        We built proprietary <strong>Computer Vision and Reinforcement Learning</strong> pipelines capable of ingesting live game feeds and extracting complex state data with <strong>99.8% accuracy</strong>. This technology powered real-time dashboards for partners like Riot Games, the NBA, and the NFL.
      </p>

      <h3 class="text-2xl font-bold text-white mb-4 border-l-4 border-cyber-primary pl-4">The Web3 Pivot & Community</h3>
      <p class="text-gray-300 leading-relaxed mb-6">
        Recognizing the shift towards digital ownership, we expanded into Web3, launching NFT membership passes that granted access to advanced fantasy tools. This initiative resulted in:
      </p>
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div class="bg-black/40 p-3 rounded border border-gray-800">
          <div class="text-cyber-primary font-bold text-xl">92,000+</div>
          <div class="text-xs text-gray-500 uppercase">NFTs Minted</div>
        </div>
        <div class="bg-black/40 p-3 rounded border border-gray-800">
          <div class="text-cyber-primary font-bold text-xl">10,000+</div>
          <div class="text-xs text-gray-500 uppercase">Discord Members</div>
        </div>
      </div>
      <p class="text-gray-300 leading-relaxed">
        We successfully raised <strong>$10M+</strong> from Tier 1 VCs (Eniac, XSeed, Quake) and scaled our platforms to reach over <strong>10 million users</strong> across the portfolio.
      </p>
    `,
    achievements: [
      'Raised over $10 million from top Venture Capital firms (Eniac Ventures, Quake Capital, XSeed Capital).',
      'Spearheaded the implementation of Computer Vision and Reinforcement Learning with 99.8% accuracy.',
      'Delivered analytics to Riot Games, Acer, Blizzard, EA, NFL, and NBA.',
      'Scaled portfolio of platforms to serve over 10 million monthly active users.'
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
    description: 'Founded the global go-to resource for competitive League of Legends. Architected from the ground up to serve millions of passionate users.',
    caseStudy: `
      <h3 class="text-2xl font-bold text-white mb-4 border-l-4 border-cyber-primary pl-4">The Problem</h3>
      <p class="text-gray-300 leading-relaxed mb-6">
        In 2011, the esports landscape was fragmented. Information about tournaments, player rosters, and match statistics was scattered across reddit threads and outdated fan sites. There was no single record of history for the booming League of Legends ecosystem.
      </p>

      <h3 class="text-2xl font-bold text-white mb-4 border-l-4 border-cyber-primary pl-4">The Solution</h3>
      <p class="text-gray-300 leading-relaxed mb-6">
        Leaguepedia was architected as the first comprehensive, community-driven encyclopedia for competitive League of Legends. We democratized data access, allowing anyone to contribute while maintaining strict editorial standards.
      </p>

      <h3 class="text-2xl font-bold text-white mb-4 border-l-4 border-cyber-primary pl-4">Scale & Exit</h3>
      <p class="text-gray-300 leading-relaxed mb-6">
        Leveraging a customized MediaWiki framework and aggressive growth hacking strategies, we grew to <strong>12 million monthly pageviews</strong> and <strong>3 million MAUs</strong> within the first year. 
      </p>
      <p class="text-gray-300 leading-relaxed">
        The platform became indispensable to the ecosystem, leading to its acquisition by <strong>Curse Inc.</strong> (later acquired by Amazon/Twitch). This exit validated the thesis that community-curated data is a valuable asset class in esports.
      </p>
    `,
    achievements: [
      'Doubled site traffic to 12 million monthly pageviews and 3 million MAUs within the first year.',
      'Acquired by Curse Inc. (later acquired by Twitch/Amazon) in 2014.',
      'Organized multiple charity tournaments raising tens of thousands of dollars.',
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
    imageUrl: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=1200&auto=format&fit=crop', 
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
    imageUrl: 'https://images.unsplash.com/photo-1644361566696-3d442b5b482a?q=80&w=1200&auto=format&fit=crop',
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

const allProjects = [...majorProjects, ...minorProjects];

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

  // SEO: Dynamic Document Title
  useEffect(() => {
    if (selectedProject) {
      document.title = `${selectedProject.title} | Matt Gunnin`;
    } else {
      document.title = "Matt Gunnin | Agentic AI Architect & Founder";
    }
    return () => {
      document.title = "Matt Gunnin | Agentic AI Architect & Founder";
    };
  }, [selectedProject]);

  // Handle URL state
  useEffect(() => {
    // Check URL on mount
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('project');
    if (projectId) {
      const project = allProjects.find(p => p.id === projectId);
      if (project) setSelectedProject(project);
    }

    // Handle back button
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const id = params.get('project');
      if (id) {
        const project = allProjects.find(p => p.id === id);
        if (project) setSelectedProject(project);
      } else {
        setSelectedProject(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
    // Push state to URL without reloading
    const newUrl = `${window.location.pathname}?project=${project.id}`;
    window.history.pushState({ projectId: project.id }, '', newUrl);
    window.scrollTo(0, 0); // Reset scroll for the new "page"
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
    // Reset URL
    window.history.pushState({}, '', window.location.pathname);
  };

  const navigateProject = (direction: 'next' | 'prev') => {
    if (!selectedProject) return;
    const currentIndex = allProjects.findIndex(p => p.id === selectedProject.id);
    let nextIndex;
    if (direction === 'next') {
        nextIndex = (currentIndex + 1) % allProjects.length;
    } else {
        nextIndex = (currentIndex - 1 + allProjects.length) % allProjects.length;
    }
    handleOpenProject(allProjects[nextIndex]);
  };

  const handleShare = () => {
    if (navigator.share) {
        navigator.share({
            title: selectedProject?.title,
            text: `Check out ${selectedProject?.title} by Matt Gunnin`,
            url: window.location.href
        }).catch(console.error);
    } else {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
    }
  };

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
          // Detailed Project View (Virtual Page)
          <div className="fixed inset-0 z-50 bg-cyber-black overflow-y-auto animate-[fadeIn_0.3s_ease-out] custom-scrollbar">
             
             {/* Sticky Nav Overlay */}
             <div className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 pointer-events-none">
                <button 
                  onClick={handleCloseProject}
                  className="pointer-events-auto flex items-center gap-2 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full border border-gray-700 hover:border-cyber-primary hover:text-cyber-primary transition-all duration-300 group"
                >
                   <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                   <span className="font-mono text-sm hidden md:inline">RETURN TO BASE</span>
                </button>

                <div className="pointer-events-auto flex gap-2">
                    <button onClick={handleShare} className="bg-black/50 backdrop-blur-md p-2 rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-white transition-colors">
                        <Share2 size={18} />
                    </button>
                    <div className="flex bg-black/50 backdrop-blur-md rounded-full border border-gray-700 p-1">
                        <button onClick={() => navigateProject('prev')} className="p-1.5 hover:bg-gray-800 rounded-full text-gray-400 hover:text-white transition-colors">
                            <ArrowLeft size={16} />
                        </button>
                        <button onClick={() => navigateProject('next')} className="p-1.5 hover:bg-gray-800 rounded-full text-gray-400 hover:text-white transition-colors">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
             </div>

             {/* Hero Section */}
             <div className="relative h-[60vh] w-full overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-cyber-black/50 to-transparent z-10" />
                <div className="absolute inset-0 bg-cyber-primary/10 mix-blend-overlay z-10" />
                <img 
                  src={selectedProject.imageUrl} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />

                {/* Title Overlay */}
                <div className="absolute bottom-12 left-6 md:left-24 z-20 max-w-4xl">
                   <div className="flex items-center gap-3 mb-4 animate-[slideIn_0.5s_ease-out]">
                      <span className="bg-cyber-primary text-black text-xs font-bold px-3 py-1 rounded uppercase font-mono tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                        {selectedProject.category}
                      </span>
                      {selectedProject.demoUrl && (
                        <a href={selectedProject.demoUrl} target="_blank" rel="noreferrer" className="bg-black/60 backdrop-blur border border-gray-600 px-3 py-1 rounded text-gray-300 hover:text-white hover:border-white flex items-center gap-2 text-xs transition-colors">
                          <ExternalLink size={12} /> Live Deployment
                        </a>
                      )}
                   </div>
                   <h1 className="text-4xl md:text-8xl font-bold text-white mb-4 tracking-tight animate-[slideIn_0.6s_ease-out] text-shadow-lg">
                    {selectedProject.title}
                   </h1>
                   <div className="flex items-center gap-6 text-gray-400 font-mono text-sm animate-[slideIn_0.7s_ease-out]">
                      <span className="flex items-center gap-2"><BriefcaseIcon size={14} className="text-cyber-secondary" /> {selectedProject.role}</span>
                      <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                      <span className="flex items-center gap-2"><Calendar size={14} className="text-cyber-secondary" /> {selectedProject.period}</span>
                   </div>
                </div>
             </div>

             <div className="max-w-7xl mx-auto px-6 md:px-24 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
                {/* Left Column: Details */}
                <div className="lg:col-span-2 space-y-12 animate-[fadeIn_0.8s_ease-out]">
                   <div className="prose prose-invert prose-lg md:prose-xl max-w-none prose-headings:text-white prose-p:text-gray-300 prose-strong:text-cyber-primary prose-li:text-gray-300">
                      {selectedProject.caseStudy ? (
                        <div dangerouslySetInnerHTML={{ __html: selectedProject.caseStudy }} />
                      ) : (
                        <>
                            <h3 className="text-2xl font-bold text-white mb-6 border-l-4 border-cyber-primary pl-4">Mission Overview</h3>
                            <p className="text-gray-300 leading-relaxed text-lg font-light">
                                {selectedProject.description}
                            </p>
                        </>
                      )}
                   </div>

                   <div>
                      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Trophy className="text-cyber-secondary" size={24} /> Key Achievements
                      </h3>
                      <div className="grid gap-4">
                        {selectedProject.achievements?.map((achievement, idx) => (
                           <div key={idx} className="flex items-start gap-4 bg-gray-900/40 p-6 rounded-xl border border-gray-800 hover:border-cyber-primary/30 transition-colors group">
                              <div className="mt-1 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center shrink-0 group-hover:bg-cyber-primary group-hover:text-black transition-colors">
                                <Target size={16} />
                              </div>
                              <span className="text-gray-300 text-lg">{achievement}</span>
                           </div>
                        ))}
                      </div>
                   </div>
                </div>

                {/* Right Column: Tech Stack & Meta */}
                <div className="space-y-10 animate-[fadeIn_0.9s_ease-out]">
                   <div className="bg-gray-900/20 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm sticky top-24">
                      <h4 className="text-xs font-mono text-cyber-primary uppercase mb-6 tracking-widest border-b border-gray-800 pb-2">Technologies Deployed</h4>
                      
                      <div className="flex flex-wrap gap-2">
                         {selectedProject.techStack.map(tech => (
                           <div key={tech} className="flex items-center gap-2 bg-black border border-gray-800 px-3 py-2 rounded text-sm text-gray-300 hover:border-cyber-primary hover:text-white hover:shadow-[0_0_10px_rgba(0,240,255,0.2)] transition-all cursor-default">
                              {getTechIcon(tech)}
                              {tech}
                           </div>
                         ))}
                      </div>

                      <div className="mt-8 pt-8 border-t border-gray-800">
                         <div className="text-xs font-mono text-gray-500 uppercase mb-3">Project Status</div>
                         <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-white font-bold">{selectedProject.period.includes('Present') ? 'ACTIVE DEVELOPMENT' : 'COMPLETED / ACQUIRED'}</span>
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             {/* Footer Navigation */}
             <div className="border-t border-gray-900 bg-black py-12 px-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <button onClick={() => navigateProject('prev')} className="text-gray-500 hover:text-white transition-colors flex flex-col items-start gap-1">
                        <span className="text-xs font-mono uppercase tracking-widest">Previous Project</span>
                        <span className="text-lg font-bold flex items-center gap-2"><ArrowLeft size={16}/> Previous</span>
                    </button>
                    <button onClick={() => navigateProject('next')} className="text-gray-500 hover:text-white transition-colors flex flex-col items-end gap-1">
                        <span className="text-xs font-mono uppercase tracking-widest">Next Project</span>
                        <span className="text-lg font-bold flex items-center gap-2">Next <ChevronRight size={16}/></span>
                    </button>
                </div>
             </div>
          </div>
        ) : (
          <div className="space-y-24">
            
            {/* Major Ventures Section */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                 <span className="w-8 h-1 bg-cyber-primary inline-block shadow-[0_0_10px_#00f0ff]"></span>
                 MAJOR VENTURES
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {majorProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} onClick={() => handleOpenProject(project)} />
                ))}
              </div>
            </div>

            {/* Minor Projects Section */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                 <span className="w-8 h-1 bg-cyber-secondary inline-block shadow-[0_0_10px_#7000ff]"></span>
                 SELECTED WORKS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {minorProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} onClick={() => handleOpenProject(project)} isCompact />
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
const BriefcaseIcon: React.FC<{size?: number; className?: string}> = ({size=14, className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
);

export default Projects;