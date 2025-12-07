import React from 'react';
import { ChevronDown, Github, Linkedin } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      
      <div className="z-10 text-center px-4 max-w-5xl">
        <h2 className="text-cyber-primary font-mono text-sm tracking-[0.2em] mb-4 animate-[fadeIn_1s_ease-out]">
          SYSTEM_ONLINE // MATT_GUNNIN
        </h2>
        
        <h1 className="text-5xl md:text-8xl font-bold mb-6 text-white tracking-tighter">
          <span className="block mb-2 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-cyber-primary to-cyber-secondary transition-all duration-500 cursor-default">
            AGENTIC AI
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
            ARCHITECT
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
          5x Technical Founder (2 exits) pioneering autonomous AI systems. Currently building the future of multi-agent architectures at <span className="text-white font-bold">Vertical Labs</span>.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
          <button 
            onClick={() => document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'})}
            className="px-8 py-3 bg-cyber-primary text-black font-bold uppercase tracking-wider hover:bg-white hover:shadow-[0_0_20px_rgba(0,240,255,0.6)] transition-all duration-300 clip-path-slant"
          >
            View Projects
          </button>
          <div className="flex gap-6 items-center">
            <a href="https://github.com/mgunnin" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyber-primary transition-colors"><Github /></a>
            <a href="https://linkedin.com/in/matthewgunnin" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyber-primary transition-colors"><Linkedin /></a>
            <a href="https://x.com/matthewgunnin" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyber-primary transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-500">
        <ChevronDown size={32} />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-24 h-24 border-t-2 border-l-2 border-cyber-primary/20 rounded-tl-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-24 h-24 border-b-2 border-r-2 border-cyber-secondary/20 rounded-br-3xl"></div>
    </section>
  );
};

export default Hero;