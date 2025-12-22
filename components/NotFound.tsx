
import React, { useState, useEffect } from 'react';
import { Home, Search, Zap, AlertTriangle } from 'lucide-react';
import Link from './Link';

const NotFound: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  
  useEffect(() => {
    // Generate simulated error logs
    const errorSequence = [
        "initiating_trace...",
        "error: signal_lost",
        "triangulating_coordinates...",
        "target_not_found",
        "protocol_404_active",
        "system_failure: route_undefined"
    ];

    let delay = 0;
    errorSequence.forEach((log, index) => {
        delay += Math.random() * 300 + 200;
        setTimeout(() => {
            setLogs(prev => [...prev, `> ${log}`]);
        }, delay);
    });
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    window.location.href = `/?search=${encodeURIComponent(searchQuery)}`;
  };

  const forceHome = (e: React.MouseEvent) => {
    e.preventDefault();
    // Use Hash reset which is safer for preview environments
    window.location.hash = '/';
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-cyber-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,60,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,60,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-radial-gradient(circle_at_center,transparent_0%,black_100%) pointer-events-none"></div>

      <div className="relative z-10 max-w-2xl w-full text-center">
        
        {/* Glitch Header */}
        <div className="relative mb-8">
             <h1 className="text-9xl md:text-[12rem] font-bold text-white tracking-tighter opacity-80 select-none glitch" data-text="404">
                404
             </h1>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
                <span className="bg-cyber-black px-4 text-cyber-accent font-mono tracking-[0.5em] text-sm md:text-xl border border-cyber-accent/30">
                    PAGE_NOT_FOUND
                </span>
             </div>
        </div>

        {/* Error Terminal */}
        <div className="bg-black/80 border border-gray-800 rounded-lg p-6 mb-10 text-left font-mono text-xs md:text-sm shadow-2xl max-w-lg mx-auto backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-800 pb-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-500 ml-2">system_diagnostics.log</span>
            </div>
            <div className="space-y-1 h-32 overflow-hidden flex flex-col justify-end">
                {logs.map((log, i) => (
                    <div key={i} className="text-gray-400 animate-[fadeIn_0.2s_ease-out]">
                        {log}<span className="animate-pulse opacity-50">_</span>
                    </div>
                ))}
            </div>
        </div>

        <p className="text-gray-400 mb-8 max-w-md mx-auto">
            The neural link you followed points to a sector that doesn't exist or has been declassified.
        </p>

        {/* Actions */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
            <button onClick={forceHome} className="flex items-center gap-2 bg-cyber-primary text-black font-bold px-6 py-3 rounded hover:bg-white transition-colors w-full md:w-auto justify-center">
                <Home size={18} /> RETURN HOME
            </button>
            <Link href="/#lab" className="flex items-center gap-2 border border-gray-700 text-white px-6 py-3 rounded hover:border-cyber-primary hover:text-cyber-primary transition-colors w-full md:w-auto justify-center">
                <Zap size={18} /> ENTER AI LAB
            </Link>
            <Link href="/#contact" className="flex items-center gap-2 border border-gray-700 text-white px-6 py-3 rounded hover:border-cyber-primary hover:text-cyber-primary transition-colors w-full md:w-auto justify-center">
                <AlertTriangle size={18} /> REPORT ISSUE
            </Link>
        </div>

        {/* Search / Ella */}
        <div className="max-w-md mx-auto relative">
            <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-4 top-3.5 text-gray-500" size={18} />
                <input 
                    type="text" 
                    placeholder="Search query or Ask Ella..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-800 rounded-full py-3 pl-12 pr-4 text-white focus:border-cyber-primary outline-none transition-colors"
                />
            </form>
            <p className="text-[10px] text-gray-600 mt-3 font-mono">
                Running into issues? <button onClick={forceHome} className="text-cyber-secondary hover:underline">Ask Ella</button> for navigation assistance.
            </p>
        </div>

      </div>

      <style>{`
        .glitch {
          position: relative;
        }
        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .glitch::before {
          left: 2px;
          text-shadow: -1px 0 #ff003c;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim-1 5s infinite linear alternate-reverse;
        }
        .glitch::after {
          left: -2px;
          text-shadow: -1px 0 #00f0ff;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim-2 5s infinite linear alternate-reverse;
        }
        @keyframes glitch-anim-1 {
          0% { clip: rect(20px, 9999px, 15px, 0); }
          20% { clip: rect(60px, 9999px, 80px, 0); }
          40% { clip: rect(12px, 9999px, 4px, 0); }
          60% { clip: rect(85px, 9999px, 90px, 0); }
          80% { clip: rect(50px, 9999px, 20px, 0); }
          100% { clip: rect(10px, 9999px, 60px, 0); }
        }
        @keyframes glitch-anim-2 {
          0% { clip: rect(90px, 9999px, 10px, 0); }
          20% { clip: rect(10px, 9999px, 20px, 0); }
          40% { clip: rect(50px, 9999px, 80px, 0); }
          60% { clip: rect(20px, 9999px, 30px, 0); }
          80% { clip: rect(80px, 9999px, 60px, 0); }
          100% { clip: rect(40px, 9999px, 100px, 0); }
        }
      `}</style>
    </div>
  );
};

export default NotFound;
