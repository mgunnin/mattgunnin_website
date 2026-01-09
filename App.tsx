
import React, { useState, useEffect, useCallback } from 'react';
import Background from './components/Background.tsx';
import Navigation from './components/Navigation.tsx';
import Hero from './components/Hero.tsx';
import SocialProof from './components/SocialProof.tsx';
import About from './components/About.tsx';
import Resume from './components/Resume.tsx';
import Projects from './components/Projects.tsx';
import CaseStudies from './components/CaseStudies.tsx';
import Press from './components/Press.tsx';
import Speaking from './components/Speaking.tsx';
import Resources from './components/Resources.tsx';
import Tools from './components/Tools.tsx';
import Lab from './components/Lab.tsx';
import Contact from './components/Contact.tsx';
import NeuralInterface from './components/NeuralInterface.tsx';
import Cursor from './components/Cursor.tsx';
import Blog from './components/Blog.tsx';
import Booking from './components/Booking.tsx';
import Footer from './components/Footer.tsx';
import Sitemap from './components/Sitemap.tsx';
import SEO from './components/SEO.tsx';
import NotFound from './components/NotFound.tsx';
import { Menu, X } from 'lucide-react';

type PageMode = 'home' | 'booking' | 'blog' | 'case-studies' | 'sitemap' | '404';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pageMode, setPageMode] = useState<PageMode>('home');

  const checkRoute = useCallback(() => {
    const hash = window.location.hash;
    const pathname = window.location.pathname;
    
    // Priority: Hash Routing (Safe for all environments)
    // If hash exists and looks like a route (starts with #/), use it.
    let activePath = '';
    
    if (hash.length > 1 && hash.startsWith('#/')) {
        activePath = hash.substring(1); // e.g. /blog
    } else {
        // Fallback to pathname, but be careful with subdirectories.
        // We only care if the pathname *contains* a known route segment.
        activePath = pathname;
    }

    // Normalize: remove .html, remove index, lowercase
    const norm = activePath.toLowerCase().replace('/index.html', '').replace('.html', '');
    
    // Helper to check if path contains segment
    const has = (segment: string) => norm.includes(`/${segment}`) || norm === segment || norm.endsWith(`/${segment}`);

    // 1. Dynamic Pages (Explicit Routes)
    if (has('book')) {
      setPageMode('booking');
      window.scrollTo(0, 0);
      return;
    }
    
    if (has('blog')) {
      setPageMode('blog');
      window.scrollTo(0, 0);
      return;
    }

    if (has('case-studies')) {
      setPageMode('case-studies');
      window.scrollTo(0, 0);
      return;
    }

    if (has('sitemap')) {
      setPageMode('sitemap');
      window.scrollTo(0, 0);
      return;
    }

    // 2. Home Section Routing
    // If we are here, we are likely Home. Check for specific sections.
    const validHomeSections = [
      'hero', 'about', 'resume', 'projects', 'press', 'speaking',
      'resources', 'tools', 'lab', 'contact'
    ];

    const matchingSection = validHomeSections.find(s => has(s));
    
    setPageMode('home'); // Default to home for everything else (Fail-safe)
    
    if (matchingSection) {
      setCurrentSection(matchingSection);
      // Small delay to ensure DOM render
      setTimeout(() => {
        const element = document.getElementById(matchingSection);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      setCurrentSection('hero');
      // Only scroll to top if we explicitly detected "home" or "index" or root, 
      // but defaulting to hero is safe.
    }
    
    // Legacy support
    if (new URLSearchParams(window.location.search).get('project')) {
      setCurrentSection('projects');
      setTimeout(() => document.getElementById('projects')?.scrollIntoView(), 100);
    }
  }, []);

  useEffect(() => {
    checkRoute();
    
    const onRouteEvent = () => checkRoute();
    window.addEventListener('popstate', onRouteEvent);
    window.addEventListener('hashchange', onRouteEvent);

    const handleScroll = () => {
      if (pageMode !== 'home') return;
      const sections = ['hero', 'about', 'resume', 'projects', 'case-studies', 'press', 'speaking', 'resources', 'tools', 'lab', 'blog', 'contact'];
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
      window.removeEventListener('popstate', onRouteEvent);
      window.removeEventListener('hashchange', onRouteEvent);
    };
  }, [checkRoute, pageMode]);

  const scrollToSection = (id: string) => {
    if (id === 'book') {
      window.location.hash = '/book';
      setIsMobileMenuOpen(false);
      return;
    }

    if (id === 'blog') {
      if (pageMode !== 'home') window.location.hash = '/blog';
      else document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
      return;
    }

    if (id === 'case-studies') {
      if (pageMode !== 'home') window.location.hash = '/case-studies';
      else document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
      return;
    }

    if (pageMode !== 'home') {
      window.location.hash = `/${id}`;
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.location.hash = `/${id}`;
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
    { id: 'press', label: 'Press' },
    { id: 'speaking', label: 'Speaking' },
    { id: 'resources', label: 'Reading' },
    { id: 'tools', label: 'Tools' },
    { id: 'lab', label: 'AI Lab' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
    { id: 'book', label: 'Book' },
  ];

  if (pageMode === '404') {
    return (
      <main className="min-h-screen bg-cyber-black text-gray-200 font-sans cursor-auto md:cursor-none overflow-x-hidden">
        <SEO title="Page Not Found | Matt Gunnin" description="The requested page could not be found." />
        <Cursor />
        <Background />
        <NotFound />
        <NeuralInterface currentSection="404" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cyber-black text-gray-200 selection:bg-cyber-primary selection:text-black font-sans overflow-x-hidden cursor-auto md:cursor-none">
      <SEO 
        title="Matt Gunnin | Agentic AI Architect & Founder"
        description="5x Technical Founder & AI Specialist. Architecting agentic AI systems and multi-agent frameworks."
        image="https://mattgunnin.com/og-image.jpg"
        url="https://mattgunnin.com"
      />

      <Cursor />
      <Background />
      {pageMode === 'home' && <Navigation currentSection={currentSection} />}
      
      <div className="fixed top-0 w-full z-40 flex items-center justify-between p-4 bg-black/80 backdrop-blur-md lg:hidden border-b border-white/5">
        <span className="font-mono font-bold text-cyber-primary tracking-widest text-sm cursor-pointer" onClick={() => scrollToSection('hero')}>MATT_GUNNIN</span>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-cyber-primary p-1">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

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
        <Booking onBack={() => { window.location.hash = ''; }} />
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
          <Press />
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
