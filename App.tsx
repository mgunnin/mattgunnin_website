
import React, { useState, useEffect } from 'react';
import Background from './components/Background';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import About from './components/About';
import Resume from './components/Resume';
import Projects from './components/Projects';
import CaseStudies from './components/CaseStudies';
import Speaking from './components/Speaking';
import Resources from './components/Resources';
import Tools from './components/Tools';
import Lab from './components/Lab';
import Contact from './components/Contact';
import NeuralInterface from './components/NeuralInterface';
import Cursor from './components/Cursor';
import Blog from './components/Blog';
import Booking from './components/Booking';
import Footer from './components/Footer';
import Sitemap from './components/Sitemap';
import SEO from './components/SEO';
import { Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pageMode, setPageMode] = useState<'home' | 'booking' | 'blog' | 'case-studies' | 'sitemap'>('home');

  useEffect(() => {
    // Check for direct route access via Hash or Path
    const checkRoute = () => {
        // Prioritize Hash routing for restricted environments (Blob/Sandboxed)
        const hash = window.location.hash;
        const path = hash.length > 1 ? hash.substring(1) : window.location.pathname;
        
        if (path === '/book' || path.startsWith('/book')) {
            setPageMode('booking');
            window.scrollTo(0, 0);
            return;
        } 
        
        if (path.startsWith('/blog')) {
            setPageMode('blog');
            window.scrollTo(0, 0);
            return;
        }

        if (path.startsWith('/case-studies')) {
            setPageMode('case-studies');
            window.scrollTo(0, 0);
            return;
        }

        if (path === '/sitemap') {
            setPageMode('sitemap');
            window.scrollTo(0, 0);
            return;
        }

        setPageMode('home');

        // Handle anchor/deep links if on home page
        // We use a small timeout to allow rendering
        if (path.includes('/tools')) {
            setTimeout(() => document.getElementById('tools')?.scrollIntoView(), 100);
        } else if (path.includes('/case-studies') && path === '/case-studies') {
             setTimeout(() => document.getElementById('case-studies')?.scrollIntoView(), 100);
        } else if (path.includes('/speaking')) {
            setTimeout(() => document.getElementById('speaking')?.scrollIntoView(), 100);
        } else if (path.includes('/resources')) {
            setTimeout(() => document.getElementById('resources')?.scrollIntoView(), 100);
        } else if (new URLSearchParams(window.location.search).get('project')) {
            setTimeout(() => document.getElementById('projects')?.scrollIntoView(), 100);
        }
    };

    checkRoute();
    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute); // Listen for hash changes

    const handleScroll = () => {
      if (pageMode !== 'home') return;

      const sections = ['hero', 'about', 'resume', 'projects', 'case-studies', 'speaking', 'resources', 'tools', 'lab', 'blog', 'contact'];
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
    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('popstate', checkRoute);
        window.removeEventListener('hashchange', checkRoute);
    };
  }, [pageMode]);

  const scrollToSection = (id: string) => {
    // Handle booking navigation
    if (id === 'book') {
        window.location.hash = '/book';
        setIsMobileMenuOpen(false);
        return;
    }

    // Handle blog navigation
    if (id === 'blog') {
        if (pageMode !== 'home') {
             window.location.hash = '/'; // Go home first
             setTimeout(() => {
                document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
             }, 100);
        } else {
             document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
        return;
    }

    // Handle case studies navigation from menu
    if (id === 'case-studies') {
        if (pageMode !== 'home') {
             window.location.hash = '/'; // Go home first
             setTimeout(() => {
                document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth' });
             }, 100);
        } else {
             document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
        return;
    }

    // If we are on a different page mode, go home first
    if (pageMode !== 'home') {
        window.location.hash = '/';
        setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    } else {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'resume', label: 'Resume' },
    { id: 'projects', label: 'Work' },
    { id: 'case-studies', label: 'Case Studies' },
    { id: 'speaking', label: 'Speaking' },
    { id: 'resources', label: 'Reading' },
    { id: 'tools', label: 'Tools' },
    { id: 'lab', label: 'AI Lab' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
    { id: 'book', label: 'Book' },
  ];

  return (
    <main className="min-h-screen bg-cyber-black text-gray-200 selection:bg-cyber-primary selection:text-black font-sans overflow-x-hidden cursor-auto md:cursor-none">
      {/* Global Default SEO */}
      <SEO 
        title="Matt Gunnin | Agentic AI Architect & Founder"
        description="5x Technical Founder & AI Specialist. Architecting agentic AI systems and multi-agent frameworks. Exploring the future of autonomous technology."
        image="https://mattgunnin.com/og-image.jpg"
        url="https://mattgunnin.com"
      />

      <Cursor />
      <Background />
      {pageMode === 'home' && <Navigation currentSection={currentSection} />}
      
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

      {pageMode === 'booking' ? (
        <Booking onBack={() => {
            window.location.hash = '/';
        }} />
      ) : pageMode === 'blog' ? (
        <Blog standalone={true} />
      ) : pageMode === 'case-studies' ? (
        <CaseStudies standalone={true} />
      ) : pageMode === 'sitemap' ? (
        <Sitemap />
      ) : (
        <>
            <Hero />
            <SocialProof />
            <About />
            <Resume />
            <Projects />
            <CaseStudies />
            <Speaking />
            <Resources />
            <Tools />
            <Lab />
            <Blog />
            <Contact />
        </>
      )}
      
      <NeuralInterface currentSection={pageMode === 'home' ? currentSection : pageMode} />

      <Footer />
    </main>
  );
};

export default App;
