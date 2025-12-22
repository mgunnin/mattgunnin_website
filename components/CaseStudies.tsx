
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Share2, Check, Download, Calendar, Users, Cpu, Activity, Clock, Target, Layers, Globe, Zap, Database } from 'lucide-react';
import { CaseStudy } from '../types.ts';
import ReturnButton from './ReturnButton.tsx';
import SEO from './SEO.tsx';
import Breadcrumbs from './Breadcrumbs.tsx';

const caseStudiesData: CaseStudy[] = [
  {
    id: 'cs1',
    slug: 'esports-analytics',
    title: 'Esports One Analytics',
    subtitle: 'Real-Time Computer Vision Pipeline',
    industry: 'Esports / Data',
    year: '2020',
    challenge: 'Esports data was trapped in video pixels.',
    solution: 'We engineered a proprietary Computer Vision and RL pipeline.',
    technologies: ['OpenCV', 'PyTorch', 'AWS Kinesis', 'React', 'Reinforcement Learning'],
    metrics: [
      { label: 'Latency', value: '<100ms', icon: Clock },
      { label: 'Accuracy', value: '99.9%', icon: Target },
      { label: 'Monthly Users', value: '10M+', icon: Users },
      { label: 'Data Points', value: '5B+', icon: Database }
    ],
    architecture: {
      nodes: [
        { id: 'Twitch', label: 'Live Stream', type: 'client', x: 10, y: 50 },
        { id: 'Ingest', label: 'Frame Ingest', type: 'service', x: 30, y: 50 },
        { id: 'CV', label: 'CV Model', type: 'ai', x: 50, y: 30 },
        { id: 'RL', label: 'Prediction', type: 'ai', x: 50, y: 70 },
        { id: 'API', label: 'GraphQL API', type: 'service', x: 70, y: 50 },
        { id: 'Client', label: 'Dashboard', type: 'client', x: 90, y: 50 }
      ],
      connections: [
        { from: 'Twitch', to: 'Ingest' },
        { from: 'Ingest', to: 'CV' },
        { from: 'Ingest', to: 'RL' },
        { from: 'CV', to: 'API' },
        { from: 'RL', to: 'API' },
        { from: 'API', to: 'Client' }
      ]
    },
    timeline: [
      { phase: 'Phase 1', date: 'Q1 2019', description: 'Prototype model.' }
    ],
    teamSize: 12,
    lessonsLearned: ['Latency is critical.'],
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop'
  }
];

const ArchitectureViz: React.FC<{ architecture: CaseStudy['architecture'] }> = ({ architecture }) => {
   return (
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="p-8">
         {architecture.connections.map((conn, i) => {
            const start = architecture.nodes.find(n => n.id === conn.from);
            const end = architecture.nodes.find(n => n.id === conn.to);
            if (!start || !end) return null;
            return <line key={i} x1={`${start.x}%`} y1={`${start.y}%`} x2={`${end.x}%`} y2={`${end.y}%`} stroke="#374151" strokeWidth="0.5" />;
         })}
         {architecture.nodes.map(node => (
            <g key={node.id}>
               <circle cx={`${node.x}%`} cy={`${node.y}%`} r="6" fill="#111827" stroke="#00f0ff" strokeWidth="0.5" />
               <text x={`${node.x}%`} y={`${node.y}%`} dy="1" fontSize="3" fill="white" textAnchor="middle">{node.label.charAt(0)}</text>
            </g>
         ))}
      </svg>
   );
};

const CaseStudyDetail: React.FC<{ caseStudy: CaseStudy; onClose: () => void }> = ({ caseStudy, onClose }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
       <SEO title={`${caseStudy.title} | Case Study`} description={caseStudy.challenge} />
       <ReturnButton onClick={onClose} label="BACK TO LIST" />
       <div className="mt-12">
          <h1 className="text-4xl font-bold text-white mb-4">{caseStudy.title}</h1>
          <ArchitectureViz architecture={caseStudy.architecture} />
       </div>
    </motion.div>
  );
};

const CaseStudies: React.FC<{ standalone?: boolean }> = ({ standalone = false }) => {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  useEffect(() => {
    const handleRoute = () => {
        const hash = window.location.hash;
        if (hash.includes('/case-studies/')) {
            const slug = hash.split('/case-studies/')[1];
            const cs = caseStudiesData.find(c => c.slug === slug);
            if (cs) setSelectedCase(cs);
        } else setSelectedCase(null);
    };
    handleRoute();
    window.addEventListener('hashchange', handleRoute);
    return () => window.removeEventListener('hashchange', handleRoute);
  }, [standalone]);

  return (
    <section id="case-studies" className="py-24 px-6 md:px-24 bg-cyber-black">
       {selectedCase ? <CaseStudyDetail caseStudy={selectedCase} onClose={() => window.location.hash = standalone ? '/case-studies' : '/'} /> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {caseStudiesData.map(cs => (
                <div key={cs.id} onClick={() => window.location.hash = `/case-studies/${cs.slug}`} className="cursor-pointer bg-gray-900/30 p-6 rounded-xl border border-gray-800">
                   <h3 className="text-xl font-bold text-white">{cs.title}</h3>
                </div>
             ))}
          </div>
       )}
    </section>
  );
};
export default CaseStudies;
