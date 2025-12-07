import React, { useState, useEffect } from 'react';
import Background from './components/Background';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Resume from './components/Resume';
import Projects from './components/Projects';
import Resources from './components/Resources';
import Contact from './components/Contact';
import NeuralInterface from './components/NeuralInterface';
import Cursor from './components/Cursor';
import Blog from './components/Blog';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'resume', 'projects', 'resources', 'blog', 'contact'];
      // Using a slightly lower threshold for better UX on mobile
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-cyber-black text-gray-200 selection:bg-cyber-primary selection:text-black font-sans overflow-x-hidden cursor-none">
      <Cursor />
      <Background />
      <Navigation currentSection={currentSection} />
      
      {/* Sticky Header Mobile */}
      <div className="fixed top-0 w-full z-50 flex items-center justify-between p-4 bg-black/80 backdrop-blur-md lg:hidden border-b border-white/5">
        <span className="font-mono font-bold text-cyber-primary tracking-widest">MATT_GUNNIN</span>
        <button 
          onClick={() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}
          className="text-xs font-mono border border-cyber-primary/50 px-3 py-1 rounded text-cyber-primary"
        >
          CONTACT
        </button>
      </div>

      <Hero />
      <About />
      <Resume />
      <Projects />
      <Resources />
      <Blog />
      <Contact />
      
      <NeuralInterface />

      <footer className="py-12 text-center text-gray-600 text-sm border-t border-gray-900 bg-black relative z-10">
        <div className="flex justify-center gap-6 mb-4">
          <a href="https://linkedin.com/in/matthewgunnin" target="_blank" rel="noreferrer" className="hover:text-cyber-primary transition-colors">LinkedIn</a>
          <a href="https://github.com/mgunnin" target="_blank" rel="noreferrer" className="hover:text-cyber-primary transition-colors">GitHub</a>
          <a href="https://twitter.com/mattgunnin" target="_blank" rel="noreferrer" className="hover:text-cyber-primary transition-colors">Twitter</a>
        </div>
        <p>© {new Date().getFullYear()} Matt Gunnin. Architected with React, Tailwind & Gemini AI.</p>
      </footer>
    </main>
  );
};

export default App;