
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Terminal, ArrowRight, Activity, Zap, Layers, Lock, RotateCcw, Check, FileText, Search, MonitorPlay, BarChart2, Scissors, RefreshCw, Copy, Database, AlertCircle } from 'lucide-react';
import { generateAgentArchitecture, optimizePrompt, compressContext, predictMatch } from '../services/geminiService';
import { AgentNode, AgentFlow, ArchitectureResult, PromptResult, PredictionResult } from '../types';

const MAX_FREE_USES = 3;

const Lab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'architect' | 'forge' | 'context' | 'oracle'>('architect');
  const [uses, setUses] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState('');

  // Check usage on mount
  useEffect(() => {
    const storedUses = localStorage.getItem('lab_uses');
    const storedUnlock = localStorage.getItem('lab_unlocked');
    if (storedUses) setUses(parseInt(storedUses));
    if (storedUnlock === 'true') setIsUnlocked(true);
  }, []);

  const incrementUsage = () => {
    if (isUnlocked) return true;
    
    if (uses >= MAX_FREE_USES) {
      setShowEmailModal(true);
      return false;
    }
    
    const newUses = uses + 1;
    setUses(newUses);
    localStorage.setItem('lab_uses', newUses.toString());
    return true;
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsUnlocked(true);
      localStorage.setItem('lab_unlocked', 'true');
      setShowEmailModal(false);
    }
  };

  return (
    <section id="lab" className="py-24 px-6 md:px-24 w-full bg-black relative border-t border-gray-900">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-cyber-primary">03.</span> AI LAB <Zap className="text-yellow-400 fill-yellow-400/20" />
            </h2>
            <p className="text-gray-400 max-w-xl">
              Interactive demonstrations of Vertical Labs' core technologies. 
              Experiment with agent orchestration, token optimization, and predictive models.
            </p>
          </div>
          
          {!isUnlocked && (
            <div className="bg-gray-900/50 border border-gray-800 rounded-full px-4 py-2 flex items-center gap-3 text-xs font-mono text-gray-400">
              <Activity size={14} className={uses >= MAX_FREE_USES ? 'text-red-500' : 'text-green-500'} />
              <span>SYSTEM CREDITS: {Math.max(0, MAX_FREE_USES - uses)}/{MAX_FREE_USES}</span>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-800 pb-1">
          {[
             { id: 'architect', icon: Cpu, label: 'AGENT_ARCHITECT' },
             { id: 'forge', icon: Terminal, label: 'PROMPT_FORGE' },
             { id: 'context', icon: Layers, label: 'CONTEXT_WINDOW' },
             { id: 'oracle', icon: MonitorPlay, label: 'ESPORTS_ORACLE' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-t-lg font-mono text-xs md:text-sm transition-all ${
                activeTab === tab.id 
                  ? 'bg-cyber-primary/10 text-cyber-primary border-b-2 border-cyber-primary' 
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>

        <div className="min-h-[600px] bg-gray-900/20 border border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm relative">
           <AnimatePresence mode="wait">
             {activeTab === 'architect' && <AgentArchitect key="architect" onInteract={incrementUsage} />}
             {activeTab === 'forge' && <PromptForge key="forge" onInteract={incrementUsage} />}
             {activeTab === 'context' && <ContextWindow key="context" onInteract={incrementUsage} />}
             {activeTab === 'oracle' && <EsportsOracle key="oracle" onInteract={incrementUsage} />}
           </AnimatePresence>

           {/* Locked Overlay */}
           {showEmailModal && (
             <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(0,240,255,0.1)]"
                >
                   <Lock className="w-12 h-12 text-cyber-primary mx-auto mb-6" />
                   <h3 className="text-2xl font-bold text-white text-center mb-2">System Limit Reached</h3>
                   <p className="text-gray-400 text-center mb-6 text-sm">
                     To conserve GPU resources, guest access is limited. Enter your email to unlock unlimited access to the AI Lab.
                   </p>
                   
                   <form onSubmit={handleUnlock} className="space-y-4">
                     <input 
                       type="email" 
                       required
                       placeholder="Enter your email"
                       value={email}
                       onChange={e => setEmail(e.target.value)}
                       className="w-full bg-black border border-gray-700 rounded px-4 py-3 text-white focus:border-cyber-primary outline-none"
                     />
                     <button className="w-full bg-cyber-primary text-black font-bold py-3 rounded hover:bg-white transition-colors">
                       UNLOCK ACCESS
                     </button>
                   </form>
                   <p className="text-xs text-gray-600 text-center mt-4">
                     No spam. Just access to demos and occasional updates on Vertical Labs.
                   </p>
                </motion.div>
             </div>
           )}
        </div>
      </div>
    </section>
  );
};

// --- AGENT ARCHITECT COMPONENT ---

const AgentArchitect: React.FC<{ onInteract: () => boolean }> = ({ onInteract }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ArchitectureResult | null>(null);

  const handleGenerate = async () => {
    if (!input.trim() || !onInteract()) return;
    setLoading(true);
    try {
      const result = await generateAgentArchitecture(input);
      setData(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="p-6 md:p-8 h-full flex flex-col"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
         
         {/* Input Panel */}
         <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Process Definition</h3>
              <p className="text-sm text-gray-400">Describe a business process you want to automate. The system will architect a multi-agent swarm to handle it.</p>
            </div>
            
            <textarea 
               value={input}
               onChange={e => setInput(e.target.value)}
               placeholder="Example: I want to automate my daily newsletter. I need to scrape TechCrunch, summarize top articles, write a witty intro, and format it for email."
               className="w-full h-40 bg-black/50 border border-gray-700 rounded-lg p-4 text-sm text-white focus:border-cyber-primary outline-none resize-none font-mono"
            />

            <button 
              onClick={handleGenerate}
              disabled={loading || !input.trim()}
              className="w-full bg-gray-800 hover:bg-cyber-primary hover:text-black border border-gray-700 hover:border-cyber-primary text-white py-4 rounded-lg font-mono font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
               {loading ? <Zap className="animate-spin" /> : <Cpu />}
               {loading ? 'ARCHITECTING...' : 'GENERATE SWARM'}
            </button>

            {data && (
               <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 animate-[fadeIn_0.5s_ease-out]">
                  <h4 className="text-xs font-mono text-gray-500 uppercase mb-2">System Summary</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">{data.summary}</p>
                  
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <button className="text-cyber-primary text-xs font-mono hover:underline flex items-center gap-1">
                       BUILD THIS WITH VERTICAL LABS <ArrowRight size={12} />
                    </button>
                  </div>
               </div>
            )}
         </div>

         {/* Visualization Panel */}
         <div className="lg:col-span-2 bg-black border border-gray-800 rounded-xl relative overflow-hidden min-h-[400px] flex items-center justify-center">
            {/* Grid BG */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            
            {!data && !loading && (
               <div className="text-center text-gray-600">
                  <Cpu size={48} className="mx-auto mb-4 opacity-20" />
                  <p className="font-mono text-sm">AWAITING INPUT PARAMETERS...</p>
               </div>
            )}

            {loading && (
               <div className="flex flex-col items-center gap-4">
                  <div className="relative w-24 h-24">
                     <div className="absolute inset-0 border-4 border-cyber-primary/20 rounded-full animate-ping"></div>
                     <div className="absolute inset-2 border-4 border-t-cyber-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                  </div>
                  <p className="font-mono text-cyber-primary text-sm animate-pulse">DESIGNING AGENTS...</p>
               </div>
            )}

            {data && !loading && (
               <AgentGraph agents={data.agents} flow={data.flow} />
            )}
         </div>
      </div>
    </motion.div>
  );
};

// Simple Graph Visualizer
const AgentGraph: React.FC<{ agents: AgentNode[], flow: AgentFlow[] }> = ({ agents, flow }) => {
   // Simple force-directed-like layout calculation (static for stability)
   const centerX = 50; 
   const centerY = 50;
   const radius = 35;
   
   return (
     <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <defs>
           <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#4b5563" />
           </marker>
        </defs>

        {/* Connections */}
        {flow.map((edge, i) => {
           const fromIndex = agents.findIndex(a => a.id === edge.from);
           const toIndex = agents.findIndex(a => a.id === edge.to);
           if(fromIndex === -1 || toIndex === -1) return null;

           const fromAngle = (fromIndex / agents.length) * Math.PI * 2 - Math.PI / 2;
           const toAngle = (toIndex / agents.length) * Math.PI * 2 - Math.PI / 2;

           const x1 = centerX + radius * Math.cos(fromAngle);
           const y1 = centerY + radius * Math.sin(fromAngle);
           const x2 = centerX + radius * Math.cos(toAngle);
           const y2 = centerY + radius * Math.sin(toAngle);

           return (
              <g key={i}>
                 <motion.path 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    d={`M ${x1} ${y1} Q ${centerX} ${centerY} ${x2} ${y2}`}
                    fill="none"
                    stroke="#374151"
                    strokeWidth="0.5"
                    markerEnd="url(#arrowhead)"
                 />
                 {/* Moving Particle */}
                 <circle r="1" fill="#00f0ff">
                    <animateMotion 
                       dur="2s" 
                       repeatCount="indefinite"
                       path={`M ${x1} ${y1} Q ${centerX} ${centerY} ${x2} ${y2}`}
                    />
                 </circle>
              </g>
           );
        })}

        {/* Nodes */}
        {agents.map((agent, i) => {
           const angle = (i / agents.length) * Math.PI * 2 - Math.PI / 2;
           const x = centerX + radius * Math.cos(angle);
           const y = centerY + radius * Math.sin(angle);

           return (
              <motion.g 
                 key={agent.id}
                 initial={{ scale: 0, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 transition={{ delay: i * 0.1 }}
                 className="cursor-pointer hover:opacity-80"
              >
                 <circle cx={x} cy={y} r="8" fill="#111827" stroke={agent.color} strokeWidth="0.5" />
                 <circle cx={x} cy={y} r="2" fill={agent.color} className="animate-pulse" />
                 
                 <text x={x} y={y + 12} textAnchor="middle" fill="white" fontSize="3" fontWeight="bold">
                    {agent.name}
                 </text>
                 <text x={x} y={y + 15} textAnchor="middle" fill="#9ca3af" fontSize="2">
                    {agent.role}
                 </text>
              </motion.g>
           );
        })}
     </svg>
   );
};

// --- PROMPT FORGE COMPONENT ---

const PromptForge: React.FC<{ onInteract: () => boolean }> = ({ onInteract }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PromptResult | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  
  const toggleOption = (opt: string) => {
     setOptions(prev => prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt]);
  };

  const handleOptimize = async () => {
    if (!input.trim() || !onInteract()) return;
    setLoading(true);
    try {
      const res = await optimizePrompt(input, options);
      setResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  
  const estimateTokens = (txt: string) => Math.ceil(txt.length / 4);

  return (
     <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="p-6 md:p-8 h-full flex flex-col"
    >
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          <div className="space-y-4 flex flex-col">
             <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Input Prompt</h3>
                <div className="flex gap-2">
                   <button 
                      onClick={() => setInput("Write a python script to scrape data from a website and save it to a CSV.")}
                      className="text-xs text-cyber-primary hover:underline"
                   >
                      Load Example
                   </button>
                   <span className="text-xs text-gray-500">|</span>
                   <span className="text-xs text-gray-500 font-mono">~{estimateTokens(input)} tokens</span>
                </div>
             </div>
             
             <textarea 
               value={input}
               onChange={e => setInput(e.target.value)}
               className="flex-1 bg-black/50 border border-gray-700 rounded-lg p-4 text-gray-300 focus:border-cyber-primary outline-none resize-none font-mono text-sm min-h-[200px]"
               placeholder="Paste your raw prompt here..."
             />
             
             <div className="flex flex-wrap gap-2">
                {['Clarity', 'Brevity', 'Chain-of-Thought', 'JSON Output', 'Persona'].map(opt => (
                   <button
                     key={opt}
                     onClick={() => toggleOption(opt)}
                     className={`px-3 py-1 text-xs rounded-full border transition-all ${
                        options.includes(opt) 
                        ? 'bg-cyber-primary text-black border-cyber-primary font-bold' 
                        : 'bg-gray-900 text-gray-400 border-gray-700 hover:border-cyber-primary/50'
                     }`}
                   >
                      {opt}
                   </button>
                ))}
             </div>

             <button 
              onClick={handleOptimize}
              disabled={loading || !input.trim()}
              className="w-full bg-cyber-primary text-black hover:bg-white border border-transparent py-3 rounded-lg font-mono font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
               {loading ? <RotateCcw className="animate-spin" /> : <Zap />}
               {loading ? 'OPTIMIZING...' : 'FORGE PROMPT'}
            </button>
          </div>

          <div className="space-y-4 flex flex-col min-h-[300px]">
             <h3 className="text-lg font-bold text-white">Optimization Result</h3>
             
             {result ? (
                <div className="flex-1 bg-gray-900/50 border border-gray-800 rounded-lg p-6 overflow-y-auto custom-scrollbar animate-[fadeIn_0.5s_ease-out]">
                   <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                         <div className={`text-4xl font-bold ${result.score > 80 ? 'text-green-500' : 'text-yellow-500'}`}>
                            {result.score}
                         </div>
                         <div className="text-xs text-gray-500 uppercase font-mono">
                            Prompt<br/>Quality Score
                         </div>
                      </div>
                      <div className="text-right flex items-center gap-2">
                         <span className="text-xs text-gray-500 font-mono">~{estimateTokens(result.optimized)} tokens</span>
                         <button 
                           onClick={() => {navigator.clipboard.writeText(result.optimized)}}
                           className="text-xs bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded flex items-center gap-2 transition-colors"
                         >
                            <Copy size={12} /> Copy
                         </button>
                      </div>
                   </div>

                   <div className="mb-6">
                      <h4 className="text-xs font-mono text-cyber-primary uppercase mb-2">Refined Prompt</h4>
                      <div className="bg-black p-4 rounded border border-gray-700 text-gray-200 text-sm font-mono whitespace-pre-wrap">
                         {result.optimized}
                      </div>
                   </div>

                   <div>
                      <h4 className="text-xs font-mono text-gray-500 uppercase mb-2">Critique & Changes</h4>
                      <ul className="space-y-2">
                         {result.changes.map((change, i) => (
                            <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                               <ArrowRight size={12} className="mt-0.5 text-cyber-secondary shrink-0" />
                               {change}
                            </li>
                         ))}
                      </ul>
                   </div>
                </div>
             ) : (
                <div className="flex-1 bg-gray-900/20 border border-gray-800 border-dashed rounded-lg flex items-center justify-center text-gray-600">
                   <div className="text-center">
                     <Terminal size={48} className="mx-auto mb-4 opacity-20" />
                     <p className="font-mono text-sm">AWAITING INPUT...</p>
                   </div>
                </div>
             )}
          </div>
       </div>
    </motion.div>
  );
};

// --- CONTEXT WINDOW CALCULATOR COMPONENT ---

const ContextWindow: React.FC<{ onInteract: () => boolean }> = ({ onInteract }) => {
  const [text, setText] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-5.1');
  const [loading, setLoading] = useState(false);
  
  const models = [
    { id: 'gemini-3-pro', name: 'Gemini 3 Pro', limit: 2000000, color: '#00f0ff' },
    { id: 'claude-sonnet-4-5-20250929', name: 'Claude Sonnet 4.5', limit: 500000, color: '#d97706' },
    { id: 'gpt-5.1', name: 'GPT-5.1', limit: 128000, color: '#10b981' },
    { id: 'llama-4', name: 'Llama 4 405B', limit: 128000, color: '#3b82f6' },
  ];
  
  const activeModel = models.find(m => m.id === selectedModel) || models[0];
  const tokenCount = Math.ceil(text.length / 4);
  const usagePercent = Math.min(100, (tokenCount / activeModel.limit) * 100);
  
  const handleCompress = async () => {
     if (!text.trim() || !onInteract()) return;
     setLoading(true);
     try {
        const compressed = await compressContext(text);
        setText(compressed);
     } catch(e) {
        console.error(e);
     } finally {
        setLoading(false);
     }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="p-6 md:p-8 h-full flex flex-col"
    >
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          <div className="flex flex-col space-y-4">
             <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2"><Database size={18} /> Context Manager</h3>
                <div className="flex gap-2">
                    <button onClick={() => setText("")} className="text-xs text-red-400 hover:text-white flex items-center gap-1"><RefreshCw size={10} /> Clear</button>
                    <span className="text-gray-600">|</span>
                    <button onClick={() => setText("The history of artificial intelligence begins in antiquity, with myths, stories and rumors of artificial beings endowed with intelligence or consciousness by master craftsmen. The seeds of modern AI were planted by classical philosophers who attempted to describe the process of human thinking as the mechanical manipulation of symbols. This work culminated in the invention of the programmable digital computer in the 1940s, a machine based on the abstract essence of mathematical reasoning. This device and the ideas behind it inspired a handful of scientists to begin seriously discussing the possibility of building an electronic brain. The field of AI research was founded at a workshop held on the campus of Dartmouth College in the summer of 1956. Those who attended would become the leaders of AI research for decades.")} className="text-xs text-cyber-primary hover:underline">Load Sample</button>
                </div>
             </div>
             
             <div className="relative flex-1">
                <textarea 
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Paste your document, code, or prompt context here to calculate tokens..."
                    className="w-full h-full min-h-[300px] bg-black/50 border border-gray-700 rounded-lg p-4 text-gray-300 focus:border-cyber-primary outline-none resize-none font-mono text-xs custom-scrollbar"
                />
                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur px-3 py-1 rounded border border-gray-700 text-xs font-mono text-white">
                   {text.length} chars
                </div>
             </div>

             <div className="flex gap-2">
                 <button 
                    onClick={handleCompress}
                    disabled={loading || !text.trim()}
                    className="flex-1 bg-gray-800 border border-gray-700 hover:bg-gray-700 hover:border-cyber-primary/50 text-white py-3 rounded-lg font-mono font-bold transition-all flex items-center justify-center gap-2 group"
                 >
                    {loading ? <Scissors className="animate-spin" /> : <Scissors />}
                    {loading ? 'COMPRESSING...' : 'COMPRESS TOKENS'}
                 </button>
             </div>
          </div>

          <div className="flex flex-col gap-6">
             <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                   <h3 className="text-sm font-mono text-gray-400 uppercase">Target Model</h3>
                   <select 
                      value={selectedModel}
                      onChange={e => setSelectedModel(e.target.value)}
                      className="bg-black border border-gray-700 rounded px-2 py-1 text-white text-xs font-mono focus:border-cyber-primary outline-none"
                   >
                      {models.map(m => (
                         <option key={m.id} value={m.id}>{m.name}</option>
                      ))}
                   </select>
                </div>

                <div className="mb-2 flex justify-between items-end">
                   <span className="text-4xl font-bold text-white tracking-tighter">{tokenCount.toLocaleString()}</span>
                   <span className="text-xs font-mono text-gray-500 mb-1">/ {activeModel.limit.toLocaleString()} limit</span>
                </div>

                {/* Visual Bar */}
                <div className="h-4 bg-black rounded-full overflow-hidden border border-gray-700 relative mb-2">
                   {/* Tick marks */}
                   <div className="absolute top-0 left-1/4 h-full w-px bg-gray-800"></div>
                   <div className="absolute top-0 left-1/2 h-full w-px bg-gray-800"></div>
                   <div className="absolute top-0 left-3/4 h-full w-px bg-gray-800"></div>
                   
                   <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${usagePercent}%` }}
                      transition={{ type: 'spring', damping: 20 }}
                      className={`h-full relative ${
                         usagePercent > 90 ? 'bg-red-500' : 
                         usagePercent > 70 ? 'bg-yellow-500' : 
                         'bg-cyber-primary'
                      }`}
                      style={{ backgroundColor: usagePercent > 90 ? '#ef4444' : usagePercent > 70 ? '#eab308' : activeModel.color }}
                   >
                       <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[size:1rem_1rem] opacity-30"></div>
                   </motion.div>
                </div>
                
                <div className="flex justify-between text-[10px] font-mono uppercase text-gray-500">
                   <span>0%</span>
                   <span>50%</span>
                   <span>100%</span>
                </div>
             </div>

             <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 flex-1">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                   <AlertCircle size={14} className="text-cyber-secondary" /> Optimization Strategies
                </h3>
                <ul className="space-y-4">
                   <li className="flex gap-3 text-sm text-gray-400">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-cyber-primary shrink-0"></div>
                      <div>
                         <strong className="text-gray-200">Remove Stopwords</strong>
                         <p className="text-xs text-gray-500 mt-1">Filtering common words like "the", "a", "is" can reduce token count by 15-20% without losing meaning.</p>
                      </div>
                   </li>
                   <li className="flex gap-3 text-sm text-gray-400">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-cyber-primary shrink-0"></div>
                      <div>
                         <strong className="text-gray-200">Format Stripping</strong>
                         <p className="text-xs text-gray-500 mt-1">Excessive JSON keys or HTML tags consume valuable context. Use minimalist formats like YAML or Markdown tables.</p>
                      </div>
                   </li>
                   <li className="flex gap-3 text-sm text-gray-400">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-cyber-primary shrink-0"></div>
                      <div>
                         <strong className="text-gray-200">RAG Filtering</strong>
                         <p className="text-xs text-gray-500 mt-1">Don't dump entire documents. Use semantic search to extract only the relevant chunks (chunks of ~512 tokens).</p>
                      </div>
                   </li>
                </ul>
             </div>
          </div>
       </div>
    </motion.div>
  );
};

// --- ESPORTS ORACLE COMPONENT ---

const EsportsOracle: React.FC<{ onInteract: () => boolean }> = ({ onInteract }) => {
   const [matchup, setMatchup] = useState('T1 vs Gen.G');
   const [loading, setLoading] = useState(false);
   const [result, setResult] = useState<PredictionResult | null>(null);

   const handlePredict = async () => {
      if(!onInteract()) return;
      setLoading(true);
      setResult(null);
      try {
         const res = await predictMatch(matchup);
         setResult(res);
      } catch(e) {
         console.error(e);
      } finally {
         setLoading(false);
      }
   };

   return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="p-6 md:p-8 h-full flex flex-col"
    >
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
          <div className="space-y-8">
             <div>
                <h3 className="text-xl font-bold text-white mb-2">Match Prediction</h3>
                <p className="text-sm text-gray-400">Simulating the Computer Vision & RL models built for Esports One. Analyzes historical data to predict outcomes.</p>
             </div>

             <div className="space-y-4">
                <label className="text-xs font-mono text-cyber-primary uppercase">Select Matchup</label>
                <select 
                   value={matchup} 
                   onChange={e => setMatchup(e.target.value)}
                   className="w-full bg-black border border-gray-700 rounded px-4 py-3 text-white focus:border-cyber-primary outline-none"
                >
                   <option value="T1 vs Gen.G">T1 vs Gen.G (LoL)</option>
                   <option value="G2 vs Fnatic">G2 vs Fnatic (LoL)</option>
                   <option value="Sentinels vs 100 Thieves">Sentinels vs 100 Thieves (Valorant)</option>
                   <option value="FaZe vs NaVi">FaZe vs NaVi (CS2)</option>
                </select>

                <button 
                  onClick={handlePredict}
                  disabled={loading}
                  className="w-full bg-gray-800 hover:bg-cyber-secondary text-white font-bold py-4 rounded transition-colors flex items-center justify-center gap-2 group"
                >
                   {loading ? <Activity className="animate-spin" /> : <BarChart2 />}
                   {loading ? 'RUNNING SIMULATION...' : 'ANALYZE MATCHUP'}
                </button>
             </div>

             <div className="bg-gray-900/30 p-4 rounded border border-gray-800">
                <h4 className="text-xs font-mono text-gray-500 uppercase mb-2">Legacy Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                   <span className="text-[10px] bg-black border border-gray-700 px-2 py-1 rounded text-gray-300">OpenCV</span>
                   <span className="text-[10px] bg-black border border-gray-700 px-2 py-1 rounded text-gray-300">PyTorch</span>
                   <span className="text-[10px] bg-black border border-gray-700 px-2 py-1 rounded text-gray-300">Reinforcement Learning</span>
                </div>
             </div>
          </div>

          <div className="lg:col-span-2 relative bg-black border border-gray-800 rounded-xl overflow-hidden flex items-center justify-center">
             {/* HUD Overlay */}
             <div className="absolute inset-0 pointer-events-none z-20 border-[20px] border-black/50" style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%, 0% 20%, 2% 20%, 2% 98%, 98% 98%, 98% 2%, 0% 2%)'}}></div>
             <div className="absolute top-4 left-4 text-cyber-primary font-mono text-xs z-20">LIVE_FEED :: ORACLE_V2</div>
             
             {loading && (
                <div className="absolute inset-0 bg-black/80 z-10 flex flex-col items-center justify-center">
                   <div className="w-64 h-2 bg-gray-800 rounded overflow-hidden">
                      <div className="h-full bg-cyber-secondary animate-[loading_1s_ease-in-out_infinite] w-1/2"></div>
                   </div>
                   <div className="mt-4 font-mono text-cyber-secondary text-sm animate-pulse">PROCESSING TELEMETRY...</div>
                   
                   {/* Scanning Lines */}
                   <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.1)_50%)] bg-[size:100%_4px] pointer-events-none"></div>
                </div>
             )}

             {result && !loading && (
                <div className="w-full h-full p-8 flex flex-col justify-center animate-[fadeIn_0.5s_ease-out] z-10 relative">
                    <div className="absolute inset-0 bg-cyber-primary/5"></div>
                    
                    <div className="text-center mb-8">
                       <h2 className="text-4xl font-bold text-white mb-2">{result.matchup}</h2>
                       <div className="text-cyber-secondary font-mono tracking-widest text-sm uppercase">Prediction Complete</div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-8">
                       <div className="bg-black/60 p-4 border-l-2 border-cyber-primary">
                          <div className="text-xs text-gray-500 uppercase mb-1">Projected Winner</div>
                          <div className="text-2xl font-bold text-white">{result.winner}</div>
                       </div>
                       <div className="bg-black/60 p-4 border-l-2 border-cyber-primary">
                          <div className="text-xs text-gray-500 uppercase mb-1">Win Probability</div>
                          <div className="text-2xl font-bold text-cyber-primary">{result.probability}%</div>
                       </div>
                       <div className="bg-black/60 p-4 border-l-2 border-cyber-primary">
                          <div className="text-xs text-gray-500 uppercase mb-1">MVP Watch</div>
                          <div className="text-2xl font-bold text-white">{result.mvpPrediction}</div>
                       </div>
                    </div>

                    <div className="bg-black/40 p-6 rounded border border-gray-800">
                       <h4 className="text-xs font-mono text-gray-500 uppercase mb-3">Key Victory Factors</h4>
                       <ul className="space-y-2">
                          {result.keyFactors.map((factor, i) => (
                             <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                                <Check size={14} className="text-green-500" /> {factor}
                             </li>
                          ))}
                       </ul>
                    </div>
                </div>
             )}
             
             {!result && !loading && (
                <div className="text-gray-700 flex flex-col items-center">
                   <MonitorPlay size={64} className="mb-4 opacity-20" />
                   <div className="font-mono text-sm">SELECT MATCHUP TO BEGIN</div>
                </div>
             )}
          </div>
       </div>
    </motion.div>
   );
}

// Helpers
const highlightCode = (code: string) => {
   // Basic HTML sanitization should happen here in prod
   return code; 
};

export default Lab;
