
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Layers, FileText, ArrowRight, ArrowLeft, Download, Copy, Check, Cpu, DollarSign, BarChart2, Zap, Search, Settings, Share2, X } from 'lucide-react';

type ToolType = 'hub' | 'roi' | 'stack' | 'prompts';

// --- SUB COMPONENTS DEFINED FIRST TO AVOID REFERENCE ERRORS ---

const ToolsHub: React.FC<{ onNavigate: (t: ToolType, p: string) => void }> = ({ onNavigate }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-12"
        >
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                    AI TOOLS <span className="text-cyber-secondary">HUB</span>
                </h2>
                <p className="text-xl text-gray-400">
                    Free utilities to accelerate your autonomous journey. 
                    <br className="hidden md:block"/> Calculate ROI, architect your stack, and engineer better prompts.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* ROI Card */}
                <div 
                    onClick={() => onNavigate('roi', '/tools/roi-calculator')}
                    className="group bg-gray-900/40 border border-gray-800 rounded-2xl p-8 hover:bg-gray-900/60 hover:border-cyber-primary/50 transition-all cursor-pointer relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                         <Calculator size={48} className="text-cyber-primary" />
                    </div>
                    <div className="w-12 h-12 bg-black rounded-xl border border-gray-700 flex items-center justify-center mb-6 group-hover:border-cyber-primary group-hover:scale-110 transition-all">
                        <DollarSign className="text-white group-hover:text-cyber-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Agent ROI Calculator</h3>
                    <p className="text-gray-400 text-sm mb-6">
                        Visualize the cost savings of deploying autonomous agents vs manual labor. Includes break-even analysis.
                    </p>
                    <div className="flex items-center text-cyber-primary font-mono text-xs uppercase tracking-widest gap-2">
                        Calculate Savings <ArrowRight size={14} />
                    </div>
                </div>

                {/* Stack Recommender Card */}
                <div 
                    onClick={() => onNavigate('stack', '/tools/stack-recommender')}
                    className="group bg-gray-900/40 border border-gray-800 rounded-2xl p-8 hover:bg-gray-900/60 hover:border-cyber-secondary/50 transition-all cursor-pointer relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                         <Cpu size={48} className="text-cyber-secondary" />
                    </div>
                    <div className="w-12 h-12 bg-black rounded-xl border border-gray-700 flex items-center justify-center mb-6 group-hover:border-cyber-secondary group-hover:scale-110 transition-all">
                        <Layers className="text-white group-hover:text-cyber-secondary" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">AI Stack Recommender</h3>
                    <p className="text-gray-400 text-sm mb-6">
                        Not sure which LLM or framework to use? Take this 5-step quiz to get a tailored architecture recommendation.
                    </p>
                    <div className="flex items-center text-cyber-secondary font-mono text-xs uppercase tracking-widest gap-2">
                        Get Recommendation <ArrowRight size={14} />
                    </div>
                </div>

                {/* Prompt Library Card */}
                <div 
                    onClick={() => onNavigate('prompts', '/tools/prompt-templates')}
                    className="group bg-gray-900/40 border border-gray-800 rounded-2xl p-8 hover:bg-gray-900/60 hover:border-green-400/50 transition-all cursor-pointer relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                         <FileText size={48} className="text-green-400" />
                    </div>
                    <div className="w-12 h-12 bg-black rounded-xl border border-gray-700 flex items-center justify-center mb-6 group-hover:border-green-400 group-hover:scale-110 transition-all">
                        <Zap className="text-white group-hover:text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Prompt Template Library</h3>
                    <p className="text-gray-400 text-sm mb-6">
                        A curated collection of system prompts for coding, analysis, and content generation. Optimized for GPT-4 & Claude.
                    </p>
                    <div className="flex items-center text-green-400 font-mono text-xs uppercase tracking-widest gap-2">
                        Browse Library <ArrowRight size={14} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// --- TOOL 1: ROI CALCULATOR ---

const ROICalculator: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [inputs, setInputs] = useState({
        hoursPerWeek: 10,
        hourlyCost: 50,
        taskVolume: 100,
        complexity: 'medium' as 'simple' | 'medium' | 'complex'
    });

    const calculateMetrics = () => {
        const annualManualCost = inputs.hoursPerWeek * 52 * inputs.hourlyCost;
        
        let automationRate = 0.9; // Simple
        let implementationCost = 5000;
        
        if (inputs.complexity === 'medium') {
            automationRate = 0.75;
            implementationCost = 15000;
        } else if (inputs.complexity === 'complex') {
            automationRate = 0.6;
            implementationCost = 40000;
        }

        const annualSavings = annualManualCost * automationRate;
        const monthlySavings = annualSavings / 12;
        const roiMonths = implementationCost / monthlySavings;
        const firstYearNet = annualSavings - implementationCost;

        return { annualManualCost, annualSavings, implementationCost, roiMonths, firstYearNet, automationRate };
    };

    const metrics = calculateMetrics();

    // Chart Data Generation
    const years = 3;
    const chartData = Array.from({ length: years + 1 }, (_, i) => {
        const manual = metrics.annualManualCost * i;
        const automated = i === 0 ? metrics.implementationCost : metrics.implementationCost + ((metrics.annualManualCost - metrics.annualSavings) * i);
        return { year: i, manual, automated };
    });

    const maxVal = chartData[years].manual;

    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-white mb-8 transition-colors group">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Tools
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Inputs */}
                <div className="lg:col-span-4 space-y-8 bg-gray-900/30 p-8 rounded-2xl border border-gray-800">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Parameters</h3>
                        <p className="text-gray-400 text-sm">Define your current manual process.</p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-mono text-cyber-primary uppercase block mb-2">Hours Spent (Per Week)</label>
                            <input 
                                type="number" 
                                value={inputs.hoursPerWeek}
                                onChange={e => setInputs({...inputs, hoursPerWeek: Number(e.target.value)})}
                                className="w-full bg-black border border-gray-700 rounded px-4 py-3 text-white focus:border-cyber-primary outline-none"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-mono text-cyber-primary uppercase block mb-2">Employee Hourly Cost ($)</label>
                            <input 
                                type="number" 
                                value={inputs.hourlyCost}
                                onChange={e => setInputs({...inputs, hourlyCost: Number(e.target.value)})}
                                className="w-full bg-black border border-gray-700 rounded px-4 py-3 text-white focus:border-cyber-primary outline-none"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-mono text-cyber-primary uppercase block mb-2">Task Complexity</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['simple', 'medium', 'complex'].map(c => (
                                    <button
                                        key={c}
                                        onClick={() => setInputs({...inputs, complexity: c as any})}
                                        className={`py-2 px-1 text-xs uppercase font-bold rounded border transition-all ${
                                            inputs.complexity === c 
                                            ? 'bg-cyber-primary text-black border-cyber-primary' 
                                            : 'bg-black text-gray-500 border-gray-700 hover:border-gray-500'
                                        }`}
                                    >
                                        {c}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="lg:col-span-8 space-y-8">
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                            <div className="text-xs text-gray-500 uppercase font-mono mb-1">Annual Savings</div>
                            <div className="text-3xl font-bold text-green-400">${metrics.annualSavings.toLocaleString()}</div>
                        </div>
                        <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                            <div className="text-xs text-gray-500 uppercase font-mono mb-1">Break-Even Point</div>
                            <div className="text-3xl font-bold text-cyber-primary">{metrics.roiMonths.toFixed(1)} Months</div>
                        </div>
                        <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                            <div className="text-xs text-gray-500 uppercase font-mono mb-1">1st Year Net</div>
                            <div className="text-3xl font-bold text-white">${metrics.firstYearNet.toLocaleString()}</div>
                        </div>
                     </div>

                     {/* Chart */}
                     <div className="bg-black/50 p-8 rounded-xl border border-gray-800 relative h-80 flex items-end gap-8">
                        {/* Y-Axis Label */}
                        <div className="absolute top-4 left-4 text-xs text-gray-500 font-mono">Cumulative Cost ($)</div>
                        
                        {chartData.map((data, i) => (
                             <div key={i} className="flex-1 flex gap-2 items-end h-full relative group">
                                 {/* Tooltip */}
                                 <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-800 text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 border border-gray-700">
                                     Manual: ${data.manual.toLocaleString()} <br/>
                                     Auto: ${data.automated.toLocaleString()}
                                 </div>

                                 {/* Bars */}
                                 <div className="w-full bg-gray-700/30 rounded-t relative hover:bg-gray-700/50 transition-colors" style={{ height: `${(data.manual / maxVal) * 100}%` }}>
                                     {data.manual > 0 && <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-500">M</span>}
                                 </div>
                                 <div className="w-full bg-cyber-primary rounded-t relative hover:bg-cyber-secondary transition-colors" style={{ height: `${(data.automated / maxVal) * 100}%` }}>
                                     {data.automated > 0 && <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-cyber-primary font-bold">A</span>}
                                 </div>
                                 
                                 <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-500 font-mono">Year {data.year}</div>
                             </div>
                        ))}
                     </div>
                     <p className="text-center text-xs text-gray-500 italic">
                         *Estimates based on typical agentic efficiency rates of {metrics.automationRate * 100}% for {inputs.complexity} tasks.
                     </p>
                </div>
            </div>
        </motion.div>
    );
};

// --- TOOL 2: STACK RECOMMENDER ---

const RecommendationRow: React.FC<{label: string, value: string}> = ({label, value}) => (
    <div className="flex justify-between items-center border-b border-gray-800 pb-2 last:border-0 last:pb-0">
        <span className="text-gray-500 text-sm font-mono">{label}</span>
        <span className="text-white font-bold">{value}</span>
    </div>
);

const StackRecommender: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<any>({});
    
    const questions = [
        {
            id: 'useCase',
            question: "What is your primary use case?",
            options: [
                { value: 'content', label: 'Content Generation', icon: FileText },
                { value: 'data', label: 'Data Analysis / RAG', icon: BarChart2 },
                { value: 'coding', label: 'Code & Dev', icon: Cpu },
                { value: 'service', label: 'Customer Service', icon: Zap }
            ]
        },
        {
            id: 'teamSize',
            question: "How big is your technical team?",
            options: [
                { value: 'solo', label: 'Solo Founder', icon: Settings },
                { value: 'small', label: 'Small Team (2-10)', icon: Layers },
                { value: 'enterprise', label: 'Enterprise', icon: Settings }
            ]
        },
        {
            id: 'techLevel',
            question: "What is your Python/AI expertise?",
            options: [
                { value: 'low', label: 'Low-Code / No-Code', icon: FileText },
                { value: 'med', label: 'Comfortable with APIs', icon: Cpu },
                { value: 'high', label: 'AI Engineer / Architect', icon: Layers }
            ]
        }
    ];

    const getRecommendation = () => {
        const { useCase, techLevel } = answers;
        
        if (techLevel === 'low') {
            return {
                title: "No-Code Orchestration",
                llm: "Claude 3.5 Sonnet",
                framework: "Make.com / Zapier + ChatGPT Enterprise",
                db: "Airtable",
                desc: "Focus on connecting pre-built tools. Claude 3.5 is the best 'smart' model for reasoning without code."
            };
        }

        if (useCase === 'data') {
            return {
                title: "RAG Analyst Stack",
                llm: "GPT-4o or Gemini 1.5 Pro",
                framework: "LangChain + LlamaIndex",
                db: "Pinecone / Supabase pgvector",
                desc: "Gemini's 2M context window is unmatched for data. Use LlamaIndex for superior retrieval."
            };
        }

        if (useCase === 'service') {
            return {
                title: "Real-Time Agent Stack",
                llm: "GPT-4o Mini (Speed) or Llama 3.1 70B (Control)",
                framework: "Vapi (Voice) or Bland AI",
                db: "Redis (Memory)",
                desc: "Latency is king here. GPT-4o Mini is cheap and fast. Llama 3.1 allows self-hosting for privacy."
            };
        }

        // Default / Coding / High Tech
        return {
            title: "Vertical Labs Standard",
            llm: "Claude 3.5 Sonnet + GPT-4o (Router)",
            framework: "CrewAI or OpenAI Swarm",
            db: "ChromaDB (Local) or Weaviate",
            desc: "The gold standard for agentic systems. CrewAI for complex flows, Swarm for lightweight handoffs."
        };
    };

    const handleAnswer = (val: string) => {
        setAnswers({ ...answers, [questions[step].id]: val });
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            setStep(step + 1); // Show result
        }
    };

    const result = step === questions.length ? getRecommendation() : null;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-white mb-8 transition-colors group">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Tools
            </button>
            
            <div className="max-w-2xl mx-auto">
                <div className="mb-8 flex justify-center gap-2">
                    {questions.map((_, i) => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? 'bg-cyber-secondary' : 'bg-gray-800'}`} />
                    ))}
                    <div className={`h-1 flex-1 rounded-full transition-colors ${step === questions.length ? 'bg-cyber-secondary' : 'bg-gray-800'}`} />
                </div>

                <div className="bg-gray-900/40 border border-gray-800 p-8 rounded-2xl min-h-[400px] flex flex-col justify-center">
                    {step < questions.length ? (
                        <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
                             <h3 className="text-3xl font-bold text-white text-center">{questions[step].question}</h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {questions[step].options.map(opt => (
                                    <button 
                                        key={opt.value}
                                        onClick={() => handleAnswer(opt.value)}
                                        className="p-6 bg-black/50 border border-gray-700 rounded-xl hover:bg-gray-800 hover:border-cyber-secondary transition-all flex flex-col items-center gap-3 group"
                                    >
                                        <opt.icon className="text-gray-500 group-hover:text-cyber-secondary transition-colors" size={32} />
                                        <span className="text-lg font-bold text-gray-300 group-hover:text-white">{opt.label}</span>
                                    </button>
                                ))}
                             </div>
                        </div>
                    ) : (
                        <div className="text-center space-y-8 animate-[fadeIn_0.5s_ease-out]">
                            <div>
                                <h3 className="text-cyber-secondary font-mono text-sm uppercase tracking-widest mb-2">Recommended Architecture</h3>
                                <h2 className="text-4xl font-bold text-white">{result?.title}</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4 text-left bg-black/30 p-6 rounded-xl border border-gray-800">
                                <RecommendationRow label="LLM Model" value={result?.llm || ''} />
                                <RecommendationRow label="Orchestration" value={result?.framework || ''} />
                                <RecommendationRow label="Infrastructure" value={result?.db || ''} />
                            </div>

                            <p className="text-gray-400 leading-relaxed max-w-lg mx-auto">
                                {result?.desc}
                            </p>

                            <button onClick={() => { setStep(0); setAnswers({}); }} className="text-gray-500 hover:text-white underline text-sm">
                                Restart Quiz
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

// --- TOOL 3: PROMPT LIBRARY ---

const PromptLibrary: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [selectedPrompt, setSelectedPrompt] = useState<any>(null);

    const prompts = [
        { id: 1, title: 'Expert Code Refactor', category: 'Coding', desc: 'Forces specific TSDoc formatting and functional patterns.', content: 'You are a Senior Principal Engineer at Google. Review the following code for: 1) Performance bottlenecks, 2) Security vulnerabilities, 3) Readability. Rewrite the code using functional programming patterns. Add TSDoc comments to every function.' },
        { id: 2, title: 'SaaS Landing Page Copy', category: 'Marketing', desc: 'Generates high-conversion H1s and benefits using the PAS framework.', content: 'Act as a world-class copywriter specializing in B2B SaaS. Using the Problem-Agitation-Solution (PAS) framework, write 5 variations of a landing page Hero Section for a product that [PRODUCT_DESCRIPTION]. Focus on the emotional pain point of [PAIN_POINT].' },
        { id: 3, title: 'Strategic Analysis (SWOT)', category: 'Business', desc: 'Conducts a deep dive SWOT analysis on a given competitor.', content: 'Conduct a comprehensive SWOT analysis for [COMPANY_NAME]. Focus on their recent AI initiatives. For each Threat, propose a specific counter-strategy we can employ. Output in Markdown table format.' },
        { id: 4, title: 'Midjourney Photorealism', category: 'Creative', desc: 'Parameters for generating hyper-realistic 8k photography.', content: '/imagine prompt: extreme close-up portrait of [SUBJECT], natural lighting, 8k resolution, shot on 35mm lens, f/1.8, cinematic lighting, highly detailed skin texture --ar 16:9 --v 6.0 --style raw' },
        { id: 5, title: 'System Architect Persona', category: 'Coding', desc: 'Setup prompt for architectural decision making.', content: 'You are an expert System Architect. I want you to design a system for [USE_CASE]. Focus on scalability, fault tolerance, and cost optimization. Suggest specific AWS/GCP services. Output a PlantUML diagram code block.' },
        { id: 6, title: 'Newsletter Summarizer', category: 'Content', desc: 'Condenses complex tech news into witty bullet points.', content: 'Summarize the following text into 3 bullet points. Tone: Witty, insider-y, like the Morning Brew. Focus on the "Why it matters" angle. Input text: [PASTE_TEXT]' },
    ];

    const filtered = prompts.filter(p => 
        (filter === 'All' || p.category === filter) &&
        (p.title.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase()))
    );

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        alert("Prompt copied to clipboard!");
    };

    const handleDownload = (p: any) => {
        const element = document.createElement("a");
        const file = new Blob([p.content], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = `${p.title.replace(/\s+/g, '_')}.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-white mb-8 transition-colors group">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Tools
            </button>
            
            <div className="flex flex-col md:flex-row gap-6 mb-8 items-end">
                <div className="flex-1 w-full">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 text-gray-500" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search prompts..." 
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-green-400 outline-none"
                        />
                    </div>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
                    {['All', 'Coding', 'Marketing', 'Business', 'Creative'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-3 py-1.5 rounded-full text-xs font-mono border transition-all whitespace-nowrap ${
                                filter === cat 
                                ? 'bg-green-400 text-black border-green-400 font-bold' 
                                : 'bg-black text-gray-400 border-gray-800 hover:border-green-400/50'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(prompt => (
                    <div key={prompt.id} className="bg-gray-900/40 border border-gray-800 rounded-xl p-6 hover:border-green-400/50 transition-all flex flex-col group">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-[10px] uppercase font-mono bg-black px-2 py-1 rounded text-gray-500 border border-gray-800">{prompt.category}</span>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleCopy(prompt.content)} className="p-1.5 bg-gray-800 rounded hover:text-green-400 transition-colors"><Copy size={14} /></button>
                                <button onClick={() => handleDownload(prompt)} className="p-1.5 bg-gray-800 rounded hover:text-green-400 transition-colors"><Download size={14} /></button>
                            </div>
                        </div>
                        <h3 className="text-white font-bold mb-2">{prompt.title}</h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{prompt.desc}</p>
                        <div className="mt-auto bg-black/50 p-3 rounded border border-gray-800 text-gray-500 font-mono text-xs overflow-hidden h-24 relative">
                            {prompt.content}
                            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-black to-transparent"></div>
                        </div>
                        <button 
                            onClick={() => setSelectedPrompt(prompt)}
                            className="mt-4 w-full py-2 bg-gray-800 hover:bg-green-400 hover:text-black rounded text-xs font-bold transition-colors uppercase"
                        >
                            View Full Prompt
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedPrompt && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedPrompt(null)}>
                    <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-2xl p-8 relative shadow-2xl" onClick={e => e.stopPropagation()}>
                        <button onClick={() => setSelectedPrompt(null)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X size={20}/></button>
                        
                        <div className="mb-6">
                            <span className="text-green-400 font-mono text-xs uppercase tracking-widest">{selectedPrompt.category}</span>
                            <h2 className="text-2xl font-bold text-white mt-1">{selectedPrompt.title}</h2>
                        </div>

                        <div className="bg-black p-6 rounded-xl border border-gray-800 mb-6 font-mono text-sm text-gray-300 whitespace-pre-wrap leading-relaxed max-h-[60vh] overflow-y-auto custom-scrollbar">
                            {selectedPrompt.content}
                        </div>

                        <div className="flex gap-4">
                            <button onClick={() => handleCopy(selectedPrompt.content)} className="flex-1 bg-green-400 text-black font-bold py-3 rounded hover:bg-white transition-colors flex items-center justify-center gap-2">
                                <Copy size={18} /> Copy to Clipboard
                            </button>
                            <button onClick={() => handleDownload(selectedPrompt)} className="px-6 bg-gray-800 text-white font-bold py-3 rounded hover:bg-gray-700 transition-colors border border-gray-700">
                                <Download size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

// --- MAIN COMPONENT DEFINED LAST ---

const Tools: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolType>('hub');

  // Handle Routing
  useEffect(() => {
    const handleUrlChange = () => {
        const path = window.location.pathname;
        if (path.includes('/tools/roi-calculator')) setActiveTool('roi');
        else if (path.includes('/tools/stack-recommender')) setActiveTool('stack');
        else if (path.includes('/tools/prompt-templates')) setActiveTool('prompts');
        else if (path.includes('/tools')) setActiveTool('hub');
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  const navigateTo = (tool: ToolType, path: string) => {
    setActiveTool(tool);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="tools" className="py-24 px-6 md:px-24 w-full bg-cyber-black relative border-t border-gray-900 min-h-screen">
       <div className="absolute inset-0 bg-[linear-gradient(rgba(112,0,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(112,0,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

       <div className="max-w-7xl mx-auto relative z-10">
          <AnimatePresence mode="wait">
             {activeTool === 'hub' && <ToolsHub onNavigate={navigateTo} />}
             {activeTool === 'roi' && <ROICalculator onBack={() => navigateTo('hub', '/tools')} />}
             {activeTool === 'stack' && <StackRecommender onBack={() => navigateTo('hub', '/tools')} />}
             {activeTool === 'prompts' && <PromptLibrary onBack={() => navigateTo('hub', '/tools')} />}
          </AnimatePresence>
       </div>
    </section>
  );
};

export default Tools;
