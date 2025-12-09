
import React from 'react';
import { Calendar, Clock, Video, ArrowLeft, CheckCircle, Zap } from 'lucide-react';

const CALENDLY_URL = "https://calendly.com/mgunnin/esports-one";

const meetingTypes = [
  {
    title: "Intro Call",
    duration: "15 min",
    description: "Quick sync to say hello and see if there's alignment.",
    icon: Zap,
    color: "text-yellow-400",
    borderColor: "group-hover:border-yellow-400"
  },
  {
    title: "Consultation",
    duration: "30 min",
    description: "Discuss specific challenges in AI, Esports, or Community.",
    icon: Calendar,
    color: "text-cyber-primary",
    borderColor: "group-hover:border-cyber-primary"
  },
  {
    title: "Deep Dive Strategy",
    duration: "60 min",
    description: "In-depth architectural review or project planning session.",
    icon: Video,
    color: "text-cyber-secondary",
    borderColor: "group-hover:border-cyber-secondary"
  }
];

const Booking: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.location.hash = '/';
    }
  };

  return (
    <section id="book" className="py-24 px-6 md:px-24 w-full bg-cyber-black relative border-t border-gray-900 min-h-screen">
       <div className="max-w-7xl mx-auto">
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-500 hover:text-white mb-8 transition-colors group"
          >
             <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
             {/* Left Column: Context */}
             <div className="lg:col-span-4 space-y-8">
                <div>
                   <h2 className="text-4xl font-bold text-white mb-4">SCHEDULE A <span className="text-cyber-primary">SYNC</span></h2>
                   <p className="text-gray-400 leading-relaxed">
                      Skip the email tag. Choose a time that works for you to discuss your project, potential partnership, or just to geek out on Agentic AI.
                   </p>
                </div>

                <div className="space-y-4">
                   <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Meeting Options</h3>
                   {meetingTypes.map((type, i) => (
                      <div key={i} className={`bg-gray-900/40 border border-gray-800 p-4 rounded-xl transition-all duration-300 group hover:bg-gray-900/60 ${type.borderColor}`}>
                         <div className="flex items-start gap-4">
                            <div className={`p-2 bg-black rounded-lg border border-gray-700 ${type.color}`}>
                               <type.icon size={20} />
                            </div>
                            <div>
                               <div className="flex items-center justify-between mb-1">
                                  <h4 className="text-white font-bold">{type.title}</h4>
                                  <span className="text-xs font-mono text-gray-500 bg-black px-2 py-0.5 rounded border border-gray-800 flex items-center gap-1">
                                     <Clock size={10} /> {type.duration}
                                  </span>
                               </div>
                               <p className="text-sm text-gray-400">{type.description}</p>
                            </div>
                         </div>
                      </div>
                   ))}
                </div>

                <div className="bg-cyber-primary/10 border border-cyber-primary/20 p-6 rounded-xl">
                   <h4 className="text-cyber-primary font-bold mb-2 flex items-center gap-2"><CheckCircle size={16} /> What to expect</h4>
                   <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex gap-2"><span className="text-cyber-primary">•</span> No hard selling. I am an engineer first.</li>
                      <li className="flex gap-2"><span className="text-cyber-primary">•</span> Actionable advice within the first 10 mins.</li>
                      <li className="flex gap-2"><span className="text-cyber-primary">•</span> Follow-up resources if applicable.</li>
                   </ul>
                </div>
             </div>

             {/* Right Column: Calendly Embed */}
             <div className="lg:col-span-8 bg-white rounded-xl overflow-hidden shadow-2xl h-[700px] border border-gray-800">
                <iframe 
                  src={`${CALENDLY_URL}?hide_gdpr_banner=1&background_color=ffffff&text_color=0a0a0a&primary_color=00f0ff`} 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  title="Select a Date & Time - Calendly"
                ></iframe>
             </div>
          </div>
       </div>
    </section>
  );
};

export default Booking;
