
import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, Filter, Share2, Linkedin, Copy, Clock, Hash, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { BlogPost } from '../types.ts';
import ReturnButton from './ReturnButton.tsx';
import SEO from './SEO.tsx';
import Breadcrumbs from './Breadcrumbs.tsx';

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
      
      <div class="code-block">
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
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank', 'noopener noreferrer');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank', 'noopener noreferrer');
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
    <div className="animate-[slideUp_0.4s_ease-out] w-full min-h-screen bg-cyber-black pb-24">
       <SEO 
         title={`${post.title} | Matt Gunnin`}
         description={post.excerpt}
         image={post.image}
         type="article"
         schema={{
             "@context": "https://schema.org",
             "@type": "BlogPosting",
             "headline": post.title,
             "image": post.image,
             "description": post.excerpt,
             "author": {
                 "@type": "Person",
                 "name": post.author
             },
             "datePublished": post.date
         }}
         breadcrumbs={[
             { name: 'Home', item: '/' },
             { name: 'Blog', item: '/blog' },
             { name: post.title, item: `/blog/${post.slug}` }
         ]}
       />

       <style>{`
        .blog-content p { margin-bottom: 1.5rem; line-height: 1.8; color: #d1d5db; }
        .blog-content h3 { font-size: 1.75rem; font-weight: 700; margin-top: 3rem; margin-bottom: 1.5rem; color: white; border-left: 4px solid #00f0ff; padding-left: 1rem; }
        .blog-content ul, .blog-content ol { margin-bottom: 1.5rem; padding-left: 2rem; color: #d1d5db; }
        .blog-content ul { list-style-type: disc; }
        .blog-content ol { list-style-type: decimal; }
        .blog-content li { margin-bottom: 0.75rem; padding-left: 0.5rem; }
        .blog-content strong { color: #fff; font-weight: 700; }
        .blog-content blockquote { border-left: 4px solid #7000ff; background: rgba(112,0,255,0.1); padding: 1.5rem; margin: 2rem 0; font-style: italic; color: #e5e7eb; border-radius: 0 8px 8px 0; }
        .blog-content code { background: #111827; color: #00f0ff; padding: 0.2em 0.4em; border-radius: 4px; font-family: 'Fira Code', monospace; font-size: 0.9em; border: 1px solid #374151; }
        .blog-content .code-block { background: #050505; padding: 1.5rem; border-radius: 8px; border: 1px solid #333; margin: 2rem 0; overflow-x: auto; font-family: 'Fira Code', monospace; font-size: 0.9rem; }
       `}</style>

       <div className="container mx-auto px-4 md:px-6 py-8">
           <div className="mb-6">
                <ReturnButton onClick={onClose} label="RETURN TO LOGS" />
           </div>

           <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
               <div 
                  className="relative h-72 md:h-96 w-full overflow-hidden cursor-crosshair group"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={() => setParallaxOffset({ x: 0, y: 0 })}
               >
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
                   
                   <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_20%,#111827_100%)] opacity-80" />
                   
                   <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20">
                      <Breadcrumbs items={[
                          { label: 'Blog', href: '/blog' },
                          { label: post.title, href: `/blog/${post.slug}` }
                      ]} />
                      
                      <div className="flex flex-wrap gap-2 mb-4 mt-4">
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
                   <div className="lg:col-span-3 space-y-8 order-2 lg:order-1">
                      <div className="bg-black/40 border border-gray-800 rounded-xl p-6 backdrop-blur-sm sticky top-24">
                          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-800">
                              <div className="w-12 h-12 rounded-full bg-gray-800 overflow-hidden">
                                 <img 
                                    src="https://www.dropbox.com/scl/fi/hh37mi3k8bfmgm7fsbx70/matt.jpg?rlkey=qtsywzir60666vck9xvwkylci&st=7eip8hni&raw=1" 
                                    alt="Matt Gunnin" 
                                    className="w-full h-full object-cover" 
                                 />
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

                   <div className="lg:col-span-9 order-1 lg:order-2">
                       <div 
                          className="blog-content text-gray-300 text-lg leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: post.content }}
                       />
                       
                       <div className="mt-16 pt-8 border-t border-gray-800">
                          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                             <Hash className="text-cyber-primary" /> Related Transmissions
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             {relatedPosts.map(rp => (
                                <a 
                                   key={rp.id}
                                   href={`#/blog/${rp.slug}`}
                                   onClick={(e) => {
                                      e.preventDefault();
                                      window.location.hash = `/blog/${rp.slug}`;
                                   }}
                                   className="text-left group bg-black/40 border border-gray-800 p-4 rounded-lg hover:border-cyber-primary transition-all hover:-translate-y-1 block"
                                >
                                   <div className="text-xs font-mono text-gray-500 mb-2">{rp.date}</div>
                                   <h4 className="font-bold text-white group-hover:text-cyber-primary transition-colors">{rp.title}</h4>
                                </a>
                             ))}
                          </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>
    </div>
  );
};

interface BlogProps { standalone?: boolean; }

const Blog: React.FC<BlogProps> = ({ standalone = false }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const [page, setPage] = useState(1);
  const POSTS_PER_PAGE = 6;

  useEffect(() => {
    const handleRoute = () => {
        const hash = window.location.hash;
        let path = hash.startsWith('#') ? hash.substring(1) : hash;
        if (!standalone && path.startsWith('/blog/')) { setSelectedPost(null); return; }
        if (path.startsWith('/blog/')) {
            const slug = path.split('/blog/')[1]?.split('?')[0].split('#')[0].replace(/\/$/, '');
            const post = blogPosts.find(p => p.slug === slug);
            if (post) { setSelectedPost(post); return; }
        }
        setSelectedPost(null);
    };
    handleRoute();
    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('popstate', handleRoute);
    return () => {
        window.removeEventListener('hashchange', handleRoute);
        window.removeEventListener('popstate', handleRoute);
    };
  }, [standalone]);

  const handleOpenPost = (e: React.MouseEvent, post: BlogPost) => {
    e.preventDefault();
    window.location.hash = `/blog/${post.slug}`;
  };

  const handleClosePost = () => {
    if (standalone) window.location.hash = '/blog';
    else window.location.hash = '/';
  };

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation();
    setActiveTag(tag);
    setPage(1); 
    if (selectedPost) handleClosePost();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setParallaxOffset({ x, y });
  };

  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));
  const filteredPosts = activeTag ? blogPosts.filter(post => post.tags.includes(activeTag)) : blogPosts;
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const displayPosts = filteredPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  return (
    <section id="blog" className={`${standalone ? 'min-h-screen pt-24' : 'py-24 border-t border-gray-900'} px-6 md:px-24 w-full bg-cyber-black relative`}>
      <div className="max-w-7xl mx-auto">
        {!selectedPost && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 animate-[fadeIn_0.5s_ease-out]">
             <div className="space-y-4">
                 {standalone && (
                    <div className="mb-4">
                        <ReturnButton onClick={() => window.location.hash = '/'} label="RETURN TO BASE" />
                    </div>
                 )}
                 <div className="flex items-end gap-4">
                     <h2 className="text-4xl md:text-5xl font-bold text-white">TRANSMISSIONS</h2>
                 </div>
             </div>
             <div className="flex flex-wrap gap-2">
               <button onClick={() => setActiveTag(null)} className={`px-4 py-1.5 text-xs font-mono rounded-full border ${activeTag === null ? 'bg-cyber-primary text-black border-cyber-primary' : 'text-gray-400 border-gray-800'}`}>ALL</button>
               {allTags.map(tag => (
                 <button key={tag} onClick={(e) => handleTagClick(e, tag)} className={`px-4 py-1.5 text-xs font-mono rounded-full border ${activeTag === tag ? 'bg-cyber-primary text-black border-cyber-primary' : 'text-gray-400 border-gray-800'}`}>{tag}</button>
               ))}
             </div>
          </div>
        )}

        {selectedPost ? (
          <SinglePostView post={selectedPost} onClose={handleClosePost} onTagClick={handleTagClick} parallaxOffset={parallaxOffset} handleMouseMove={handleMouseMove} setParallaxOffset={setParallaxOffset} />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayPosts.map(post => (
                <a key={post.id} href={`#/blog/${post.slug}`} onClick={(e) => handleOpenPost(e, post)} className="group bg-gray-900/30 border border-gray-800 p-6 rounded-xl transition-all block">
                  <div className="flex justify-between items-start mb-4 text-xs font-mono text-gray-500"><span>{post.date}</span><span>{post.readTime}</span></div>
                  <h3 className="text-xl font-bold text-gray-100 group-hover:text-cyber-primary transition-colors mb-3">{post.title}</h3>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-3">{post.excerpt}</p>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
export default Blog;
