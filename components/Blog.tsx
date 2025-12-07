import React, { useState } from 'react';
import { Calendar, User, ArrowRight, Tag, ChevronLeft, X } from 'lucide-react';
import { BlogPost } from '../types';

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Agentic Systems: A Vertical Approach',
    date: 'Dec 6, 2025',
    excerpt: 'How we orchestrate multi-agent swarms to solve enterprise workflows at Vertical Labs. Moving beyond simple chatbots to autonomous execution.',
    content: `
      <p>The era of the chatbot is ending. The era of the <strong>Agent</strong> is here.</p>
      <p>At Vertical Labs, we are no longer just building interfaces that talk back; we are architecting systems that <em>do</em>.</p>
      <h3>The Multi-Agent Shift</h3>
      <p>Traditional LLM applications rely on zero-shot or few-shot prompting. While effective for creative writing, it falls apart in complex business logic.</p>
      <p>Our approach involves <strong>Swarm Intelligence</strong>. We utilize frameworks like CrewAI and OpenAI Swarm to assign specific roles:</p>
      <ul>
        <li><strong>Researcher Agent:</strong> Scours vector DBs for context.</li>
        <li><strong>Analyst Agent:</strong> Processes data and identifies patterns.</li>
        <li><strong>Executor Agent:</strong> Writes code or triggers APIs.</li>
      </ul>
      <p>This separation of concerns reduces hallucination by 40% and increases task completion rates significantly.</p>
    `,
    author: 'Matt Gunnin',
    tags: ['AI', 'Agents', 'Architecture']
  },
  {
    id: '2',
    title: 'Setting up the Ultimate Claude Code Environment',
    date: 'Dec 5, 2025',
    excerpt: 'Optimizing VS Code and terminal workflows for maximum efficiency with Claude 4.5. The perfect stack for 10x engineering.',
    content: `
      <p>Claude 4.5 has changed the game for coding assistants. Its ability to maintain massive context windows means we can now feed entire repo structures into memory.</p>
      <h3>The Stack</h3>
      <ol>
        <li><strong>IDE:</strong> VS Code (Insiders Build)</li>
        <li><strong>Extension:</strong> Claude Dev (or similar AI agent extensions)</li>
        <li><strong>Terminal:</strong> Warp - for AI command suggestions.</li>
      </ol>
      <p>By integrating these tools, I've reduced my boilerplate writing time to near zero. The key is in the <em>system instructions</em> you provide to your local environment context.</p>
    `,
    author: 'Matt Gunnin',
    tags: ['Dev', 'Claude', 'Tools']
  },
  {
    id: '3',
    title: 'The Rise of Autonomous AI in 2026',
    date: 'Dec 4, 2025',
    excerpt: 'Predictions for the next wave of generative intelligence and embodied agents. Why 2026 will be the year AI leaves the screen.',
    content: `
      <p>As we close out 2025, the trajectory is clear. AI is moving from <em>generation</em> to <em>action</em>.</p>
      <p>We are seeing the early stages of <strong>Embodied AI</strong>—not just robots, but digital agents that live on your OS, managing files, scheduling meetings, and negotiating contracts without human oversight.</p>
      <p>My prediction: By Q3 2026, the primary interface for computing will no longer be the mouse and keyboard, but natural language intent interpreted by a personal OS agent.</p>
    `,
    author: 'Matt Gunnin',
    tags: ['Future', 'AI', 'Trends']
  }
];

const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-24 px-6 md:px-24 w-full bg-cyber-black relative border-t border-gray-900">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex items-end gap-4 mb-12">
           <h2 className="text-4xl md:text-5xl font-bold text-white">TRANSMISSIONS</h2>
           <span className="text-cyber-secondary font-mono text-lg mb-1 hidden md:inline">/ LOGS_2025</span>
        </div>

        {selectedPost ? (
          // Single Post View
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 animate-[fadeIn_0.3s_ease-out] relative overflow-hidden">
             {/* Decor */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-primary/5 rounded-full blur-2xl"></div>

             <button 
               onClick={() => setSelectedPost(null)}
               className="flex items-center gap-2 text-cyber-primary hover:text-white mb-6 transition-colors font-mono text-sm uppercase tracking-wider"
             >
               <ChevronLeft size={16} /> Return to Logs
             </button>

             <div className="flex flex-wrap gap-2 mb-4">
                {selectedPost.tags.map(tag => (
                  <span key={tag} className="text-xs font-mono text-cyber-secondary border border-cyber-secondary/30 px-2 py-1 rounded">
                    #{tag}
                  </span>
                ))}
             </div>

             <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{selectedPost.title}</h3>
             
             <div className="flex items-center gap-6 text-sm text-gray-500 font-mono mb-8 border-b border-gray-800 pb-8">
                <div className="flex items-center gap-2">
                   <Calendar size={14} /> {selectedPost.date}
                </div>
                <div className="flex items-center gap-2">
                   <User size={14} /> {selectedPost.author}
                </div>
             </div>

             <div 
               className="prose prose-invert prose-lg max-w-none text-gray-300"
               dangerouslySetInnerHTML={{ __html: selectedPost.content }}
             />
          </div>
        ) : (
          // List View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article 
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="group bg-gray-900/30 border border-gray-800 hover:border-cyber-primary hover:bg-gray-900/60 p-6 rounded-xl transition-all duration-300 cursor-pointer flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-4">
                   <span className="text-xs font-mono text-gray-500">{post.date}</span>
                   <div className="flex gap-1">
                     {post.tags.slice(0, 2).map(tag => (
                       <span key={tag} className="w-2 h-2 rounded-full bg-cyber-secondary/50"></span>
                     ))}
                   </div>
                </div>

                <h3 className="text-xl font-bold text-gray-100 group-hover:text-cyber-primary transition-colors mb-3">
                  {post.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-800/50 mt-auto">
                   <div className="flex gap-2">
                     {post.tags.map(tag => (
                       <span key={tag} className="text-[10px] text-gray-500 font-mono bg-black/50 px-1.5 py-0.5 rounded">
                         #{tag}
                       </span>
                     ))}
                   </div>
                   <ArrowRight size={16} className="text-gray-600 group-hover:text-cyber-primary -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;