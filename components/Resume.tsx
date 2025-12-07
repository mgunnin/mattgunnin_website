import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Briefcase, Code, Terminal, ChevronRight, Award, School } from 'lucide-react';
import { Experience, Skill } from '../types';

const experiences: Experience[] = [
  {
    id: 'vl',
    role: 'Founder/CEO',
    company: 'Vertical Labs',
    period: '2024 - Present',
    description: [
      'Founded a first-of-its-kind AI agency specializing in sophisticated multi-agent AI systems.',
      'Architecting and deploying agentic AI solutions using CrewAI, Eliza, and OpenAI Swarm.',
      'Implementing vector database solutions and RAG pipelines for enterprise knowledge management.',
      'Leading strategic AI implementation consulting for high-ROI business process automation.'
    ],
    tech: ['CrewAI', 'OpenAI Swarm', 'Python', 'Vector DB', 'RAG', 'Eliza']
  },
  {
    id: 'es1',
    role: 'Founder/CEO',
    company: 'Esports One',
    period: '2016 - 2023',
    description: [
      'Founded and led a tech startup raising $7M+ from top VCs (Eniac, XSeed, Quake).',
      'Spearheaded Computer Vision & RL tech implementation for real-time data capture.',
      'Developed stats dashboards for Riot Games, NBA, NFL, and Fortune 500 brands.',
      'Grew platform to 150k+ MAU with NFT membership passes (92k+ minted).'
    ],
    tech: ['Computer Vision', 'Reinforcement Learning', 'Web3', 'Blockchain', 'Analytics']
  },
  {
    id: 'ep',
    role: 'Founder/CEO',
    company: 'Esportspedia',
    period: '2015 - 2023',
    description: [
      'Launched comprehensive esports info hub visited by millions monthly.',
      'Managed a team of 10 employees and 100+ volunteer contributors.',
      'Covered major titles (LoL, CoD, Halo) and built strong industry partnerships.'
    ],
    tech: ['MediaWiki', 'PHP', 'Community Mgmt', 'SEO', 'Product Strategy']
  },
  {
    id: 'uk',
    role: 'Chief Product Officer',
    company: 'Unikrn',
    period: '2015 - 2016',
    description: [
      'Led product innovation for a cutting-edge esports gambling platform.',
      'Designed strategy for real-money wagering across Europe and Australia.',
      'Managed global development teams transitioning to agile methodologies.'
    ],
    tech: ['Product Mgmt', 'Agile', 'Compliance', 'Betting Systems']
  },
  {
    id: 'az',
    role: 'VP Content',
    company: 'Azubu',
    period: '2015 - 2016',
    description: [
      'Directed site-wide content initiatives for a leading esports streaming company.',
      'Led multi-million dollar partnership with KeSPA (Korean Esports Association).',
      'Managed content curation for 20 teams and 200+ players.'
    ],
    tech: ['Streaming', 'Content Strategy', 'Partnerships']
  },
  {
    id: 'lp',
    role: 'Founder/CEO',
    company: 'Leaguepedia',
    period: '2011 - 2014',
    description: [
      'Founded global go-to resource for League of Legends.',
      'Grew to 12M monthly pageviews and 3M MAUs within first year.',
      'Acquired multiple companies (LoLVODs, League Fantasy).',
      'Organized charity tournaments raising tens of thousands of dollars.'
    ],
    tech: ['Wiki Frameworks', 'Event Mgmt', 'Growth Hacking']
  },
  {
    id: 'rs',
    role: 'Lead System Engineer',
    company: 'Rackspace',
    period: '2010 - 2012',
    description: [
      'Led cross-functional teams in designing complex systems architectures.',
      'Managed XenServer hypervisors and Cloud Servers for enterprise clients.',
      'Developed disaster recovery plans and monitored mission-critical systems.'
    ],
    tech: ['Linux', 'XenServer', 'Cloud Computing', 'System Arch']
  }
];

const skills: Skill[] = [
  { name: 'Agentic AI / Multi-Agent Systems', level: 98, category: 'AI' },
  { name: 'SOTA LLMs (GPT-5.1, Claude 4.5, Gemini 3)', level: 96, category: 'AI' },
  { name: 'Open Source AI (Llama 4, DeepSeek, Mistral)', level: 92, category: 'AI' },
  { name: 'CrewAI / Eliza / Swarm / LangChain', level: 94, category: 'AI' },
  { name: 'React / Next.js 15 / TypeScript', level: 92, category: 'Frontend' },
  { name: 'Python / Django / FastAPI', level: 88, category: 'Backend' },
  { name: 'Startups & Venture Capital', level: 95, category: 'Tools' },
  { name: 'Product Management', level: 90, category: 'Tools' },
  { name: 'Web3 / Blockchain / NFTs', level: 85, category: 'Backend' },
];

const Resume: React.FC = () => {
  const [hoveredExp, setHoveredExp] = useState<string | null>(null);
  const [showSkills, setShowSkills] = useState(false);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowSkills(true);
          observer.disconnect(); // Only trigger once
        }
      },
      { threshold: 0.2 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="resume" className="py-24 px-6 md:px-24 w-full relative bg-cyber-black">
      {/* Grid Background Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,18,0.8)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-2">
              <span className="text-cyber-primary">02.</span> RESUME
            </h2>
            <p className="text-gray-400 font-mono">14+ Years of Innovation. 5x Founder.</p>
          </div>
          <a href="/resume.pdf" className="px-6 py-2 border border-cyber-primary text-cyber-primary hover:bg-cyber-primary hover:text-black transition-colors duration-300 font-mono text-sm uppercase flex items-center gap-2">
            <Terminal size={16} />
            Download PDF
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Experience Timeline */}
          <div className="lg:col-span-7 space-y-8">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2 mb-8">
              <Briefcase className="text-cyber-secondary" /> Experience
            </h3>
            
            <div className="relative border-l border-gray-800 ml-3 space-y-12">
              {experiences.map((exp) => (
                <div 
                  key={exp.id} 
                  className="relative pl-8 group"
                  onMouseEnter={() => setHoveredExp(exp.id)}
                  onMouseLeave={() => setHoveredExp(null)}
                >
                  {/* Timeline Node */}
                  <div className={`absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    hoveredExp === exp.id 
                      ? 'bg-cyber-primary scale-150 shadow-[0_0_10px_#00f0ff]' 
                      : 'bg-gray-700'
                  }`} />

                  <div className={`p-6 rounded-xl border transition-all duration-300 ${
                    hoveredExp === exp.id
                      ? 'bg-gray-900/80 border-cyber-primary/50 translate-x-2'
                      : 'bg-gray-900/30 border-gray-800'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-white group-hover:text-cyber-primary transition-colors">
                          {exp.role}
                        </h4>
                        <div className="text-cyber-secondary font-mono text-sm">{exp.company}</div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 font-mono text-xs mt-2 sm:mt-0 bg-black/50 px-3 py-1 rounded-full border border-gray-800">
                        <Calendar size={12} />
                        {exp.period}
                      </div>
                    </div>
                    
                    <ul className="space-y-2 mb-4">
                      {exp.description.map((desc, i) => (
                        <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                          <ChevronRight size={14} className="mt-1 text-cyber-primary shrink-0" />
                          {desc}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-800/50">
                      {exp.tech.map((t) => (
                        <span key={t} className="text-xs font-mono text-gray-500 bg-black/30 px-2 py-1 rounded hover:text-cyber-primary transition-colors">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="pl-8 text-gray-500 text-sm italic">
                ... Previous roles at Lexicom (SysAdmin), Auburn Engineers (IT Manager), Dataracks (COO), GamerToBe (Founder).
              </div>
            </div>
          </div>

          {/* Skills & Certs */}
          <div className="lg:col-span-5 space-y-12">
             {/* Skills */}
            <div ref={skillsRef}>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2 mb-8">
                <Code className="text-cyber-primary" /> Skill Matrix
              </h3>
              <div className="grid gap-6">
                {skills.map((skill, index) => (
                  <div key={skill.name} className="group">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 font-mono text-sm group-hover:text-cyber-primary transition-colors">{skill.name}</span>
                      <span className="text-gray-500 text-xs">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyber-primary to-cyber-secondary relative transition-all duration-1000 ease-out"
                        style={{ 
                          width: showSkills ? `${skill.level}%` : '0%',
                          transitionDelay: `${index * 50}ms`
                        }}
                      >
                         <div className="absolute top-0 right-0 h-full w-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2 mb-6">
                <School className="text-cyber-accent" /> Education
              </h3>
              <div className="p-4 border border-gray-800 bg-gray-900/20 rounded-lg">
                  <div className="text-white font-bold">Auburn University</div>
                  <div className="text-cyber-primary text-sm mb-2">2004 - 2009</div>
                  <p className="text-gray-400 text-sm">
                    Bachelor's Degree in Computer Engineering<br/>
                    Minor in Business Administration
                  </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;