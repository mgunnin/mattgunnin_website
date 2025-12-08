import React, { useState } from 'react';
import { Mail, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message transmitted to Matt's neural uplink.");
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-24 w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-cyber-secondary/5 skew-y-12 transform origin-bottom-right"></div>
      
      <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16">
         <div>
            <h2 className="text-5xl font-bold text-white mb-6">LET'S <span className="text-cyber-primary">CONNECT</span></h2>
            <p className="text-xl text-gray-400 mb-8">
              Interested in collaborating on a project or discussing agentic AI? 
              Open a channel.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-cyber-primary border border-gray-800">
                    <Mail />
                 </div>
                 <div>
                    <div className="text-gray-500 text-sm">Email</div>
                    <div className="text-white text-lg font-mono">mg@mattgunnin.com</div>
                 </div>
              </div>
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-cyber-secondary border border-gray-800">
                    <MapPin />
                 </div>
                 <div>
                    <div className="text-gray-500 text-sm">Base</div>
                    <div className="text-white text-lg font-mono">Austin, Texas, CST</div>
                 </div>
              </div>
            </div>
         </div>

         <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-xs text-cyber-primary font-mono uppercase">Identifier</label>
                  <input 
                    type="text" 
                    className="w-full bg-black/50 border border-gray-700 rounded p-3 text-white focus:border-cyber-primary focus:outline-none transition-colors"
                    placeholder="Name"
                    value={formState.name}
                    onChange={e => setFormState({...formState, name: e.target.value})}
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-xs text-cyber-primary font-mono uppercase">Signal Source</label>
                  <input 
                    type="email" 
                    className="w-full bg-black/50 border border-gray-700 rounded p-3 text-white focus:border-cyber-primary focus:outline-none transition-colors"
                    placeholder="Email"
                    value={formState.email}
                    onChange={e => setFormState({...formState, email: e.target.value})}
                  />
               </div>
            </div>
            <div className="space-y-2">
               <label className="text-xs text-cyber-primary font-mono uppercase">Transmission</label>
               <textarea 
                  rows={4}
                  className="w-full bg-black/50 border border-gray-700 rounded p-3 text-white focus:border-cyber-primary focus:outline-none transition-colors"
                  placeholder="Your message..."
                  value={formState.message}
                  onChange={e => setFormState({...formState, message: e.target.value})}
               />
            </div>
            <button className="w-full bg-gradient-to-r from-cyber-primary to-cyber-secondary text-white font-bold py-4 rounded hover:opacity-90 transition-opacity uppercase tracking-widest text-sm">
               Initialize Handshake
            </button>
         </form>
      </div>
    </section>
  );
};

export default Contact;