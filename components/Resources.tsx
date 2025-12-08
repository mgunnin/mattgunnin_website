
import React, { useState, useEffect } from 'react';
import { ArrowRight, Book, PenTool, Newspaper, Search, Send, Zap, CloudRain, Clock, User, Share2, ArrowLeft, List, ChevronRight, X, Copy, Check, Calendar } from 'lucide-react';
import { Resource } from '../types';

const resourcesData: Resource[] = [
  {
    id: '1',
    title: 'Resource Hub (Raindrop)',
    description: 'A curated collection of my favorite resources, guides, AI tools, and frontend libraries that I have collected over the years.',
    type: 'Tool',
    slug: 'raindrop',
    date: 'Updated Daily',
    tags: ['AI', 'Dev', 'Tools'],
    content: 'EMBED_RAINDROP', // Special flag for the renderer
    readTime: 'N/A'
  },
  {
    id: '2',
    title: 'Architecting Multi-Agent Systems',
    description: 'Deep dive into orchestrating CrewAI and OpenAI Swarm for autonomous business workflows. Lessons from building Vertical Labs.',
    type: 'Guide',
    slug: 'multi-agent-systems',
    date: 'Oct 2024',
    readTime: '12 min read',
    author: {
      name: 'Matt Gunnin',
      role: 'CEO, Vertical Labs',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'
    },
    tags: ['AI', 'Agents', 'Architecture'],
    toc: [
      { id: 'intro', title: 'The Shift to Agency' },
      { id: 'swarm', title: 'Swarm Intelligence Patterns' },
      { id: 'tech-stack', title: 'The Stack: CrewAI vs Swarm' },
      { id: 'implementation', title: 'Implementation Strategy' }
    ],
    content: `
      <h3 id="intro">The Shift to Agency</h3>
      <p>We are witnessing a fundamental shift in how we interact with Artificial Intelligence. The era of "Chat" is giving way to the era of "Agency". Where chatbots react to user prompts, <strong>Agentic Systems</strong> proactively pursue goals.</p>
      <p>At Vertical Labs, we define an agent not just by its ability to generate text, but by its ability to execute actions in the real world—calling APIs, browsing the web, and manipulating files.</p>
      
      <h3 id="swarm">Swarm Intelligence Patterns</h3>
      <p>Single agents are powerful, but brittle. They hallucinate when overloaded with context. The solution is <strong>Multi-Agent Systems (MAS)</strong>.</p>
      <p>We model our systems after corporate hierarchies:</p>
      <ul>
        <li><strong>Manager Agents:</strong> Decompose complex goals into sub-tasks.</li>
        <li><strong>Specialist Agents:</strong> Execute specific narrow tasks (e.g., "Python Coder", "Legal Researcher").</li>
        <li><strong>QA Agents:</strong> Verify output before it reaches the user.</li>
      </ul>

      <h3 id="tech-stack">The Stack: CrewAI vs Swarm</h3>
      <p>We currently leverage two primary frameworks depending on the use case:</p>
      <div class="code-block">
        <span class="comment"># CrewAI Example: Structured Processes</span>
        <span class="keyword">from</span> crewai <span class="keyword">import</span> Agent, Task, Crew

        researcher = Agent(
          role=<span class="string">'Analyst'</span>,
          goal=<span class="string">'Analyze market trends'</span>,
          tools=[SearchTool()]
        )
      </div>
      <p><strong>CrewAI</strong> is excellent for sequential, deterministic workflows. <strong>OpenAI Swarm</strong> shines in lightweight, event-driven handoffs.</p>

      <h3 id="implementation">Implementation Strategy</h3>
      <p>Start small. Don't try to build a General Artificial Intelligence. Build a "Newsletter Agent" or a "Customer Support Triage Agent". Measure success by <strong>Autonomous Completion Rate (ACR)</strong>—how often does the human need to intervene?</p>
    `
  },
  {
    id: '3',
    title: 'Prompt Engineering for Developers',
    description: 'Techniques for consistent JSON outputs, RAG pipeline optimization, and advanced context management.',
    type: 'Guide',
    slug: 'prompt-engineering',
    date: 'Sep 2024',
    readTime: '8 min read',
    author: {
      name: 'Matt Gunnin',
      role: 'CEO, Vertical Labs',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'
    },
    tags: ['AI', 'Prompting', 'Dev'],
    toc: [
      { id: 'principles', title: 'Core Principles' },
      { id: 'json-mode', title: 'Forcing JSON Output' },
      { id: 'rag', title: 'Optimizing for RAG' }
    ],
    content: `
      <h3 id="principles">Core Principles</h3>
      <p>Prompt Engineering is not magic; it's just a new form of coding. The compiler is probabilistic rather than deterministic, but the principles of clarity and modularity remain.</p>
      
      <h3 id="json-mode">Forcing JSON Output</h3>
      <p>For developers, unstructured text is useless. We need structured data. To guarantee JSON compliance in Gemini 1.5 or GPT-4:</p>
      <ol>
        <li>Explicitly state the schema in the system prompt.</li>
        <li>Use TypeScript interface definitions as the schema description (LLMs are great at reading TS).</li>
        <li>Set the <code>response_format</code> parameter to <code>{ "type": "json_object" }</code> where supported.</li>
      </ol>

      <div class="code-block">
        <span class="comment">// Example Schema Prompt</span>
        <span class="keyword">const</span> schema = \`
        interface Response {
          sentiment: "positive" | "negative";
          confidence: number;
          keywords: string[];
        }
        \`;
      </div>

      <h3 id="rag">Optimizing for RAG</h3>
      <p>When injecting context from a vector database, order matters. LLMs suffer from "Lost in the Middle" phenomenon. Place your most critical instructions at the very beginning and the very end of the context window.</p>
    `
  },
  {
    id: '4',
    title: 'The Future of Esports & AI',
    description: 'Analyzing how computer vision and reinforcement learning reshaped the analytics landscape in competitive gaming.',
    type: 'Post',
    slug: 'esports-ai',
    date: 'Aug 2024',
    readTime: '10 min read',
    author: {
      name: 'Matt Gunnin',
      role: 'Founder, Esports One',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'
    },
    tags: ['Esports', 'AI', 'CV'],
    toc: [
      { id: 'vision', title: 'Computer Vision in Gaming' },
      { id: 'prediction', title: 'Predictive Models' },
      { id: 'coaching', title: 'AI Coaching' }
    ],
    content: `
      <h3 id="vision">Computer Vision in Gaming</h3>
      <p>Before API access was ubiquitous, we had to rely on pixels. At Esports One, we built custom CV pipelines using OpenCV and YOLO to track champion positions on the mini-map in real-time from Twitch streams.</p>
      <p>This allowed us to calculate metrics like "Jungle Proximity" and "Gank Efficiency" without direct game integration.</p>

      <h3 id="prediction">Predictive Models</h3>
      <p>We trained Reinforcement Learning models on millions of match outcomes. The key realization was that <strong>Draft Phase</strong> accounts for nearly 40% of the win probability. By analyzing team compositions before the game even started, we could predict outcomes with 65% accuracy.</p>
    `
  },
  {
    id: '5',
    title: 'Building Communities with Web3',
    description: 'Case study on how Esports One minted 92,000+ NFT passes and built a thriving 10k+ member Discord community.',
    type: 'Post',
    slug: 'web3-communities',
    date: '2023',
    readTime: '6 min read',
    author: {
      name: 'Matt Gunnin',
      role: 'Founder, Esports One',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'
    },
    tags: ['Web3', 'Community', 'NFT'],
    toc: [
      { id: 'token-gating', title: 'Utility-First Token Gating' },
      { id: 'identity', title: 'Digital Identity' }
    ],
    content: `
      <h3 id="token-gating">Utility-First Token Gating</h3>
      <p>The mistake most Web3 projects make is selling the asset before the utility. We flipped this. The "Esports One Pass" was free to mint but required for advanced analytics features.</p>
      <p>This drove massive adoption: <strong>92,000+ mints</strong> in 48 hours. The NFT wasn't a speculative asset; it was a login credential.</p>
    `
  }
];

const Resources: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Guide' | 'Tool' | 'Post' | 'Newsletter'>('All');
  const [email, setEmail] = useState('');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const filteredResources = filter === 'All' 
    ? resourcesData 
    : resourcesData.filter(r => r.type === filter);

  // Handle URL Routing
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('resource');
    if (slug) {
      const resource = resourcesData.find(r => r.slug === slug);
      if (resource) {
        setSelectedResource(resource);
        // Scroll to top when opening a resource
        window.scrollTo(0, 0);
      }
    }

    const handlePopState = () => {
      const p = new URLSearchParams(window.location.search);
      const s = p.get('resource');
      if (s) {
        const res = resourcesData.find(r => r.slug === s);
        if (res) setSelectedResource(res);
      } else {
        setSelectedResource(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenResource = (resource: Resource) => {
    setSelectedResource(resource);
    const newUrl = `${window.location.pathname}?resource=${resource.slug}`;
    window.history.pushState({ resourceSlug: resource.slug }, '', newUrl);
    window.scrollTo(0, 0);
  };

  const handleCloseResource = () => {
    setSelectedResource(null);
    window.history.pushState({}, '', window.location.pathname);
  };

  return (
    <section id="resources" className="py-24 px-6 md:px-24 w-full bg-black relative min-h-screen">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
      
      {/* Detail View Overlay */}
      {selectedResource ? (
        <ResourceDetailView resource={selectedResource} onClose={handleCloseResource} />
      ) : (
        <div className="max-w-7xl mx-auto animate-[fadeIn_0.5s_ease-out]">
           <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center gap-3">
                  RESOURCE HUB <CloudRain className="text-cyber-primary fill-cyber-primary/20" />
                </h2>
                <p className="text-gray-400 max-w-xl">
                  A collection of my thoughts on Agentic AI, Startups, and Engineering. 
                  Plus my curated Raindrop.io links.
                </p>
              </div>
              
              {/* Newsletter Mini Form */}
              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 w-full md:w-auto backdrop-blur-sm">
                 <h4 className="text-white font-bold mb-2 text-sm">Join the Neural Network</h4>
                 <p className="text-gray-500 text-xs mb-3">Weekly insights on AI Agents & Architecture.</p>
                 <div className="flex gap-2">
                   <input 
                     type="email" 
                     placeholder="email@address.com" 
                     className="bg-black border border-gray-700 rounded px-3 py-2 text-sm text-white focus:border-cyber-primary outline-none"
                     value={email}
                     onChange={e => setEmail(e.target.value)}
                   />
                   <button className="bg-cyber-primary text-black p-2 rounded hover:bg-white transition-colors">
                     <Send size={16} />
                   </button>
                 </div>
              </div>
           </div>

           {/* Filters */}
           <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-800 pb-4">
             {['All', 'Guide', 'Tool', 'Post'].map((f) => (
               <button
                 key={f}
                 onClick={() => setFilter(f as any)}
                 className={`px-4 py-1.5 rounded-full text-sm font-mono transition-all ${
                   filter === f 
                     ? 'bg-cyber-primary text-black font-bold' 
                     : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800 hover:border-gray-600'
                 }`}
               >
                 {f}
               </button>
             ))}
           </div>

           {/* Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((res) => (
                 <button 
                   key={res.id} 
                   onClick={() => handleOpenResource(res)}
                   className="text-left group flex flex-col h-full p-6 bg-gray-900/30 border border-gray-800 rounded-xl hover:border-cyber-primary hover:bg-gray-900/60 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden w-full"
                 >
                   <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="text-cyber-primary -rotate-45" />
                   </div>

                   <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-lg ${
                        res.type === 'Guide' ? 'bg-blue-900/30 text-blue-400' :
                        res.type === 'Tool' ? 'bg-purple-900/30 text-purple-400' :
                        res.type === 'Newsletter' ? 'bg-green-900/30 text-green-400' :
                        'bg-orange-900/30 text-orange-400'
                      }`}>
                          {res.type === 'Guide' && <Book size={18} />}
                          {res.type === 'Post' && <Newspaper size={18} />}
                          {res.type === 'Tool' && <PenTool size={18} />}
                          {res.type === 'Newsletter' && <Send size={18} />}
                      </div>
                      <span className="text-xs text-gray-500 font-mono border border-gray-800 px-2 py-0.5 rounded uppercase">
                        {res.type}
                      </span>
                   </div>

                   <h3 className="text-xl font-bold text-gray-200 group-hover:text-white mb-3 leading-snug">
                     {res.title}
                   </h3>
                   <p className="text-sm text-gray-400 mb-6 flex-grow">
                     {res.description}
                   </p>

                   <div className="flex items-center justify-between pt-4 border-t border-gray-800/50 mt-auto w-full">
                      <span className="text-xs text-gray-600 font-mono">{res.date}</span>
                      <div className="flex gap-1">
                        {res.tags?.slice(0, 3).map(tag => (
                          <span key={tag} className="text-[10px] text-gray-500 bg-gray-900 px-1.5 py-0.5 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                   </div>
                 </button>
              ))}
           </div>
        </div>
      )}
    </section>
  );
};

// --- REUSABLE RESOURCE DETAIL TEMPLATE ---

const ResourceDetailView: React.FC<{ resource: Resource; onClose: () => void }> = ({ resource, onClose }) => {
  const [copied, setCopied] = useState(false);
  const isRaindrop = resource.slug === 'raindrop';

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (isRaindrop) {
    return (
      <div className="w-full min-h-screen animate-[fadeIn_0.3s_ease-out]">
        {/* Navigation Header */}
        <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800 px-6 py-4 flex items-center justify-between">
          <button onClick={onClose} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-sm uppercase">Back to Hub</span>
          </button>
          <h2 className="text-sm font-bold text-white hidden md:block">{resource.title}</h2>
          <div className="flex gap-2">
            <button onClick={handleShare} className="p-2 hover:bg-gray-800 rounded-full text-gray-400 hover:text-white transition-colors">
               {copied ? <Check size={18} /> : <Share2 size={18} />}
            </button>
          </div>
        </div>
        
        <div className="w-full h-[calc(100vh-64px)] bg-white">
             <iframe 
                src="https://raindrop.io/esports/public" 
                className="w-full h-full border-0" 
                title="Raindrop Collection"
                allowFullScreen 
             />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto animate-[fadeIn_0.3s_ease-out] pb-24">
      {/* Navigation Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800 py-4 mb-8 flex items-center justify-between">
         <button onClick={onClose} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-sm uppercase">Back to Hub</span>
         </button>
         <div className="flex gap-2">
            <button onClick={handleShare} className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-full text-gray-400 hover:text-white hover:border-gray-600 transition-all text-xs">
               {copied ? <Check size={14} /> : <Share2 size={14} />}
               {copied ? 'COPIED' : 'SHARE'}
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         {/* Main Content */}
         <div className="lg:col-span-8 space-y-8">
            {/* Header Section */}
            <div>
               <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs font-mono text-cyber-primary bg-cyber-primary/10 border border-cyber-primary/20 px-2 py-1 rounded uppercase">
                     {resource.type}
                  </span>
                  {resource.tags?.map(tag => (
                     <span key={tag} className="text-xs font-mono text-gray-500 bg-gray-900 px-2 py-1 rounded">#{tag}</span>
                  ))}
               </div>
               <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  {resource.title}
               </h1>
               <div className="flex items-center gap-6 text-sm text-gray-400 font-mono border-b border-gray-800 pb-8">
                  <div className="flex items-center gap-2">
                     <Clock size={14} /> {resource.readTime}
                  </div>
                  <div className="flex items-center gap-2">
                     <Calendar size={14} /> {resource.date}
                  </div>
               </div>
            </div>

            {/* Author Block Mobile */}
            <div className="lg:hidden flex items-center gap-4 bg-gray-900/30 p-4 rounded-xl border border-gray-800">
                <div className="w-10 h-10 rounded-full bg-gray-800 overflow-hidden">
                   {resource.author?.avatar && <img src={resource.author.avatar} alt={resource.author.name} className="w-full h-full object-cover" />}
                </div>
                <div>
                   <div className="text-white font-bold text-sm">{resource.author?.name}</div>
                   <div className="text-cyber-secondary text-xs">{resource.author?.role}</div>
                </div>
            </div>

            {/* Content Body */}
            <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-cyber-primary hover:prose-a:text-white prose-code:text-cyber-secondary prose-code:bg-gray-900 prose-code:px-1 prose-code:rounded prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800">
               {resource.content && <div dangerouslySetInnerHTML={{ __html: resource.content }} />}
               {!resource.content && <p className="text-gray-500 italic">Content loading...</p>}
            </div>

            {/* Newsletter CTA Bottom */}
            <div className="mt-16 bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-8 rounded-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Send size={100} />
               </div>
               <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Subscribe to the Neural Network</h3>
               <p className="text-gray-400 mb-6 relative z-10 max-w-md">
                  Get notified about new guides on Agentic AI, Multi-Agent Systems, and the future of autonomous software.
               </p>
               <div className="flex gap-2 relative z-10 max-w-md">
                   <input 
                     type="email" 
                     placeholder="email@domain.com" 
                     className="flex-1 bg-black border border-gray-700 rounded px-4 py-3 text-white focus:border-cyber-primary outline-none transition-colors"
                   />
                   <button className="bg-cyber-primary text-black font-bold px-6 py-3 rounded hover:bg-white transition-colors">
                     SUBSCRIBE
                   </button>
               </div>
            </div>
         </div>

         {/* Sidebar */}
         <div className="lg:col-span-4 space-y-8">
            {/* Author Widget */}
            <div className="hidden lg:block bg-gray-900/30 p-6 rounded-2xl border border-gray-800 sticky top-32">
               <h3 className="text-xs font-mono text-gray-500 uppercase mb-4">Written By</h3>
               <div className="flex items-center gap-4 mb-4">
                   <div className="w-12 h-12 rounded-full bg-gray-800 overflow-hidden border border-gray-700">
                      {resource.author?.avatar && <img src={resource.author.avatar} alt={resource.author.name} className="w-full h-full object-cover" />}
                   </div>
                   <div>
                      <div className="text-white font-bold">{resource.author?.name}</div>
                      <div className="text-cyber-secondary text-xs">{resource.author?.role}</div>
                   </div>
               </div>
               <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  Architecting autonomous AI systems and building the future of work at Vertical Labs.
               </p>
               <div className="flex gap-2">
                  <button className="p-2 bg-black border border-gray-800 rounded hover:border-cyber-primary hover:text-cyber-primary text-gray-500 transition-colors"><User size={14}/></button>
                  <button className="p-2 bg-black border border-gray-800 rounded hover:border-cyber-primary hover:text-cyber-primary text-gray-500 transition-colors"><Send size={14}/></button>
               </div>
            </div>

            {/* Table of Contents */}
            {resource.toc && (
               <div className="hidden lg:block">
                  <h3 className="text-xs font-mono text-gray-500 uppercase mb-4 flex items-center gap-2">
                     <List size={14} /> Table of Contents
                  </h3>
                  <div className="space-y-1 border-l border-gray-800 ml-1">
                     {resource.toc.map(item => (
                        <button 
                           key={item.id}
                           onClick={() => scrollToHeading(item.id)}
                           className="block w-full text-left pl-4 py-2 text-sm text-gray-400 hover:text-cyber-primary hover:border-l hover:border-cyber-primary -ml-px transition-all"
                        >
                           {item.title}
                        </button>
                     ))}
                  </div>
               </div>
            )}
         </div>
      </div>
      
      <style>{`
         .code-block {
            background: #000;
            border: 1px solid #333;
            border-radius: 8px;
            padding: 1rem;
            font-family: 'Fira Code', monospace;
            font-size: 0.85rem;
            color: #e0e0e0;
            margin: 1.5rem 0;
            overflow-x: auto;
         }
         .keyword { color: #c678dd; }
         .string { color: #98c379; }
         .comment { color: #5c6370; font-style: italic; display: block; margin-bottom: 0.5rem; }
      `}</style>
    </div>
  );
};

export default Resources;
