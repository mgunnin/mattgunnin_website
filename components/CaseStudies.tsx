
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Share2, Check, Download, Calendar, Users, Cpu, Activity, Clock, Target, Layers, Globe, Zap, Database } from 'lucide-react';
import { CaseStudy } from '../types';
import ReturnButton from './ReturnButton';

const caseStudiesData: CaseStudy[] = [
  {
    id: 'cs1',
    slug: 'esports-analytics',
    title: 'Esports One Analytics',
    subtitle: 'Real-Time Computer Vision Pipeline',
    industry: 'Esports / Data',
    year: '2020',
    challenge: 'Esports data was trapped in video pixels. Teams and broadcasters lacked a real-time "source of truth" API for live matches, making advanced analytics impossible.',
    solution: 'We engineered a proprietary Computer Vision and Reinforcement Learning pipeline capable of ingesting 60fps live streams, identifying game state (champion positions, health, cooldowns) with 99.9% accuracy, and delivering it via websocket to frontend dashboards.',
    technologies: ['OpenCV', 'PyTorch', 'AWS Kinesis', 'React', 'Reinforcement Learning'],
    metrics: [
      { label: 'Latency', value: '<100ms', icon: Clock },
      { label: 'Accuracy', value: '99.9%', icon: Target },
      { label: 'Monthly Users', value: '10M+', icon: Users },
      { label: 'Data Points', value: '5B+', icon: Database }
    ],
    architecture: {
      nodes: [
        { id: 'Twitch', label: 'Live Stream', type: 'client', x: 10, y: 50 },
        { id: 'Ingest', label: 'Frame Ingest', type: 'service', x: 30, y: 50 },
        { id: 'CV', label: 'CV Model', type: 'ai', x: 50, y: 30 },
        { id: 'RL', label: 'Prediction', type: 'ai', x: 50, y: 70 },
        { id: 'API', label: 'GraphQL API', type: 'service', x: 70, y: 50 },
        { id: 'Client', label: 'Dashboard', type: 'client', x: 90, y: 50 }
      ],
      connections: [
        { from: 'Twitch', to: 'Ingest' },
        { from: 'Ingest', to: 'CV' },
        { from: 'Ingest', to: 'RL' },
        { from: 'CV', to: 'API' },
        { from: 'RL', to: 'API' },
        { from: 'API', to: 'Client' }
      ]
    },
    timeline: [
      { phase: 'Phase 1', date: 'Q1 2019', description: 'Prototype CV model achieving 85% accuracy on VODs.' },
      { phase: 'Phase 2', date: 'Q3 2019', description: 'Real-time pipeline infrastructure on AWS Kinesis.' },
      { phase: 'Phase 3', date: 'Q2 2020', description: 'Launch with Riot Games & Corporate Partners.' }
    ],
    teamSize: 12,
    lessonsLearned: [
      'Latency is the enemy of engagement in live sports.',
      'Hybrid cloud architectures (GPU instances) are critical for CV at scale.',
      'Data cleaning must happen at the edge, not in the warehouse.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'cs2',
    slug: 'nft-community',
    title: 'Web3 Community Platform',
    subtitle: 'Token-Gated Engagement at Scale',
    industry: 'Crypto / Community',
    year: '2022',
    challenge: 'Building a sustainable Web3 community beyond speculation. We needed a way to verify ownership and grant utility-based access to analytics tools without compromising UX.',
    solution: 'Developed a seamless "Connect Wallet" flow integrating Ethereum ERC-721 tokens with Discord roles and a React web app. The system handled massive spikes during mint events without downtime.',
    technologies: ['Solidity', 'Web3.js', 'Discord.js', 'Node.js', 'Postgres'],
    metrics: [
      { label: 'NFTs Minted', value: '92,000+', icon: Layers },
      { label: 'Discord Members', value: '10,000+', icon: Users },
      { label: 'Uptime', value: '100%', icon: Activity },
      { label: 'Gas Saved', value: '$500k+', icon: Zap }
    ],
    architecture: {
      nodes: [
        { id: 'User', label: 'User Wallet', type: 'client', x: 10, y: 50 },
        { id: 'SmartContract', label: 'ERC-721', type: 'db', x: 30, y: 30 },
        { id: 'Oracle', label: 'Auth Oracle', type: 'service', x: 50, y: 50 },
        { id: 'Discord', label: 'Discord Bot', type: 'service', x: 70, y: 70 },
        { id: 'WebApp', label: 'Analytics App', type: 'client', x: 70, y: 30 }
      ],
      connections: [
        { from: 'User', to: 'SmartContract' },
        { from: 'User', to: 'Oracle' },
        { from: 'Oracle', to: 'SmartContract', label: 'Verify' },
        { from: 'Oracle', to: 'Discord', label: 'Grant Role' },
        { from: 'Oracle', to: 'WebApp', label: 'Grant Access' }
      ]
    },
    timeline: [
      { phase: 'Design', date: 'Jan 2022', description: 'Tokenomics and utility mapping.' },
      { phase: 'Dev', date: 'Mar 2022', description: 'Smart Contract audit and frontend integration.' },
      { phase: 'Mint', date: 'May 2022', description: 'Public launch and community onboarding.' }
    ],
    teamSize: 6,
    lessonsLearned: [
      'UX is the biggest barrier to Web3 adoption.',
      'Community management is 24/7 support during mints.',
      'Gas optimization is crucial for free-to-mint models.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'cs3',
    slug: 'multi-agent-automation',
    title: 'Enterprise Multi-Agent System',
    subtitle: 'Autonomous Workflow Automation',
    industry: 'Enterprise / AI',
    year: '2024',
    challenge: 'A Fortune 500 client needed to automate their competitive intelligence reporting. The manual process took 40 hours/week of analyst time gathering and summarizing news.',
    solution: 'Architected a Multi-Agent System using CrewAI. Agents were assigned roles (Researcher, Analyst, Writer) and coordinated to scrape data, filter noise, summarize findings, and draft an executive report.',
    technologies: ['CrewAI', 'GPT-4', 'Vector DB', 'Python', 'Selenium'],
    metrics: [
      { label: 'Time Saved', value: '38h/wk', icon: Clock },
      { label: 'Efficiency', value: '+2000%', icon: Zap },
      { label: 'Cost Redux', value: '90%', icon: Activity },
      { label: 'Coverage', value: '24/7', icon: Globe }
    ],
    architecture: {
      nodes: [
        { id: 'Trigger', label: 'Scheduler', type: 'service', x: 10, y: 50 },
        { id: 'Manager', label: 'Manager Agent', type: 'ai', x: 30, y: 50 },
        { id: 'Research', label: 'Researcher', type: 'ai', x: 50, y: 20 },
        { id: 'Write', label: 'Writer', type: 'ai', x: 50, y: 80 },
        { id: 'RAG', label: 'Vector DB', type: 'db', x: 50, y: 50 },
        { id: 'Email', label: 'Email API', type: 'service', x: 80, y: 50 }
      ],
      connections: [
        { from: 'Trigger', to: 'Manager' },
        { from: 'Manager', to: 'Research' },
        { from: 'Manager', to: 'Write' },
        { from: 'Research', to: 'RAG' },
        { from: 'Write', to: 'RAG' },
        { from: 'Write', to: 'Email' }
      ]
    },
    timeline: [
      { phase: 'Analysis', date: 'Feb 2024', description: 'Workflow mapping and role definition.' },
      { phase: 'Proto', date: 'Mar 2024', description: 'Single-agent prototype testing.' },
      { phase: 'Deploy', date: 'Apr 2024', description: 'Full swarm deployment on cloud infrastructure.' }
    ],
    teamSize: 3,
    lessonsLearned: [
      'Multi-agent systems require strict role definitions.',
      'RAG is essential for grounding agents in company context.',
      'Human-in-the-loop validation is needed for the first month.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1676299081847-824916de030a?q=80&w=1200&auto=format&fit=crop'
  }
];

// Simple SVG Viz for Architecture
const ArchitectureViz: React.FC<{ architecture: CaseStudy['architecture'] }> = ({ architecture }) => {
   return (
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="p-8">
         <defs>
            <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
               <path d="M0,0 L0,6 L6,3 z" fill="#4b5563" />
            </marker>
         </defs>

         {/* Connections */}
         {architecture.connections.map((conn, i) => {
            const start = architecture.nodes.find(n => n.id === conn.from);
            const end = architecture.nodes.find(n => n.id === conn.to);
            if (!start || !end) return null;

            return (
               <g key={i}>
                 <line 
                   x1={`${start.x}%`} y1={`${start.y}%`} 
                   x2={`${end.x}%`} y2={`${end.y}%`} 
                   stroke="#374151" strokeWidth="0.5" markerEnd="url(#arrow)" 
                 />
                 {conn.label && (
                   <text 
                     x={`${(start.x + end.x) / 2}%`} y={`${(start.y + end.y) / 2 - 2}%`} 
                     fontSize="3" fill="#6b7280" textAnchor="middle"
                     className="bg-black"
                   >
                     {conn.label}
                   </text>
                 )}
               </g>
            );
         })}

         {/* Nodes */}
         {architecture.nodes.map(node => (
            <g key={node.id}>
               <circle cx={`${node.x}%`} cy={`${node.y}%`} r="6" fill="#111827" stroke={node.type === 'ai' ? '#00f0ff' : node.type === 'db' ? '#fbbf24' : '#9ca3af'} strokeWidth="0.5" />
               <text x={`${node.x}%`} y={`${node.y}%`} dy="1" fontSize="3" fill="white" textAnchor="middle" fontWeight="bold">
                  {node.type === 'client' ? 'USR' : node.type === 'ai' ? 'AI' : node.type === 'db' ? 'DB' : 'SVC'}
               </text>
               <text x={`${node.x}%`} y={`${node.y + 10}%`} fontSize="3" fill="#9ca3af" textAnchor="middle">
                  {node.label}
               </text>
            </g>
         ))}
      </svg>
   );
};

const CaseStudyDetail: React.FC<{ caseStudy: CaseStudy; onClose: () => void }> = ({ caseStudy, onClose }) => {
  const navigateToBook = () => {
    window.location.hash = '/book';
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
       <div className="mb-8">
           <ReturnButton onClick={onClose} label="RETURN TO CASE STUDIES" />
       </div>

       {/* Hero */}
       <div className="relative h-[400px] rounded-2xl overflow-hidden mb-12 border border-gray-800">
          <img src={caseStudy.imageUrl} alt={caseStudy.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
             <div className="flex gap-4 mb-4">
                <span className="bg-cyber-primary text-black px-3 py-1 rounded text-xs font-bold uppercase">{caseStudy.industry}</span>
                <span className="bg-black/50 text-white border border-gray-600 px-3 py-1 rounded text-xs font-bold uppercase">{caseStudy.year}</span>
             </div>
             <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">{caseStudy.title}</h1>
             <p className="text-xl text-gray-300 font-light">{caseStudy.subtitle}</p>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12">
             
             {/* Challenge & Solution */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                   <h3 className="text-xl font-bold text-white mb-4 border-l-4 border-red-500 pl-4">The Challenge</h3>
                   <p className="text-gray-400 leading-relaxed">{caseStudy.challenge}</p>
                </div>
                <div>
                   <h3 className="text-xl font-bold text-white mb-4 border-l-4 border-green-500 pl-4">The Solution</h3>
                   <p className="text-gray-400 leading-relaxed">{caseStudy.solution}</p>
                </div>
             </div>

             {/* Architecture Diagram */}
             <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                   <Cpu className="text-cyber-secondary" /> System Architecture
                </h3>
                <div className="relative h-[300px] w-full bg-black/50 rounded-lg border border-gray-800 overflow-hidden">
                   <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                   <ArchitectureViz architecture={caseStudy.architecture} />
                </div>
             </div>

             {/* Timeline */}
             <div>
                <h3 className="text-xl font-bold text-white mb-6">Implementation Timeline</h3>
                <div className="space-y-6 border-l border-gray-800 ml-4 pl-8 relative">
                   {caseStudy.timeline.map((item, i) => (
                      <div key={i} className="relative">
                         <div className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-gray-900 border-2 border-cyber-primary flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-cyber-primary rounded-full"></div>
                         </div>
                         <div className="text-xs font-mono text-cyber-primary mb-1">{item.date}</div>
                         <h4 className="text-white font-bold mb-1">{item.phase}</h4>
                         <p className="text-gray-400 text-sm">{item.description}</p>
                      </div>
                   ))}
                </div>
             </div>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
             {/* Metrics Card */}
             <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                <h3 className="text-xs font-mono text-gray-500 uppercase mb-4">Key Metrics</h3>
                <div className="grid grid-cols-2 gap-4">
                   {caseStudy.metrics.map((m, i) => (
                      <div key={i} className="bg-black/40 p-3 rounded border border-gray-800">
                         <m.icon size={16} className="text-cyber-primary mb-2" />
                         <div className="text-xl font-bold text-white">{m.value}</div>
                         <div className="text-[10px] text-gray-500 uppercase">{m.label}</div>
                      </div>
                   ))}
                </div>
             </div>

             {/* Tech Stack */}
             <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                <h3 className="text-xs font-mono text-gray-500 uppercase mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                   {caseStudy.technologies.map(t => (
                      <span key={t} className="px-2 py-1 bg-black border border-gray-700 rounded text-xs text-gray-300">
                         {t}
                      </span>
                   ))}
                </div>
             </div>

             {/* Lessons Learned */}
             <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                <h3 className="text-xs font-mono text-gray-500 uppercase mb-4">Lessons Learned</h3>
                <ul className="space-y-3">
                   {caseStudy.lessonsLearned.map((l, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                         <Check size={14} className="mt-1 text-green-500 shrink-0" />
                         {l}
                      </li>
                   ))}
                </ul>
             </div>

             <div className="bg-gradient-to-br from-cyber-primary to-cyber-secondary p-1 rounded-2xl">
                <div className="bg-black rounded-xl p-6 text-center">
                   <h3 className="text-white font-bold mb-2">Need similar results?</h3>
                   <p className="text-gray-400 text-xs mb-4">
                      I help enterprises architect and deploy autonomous AI systems.
                   </p>
                   <button onClick={navigateToBook} className="w-full bg-cyber-primary text-black font-bold py-2 rounded hover:bg-white transition-colors text-sm">
                      BOOK CONSULTATION
                   </button>
                </div>
             </div>
          </div>
       </div>
    </motion.div>
  );
};

interface CaseStudiesProps {
    standalone?: boolean;
}

const CaseStudies: React.FC<CaseStudiesProps> = ({ standalone = false }) => {
  const [filter, setFilter] = useState<'All' | 'AI' | 'Data' | 'Crypto' | 'Enterprise'>('All');
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  // Filter Logic
  const filteredCases = filter === 'All' 
    ? caseStudiesData 
    : caseStudiesData.filter(cs => cs.industry.includes(filter) || cs.title.includes(filter));

  // Routing Logic
  useEffect(() => {
    const handleRoute = () => {
        const hash = window.location.hash;
        
        let path = hash.startsWith('#') ? hash.substring(1) : hash;

        // If not standalone and path implies deep linking, ignore (prevents embedded rendering of detail)
        if (!standalone && path.startsWith('/case-studies/')) {
            setSelectedCase(null);
            return;
        }

        if (path.startsWith('/case-studies/')) {
            const slug = path.split('/case-studies/')[1];
            const cs = caseStudiesData.find(c => c.slug === slug);
            if (cs) setSelectedCase(cs);
        } else {
            // Handle query param fallback or root
            const params = new URLSearchParams(window.location.search);
            const slug = params.get('case-study');
            if (slug) {
                const cs = caseStudiesData.find(c => c.slug === slug);
                if (cs) setSelectedCase(cs);
            } else {
                setSelectedCase(null);
            }
        }
    };
    
    // Initial check
    handleRoute();
    
    window.addEventListener('hashchange', handleRoute);
    return () => window.removeEventListener('hashchange', handleRoute);
  }, [standalone]);

  const openCase = (cs: CaseStudy) => {
    window.location.hash = `/case-studies/${cs.slug}`;
  };

  const closeCase = () => {
    if (standalone) {
         window.location.hash = '/case-studies';
    } else {
         window.location.hash = '/';
    }
  };

  return (
    <section id="case-studies" className={`${standalone ? 'min-h-screen pt-24' : 'py-24 border-t border-gray-900'} px-6 md:px-24 w-full bg-cyber-black relative`}>
       <div className="max-w-7xl mx-auto relative z-10">
          
          <AnimatePresence mode="wait">
            {selectedCase ? (
              <CaseStudyDetail key="detail" caseStudy={selectedCase} onClose={closeCase} />
            ) : (
              <motion.div 
                key="list"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
              >
                 <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        {standalone && (
                            <div className="mb-4">
                                <ReturnButton onClick={() => window.location.hash = '/'} label="RETURN TO BASE" />
                            </div>
                        )}
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">CASE STUDIES</h2>
                        <p className="text-gray-400 max-w-xl text-lg">
                          Real results from real implementations. Deep dives into architecture, metrics, and outcomes.
                        </p>
                    </div>
                    
                    {/* Filters */}
                    <div className="flex flex-wrap gap-2">
                      {['All', 'AI', 'Data', 'Crypto', 'Enterprise'].map(f => (
                        <button 
                          key={f}
                          onClick={() => setFilter(f as any)}
                          className={`px-4 py-1.5 rounded-full text-sm font-mono transition-all ${
                            filter === f 
                              ? 'bg-cyber-primary text-black font-bold' 
                              : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCases.map((cs, idx) => (
                       <div 
                         key={cs.id}
                         onClick={() => openCase(cs)}
                         className="group bg-gray-900/30 border border-gray-800 rounded-xl overflow-hidden cursor-pointer hover:border-cyber-primary/50 transition-all hover:-translate-y-2 animate-[fadeIn_0.5s_ease-out_both]"
                         style={{ animationDelay: `${idx * 100}ms` }}
                       >
                          <div className="h-48 overflow-hidden relative">
                             <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                             <img src={cs.imageUrl} alt={cs.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                             <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs font-mono text-white border border-gray-700">
                                {cs.year}
                             </div>
                          </div>
                          
                          <div className="p-6">
                             <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs font-mono text-cyber-secondary uppercase">{cs.industry}</span>
                             </div>
                             <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyber-primary transition-colors">{cs.title}</h3>
                             <p className="text-gray-400 text-sm mb-6 line-clamp-3">{cs.challenge}</p>
                             
                             <div className="flex items-center text-cyber-primary text-xs font-bold uppercase tracking-widest gap-2">
                                Read Case Study <ArrowRight size={14} />
                             </div>
                          </div>
                       </div>
                    ))}
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
       </div>
    </section>
  );
};

export default CaseStudies;
