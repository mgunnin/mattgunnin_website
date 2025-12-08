import React, { useState, useEffect } from 'react';
import { ChevronDown, Github, Linkedin, Calendar, FileText, Target, Database, ArrowRight, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Hero: React.FC = () => {
  const [textIndex, setTextIndex] = useState(0);
  
  const achievements = [
    "$10M+ raised from Eniac, XSeed, Quake",
    "Built platforms scaling to 10M+ MAU",
    "Shipped products for Riot Games, NFL, NBA",
    "2,184 GitHub contributions this year"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % achievements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: "Founder", value: "5x" },
    { label: "Exits", value: "2" },
    { label: "Raised", value: "$10M+" },
    { label: "Exp", value: "14Y+" },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Matt_Gunnin_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="hero" className="relative h-screen min-h-[800px] w-full flex flex-col items-center justify-center overflow-hidden bg-cyber-black">
      
      {/* Background Gradient & Grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/80 z-0"></div>
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
        }}
      />

      <div className="z-10 text-center px-6 max-w-6xl w-full flex flex-col items-center">
        
        {/* System Status Badge */}
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-cyber-primary/20 bg-cyber-primary/5 mb-8 backdrop-blur-md"
        >
           <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-primary"></span>
            </div>
            <span className="text-cyber-primary font-mono text-xs tracking-[0.2em] font-bold">
              SYSTEM_ONLINE // MATT_GUNNIN
            </span>
        </motion.div>
        
        {/* Headline */}
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
        >
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold text-white tracking-tighter leading-none">
            <span className="block hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-cyber-primary to-cyber-secondary transition-all duration-500 cursor-default select-none filter drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                AGENTIC AI
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">
                ARCHITECT
            </span>
            </h1>
        </motion.div>

        {/* Rotating Achievements - Terminal Style */}
        <div className="h-12 mb-6 flex items-center justify-center min-w-[300px]">
            <AnimatePresence mode="wait">
                <motion.div 
                    key={textIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="font-mono text-cyber-primary text-sm md:text-base tracking-widest bg-cyber-primary/10 px-4 py-1 rounded border border-cyber-primary/20"
                >
                    &gt; {achievements[textIndex]}<span className="animate-pulse">_</span>
                </motion.div>
            </AnimatePresence>
        </div>

        {/* Bio */}
        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed font-light"
        >
          Pioneering autonomous AI systems. <br className="hidden md:block"/>
          Currently building the future of multi-agent architectures at <span className="text-white font-semibold relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-cyber-primary/50">Vertical Labs</span>.
        </motion.p>

        {/* Primary Actions */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col md:flex-row gap-5 justify-center items-center mb-16 w-full md:w-auto"
        >
          <button 
            onClick={() => scrollTo('projects')}
            className="group relative px-8 py-4 bg-cyber-primary text-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-all duration-300 min-w-[200px]"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 92% 100%, 0 100%)' }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              View Work <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
            </span>
            <div className="absolute inset-0 bg-white/40 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </button>
          
          <div className="flex gap-6 items-center px-8 py-4 border border-gray-800 rounded bg-black/40 backdrop-blur-sm hover:border-gray-700 transition-colors">
            <a href="https://github.com/mgunnin" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-all"><Github size={20} /></a>
            <a href="https://linkedin.com/in/matthewgunnin" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-400 hover:scale-110 transition-all"><Linkedin size={20} /></a>
            <a href="https://x.com/matthewgunnin" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-all">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Statistics Bar */}
        <motion.div 
            initial={{ opacity: 0, width: '0%' }}
            animate={{ opacity: 1, width: '100%' }}
            transition={{ duration: 1, delay: 0.8 }}
            className="w-full max-w-4xl mx-auto mb-12 border-t border-b border-gray-800/50 bg-black/40 backdrop-blur-sm overflow-hidden"
        >
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-800/50">
                {stats.map((stat, i) => (
                    <div key={i} className="flex flex-col items-center justify-center py-6 group hover:bg-cyber-primary/5 transition-colors">
                        <span className="text-2xl md:text-3xl font-bold text-white mb-1 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] group-hover:text-cyber-primary transition-colors">{stat.value}</span>
                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest group-hover:text-gray-300">{stat.label}</span>
                    </div>
                ))}
            </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap justify-center gap-6 md:gap-12"
        >
            {[
                { icon: Calendar, label: "Book a Call", action: () => scrollTo('contact') },
                { icon: FileText, label: "Download Resume", action: handleDownloadResume },
                { icon: Target, label: "Case Studies", action: () => scrollTo('projects') },
                { icon: Database, label: "AI Resources", action: () => scrollTo('resources') }
            ].map((link, i) => (
                <button 
                    key={i} 
                    onClick={link.action} 
                    className="flex items-center gap-2 text-xs text-gray-400 hover:text-cyber-primary transition-colors group font-mono uppercase tracking-wide border border-transparent hover:border-cyber-primary/20 px-4 py-2 rounded-full"
                >
                    <link.icon size={14} className="text-gray-600 group-hover:text-cyber-primary transition-colors" /> 
                    <span>{link.label}</span>
                </button>
            ))}
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-700 animate-bounce"
      >
        <ChevronDown size={20} />
      </motion.div>

      {/* Decorative Corners */}
      <div className="absolute top-[10%] left-[5%] w-32 h-32 border-t border-l border-cyber-primary/10 rounded-tl-3xl hidden lg:block pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[5%] w-32 h-32 border-b border-r border-cyber-secondary/10 rounded-br-3xl hidden lg:block pointer-events-none"></div>
    </section>
  );
};

export default Hero;