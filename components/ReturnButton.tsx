import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface ReturnButtonProps {
  onClick: () => void;
  className?: string;
  label?: string;
}

const ReturnButton: React.FC<ReturnButtonProps> = ({ onClick, className = '', label = "RETURN TO BASE" }) => {
  return (
    <button 
      onClick={onClick}
      className={`pointer-events-auto flex items-center gap-2 bg-black/50 backdrop-blur-md text-white px-5 py-2.5 rounded-full border border-gray-700 hover:border-cyber-primary hover:text-cyber-primary transition-all duration-300 group shadow-[0_0_15px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] ${className}`}
    >
       <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
       <span className="font-mono text-xs md:text-sm tracking-widest uppercase font-bold">{label}</span>
    </button>
  );
};

export default ReturnButton;