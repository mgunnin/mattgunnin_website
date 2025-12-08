
import React, { useState, useRef, useEffect } from 'react';
import { Calendar, User, ArrowRight, ChevronLeft, Filter, Tag, Share2, Linkedin, Copy, Clock, Hash, ChevronRight } from 'lucide-react';
import { BlogPost } from '../types';

const blogPosts: BlogPost[] = [
  {
    id: '4',
    title: 'The Vertical Integration of Intelligence',
    slug: 'vertical-integration',
    date: 'Dec 8, 2025',
    readTime: '8 min read',
    excerpt: 'Why horizontal LLMs are hitting a ceiling, and how vertical agentic architectures are unlocking the next trillion dollars in enterprise value.',
    content: `
      <h3>The Generalist Trap</h3>
      <p>The "Generalist Trap" is becoming obvious. While GPT-5 and Gemini 3 are marvels of engineering, they remain horizontally focused. They know a little bit about everything—from poetry to python—but they cannot run your logistics supply chain out of the box.</p>
      
      <p>In the last cycle (2023-2024), the primary value capture was in the <strong>Model Layer</strong>. Foundation model providers like OpenAI and Google raced to increase parameter counts. But as we approach late 2025, the law of diminishing returns has kicked in. A 100 trillion parameter model isn't 10x more valuable to a law firm than a 10 trillion parameter model; it's just more expensive to run.</p>

      <h3>The Shift to Vertical</h3>
      <p>At <strong>Vertical Labs</strong>, we are seeing a massive pivot among enterprise clients. They no longer want "Chat with PDF" solutions. They want:</p>
      <ul>
        <li><strong>Proprietary Tool Use:</strong> Agents that can hit internal APIs to execute trades or update CRMs.</li>
        <li><strong>Narrow Guardrails:</strong> Systems that refuse to hallucinate because they are constrained by strict topology.</li>
        <li><strong>Vertical Context:</strong> Embeddings trained specifically on their institutional knowledge, not just the open web.</li>
      </ul>

      <h3>The Orchestration Layer</h3>
      <p>The next trillion dollars of value won't come from a better chatbot; it will come from the <strong>vertical integration of intelligence</strong> into specific business processes. This requires a shift from "Prompt Engineering" to "System Engineering".</p>
      
      <p>We are building systems where the LLM is just a router. The real intelligence lies in the <em>tools</em> we give it access to and the <em>memory</em> we allow it to access. This is the thesis behind our "Service-as-Software" model.</p>
    `,
    author: 'Matt Gunnin',
    tags: ['AI', 'Strategy', 'Enterprise'],
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: '1',
    title: 'Building Agentic Systems: A Vertical Approach',
    slug: 'agentic-systems',
    date: 'Dec 6, 2025',
    readTime: '12 min read',
    excerpt: 'How we orchestrate multi-agent swarms to solve enterprise workflows at Vertical Labs. Moving beyond simple chatbots to autonomous execution.',
    content: `
      <h3>The Death of the Chatbot</h3>
      <p>The era of the chatbot is ending. The era of the <strong>Agent</strong> is here. The distinction is subtle but profound: Chatbots <em>react</em> to user input. Agents <em>proactively</em> pursue goals.</p>
      <p>At Vertical Labs, we are no longer just building interfaces that talk back; we are architecting systems that <em>do</em>.</p>

      <h3>Swarm Intelligence Patterns</h3>
      <p>Traditional LLM applications rely on zero-shot or few-shot prompting. While effective for creative writing, it falls apart in complex business logic. A single prompt cannot handle the nuance of a legal discovery process.</p>
      <p>Our approach involves <strong>Swarm Intelligence</strong>. We utilize frameworks like CrewAI and OpenAI Swarm to assign specific roles in a digital assembly line:</p>
      
      <div class="bg-gray-900 border border-gray-800 p-4 rounded-lg my-6 font-mono text-sm">
        <span class="text-gray-500"># Agent Definition Example</span><br/>
        researcher = Agent(<br/>
        &nbsp;&nbsp;role=<span class="text-green-400">'Market Analyst'</span>,<br/>
        &nbsp;&nbsp;goal=<span class="text-green-400">'Identify emerging trends in esports'</span>,<br/>
        &nbsp;&nbsp;tools=[SearchTool(), VectorDBTool()]<br/>
        )
      </div>

      <ul>
        <li><strong>Researcher Agent:</strong> Scours vector DBs for context and retrieves relevant documents.</li>
        <li><strong>Analyst Agent:</strong> Processes data, identifies patterns, and rejects irrelevant noise.</li>
        <li><strong>Executor Agent:</strong> Writes code, formats reports, or triggers external webhooks.</li>
      </ul>
      
      <h3>Results</h3>
      <p>This separation of concerns reduces hallucination by approximately 40% and increases task completion rates significantly. By constraining the scope of each agent, we paradoxically increase the capability of the system as a whole.</p>
    `,
    author: 'Matt Gunnin',
    tags: ['AI', 'Agents', 'Architecture'],
    image: 'https://images.unsplash.com/photo-1676299081847-824916de030a?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Setting up the Ultimate Claude Code Environment',
    slug: 'claude-environment',
    date: 'Dec 5, 2025',
    readTime: '6 min read',
    excerpt: 'Optimizing VS Code and terminal workflows for maximum efficiency with Claude 4.5. The perfect stack for 10x engineering.',
    content: `
      <h3>The Context Window Revolution</h3>
      <p>Claude 4.5 has changed the game for coding assistants. Its ability to maintain massive context windows (up to 500k tokens effectively) means we can now feed entire repo structures into memory.</p>

      <h3>The 10x Stack</h3>
      <p>Here is the exact environment setup used by the engineering team at Vertical Labs:</p>
      
      <ol>
        <li>
            <strong>IDE: VS Code (Insiders Build)</strong>
            <p>We stick to VS Code for its robust extension ecosystem. The Insiders build often gets Copilot updates weeks in advance.</p>
        </li>
        <li>
            <strong>Agentic Extension: Claude Dev (or Roo Code)</strong>
            <p>Unlike standard autocomplete, Claude Dev acts as an agent. It can run terminal commands, create files, and analyze errors autonomously. This is "human-in-the-loop" coding.</p>
        </li>
        <li>
            <strong>Terminal: Warp</strong>
            <p>Warp's AI integration allows for natural language command generation. "Undo the last git commit and keep changes" is translated instantly to <code>git reset --soft HEAD~1</code>.</p>
        </li>
      </ol>

      <h3>System Instructions</h3>
      <p>The secret sauce is in the <code>.cursorrules</code> or custom system instructions. We force the model to adopt a specific persona:</p>
      <blockquote>"You are a Senior Principal Engineer. You prefer composition over inheritance. You write small, testable functions. You always add TSDoc comments."</blockquote>
      <p>By defining the behavior explicitly, we reduce the boilerplate editing time to near zero.</p>
    `,
    author: 'Matt Gunnin',
    tags: ['Dev', 'Claude', 'Tools'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'The Rise of Autonomous AI in 2026',
    slug: 'autonomous-2026',
    date: 'Dec 4, 2025',
    readTime: '5 min read',
    excerpt: 'Predictions for the next wave of generative intelligence and embodied agents. Why 2026 will be the year AI leaves the screen.',
    content: `
      <h3>From Generation to Action</h3>
      <p>As we close out 2025, the trajectory is clear. AI is moving from <em>generation</em> (creating text/images) to <em>action</em> (doing things).</p>
      
      <h3>Embodied AI (Digital)</h3>
      <p>We are seeing the early stages of digital embodiment. This isn't robots walking around; it's agents living on your Operating System. Imagine an agent that has permission to access your file system, your calendar, and your email.</p>
      <p>"Book me a flight to Austin next Tuesday" is a prompt that currently fails because LLMs lack <strong>agency</strong>. By 2026, the OS will be the agent. Microsoft and Apple are already racing toward this reality.</p>

      <h3>The Interface Shift</h3>
      <p>My prediction: By Q3 2026, the primary interface for computing will no longer be the mouse and keyboard for general tasks. It will be natural language intent.</p>
      <p>We will look back at "pointing and clicking" through nested menus to find a setting as archaic as using punch cards. The intent "Turn on Dark Mode" should just execute, regardless of where the toggle is hidden in the UI.</p>
    `,
    author: 'Matt Gunnin',
    tags: ['Future', 'AI', 'Trends'],
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop'
  }
];

const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const [page, setPage] = useState(1);
  const POSTS_PER_PAGE = 6;

  // Handle URL Routing
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('post');
    if (slug) {
      const post = blogPosts.find(p => p.slug === slug);
      if (post) {
        setSelectedPost(post);
        window.scrollTo(0, 0);
      }
    }

    const handlePopState = () => {
      const p = new URLSearchParams(window.location.search);
      const s = p.get('post');
      if (s) {
        const post = blogPosts.find(p => p.slug === s);
        if (post) setSelectedPost(post);
      } else {
        setSelectedPost(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenPost = (post: BlogPost) => {
    setSelectedPost(post);
    const newUrl = `${window.location.pathname}?post=${post.slug}`;
    window.history.pushState({ postSlug: post.slug }, '', newUrl);
    window.scrollTo(0, 0);
  };

  const handleClosePost = () => {
    setSelectedPost(null);
    window.history.pushState({}, '', window.location.pathname);
  };

  // Extract unique tags
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

  // Filter and Pagination
  const filteredPosts = activeTag 
    ? blogPosts.filter(post => post.tags.includes(activeTag))
    : blogPosts;
  
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const displayPosts = filteredPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation();
    setActiveTag(tag);
    setPage(1); // Reset to first page on filter
    if (selectedPost) handleClosePost();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setParallaxOffset({ x, y });
  };

  return (
    <section id="blog" className="py-24 px-6 md:px-24 w-full bg-cyber-black relative border-t border-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Header (only show in list view) */}
        {!selectedPost && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 animate-[fadeIn_0.5s_ease-out]">
             <div className="flex items-end gap-4">
                 <h2 className="text-4xl md:text-5xl font-bold text-white">TRANSMISSIONS</h2>
                 <span className="text-cyber-secondary font-mono text-lg mb-1 hidden md:inline">/ LOGS_2025</span>
             </div>

             {/* Filter Bar */}
             <div className="flex flex-wrap gap-2">
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
                   onClick={(e) => handleTagClick(e, tag)}
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
          </div>
        )}

        {selectedPost ? (
          // Single Post View
          <SinglePostView post={selectedPost} onClose={handleClosePost} onTagClick={handleTagClick} parallaxOffset={parallaxOffset} handleMouseMove={handleMouseMove} setParallaxOffset={setParallaxOffset} />
        ) : (
          // List View
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayPosts.length > 0 ? (
                  displayPosts.map((post, idx) => (
                    <article 
                      key={post.id}
                      onClick={() => handleOpenPost(post)}
                      style={{ animationDelay: `${idx * 100}ms` }}
                      className="group bg-gray-900/30 border border-gray-800 hover:border-cyber-primary hover:bg-gray-900/60 p-6 rounded-xl transition-all duration-300 cursor-pointer flex flex-col h-full hover:-translate-y-1 animate-[fadeIn_0.5s_ease-out_both]"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-mono text-gray-500">{post.date}</span>
                        <span className="text-xs font-mono text-cyber-secondary">{post.readTime}</span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-100 group-hover:text-cyber-primary transition-colors mb-3">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-800/50 mt-auto">
                        <div className="flex gap-2">
                          {post.tags.slice(0, 3).map(tag => (
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-4 mt-12">
                 <button 
                    disabled={page === 1}
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    className="p-2 border border-gray-800 rounded hover:border-cyber-primary disabled:opacity-50 disabled:hover:border-gray-800 transition-colors"
                 >
                    <ChevronLeft size={20} className="text-white" />
                 </button>
                 <span className="font-mono text-gray-500 py-2">PAGE {page} / {totalPages}</span>
                 <button 
                    disabled={page === totalPages}
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    className="p-2 border border-gray-800 rounded hover:border-cyber-primary disabled:opacity-50 disabled:hover:border-gray-800 transition-colors"
                 >
                    <ChevronRight size={20} className="text-white" />
                 </button>
              </div>
            )}
          </>
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

// --- SINGLE POST VIEW COMPONENT ---

const SinglePostView: React.FC<{ 
  post: BlogPost; 
  onClose: () => void; 
  onTagClick: (e: any, tag: string) => void;
  parallaxOffset: {x: number, y: number};
  handleMouseMove: (e: any) => void;
  setParallaxOffset: (o: {x: number, y: number}) => void;
}> = ({ post, onClose, onTagClick, parallaxOffset, handleMouseMove, setParallaxOffset }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = (platform: 'twitter' | 'linkedin' | 'copy') => {
    const url = window.location.href;
    const text = `Read "${post.title}" by Matt Gunnin`;
    
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && p.tags.some(t => post.tags.includes(t)))
    .slice(0, 3);

  return (
    <div className="animate-[slideUp_0.4s_ease-out]">
       <button 
         onClick={onClose}
         className="flex items-center gap-2 text-cyber-primary hover:text-white mb-6 transition-colors font-mono text-sm uppercase tracking-wider group"
       >
         <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Return to Logs
       </button>

       <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
           {/* Parallax Header */}
           <div 
              className="relative h-72 md:h-96 w-full overflow-hidden cursor-crosshair group"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setParallaxOffset({ x: 0, y: 0 })}
           >
               {/* Background Image if available, else generative pattern */}
               {post.image ? (
                 <div 
                    className="absolute inset-[-10%]"
                    style={{
                        transform: `translate(${parallaxOffset.x * 20}px, ${parallaxOffset.y * 20}px) scale(1.1)`,
                        backgroundImage: `url(${post.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'grayscale(100%) contrast(120%) brightness(50%)'
                    }}
                 />
               ) : (
                 <div 
                    className="absolute inset-[-10%] bg-cyber-black"
                    style={{
                        transform: `translate(${parallaxOffset.x * 20}px, ${parallaxOffset.y * 20}px) scale(1.1)`
                    }}
                 />
               )}
               
               {/* Overlay Gradients */}
               <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_20%,#111827_100%)] opacity-80" />
               
               {/* Floating Elements for Depth */}
               <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyber-primary/20 rounded-full blur-[80px]"
                  style={{
                      transform: `translate(calc(-50% + ${parallaxOffset.x * -40}px), calc(-50% + ${parallaxOffset.y * -40}px))`
                  }}
               />
               
               {/* Title Container */}
               <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20">
                  <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(tag => (
                      <button 
                          key={tag} 
                          onClick={(e) => onTagClick(e, tag)}
                          className="text-xs font-mono text-cyber-primary bg-black/60 border border-cyber-primary/30 px-2 py-1 rounded backdrop-blur-sm hover:bg-cyber-primary hover:text-black transition-colors"
                      >
                          #{tag}
                      </button>
                      ))}
                  </div>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight max-w-4xl">{post.title}</h1>
               </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 p-8 md:p-12">
               {/* Sidebar Meta */}
               <div className="lg:col-span-3 space-y-8 order-2 lg:order-1">
                  <div className="bg-black/40 border border-gray-800 rounded-xl p-6 backdrop-blur-sm sticky top-24">
                      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-800">
                          <div className="w-12 h-12 rounded-full bg-gray-800 overflow-hidden">
                             <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" alt="Matt Gunnin" className="w-full h-full object-cover" />
                          </div>
                          <div>
                             <div className="text-white font-bold text-sm">Matt Gunnin</div>
                             <div className="text-gray-500 text-xs font-mono">CEO, Vertical Labs</div>
                          </div>
                      </div>

                      <div className="space-y-4 mb-8">
                         <div className="flex items-center gap-3 text-sm text-gray-400">
                            <Calendar size={16} className="text-cyber-secondary" /> {post.date}
                         </div>
                         <div className="flex items-center gap-3 text-sm text-gray-400">
                            <Clock size={16} className="text-cyber-secondary" /> {post.readTime}
                         </div>
                      </div>

                      <h4 className="text-xs font-mono text-gray-500 uppercase mb-3">Share Transmission</h4>
                      <div className="flex gap-2">
                         <button onClick={() => handleShare('twitter')} className="p-2 bg-gray-800 hover:bg-[#1DA1F2] hover:text-white text-gray-400 rounded transition-colors"><Share2 size={16} /></button>
                         <button onClick={() => handleShare('linkedin')} className="p-2 bg-gray-800 hover:bg-[#0077b5] hover:text-white text-gray-400 rounded transition-colors"><Linkedin size={16} /></button>
                         <button onClick={() => handleShare('copy')} className="p-2 bg-gray-800 hover:bg-green-600 hover:text-white text-gray-400 rounded transition-colors flex items-center gap-2">
                            {copied ? <span className="text-xs font-bold px-1">COPIED</span> : <Copy size={16} />}
                         </button>
                      </div>
                  </div>
               </div>

               {/* Main Content */}
               <div className="lg:col-span-9 order-1 lg:order-2">
                   <div 
                      className="prose prose-invert prose-lg max-w-none text-gray-300 prose-headings:text-white prose-a:text-cyber-primary prose-strong:text-white prose-blockquote:border-cyber-primary prose-blockquote:bg-gray-900/50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                   />
                   
                   {/* Footer Navigation */}
                   <div className="mt-16 pt-8 border-t border-gray-800">
                      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                         <Hash className="text-cyber-primary" /> Related Transmissions
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         {relatedPosts.map(rp => (
                            <button 
                               key={rp.id}
                               onClick={() => {
                                 onClose(); // Close current to reset scroll/state properly then open new
                                 setTimeout(() => {
                                    const newUrl = `${window.location.pathname}?post=${rp.slug}`;
                                    window.history.pushState({ postSlug: rp.slug }, '', newUrl);
                                    // Trigger a manual event or reload mechanism if needed, 
                                    // but since we are inside the same component, we can just call the parent handler if we had access.
                                    // For now, simpler to just use a link behavior or reload:
                                    window.location.search = `?post=${rp.slug}`;
                                 }, 10);
                               }}
                               className="text-left group bg-black/40 border border-gray-800 p-4 rounded-lg hover:border-cyber-primary transition-all hover:-translate-y-1"
                            >
                               <div className="text-xs font-mono text-gray-500 mb-2">{rp.date}</div>
                               <h4 className="font-bold text-white group-hover:text-cyber-primary transition-colors">{rp.title}</h4>
                            </button>
                         ))}
                         {relatedPosts.length === 0 && (
                            <p className="text-gray-500 italic text-sm">End of related logs.</p>
                         )}
                      </div>
                   </div>
               </div>
           </div>
       </div>
    </div>
  );
};

export default Blog;
