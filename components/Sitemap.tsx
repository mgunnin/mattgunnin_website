
import React from 'react';
import Link from './Link';
import { Map, ArrowLeft, FileText, Briefcase, User } from 'lucide-react';

const Sitemap: React.FC = () => {
  const routes = [
    { section: "Main", links: [
        { label: "Home", href: "/" },
        { label: "About", href: "/#about" },
        { label: "Resume", href: "/#resume" },
        { label: "Contact", href: "/#contact" },
        { label: "Book a Call", href: "/book" },
    ]},
    { section: "Work", links: [
        { label: "Projects", href: "/#projects" },
        { label: "Case Studies", href: "/case-studies" },
        { label: "Esports One Analytics", href: "/case-studies/esports-analytics" },
        { label: "NFT Community Platform", href: "/case-studies/nft-community" },
        { label: "Multi-Agent Automation", href: "/case-studies/multi-agent-automation" },
    ]},
    { section: "Content", links: [
        { label: "Blog", href: "/blog" },
        { label: "Vertical Integration of Intelligence", href: "/blog/vertical-integration" },
        { label: "Building Agentic Systems", href: "/blog/agentic-systems" },
        { label: "Claude Code Environment", href: "/blog/claude-environment" },
        { label: "Autonomous AI 2026", href: "/blog/autonomous-2026" },
        { label: "Press & Media", href: "/#press" },
        { label: "Speaking & Events", href: "/#speaking" },
        { label: "Resources", href: "/#resources" },
    ]},
    { section: "Tools", links: [
        { label: "AI Lab", href: "/#lab" },
        { label: "Tools Hub", href: "/#tools" },
        { label: "ROI Calculator", href: "/tools/roi-calculator" },
        { label: "Stack Recommender", href: "/tools/stack-recommender" },
        { label: "Prompt Library", href: "/tools/prompt-templates" },
    ]}
  ];

  return (
    <div className="min-h-screen bg-cyber-black pt-24 pb-12 px-6 md:px-24">
        <div className="max-w-4xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-white mb-8 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> Return Home
            </Link>

            <h1 className="text-4xl font-bold text-white mb-12 flex items-center gap-3">
                <Map className="text-cyber-primary" /> SITE MAP
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {routes.map((category) => (
                    <div key={category.section} className="bg-gray-900/30 border border-gray-800 rounded-xl p-8">
                        <h2 className="text-xl font-bold text-cyber-secondary mb-6 flex items-center gap-2">
                            {category.section === 'Main' && <User size={18} />}
                            {category.section === 'Work' && <Briefcase size={18} />}
                            {category.section === 'Content' && <FileText size={18} />}
                            {category.section}
                        </h2>
                        <ul className="space-y-3">
                            {category.links.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-gray-400 hover:text-white hover:text-cyber-primary transition-colors block py-1">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default Sitemap;
