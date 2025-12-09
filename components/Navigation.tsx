
import React from 'react';
import { Home, User, Briefcase, BookOpen, Mail, FileText, Zap, PenTool, Target, Mic, Calendar } from 'lucide-react';

interface NavigationProps {
  currentSection: string;
}

const Navigation: React.FC<NavigationProps> = ({ currentSection }) => {
  const navItems = [
    { id: 'hero', icon: Home, label: 'Home' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'resume', icon: FileText, label: 'Resume' },
    { id: 'projects', icon: Briefcase, label: 'Work' },
    { id: 'case-studies', icon: Target, label: 'Case Studies' },
    { id: 'speaking', icon: Mic, label: 'Speaking' },
    { id: 'resources', icon: BookOpen, label: 'Reading' },
    { id: 'tools', icon: PenTool, label: 'Tools' },
    { id: 'lab', icon: Zap, label: 'AI Lab' },
    { id: 'book', icon: Calendar, label: 'Booking' },
    { id: 'contact', icon: Mail, label: 'Contact' },
  ];

  const scrollToSection = (id: string) => {
    // Check if we are on a specific route page like /book
    if (id === 'book') {
        window.location.hash = '/book';
        return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If element not found (maybe we are on /book page), go home first
      window.location.hash = '/';
      // Wait for re-render
      setTimeout(() => {
         document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-8">
      <div className="absolute left-1.5 top-0 w-px h-full bg-gradient-to-b from-transparent via-gray-800 to-transparent -z-10" />
      
      {navItems.map((item) => {
        // Simple heuristic for active state in hash routing world
        const isActive = currentSection === item.id || (item.id === 'book' && window.location.hash.includes('/book'));
        return (
          <div key={item.id} className="group relative flex items-center">
            <span className={`absolute left-10 px-3 py-1.5 bg-cyber-black border border-cyber-primary/30 text-cyber-primary text-xs font-mono font-bold rounded opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-[0_0_15px_rgba(0,240,255,0.2)]`}>
              {item.label}
            </span>
            <button
              onClick={() => scrollToSection(item.id)}
              className={`relative w-3 h-3 rounded-full transition-all duration-500 z-10 ${
                isActive 
                  ? 'bg-cyber-primary scale-150 shadow-[0_0_10px_#00f0ff]' 
                  : 'bg-gray-800 hover:bg-cyber-primary hover:scale-125 border border-gray-600 hover:border-cyber-primary'
              }`}
            >
              {isActive && <span className="absolute inset-0 rounded-full animate-ping bg-cyber-primary opacity-75" />}
            </button>
          </div>
        );
      })}
    </nav>
  );
};

export default Navigation;
