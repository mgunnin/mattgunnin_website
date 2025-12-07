import React, { useState, useEffect } from 'react';
import { Network, Zap } from 'lucide-react';

const codeSnippets = [
  `class VerticalLabs:
  def __init__(self):
    self.mission = "Autonomous Future"
    self.models = ["GPT-5.1", "Gemini-3"]

  def deploy_agent(self, goal):
    # Orchestrating swarm intelligence
    agent = Agent(role="Architect")
    return agent.execute(goal)`,

  `const NeuralInterface = () => {
  const [status, setStatus] = useState('ACTIVE');
  
  useEffect(() => {
    // Establishing neural uplink
    connectToGemini({ model: 'gemini-3-pro' });
  }, []);

  return <HolographicHUD status={status} />;
}`,

  `contract AccessPass is ERC721 {
  constructor() ERC721("Vertical", "VL") {}

  function mintAccess(address user) external {
    // Verifying on-chain credentials
    require(hasQuals(user), "Access Denied");
    _mint(user, nextId++);
  }
}`
];

const highlightCode = (code: string) => {
  return code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/(class|def|const|interface|return|function|import|from|async|await|contract|constructor|require|emit|if|else|var|let)/g, '<span class="text-purple-400">$1</span>')
    .replace(/(self|this)/g, '<span class="text-red-400 italic">$1</span>')
    .replace(/(&quot;.*?&quot;|&#039;.*?&#039;)/g, '<span class="text-green-300">$1</span>')
    .replace(/\b(VerticalLabs|Agent|NeuralConfig|NeuralInterface|AccessPass|ERC721|HolographicHUD|useEffect|useState)\b/g, '<span class="text-yellow-300">$1</span>')
    .replace(/(#.*|\/\/.*)/g, '<span class="text-gray-500 italic">$1</span>')
    .replace(/\b(console|log|print|connectToGemini|_mint|hasQuals)\b/g, '<span class="text-blue-300">$1</span>')
    .replace(/(\[|\]|\{|\}|\(|\))/g, '<span class="text-cyber-primary">$1</span>');
};

const About: React.FC = () => {
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
      const typeSpeed = isDeleting ? 20 : 50; // Typing vs Deleting speed
      const currentSnippet = codeSnippets[snippetIndex];
      
      const timeout = setTimeout(() => {
          if (!isDeleting && charIndex < currentSnippet.length) {
              // Typing
              setCharIndex(prev => prev + 1);
          } else if (!isDeleting && charIndex === currentSnippet.length) {
              // Pause at end before deleting
              setTimeout(() => setIsDeleting(true), 2000);
          } else if (isDeleting && charIndex > 0) {
              // Deleting
              setCharIndex(prev => Math.max(0, prev - 2)); 
          } else if (isDeleting && charIndex <= 0) {
              // Move to next snippet
              setIsDeleting(false);
              setSnippetIndex(prev => (prev + 1) % codeSnippets.length);
          }
      }, typeSpeed);

      return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, snippetIndex]);

  const displayedCode = highlightCode(codeSnippets[snippetIndex].substring(0, charIndex));

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
                 Currently, I am the Founder/CEO of <strong className="text-white">Vertical Labs</strong> in Austin, TX, where we are architecting sophisticated AI agents using <strong className="text-cyber-secondary">GPT-5.1, Claude 4.5, and Gemini 3</strong>. My passion lies in leveraging cutting-edge frameworks like CrewAI, Eliza, and OpenAI Swarm to create transformative business solutions.
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
               <div className="relative w-96 h-[450px] bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl rotate-3 hover:rotate-0 transition-all duration-700 overflow-hidden group">
                  {/* Fake Code Editor Header */}
                  <div className="absolute top-0 w-full h-8 bg-black flex items-center px-3 gap-2 border-b border-gray-800 z-20">
                     <div className="w-3 h-3 rounded-full bg-red-500"></div>
                     <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                     <div className="w-3 h-3 rounded-full bg-green-500"></div>
                     <div className="ml-auto text-[10px] font-mono text-gray-600">active_agent.py</div>
                  </div>

                  {/* Code Area */}
                  <div className="p-6 pt-12 h-full bg-black/80 backdrop-blur-sm overflow-hidden">
                     <div className="font-mono text-xs text-gray-400 whitespace-pre leading-relaxed">
                        <div dangerouslySetInnerHTML={{ __html: displayedCode }} className="inline" />
                        <span className="inline-block w-2 h-4 bg-cyber-primary ml-1 align-middle animate-pulse"></span>
                     </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute bottom-10 -right-10 w-32 h-32 bg-cyber-primary/20 rounded-full blur-xl animate-pulse"></div>
               </div>
               
               <div className="absolute -bottom-6 -left-6 w-64 h-32 glass-panel rounded-xl p-4 border-l-4 border-cyber-secondary shadow-lg animate-[float_4s_ease-in-out_infinite]">
                  <div className="flex items-center gap-3 mb-2">
                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                     <span className="text-xs font-mono text-gray-400">LIVE SYSTEM</span>
                  </div>
                  <div className="text-white font-bold text-lg">
                    {snippetIndex === 0 ? "Deploying Agents..." : snippetIndex === 1 ? "Neural Uplink..." : "Verifying Contract..."}
                  </div>
                  <div className="w-full bg-gray-800 h-1 mt-3 rounded-full overflow-hidden">
                     <div className="bg-cyber-secondary h-full animate-[loading_2s_ease-in-out_infinite]" style={{width: '60%'}}></div>
                  </div>
               </div>
            </div>
         </div>

       </div>
       <style>{`
         @keyframes loading {
           0% { transform: translateX(-100%); }
           100% { transform: translateX(200%); }
         }
       `}</style>
    </section>
  );
};

export default About;