import React from 'react';
import { Cpu, Globe, Zap, Code, Layout, Network } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-24 w-full relative">
       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
         
         <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              <span className="text-cyber-primary">01.</span> ABOUT MATT
            </h2>
            
            <div className="prose prose-invert prose-lg text-gray-300">
               <p className="leading-relaxed">
                 I am an AI entrepreneur and technology leader specializing in <span className="text-white font-bold">agentic AI systems</span>, <span className="text-white font-bold">multi-agent architectures</span>, and autonomous solutions. 
               </p>
               <p className="leading-relaxed">
                 With a proven track record as a <span className="text-cyber-primary">5x technical founder</span> with 2 exits, I have raised over <span className="text-white">$7M in venture capital</span> and delivered products used by giants like Riot Games, the NFL, NBA, and Fortune 500 brands.
               </p>
               <p className="leading-relaxed">
                 Currently, I am the Founder/CEO of <strong className="text-white">Vertical Labs</strong> in Austin, TX, where we are architecting sophisticated AI agents that empower businesses to thrive in an AI-driven world. My passion lies in leveraging cutting-edge frameworks like CrewAI, Eliza, and OpenAI Swarm to create transformative business solutions.
               </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4">
               <div className="p-4 border border-gray-800 bg-gray-900/20 rounded-lg hover:bg-gray-900/50 transition-colors">
                  <Network className="text-cyber-primary mb-3" />
                  <h4 className="text-white font-bold mb-1">Multi-Agent Systems</h4>
                  <p className="text-xs text-gray-500">Orchestrating autonomous swarms</p>
               </div>
               <div className="p-4 border border-gray-800 bg-gray-900/20 rounded-lg hover:bg-gray-900/50 transition-colors">
                  <Zap className="text-cyber-secondary mb-3" />
                  <h4 className="text-white font-bold mb-1">High-Scale Startups</h4>
                  <p className="text-xs text-gray-500">From 0 to millions of users</p>
               </div>
            </div>
         </div>

         <div className="relative h-[500px] w-full hidden lg:block">
            {/* Artistic Tech Representation using CSS shapes */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyber-primary/20 to-cyber-secondary/20 rounded-full blur-[100px]"></div>
            
            <div className="relative z-10 w-full h-full flex items-center justify-center">
               <div className="relative w-80 h-96 bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl rotate-6 hover:rotate-0 transition-all duration-700 overflow-hidden group">
                  {/* Fake Code Editor */}
                  <div className="absolute top-0 w-full h-8 bg-black flex items-center px-3 gap-2 border-b border-gray-800">
                     <div className="w-3 h-3 rounded-full bg-red-500"></div>
                     <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                     <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="p-6 pt-12 font-mono text-xs text-gray-400 space-y-2 opacity-80 group-hover:opacity-100 transition-opacity">
                     <div className="text-purple-400">class <span className="text-yellow-300">VerticalLabs</span>:</div>
                     <div className="pl-4">def <span className="text-blue-400">__init__</span>(self):</div>
                     <div className="pl-8">self.mission = <span className="text-green-300">"Autonomous Future"</span></div>
                     <div className="pl-8">self.stack = [<span className="text-green-300">"CrewAI"</span>, <span className="text-green-300">"Swarm"</span>, <span className="text-green-300">"RAG"</span>]</div>
                     <div className="pl-4">def <span className="text-blue-400">deploy_agent</span>(self, goal):</div>
                     <div className="pl-8 text-gray-500"># Orchestrating intelligence...</div>
                     <div className="pl-8">return <span className="text-blue-300">Agent</span>(goal, autonomy=<span className="text-purple-400">True</span>)</div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute bottom-10 -right-10 w-32 h-32 bg-cyber-primary/20 rounded-full blur-xl animate-pulse"></div>
               </div>
               
               <div className="absolute -bottom-6 -left-6 w-64 h-32 glass-panel rounded-xl p-4 border-l-4 border-cyber-secondary shadow-lg animate-[float_4s_ease-in-out_infinite]">
                  <div className="flex items-center gap-3 mb-2">
                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                     <span className="text-xs font-mono text-gray-400">LIVE SYSTEM</span>
                  </div>
                  <div className="text-white font-bold text-lg">Deploying Agents...</div>
               </div>
            </div>
         </div>

       </div>
    </section>
  );
};

export default About;