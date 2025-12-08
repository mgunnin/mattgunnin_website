
import React, { useState, useRef, useEffect } from 'react';
import { Calendar, User, ArrowRight, ChevronLeft, Filter, Tag } from 'lucide-react';
import { BlogPost } from '../types';

const blogPosts: BlogPost[] = [
  {
    id: '4',
    title: 'The Vertical Integration of Intelligence',
    date: 'Dec 8, 2025',
    excerpt: 'Why horizontal LLMs are hitting a ceiling, and how vertical agentic architectures are unlocking the next trillion dollars in enterprise value.',
    content: `
      <p>The "Generalist Trap" is becoming obvious. While GPT-5 and Gemini 3 are marvels of engineering, they remain horizontally focused. They know a little bit about everything, but they cannot run your logistics supply chain out of the box.</p>
      <h3>The Value Shift</h3>
      <p>In 2023, the value was in the Model. In 2024, it was in the Context. Now, in late 2025, the value has decisively shifted to the <strong>Orchestration Layer</strong>.</p>
      <p>At Vertical Labs, we are seeing a massive pivot among enterprise clients. They no longer want "Chat with PDF" solutions. They want:</p>
      <ul>
        <li><strong>Proprietary Tool Use:</strong> Agents that can hit internal APIs to execute trades or update CRMs.</li>
        <li><strong>Narrow Guardrails:</strong> Systems that refuse to hallucinate because they are constrained by strict topology.</li>
        <li><strong>Vertical Context:</strong> Embeddings trained specifically on their institutional knowledge, not just the open web.</li>
      </ul>
      <p>The next trillion dollars of value won't come from a better chatbot; it will come from the vertical integration of intelligence into specific business verticals.</p>
    `,
    author: 'Matt Gunnin',
    tags: ['AI', 'Strategy', 'Enterprise']
  },
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
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  // SEO: Dynamic Document Title
  useEffect(() => {
    if (selectedPost) {
      document.title = `${selectedPost.title} | Matt Gunnin`;
    } else {
      document.title = "Matt Gunnin | Agentic AI Architect & Founder";
    }
    return () => {
      document.title = "Matt Gunnin | Agentic AI Architect & Founder";
    };
  }, [selectedPost]);

  // Extract unique tags from all posts
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

  // Filter posts based on activeTag
  const displayPosts = activeTag 
    ? blogPosts.filter(post => post.tags.includes(activeTag))
    : blogPosts;

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation();
    setActiveTag(tag);
    // If we are in detailed view, clicking a tag returns to list view filtered by that tag
    if (selectedPost) {
      setSelectedPost(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setParallaxOffset({ x, y });
  };

  return (
    <section id="blog" className="py-24 px-6 md:px-24 w-full bg-cyber-black relative border-t border-gray-900">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
           <div className="flex items-end gap-4">
               <h2 className="text-4xl md:text-5xl font-bold text-white">TRANSMISSIONS</h2>
               <span className="text-cyber-secondary font-mono text-lg mb-1 hidden md:inline">/ LOGS_2025</span>
           </div>

           {/* Filter Bar */}
           {!selectedPost && (
             <div className="flex flex-wrap gap-2 animate-[fadeIn_0.5s_ease-out]">
               <button
                 onClick={() => setActiveTag(null)}
                 className={`px-4 py-1.5 text-xs font-mono rounded-full border transition-all duration-300 ${
                   activeTag === null 
                     ? 'bg-cyber-primary text-black border-cyber-primary font-bold shadow-[0_0_10px_rgba(0,240,255,0.3)]' 
                     : 'text-gray-400 border-gray-800 hover:border-cyber-primary/50 hover:text-white bg-black/40'
                 }`}
               >
                 ALL
               </button>
               {allTags.map(tag => (
                 <button
                   key={tag}
                   onClick={() => setActiveTag(tag)}
                   className={`px-4 py-1.5 text-xs font-mono rounded-full border transition-all duration-300 ${
                     activeTag === tag
                       ? 'bg-cyber-primary text-black border-cyber-primary font-bold shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                       : 'text-gray-400 border-gray-800 hover:border-cyber-primary/50 hover:text-white bg-black/40'
                   }`}
                 >
                   #{tag}
                 </button>
               ))}
             </div>
           )}
        </div>

        {selectedPost ? (
          // Single Post View
          <div className="animate-[slideUp_0.4s_ease-out]">
             <button 
               onClick={() => setSelectedPost(null)}
               className="flex items-center gap-2 text-cyber-primary hover:text-white mb-6 transition-colors font-mono text-sm uppercase tracking-wider"
             >
               <ChevronLeft size={16} /> Return to Logs
             </button>

             <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
                 {/* Parallax Header */}
                 <div 
                    className="relative h-64 w-full overflow-hidden cursor-crosshair group"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => setParallaxOffset({ x: 0, y: 0 })}
                 >
                     <div 
                        className="absolute inset-[-10%] bg-[radial-gradient(circle_at_50%_50%,#1a1a1a,transparent_70%)] opacity-80"
                        style={{
                            transform: `translate(${parallaxOffset.x * 20}px, ${parallaxOffset.y * 20}px) scale(1.1)`
                        }}
                     />
                     {/* Background Pattern Layer 1 */}
                     <div 
                        className="absolute inset-[-10%] opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(0,240,255,0.1)_25%,rgba(0,240,255,0.1)_50%,transparent_50%,transparent_75%,rgba(0,240,255,0.1)_75%,rgba(0,240,255,0.1)_100%)] bg-[size:40px_40px]"
                        style={{
                            transform: `translate(${parallaxOffset.x * 40}px, ${parallaxOffset.y * 40}px) scale(1.1)`
                        }}
                     />
                     {/* Floating Element Layer */}
                     <div 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyber-primary/10 rounded-full blur-[60px]"
                        style={{
                            transform: `translate(calc(-50% + ${parallaxOffset.x * -30}px), calc(-50% + ${parallaxOffset.y * -30}px))`
                        }}
                     />
                     
                     {/* Title Container */}
                     <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {selectedPost.tags.map(tag => (
                            <button 
                                key={tag} 
                                onClick={(e) => handleTagClick(e, tag)}
                                className="text-xs font-mono text-cyber-secondary border border-cyber-secondary/30 px-2 py-1 rounded hover:bg-cyber-secondary hover:text-black transition-colors"
                            >
                                #{tag}
                            </button>
                            ))}
                        </div>
                        <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{selectedPost.title}</h3>
                     </div>
                 </div>

                 {/* Content */}
                 <div className="p-8 md:p-12 relative">
                     <div className="flex items-center gap-6 text-sm text-gray-500 font-mono mb-12 border-b border-gray-800 pb-8">
                        <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-cyber-primary" /> {selectedPost.date}
                        </div>
                        <div className="flex items-center gap-2">
                        <User size={14} className="text-cyber-primary" /> {selectedPost.author}
                        </div>
                     </div>

                     <div 
                        className="prose prose-invert prose-lg max-w-none text-gray-300"
                        dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                     />
                 </div>
             </div>
          </div>
        ) : (
          // List View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPosts.length > 0 ? (
                displayPosts.map((post, idx) => (
                  <article 
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    style={{ animationDelay: `${idx * 100}ms` }}
                    className="group bg-gray-900/30 border border-gray-800 hover:border-cyber-primary hover:bg-gray-900/60 p-6 rounded-xl transition-all duration-300 cursor-pointer flex flex-col h-full hover:-translate-y-1 animate-[fadeIn_0.5s_ease-out_both]"
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
                          <button 
                            key={tag} 
                            onClick={(e) => handleTagClick(e, tag)}
                            className="text-[10px] text-gray-500 font-mono bg-black/50 px-1.5 py-0.5 rounded hover:text-cyber-primary hover:bg-black transition-colors"
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                      <ArrowRight size={16} className="text-gray-600 group-hover:text-cyber-primary -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                  </article>
                ))
            ) : (
                <div className="col-span-full py-16 text-center border border-dashed border-gray-800 rounded-xl bg-gray-900/20">
                    <Filter className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                    <p className="text-gray-500 font-mono text-lg">No transmissions found for protocol <span className="text-cyber-primary">#{activeTag}</span></p>
                    <button 
                        onClick={() => setActiveTag(null)}
                        className="mt-4 text-sm text-cyber-secondary hover:text-white underline underline-offset-4"
                    >
                        Reset Filters
                    </button>
                </div>
            )}
          </div>
        )}
      </div>
      <style>{`
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Blog;
