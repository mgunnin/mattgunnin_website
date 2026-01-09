
import React from 'react';
import { ExternalLink, ArrowRight, Newspaper, TrendingUp, Award } from 'lucide-react';

const pressItems = [
  {
    id: 1,
    outlet: "TechCrunch",
    title: "Esports One raises $3M to bring computer vision to esports analytics",
    date: "Jan 24, 2018",
    excerpt: "Esports One wants to create a real-time data layer for esports broadcasts using computer vision technology. The round was led by XSeed Capital and Eniac Ventures.",
    link: "https://techcrunch.com/2018/01/24/esports-one-raises-3m-to-bring-computer-vision-to-esports-analytics/",
    category: "Funding"
  },
  {
    id: 2,
    outlet: "VentureBeat",
    title: "Esports One raises $4 million to expand its fantasy esports platform",
    date: "Feb 27, 2020",
    excerpt: "The round brings Esports One's total raised to over $7 million. The company uses computer vision to capture real-time data from game streams for its fantasy platform.",
    link: "https://venturebeat.com/games/esports-one-raises-4-million-to-expand-its-fantasy-esports-platform/",
    category: "Growth"
  },
  {
    id: 3,
    outlet: "Forbes",
    title: "How Esports One Is Using Computer Vision To Change The Game",
    date: "May 15, 2018",
    excerpt: "Matt Gunnin discusses how specialized computer vision models can extract game state in real-time, providing broadcasters with unprecedented depth of information.",
    link: "https://www.forbes.com/sites/mattgunnin/2018/05/15/how-computer-vision-is-changing-esports/",
    category: "Tech"
  },
  {
    id: 4,
    outlet: "The Esports Observer",
    title: "Esports One Raises $3M in Seed Round Led by XSeed Capital",
    date: "Jan 24, 2018",
    excerpt: "The funding will be used to expand the company's engineering team and further develop its proprietary computer vision technology 'OneView'.",
    link: "#",
    category: "Business"
  },
  {
    id: 5,
    outlet: "Product Hunt",
    title: "#1 Product of the Day: Esports One Fantasy",
    date: "Mar 12, 2020",
    excerpt: "Community voted #1 product of the day. The first all-in-one fantasy platform for League of Legends, featuring real-time scoring and computer vision integration.",
    link: "#",
    category: "Product"
  },
  {
    id: 6,
    outlet: "Cheddar",
    title: "Esports One CEO on the Future of Data in Gaming",
    date: "Aug 14, 2019",
    excerpt: "Live TV interview discussing the role of advanced analytics, real-time data pipelines, and the future of the esports industry.",
    link: "#",
    category: "Interview"
  }
];

const Press: React.FC = () => {
  return (
    <section id="press" className="py-24 px-6 md:px-24 w-full bg-black relative border-t border-gray-900">
       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-40"></div>
       
       <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
             <div>
               <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center gap-3">
                 IN THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-blue-500">MEDIA</span>
               </h2>
               <p className="text-gray-400 max-w-xl">
                 Coverage of my work in AI, Computer Vision, and Esports technology from leading publications.
               </p>
             </div>
             <div className="flex items-center gap-2 text-xs font-mono text-gray-500 bg-gray-900/50 px-3 py-1 rounded-full border border-gray-800">
                <Newspaper size={14} />
                <span>25+ FEATURED ARTICLES</span>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {pressItems.map((item) => (
                <a 
                  key={item.id} 
                  href={item.link}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group bg-gray-900/20 border border-gray-800 p-8 rounded-xl hover:bg-gray-900/40 hover:border-cyber-primary/30 transition-all duration-300 flex flex-col h-full hover:-translate-y-1 relative overflow-hidden"
                >
                   {/* Decoration */}
                   <div className="absolute top-0 right-0 w-20 h-20 bg-cyber-primary/5 rounded-full blur-2xl group-hover:bg-cyber-primary/10 transition-colors"></div>

                   <div className="flex justify-between items-start mb-6 relative z-10">
                      <span className="text-2xl font-bold text-gray-200 font-mono tracking-tight group-hover:text-cyber-primary transition-colors">
                        {item.outlet}
                      </span>
                      <ExternalLink size={18} className="text-gray-600 group-hover:text-cyber-primary transition-colors" />
                   </div>

                   <h3 className="text-xl font-bold text-white mb-4 leading-snug group-hover:text-gray-100">
                     {item.title}
                   </h3>

                   <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
                     {item.excerpt}
                   </p>

                   <div className="flex items-center justify-between pt-4 border-t border-gray-800/50 mt-auto">
                      <span className="text-xs text-gray-500 font-mono">{item.date}</span>
                      <span className="text-[10px] uppercase font-bold text-cyber-secondary bg-cyber-secondary/10 px-2 py-1 rounded border border-cyber-secondary/20">
                         {item.category}
                      </span>
                   </div>
                </a>
             ))}
          </div>

          {/* Press Kit CTA */}
          <div className="mt-16 bg-gray-900/30 border border-gray-800 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-sm">
             <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center border border-gray-700 text-cyber-primary shrink-0">
                   <TrendingUp size={32} />
                </div>
                <div>
                   <h3 className="text-xl font-bold text-white mb-1">Looking for a quote?</h3>
                   <p className="text-gray-400 text-sm">
                      I am available for commentary on Agentic AI, Large Language Models, and the future of software architecture.
                   </p>
                </div>
             </div>
             <a href="#contact" className="px-8 py-3 bg-white text-black font-bold rounded hover:bg-cyber-primary transition-colors flex items-center gap-2 whitespace-nowrap">
                GET IN TOUCH <ArrowRight size={18} />
             </a>
          </div>
       </div>
    </section>
  );
};

export default Press;
