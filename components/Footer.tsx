import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 text-center text-gray-600 text-sm border-t border-gray-900 bg-black relative z-10 px-4">
      <div className="flex justify-center gap-6 mb-4">
        <a href="https://linkedin.com/in/matthewgunnin" target="_blank" rel="noreferrer" className="hover:text-cyber-primary transition-colors">LinkedIn</a>
        <a href="https://github.com/mgunnin" target="_blank" rel="noreferrer" className="hover:text-cyber-primary transition-colors">GitHub</a>
        <a href="https://x.com/matthewgunnin" target="_blank" rel="noreferrer" className="hover:text-cyber-primary transition-colors">X</a>
      </div>
      <p>© {new Date().getFullYear()} Matt Gunnin.</p>
    </footer>
  );
};

export default Footer;