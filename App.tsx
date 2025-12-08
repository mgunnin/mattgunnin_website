
import React, { useState, useEffect } from 'react';
import Background from './components/Background';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import About from './components/About';
import Resume from './components/Resume';
import Projects from './components/Projects';
import Resources from './components/Resources';
import Tools from './components/Tools';
import Lab from './components/Lab';
import Contact from './components/Contact';
import NeuralInterface from './components/NeuralInterface';
import Cursor from './components/Cursor';
import Blog from './components/Blog';
import { Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check for direct route access to tools or blog posts on load
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    
    if (path.includes('/tools')) {
        setTimeout(() => document.getElementById('tools')?.scrollIntoView(), 100);
    } else if (params.get('post')) {
        setTimeout(() => document.getElementById('blog')?.scrollIntoView(), 100);
    } else if (params.get('resource')) {
        setTimeout(() => document.getElementById('resources')?.scrollIntoView(), 100);
    } else if (params.get('project')) {
        setTimeout(() => document.getElementById('projects')?.scrollIntoView(), 100);
    }

    const handleScroll = () => {
      const sections = ['hero', 'about', 'resume', 'projects', 'resources', 'tools', 'lab', 'blog', 'contact'];
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'resume', label: 'Resume' },
    { id: 'projects', label: 'Work' },
    { id: 'resources', label: 'Reading' },
    { id: 'tools', label: 'Tools' },
    { id: 'lab', label: 'AI Lab' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <main className="min-h-screen bg-cyber-black text-gray-200 selection:bg-cyber-primary selection:text-black font-sans overflow-x-hidden cursor-auto md:cursor-none">
      <Cursor />
      <Background />
      <Navigation currentSection={currentSection} />
      
      {/* Sticky Header Mobile */}
      <div className="fixed top-0 w-full z-40 flex items-center justify-between p-4 bg-black/80 backdrop-blur-md lg:hidden border-b border-white/5">
        <span className="font-mono font-bold text-cyber-primary tracking-widest text-sm" onClick={() => scrollToSection('hero')}>MATT_GUNNIN</span>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-cyber-primary p-1"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center lg:hidden animate-[fadeIn_0.2s_ease-out]">
          <div className="flex flex-col gap-8 text-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-2xl font-bold font-mono uppercase tracking-widest transition-colors ${
                  currentSection === item.id ? 'text-cyber-primary' : 'text-gray-500 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <Hero />
      <SocialProof />
      <About />
      <Resume />
      <Projects />
      <Resources />
      <Tools />
      <Lab />
      <Blog />
      <Contact />
      
      <NeuralInterface currentSection={currentSection} />

      <footer className="py-12 text-center text-gray-600 text-sm border-t border-gray-900 bg-black relative z-10 px-4">
        <div className="flex justify-center gap-6 mb-4">
          <a href="https://linkedin.com/in/matthewgunnin" target="_blank" rel="noreferrer" className="hover:text-cyber-primary transition-colors">LinkedIn</a>
          <a href="https://github.com/mgunnin" target="_blank" rel="noreferrer" className="hover:text-cyber-primary transition-colors">GitHub</a>
          <a href="https://x.com/matthewgunnin" target="_blank" rel="noreferrer" className="hover:text-cyber-primary transition-colors">X</a>
        </div>
        <p>© {new Date().getFullYear()} Matt Gunnin. Architected with React, Tailwind & Gemini AI.</p>
      </footer>
    </main>
  );
};

export default App;
