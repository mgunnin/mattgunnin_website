import React, { useState } from 'react';
import { ArrowRight, Book, PenTool, Newspaper, Search, Send, Zap, CloudRain } from 'lucide-react';
import { Resource } from '../types';

const resourcesData: Resource[] = [
  {
    id: '1',
    title: 'Resource Hub (Raindrop)',
    description: 'A curated collection of my favorite resources, guides, AI tools, and frontend libraries that I have collected over the years.',
    type: 'Tool',
    url: '#',
    date: 'Updated Daily',
    tags: ['AI', 'Dev', 'Tools']
  },
  {
    id: '2',
    title: 'Architecting Multi-Agent Systems',
    description: 'Deep dive into orchestrating CrewAI and OpenAI Swarm for autonomous business workflows. Lessons from building Vertical Labs.',
    type: 'Guide',
    url: '#',
    date: '2024',
    tags: ['AI', 'Agents', 'Architecture']
  },
  {
    id: '3',
    title: 'Prompt Engineering for Developers',
    description: 'Techniques for consistent JSON outputs, RAG pipeline optimization, and advanced context management.',
    type: 'Guide',
    url: '#',
    date: '2023',
    tags: ['AI', 'Prompting']
  },
  {
    id: '4',
    title: 'The Future of Esports & AI',
    description: 'Analyzing how computer vision and reinforcement learning reshaped the analytics landscape in competitive gaming.',
    type: 'Post',
    url: '#',
    date: '2022',
    tags: ['Esports', 'AI', 'CV']
  },
  {
    id: '5',
    title: 'Building Communities with Web3',
    description: 'Case study on how Esports One minted 92,000+ NFT passes and built a thriving 10k+ member Discord community.',
    type: 'Post',
    url: '#',
    date: '2021',
    tags: ['Web3', 'Community']
  }
];

const Resources: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Guide' | 'Tool' | 'Post' | 'Newsletter'>('All');
  const [email, setEmail] = useState('');

  const filteredResources = filter === 'All' 
    ? resourcesData 
    : resourcesData.filter(r => r.type === filter);

  return (
    <section id="resources" className="py-24 px-6 md:px-24 w-full bg-black relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto">
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
               <a 
                 key={res.id} 
                 href={res.url}
                 className="group flex flex-col h-full p-6 bg-gray-900/30 border border-gray-800 rounded-xl hover:border-cyber-primary hover:bg-gray-900/60 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
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

                 <div className="flex items-center justify-between pt-4 border-t border-gray-800/50 mt-auto">
                    <span className="text-xs text-gray-600 font-mono">{res.date}</span>
                    <div className="flex gap-1">
                      {res.tags?.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] text-gray-500 bg-gray-900 px-1.5 py-0.5 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                 </div>
               </a>
            ))}
         </div>
      </div>
    </section>
  );
};

export default Resources;