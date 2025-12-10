
import React, { useState } from 'react';
import { Mic, Users, Globe, Video, Calendar, Download, Mail, ArrowRight, Play, Check, Award, MonitorPlay, MessageSquare } from 'lucide-react';
import { SpeakingEngagement } from '../types';

const pastEngagements: SpeakingEngagement[] = [
  {
    id: 'fiber-connect',
    event: 'Fiber Connect 2019',
    date: 'June 2019',
    location: 'Orlando, FL',
    topic: 'Esports Infrastructure & Low Latency Networks',
    type: 'Keynote',
    audienceSize: '3,000+',
    videoUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1200&auto=format&fit=crop',
    description: 'Opening Day Keynote exploring how esports demand for real-time data is driving fiber network adoption.'
  },
  {
    id: 'sxsw-2023',
    event: 'SXSW 2023',
    date: 'March 2023',
    location: 'Austin, TX',
    topic: 'The Future of AI in Gaming',
    type: 'Panel',
    audienceSize: '500+',
    imageUrl: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=1200&auto=format&fit=crop',
    description: 'Panel discussion on generative AI agents in MMORPGs and simulation environments.'
  },
  {
    id: 'techcrunch-disrupt',
    event: 'TechCrunch Disrupt',
    date: 'Sept 2024',
    location: 'San Francisco, CA',
    topic: 'Vertical AI Agents',
    type: 'Workshop',
    audienceSize: '200+',
    imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200&auto=format&fit=crop',
    description: 'Hands-on workshop demonstrating how to build multi-agent swarms using CrewAI.'
  }
];

const topics = [
  {
    title: "The Future of Agentic AI",
    desc: "Why we are moving from Chatbots to Autonomous Agents. The shift from generation to execution.",
    icon: MonitorPlay
  },
  {
    title: "Building Multi-Agent Systems",
    desc: "Technical architecture for enterprise swarms. CrewAI, LangChain, and orchestrating LLMs.",
    icon: Users
  },
  {
    title: "From Startup to Exit",
    desc: "Lessons learned founding 5 companies, raising $10M+ VC, and achieving 2 exits.",
    icon: Award
  },
  {
    title: "AI in Esports",
    desc: "Computer Vision, Real-time Analytics, and the data infrastructure of competitive gaming.",
    icon: Video
  },
  {
    title: "Web3 Communities",
    desc: "Building sustainable, utility-first communities using token-gated access.",
    icon: Globe
  }
];

const stats = [
  { label: 'Conferences', value: '25+' },
  { label: 'Countries', value: '5' },
  { label: 'Audience Reached', value: '50k+' },
];

const Speaking: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', event: '', date: '', details: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Speaking inquiry transmitted. I will be in touch shortly.");
    setFormState({ name: '', email: '', event: '', date: '', details: '' });
  };

  const navigateToBook = () => {
    window.history.pushState(null, '', '/book');
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
    window.scrollTo(0, 0);
  };

  return (
    <section id="speaking" className="py-24 px-6 md:px-24 w-full bg-black relative border-t border-gray-900 min-h-screen">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,60,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,60,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center gap-16 mb-24">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <Mic className="text-cyber-accent" />
              <span className="text-cyber-accent font-mono tracking-widest uppercase text-sm">Speaking & Events</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              INSIGHTS FROM THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-accent to-purple-500">EDGE</span>
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
              I speak about the practical realities of building Agentic AI systems, scaling technical startups, and the future of autonomous software. No fluff, just architectural truths and battle-tested lessons.
            </p>
            <div className="flex gap-4 pt-4">
              <button 
                onClick={navigateToBook}
                className="bg-cyber-accent text-white px-8 py-3 rounded font-bold hover:bg-white hover:text-black transition-all flex items-center gap-2"
              >
                BOOK MATT <ArrowRight size={18} />
              </button>
              <button 
                onClick={() => document.getElementById('media-kit')?.scrollIntoView({ behavior: 'smooth' })}
                className="border border-gray-700 text-gray-300 px-8 py-3 rounded font-bold hover:border-cyber-accent hover:text-cyber-accent transition-all flex items-center gap-2"
              >
                MEDIA KIT <Download size={18} />
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/3 relative">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-gray-800 relative z-10 bg-gray-900">
               {/* Headshot with Fallback */}
               <img 
                 src="/matt.jpg" 
                 onError={(e) => {
                    e.currentTarget.src = "https://www.dropbox.com/scl/fi/hh37mi3k8bfmgm7fsbx70/matt.jpg?rlkey=qtsywzir60666vck9xvwkylci&st=7eip8hni&raw=1";
                 }}
                 alt="Matt Gunnin Speaking" 
                 className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
               <div className="absolute bottom-6 left-6 text-white">
                  <div className="text-2xl font-bold">Matt Gunnin</div>
                  <div className="text-cyber-accent font-mono text-xs">AI Architect & Founder</div>
               </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute top-10 -right-10 w-full h-full border border-gray-800 rounded-2xl -z-10 bg-gray-900/50 hidden md:block"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyber-accent/20 rounded-full blur-[60px] -z-10"></div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-y border-gray-900 py-12 mb-24 bg-black/50 backdrop-blur-sm">
           {stats.map((stat, i) => (
             <div key={i} className="text-center">
               <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
               <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">{stat.label}</div>
             </div>
           ))}
        </div>

        {/* Topics Section */}
        <div className="mb-24">
           <h3 className="text-2xl font-bold text-white mb-12 flex items-center gap-3">
             <span className="w-8 h-1 bg-cyber-accent inline-block"></span>
             KEYNOTE TOPICS
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topics.map((topic, i) => (
                <div key={i} className="bg-gray-900/30 border border-gray-800 p-8 rounded-xl hover:bg-gray-900/50 hover:border-cyber-accent/50 transition-all group">
                   <div className="w-12 h-12 bg-black rounded-lg border border-gray-700 flex items-center justify-center mb-6 group-hover:border-cyber-accent group-hover:text-cyber-accent transition-colors">
                      <topic.icon className="text-gray-400 group-hover:text-cyber-accent" />
                   </div>
                   <h4 className="text-xl font-bold text-white mb-3 group-hover:text-cyber-accent transition-colors">{topic.title}</h4>
                   <p className="text-gray-400 text-sm leading-relaxed">{topic.desc}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Past Engagements */}
        <div className="mb-24">
           <h3 className="text-2xl font-bold text-white mb-12 flex items-center gap-3">
             <span className="w-8 h-1 bg-purple-500 inline-block"></span>
             SELECTED APPEARANCES
           </h3>
           <div className="space-y-8">
              {pastEngagements.map((engagement) => (
                <div key={engagement.id} className="group relative bg-gray-900/20 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-600 transition-all flex flex-col md:flex-row">
                   <div className="md:w-1/3 relative h-48 md:h-auto overflow-hidden">
                      <div className="absolute inset-0 bg-cyber-accent/10 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity"></div>
                      <img src={engagement.imageUrl} alt={engagement.event} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      {engagement.videoUrl && (
                        <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                           <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border border-white/50">
                              <Play className="text-white fill-white ml-1" size={20} />
                           </div>
                        </div>
                      )}
                   </div>
                   <div className="p-8 md:w-2/3 flex flex-col justify-center">
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                         <span className="text-cyber-accent font-mono text-xs font-bold uppercase">{engagement.event}</span>
                         <span className="text-gray-500 text-xs font-mono flex items-center gap-1"><Calendar size={12}/> {engagement.date}</span>
                         <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-[10px] uppercase font-bold border border-gray-700">{engagement.type}</span>
                      </div>
                      <h4 className="text-2xl font-bold text-white mb-3">{engagement.topic}</h4>
                      <p className="text-gray-400 text-sm mb-6">{engagement.description}</p>
                      <div className="flex items-center text-xs text-gray-500 font-mono gap-4">
                         <span className="flex items-center gap-1"><Users size={12} /> Audience: {engagement.audienceSize}</span>
                         <span className="flex items-center gap-1"><Globe size={12} /> {engagement.location}</span>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Offerings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24 bg-gray-900/20 border border-gray-800 rounded-2xl p-8 md:p-12">
           <div>
              <h3 className="text-3xl font-bold text-white mb-6">Engagement Formats</h3>
              <p className="text-gray-400 mb-8">
                 Whether you need a high-energy keynote to open your conference or a technical workshop for your engineering team, I tailor my content to your audience.
              </p>
              <ul className="space-y-4">
                 {[
                    'Keynote Presentation (45-60 min)',
                    'Executive Workshop (Half-day)',
                    'Panel Moderation or Participation',
                    'Fireside Chat / Q&A',
                    'Podcast Guest Appearance'
                 ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                       <Check className="text-cyber-accent" size={18} /> {item}
                    </li>
                 ))}
              </ul>
           </div>
           
           {/* Booking Form */}
           <div id="booking" className="bg-black border border-gray-800 p-8 rounded-xl">
              <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Mail size={20} /> Request Availability</h4>
              <form onSubmit={handleSubmit} className="space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="Name" 
                      className="bg-gray-900 border border-gray-700 rounded p-3 text-white text-sm focus:border-cyber-accent outline-none"
                      value={formState.name}
                      onChange={e => setFormState({...formState, name: e.target.value})}
                      required
                    />
                    <input 
                      type="email" 
                      placeholder="Email" 
                      className="bg-gray-900 border border-gray-700 rounded p-3 text-white text-sm focus:border-cyber-accent outline-none"
                      value={formState.email}
                      onChange={e => setFormState({...formState, email: e.target.value})}
                      required
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="Event Name" 
                      className="bg-gray-900 border border-gray-700 rounded p-3 text-white text-sm focus:border-cyber-accent outline-none"
                      value={formState.event}
                      onChange={e => setFormState({...formState, event: e.target.value})}
                    />
                    <input 
                      type="text" 
                      placeholder="Date(s)" 
                      className="bg-gray-900 border border-gray-700 rounded p-3 text-white text-sm focus:border-cyber-accent outline-none"
                      value={formState.date}
                      onChange={e => setFormState({...formState, date: e.target.value})}
                    />
                 </div>
                 <textarea 
                    placeholder="Tell me about your event (Audience, Topic, Budget Range)..." 
                    rows={4}
                    className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white text-sm focus:border-cyber-accent outline-none"
                    value={formState.details}
                    onChange={e => setFormState({...formState, details: e.target.value})}
                 ></textarea>
                 <button className="w-full bg-cyber-accent text-white font-bold py-3 rounded hover:bg-white hover:text-black transition-colors">
                    SEND INQUIRY
                 </button>
              </form>
           </div>
        </div>

        {/* Testimonials */}
        <div className="mb-24 text-center">
            <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-8">What Organizers Say</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-gray-900/30 p-8 rounded-xl border border-gray-800 relative">
                  <MessageSquare className="text-gray-700 absolute top-6 left-6 opacity-20" size={48} />
                  <p className="text-gray-300 italic mb-6 relative z-10">"Matt's ability to explain complex AI architectures to a non-technical executive audience is unmatched. He was the highlight of our innovation summit."</p>
                  <div className="text-white font-bold">Sarah Jenkins</div>
                  <div className="text-cyber-accent text-xs">Event Director, TechFlow 2024</div>
               </div>
               <div className="bg-gray-900/30 p-8 rounded-xl border border-gray-800 relative">
                  <MessageSquare className="text-gray-700 absolute top-6 left-6 opacity-20" size={48} />
                  <p className="text-gray-300 italic mb-6 relative z-10">"We've had many speakers talk about 'The Future of Tech', but Matt actually showed us how to build it. The workshop was incredibly actionable."</p>
                  <div className="text-white font-bold">David Chen</div>
                  <div className="text-cyber-accent text-xs">CTO, Nexus Corp</div>
               </div>
            </div>
        </div>

        {/* Media Kit */}
        <div id="media-kit" className="border-t border-gray-900 pt-24">
           <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                 <h3 className="text-2xl font-bold text-white mb-2">Media Kit</h3>
                 <p className="text-gray-400 text-sm">High-res headshots, short/long bios, and speaker introduction scripts.</p>
              </div>
              <div className="flex gap-4">
                 <button className="flex items-center gap-2 bg-gray-900 border border-gray-700 text-white px-6 py-3 rounded hover:border-cyber-accent transition-colors">
                    <Download size={16} /> Download Headshots (.zip)
                 </button>
                 <button className="flex items-center gap-2 bg-gray-900 border border-gray-700 text-white px-6 py-3 rounded hover:border-cyber-accent transition-colors">
                    <Download size={16} /> Download Bio (.pdf)
                 </button>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
};

export default Speaking;
