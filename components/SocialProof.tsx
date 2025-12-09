
import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Quote, Award, Mic, Users, Coins, Layers, ArrowUpRight } from 'lucide-react';

const partners = [
  { name: 'RIOT GAMES', type: 'Client' },
  { name: 'MIT', type: 'Partner' },
  { name: 'ENIAC VENTURES', type: 'Investor' },
  { name: 'ACER', type: 'Client' },
  { name: 'KAMP', type: 'Partner' },
  { name: 'NFL', type: 'Partner' },
  { name: 'VERIZON', type: 'Partner' },
  { name: 'IBYTE', type: 'Partner' },
  { name: 'XSEED CAPITAL', type: 'Investor' },
  { name: 'CURSE GAMING', type: 'Partner' },
  { name: 'SEARCHEYE', type: 'Partner' },
  { name: 'NBA', type: 'Partner' },
  { name: 'TWITCH', type: 'Partner' },
  { name: 'QUAKE CAPITAL', type: 'Investor' },
  { name: 'KeSPA', type: 'Partner' },
  { name: 'RACKSPACE', type: 'Former' },
  { name: 'UNIKRN', type: 'Former' },
  { name: 'AZUBU', type: 'Former' },
];

const metrics = [
  { label: 'Monthly Active Users', value: '10M+', icon: Users, desc: 'Across Platforms' },
  { label: 'NFTs Minted', value: '92K+', icon: Coins, desc: 'On-chain Assets' },
  { label: 'Community Members', value: '10K+', icon: Layers, desc: 'Discord & Socials' },
  { label: 'Venture Capital', value: '$10M+', icon: ArrowUpRight, desc: 'Raised to Date' },
];

const testimonials = [
  {
    text: "Matt is one of those rare technical founders who can bridge the gap between complex backend architecture and compelling product vision. His work at Esports One redefined how we look at real-time data.",
    author: "Alex G.",
    role: "Venture Partner",
    company: "Eniac Ventures"
  },
  {
    text: "Working with Matt on the Fiber Connect Keynote was an eye-opener. He has a unique ability to forecast industry trends years before they hit the mainstream.",
    author: "Sarah L.",
    role: "Event Director",
    company: "Fiber Connect"
  },
  {
    text: "Vertical Labs isn't just an agency; they are an extension of our engineering team. The agentic systems they deployed increased our operational efficiency by 300%.",
    author: "David K.",
    role: "CTO",
    company: "Stealth AI Startup"
  }
];

const MetricCard: React.FC<{ metric: any, delay: number }> = ({ metric, delay }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="p-6 bg-gray-900/20 border border-gray-800 rounded-xl hover:bg-gray-900/40 hover:border-cyber-primary/30 transition-all duration-300 group"
        >
            <metric.icon className="w-8 h-8 text-gray-600 group-hover:text-cyber-primary mb-4 transition-colors" />
            <div className="text-3xl md:text-4xl font-bold text-white mb-1 group-hover:scale-105 transition-transform origin-left">{metric.value}</div>
            <div className="text-sm font-bold text-gray-400 group-hover:text-gray-300">{metric.label}</div>
            <div className="text-xs text-gray-600 font-mono mt-2">{metric.desc}</div>
        </motion.div>
    );
}

const TestimonialSlider: React.FC = () => {
    const [index, setIndex] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative min-h-[200px] flex flex-col justify-between">
            <div className="relative h-full">
                {testimonials.map((t, i) => (
                    <div 
                        key={i}
                        className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out ${
                            i === index ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'
                        }`}
                    >
                        <p className="text-gray-300 text-lg leading-relaxed italic mb-6">"{t.text}"</p>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-black border border-gray-600 flex items-center justify-center font-bold text-gray-400">
                                {t.author.charAt(0)}
                            </div>
                            <div>
                                <div className="text-white font-bold">{t.author}</div>
                                <div className="text-cyber-primary text-xs font-mono">{t.role} @ {t.company}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="flex gap-2 mt-auto pt-8">
                {testimonials.map((_, i) => (
                    <button 
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`h-1 rounded-full transition-all duration-300 ${
                            i === index ? 'w-8 bg-cyber-primary' : 'w-2 bg-gray-700 hover:bg-gray-600'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}

const SocialProof: React.FC = () => {
  return (
    <section className="py-20 bg-black border-y border-gray-900 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* 1. TRUSTED BY MARQUEE */}
        <div className="mb-24">
          <div className="text-center mb-8">
            <h3 className="text-xs font-mono text-gray-500 uppercase tracking-[0.3em] mb-2">Trusted By Industry Leaders</h3>
            <div className="w-12 h-0.5 bg-cyber-primary/50 mx-auto"></div>
          </div>
          
          <div className="relative flex overflow-hidden mask-linear-fade">
            <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-black to-transparent z-10"></div>
            <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-black to-transparent z-10"></div>
            
            <div className="flex animate-marquee whitespace-nowrap py-4">
              {[...partners, ...partners].map((partner, i) => (
                <div key={i} className="mx-8 md:mx-12 flex items-center group cursor-default">
                  <span className="text-xl md:text-2xl font-bold text-gray-700 group-hover:text-gray-300 transition-colors duration-300 font-mono tracking-tighter">
                    {partner.name}
                  </span>
                  {partner.type === 'Investor' && <span className="ml-2 text-[8px] text-cyber-primary border border-cyber-primary/30 px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">VC</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. METRICS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-24">
          {metrics.map((metric, i) => (
            <MetricCard key={i} metric={metric} delay={i * 0.1} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* 3. TESTIMONIAL TERMINAL */}
            <div>
                 <div className="flex items-center gap-3 mb-8">
                    <Quote className="text-cyber-secondary" />
                    <h3 className="text-2xl font-bold text-white tracking-tight">TRANSMISSIONS</h3>
                 </div>
                 
                 <div className="relative bg-gray-900/30 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm overflow-hidden">
                    {/* Decorative UI Elements */}
                    <div className="absolute top-4 right-4 flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                        <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-secondary to-transparent opacity-50"></div>

                    <TestimonialSlider />
                 </div>
            </div>

            {/* 4. FEATURED / SPEAKING */}
            <div>
                 <div className="flex items-center gap-3 mb-8">
                    <Award className="text-cyber-primary" />
                    <h3 className="text-2xl font-bold text-white tracking-tight">RECOGNITION</h3>
                 </div>

                 <div className="space-y-6">
                    {/* Keynote Item */}
                    <div className="group flex items-start gap-4 p-4 border border-gray-800 rounded-xl hover:bg-gray-900/40 hover:border-cyber-primary/30 transition-all duration-300">
                        <div className="p-3 bg-black border border-gray-800 rounded-lg group-hover:border-cyber-primary/50 transition-colors">
                            <Mic className="text-white w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-lg group-hover:text-cyber-primary transition-colors">Fiber Connect Keynote</h4>
                            <p className="text-gray-400 text-sm mb-2">Day 1 Opening Speaker • 2019</p>
                            <span className="text-[10px] bg-cyber-primary/10 text-cyber-primary px-2 py-1 rounded border border-cyber-primary/20">INDUSTRY THOUGHT LEADERSHIP</span>
                        </div>
                    </div>

                    {/* Product Hunt Item */}
                    <div className="group flex items-start gap-4 p-4 border border-gray-800 rounded-xl hover:bg-gray-900/40 hover:border-[#DA552F]/30 transition-all duration-300">
                        <div className="p-3 bg-black border border-gray-800 rounded-lg group-hover:border-[#DA552F]/50 transition-colors">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#DA552F]">
                                <path d="M13.63 3.61a1.64 1.64 0 0 1 1.73 1.62 1.62 1.62 0 0 1-1.61 1.62H8.22v3.74h6.05c2.4 0 4.2-1.8 4.2-4.26 0-2.58-1.92-4.46-4.62-4.46H9.17a.95.95 0 0 0-.95.95v16.2a.96.96 0 0 0 .95.96h2.7v-6.9h1.76ZM8.22 6.85h5.41c1.02 0 1.68.72 1.68 1.56 0 .9-.6 1.62-1.56 1.62H8.22V6.85Z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-lg group-hover:text-[#DA552F] transition-colors">#1 Product of the Day</h4>
                            <p className="text-gray-400 text-sm mb-2">Esports One Fantasy Launch</p>
                            <span className="text-[10px] bg-[#DA552F]/10 text-[#DA552F] px-2 py-1 rounded border border-[#DA552F]/20">PRODUCT LAUNCH</span>
                        </div>
                    </div>
                 </div>
            </div>

        </div>

      </div>
      
      <style>{`
        .mask-linear-fade {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default SocialProof;
