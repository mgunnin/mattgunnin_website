import React, { useState, useEffect, useRef } from 'react';
import { Power, Activity, Zap, ChevronRight, Terminal, Volume2, VolumeX, Layers, Hexagon, Sparkles } from 'lucide-react';
import { sendMessageStream } from '../services/geminiService';
import { ChatMessage, AgentStatus, CognitiveMode, NeuralInterfaceProps } from '../types';
import { GenerateContentResponse } from '@google/genai';

// Helper to parse basic markdown for better readability
const renderMarkdown = (text: string) => {
  let formatted = text
    .replace(/```([\s\S]*?)```/g, '<div class="bg-black/50 p-3 rounded-lg border border-gray-700 font-mono text-xs my-3 overflow-x-auto shadow-inner text-cyber-primary">$1</div>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-cyber-primary text-shadow-glow font-bold tracking-wide">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="text-cyber-secondary not-italic">$1</em>')
    .replace(/^\s*-\s+(.*)/gm, '<li class="ml-4 list-disc text-gray-300 marker:text-cyber-primary">$1</li>')
    .replace(/\n/g, '<br />');
    
  return formatted;
};

const NeuralInterface: React.FC<NeuralInterfaceProps> = ({ currentSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<AgentStatus>('IDLE');
  const [mode, setMode] = useState<CognitiveMode>('STRATEGIC');
  const [isMuted, setIsMuted] = useState(true); // Default to true to disable auto-speech
  
  // HUD Stats
  const [cpuUsage, setCpuUsage] = useState(12);
  const [memUsage, setMemUsage] = useState(24);
  const [latency, setLatency] = useState(45);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Refs for animation system
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const statusRef = useRef(status); 
  const synthesisRef = useRef<SpeechSynthesis | null>(null);
  const isMutedRef = useRef(isMuted);

  // Quick Action Chips
  const starterPrompts = [
    { label: "🏗️ Architecture", query: "How do you architect multi-agent systems using CrewAI?" },
    { label: "💰 Fundraising", query: "What is your strategy for raising capital for AI startups?" },
    { label: "🚀 Vertical Labs", query: "What is the mission of Vertical Labs?" },
    { label: "📄 Resume", query: "Can I download your resume?" },
  ];

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    isMutedRef.current = isMuted;
    if (isMuted && synthesisRef.current) {
        synthesisRef.current.cancel();
    }
  }, [isMuted]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthesisRef.current = window.speechSynthesis;
    }
  }, []);

  // Update HUD Stats randomly
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
        setCpuUsage(prev => Math.min(100, Math.max(5, prev + (Math.random() - 0.5) * 10)));
        setMemUsage(prev => Math.min(64, Math.max(16, prev + (Math.random() - 0.5) * 5)));
        setLatency(prev => Math.min(120, Math.max(20, prev + (Math.random() - 0.5) * 20)));
    }, 2000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Initialize
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: 'init',
        role: 'model',
        text: `NEURAL UPLINK ESTABLISHED.\n\nHello, I am **Ella**, Matt Gunnin's autonomous AI partner. \nRunning in **${mode}** mode.\n\nI can navigate this system, discuss architectural patterns, or schedule a connection.`
      }]);
    }
  }, [isOpen]);

  // Particle System Effect
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: { x: number; y: number; size: number; speedX: number; speedY: number; }[] = [];
    for (let i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 2,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
        });
    }

    let animationFrameId: number;

    const render = () => {
        ctx.clearRect(0, 0, width, height);
        const currentStatus = statusRef.current;

        let particleColor = 'rgba(0, 240, 255, 0.2)'; 
        if (currentStatus === 'ANALYZING') particleColor = 'rgba(250, 204, 21, 0.3)';
        if (currentStatus === 'EXECUTING') particleColor = 'rgba(239, 68, 68, 0.3)';
        if (currentStatus === 'STREAMING') particleColor = 'rgba(16, 185, 129, 0.2)';

        ctx.fillStyle = particleColor;
        ctx.strokeStyle = particleColor;
        ctx.lineWidth = 0.2;

        particles.forEach((p, i) => {
            p.x += p.speedX * (currentStatus === 'IDLE' ? 1 : 5);
            p.y += p.speedY * (currentStatus === 'IDLE' ? 1 : 5);

            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            // Connections
             for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        });

        // Scanline Draw
        const time = Date.now() / 1000;
        const scanY = (time * 100) % height;
        ctx.fillStyle = `rgba(0, 240, 255, 0.05)`;
        ctx.fillRect(0, scanY, width, 2);

        animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    };
    window.addEventListener('resize', handleResize);
    return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, status]);

  const speakResponse = (text: string) => {
    if (isMutedRef.current || !synthesisRef.current) return;
    
    // Stop previous speech
    synthesisRef.current.cancel();

    // Strip basic markdown/html for speech
    const cleanText = text.replace(/<[^>]*>?/gm, '').replace(/[*#`]/g, '');
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.pitch = 1.0; 
    utterance.rate = 1.0; 
    
    const voices = synthesisRef.current.getVoices();
    // Try to find a high quality voice
    const preferredVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Samantha') || v.name.includes('Microsoft Zira'));
    if (preferredVoice) utterance.voice = preferredVoice;

    synthesisRef.current.speak(utterance);
  };

  const handleToolCall = (functionCall: any) => {
    const args = functionCall.args;
    
    if (functionCall.name === 'navigate_site') {
      const sectionId = args.sectionId;
      setStatus('EXECUTING');
      setIsOpen(false); // Close interface when navigating
      
      if (sectionId === 'book') {
          window.history.pushState(null, '', '/book');
          const navEvent = new PopStateEvent('popstate');
          window.dispatchEvent(navEvent);
          window.scrollTo(0, 0);
          return { result: 'Navigated to booking page' };
      }

      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
      return { result: 'Navigation successful' };
    }
    
    if (functionCall.name === 'download_resume') {
        setStatus('EXECUTING');
        const link = document.createElement('a');
        link.href = '/resume.pdf';
        link.download = 'Matt_Gunnin_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return { result: 'Download initiated' };
    }

    if (functionCall.name === 'copy_email') {
        setStatus('EXECUTING');
        navigator.clipboard.writeText('mg@mattgunnin.com');
        return { result: 'Email copied to clipboard' };
    }

    if (functionCall.name === 'book_meeting') {
        setStatus('EXECUTING');
        setIsOpen(false);
        window.history.pushState(null, '', '/book');
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
        window.scrollTo(0, 0);
        return { result: 'Navigated to booking page' };
    }

    return { result: 'Unknown function' };
  };

  const handleSend = async (text: string) => {
    if (!text.trim() || status !== 'IDLE') return;

    if (synthesisRef.current) synthesisRef.current.cancel(); // Stop speaking on new input

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setStatus('ANALYZING');

    try {
      const stream = await sendMessageStream(userMsg.text, { section: currentSection, mode });
      
      const botMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: botMsgId, role: 'model', text: '', isStreaming: true }]);
      setStatus('STREAMING');

      let fullText = '';
      
      for await (const chunk of stream) {
        const content = chunk as GenerateContentResponse;
        
        // Check for Tool Calls
        const fc = content.candidates?.[0]?.content?.parts?.find(p => p.functionCall);
        if (fc && fc.functionCall) {
            await handleToolCall(fc.functionCall);
             const toolName = fc.functionCall.name;
             const toolMsg = `\n> *EXECUTING PROTOCOL: ${toolName.toUpperCase()}...*`;
             fullText += toolMsg;
             setMessages(prev => prev.map(msg => msg.id === botMsgId ? { ...msg, text: fullText } : msg));
            continue;
        }

        const textChunk = content.text || '';
        fullText += textChunk;
        
        setMessages(prev => prev.map(msg => 
          msg.id === botMsgId 
            ? { ...msg, text: fullText } 
            : msg
        ));
      }
      
      setMessages(prev => prev.map(msg => 
        msg.id === botMsgId ? { ...msg, isStreaming: false } : msg
      ));
      setStatus('IDLE');
      
      // Speak final result
      speakResponse(fullText);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: "CONNECTION INTERRUPTED. RETRYING HANDSHAKE..." }]);
      setStatus('IDLE');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  const toggleMode = () => {
    const newMode = mode === 'STRATEGIC' ? 'TECHNICAL' : 'STRATEGIC';
    setMode(newMode);
    setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'model', 
        text: `> COGNITIVE MODE SHIFT: **${newMode}**\n> ADJUSTING PARAMETERS... DONE.` 
    }]);
  };

  const getStatusColor = () => {
    switch(status) {
        case 'ANALYZING': return 'text-yellow-400 border-yellow-400';
        case 'EXECUTING': return 'text-red-500 border-red-500';
        case 'STREAMING': return 'text-cyber-primary border-cyber-primary';
        default: return 'text-green-500 border-green-500';
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 group flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-cyber-primary opacity-20 rounded-full animate-ping group-hover:opacity-40"></div>
        <div className="relative w-16 h-16 bg-black border-2 border-cyber-primary rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:scale-110 transition-transform duration-300 overflow-hidden backdrop-blur-md group-hover:border-white">
           <Hexagon size={32} className="text-cyber-primary absolute animate-[spin_10s_linear_infinite] opacity-50" />
           <Sparkles size={20} className="text-white relative z-10 animate-pulse" />
        </div>
      </button>
    );
  }

  return (
    <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 md:bg-black/90 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
        onClick={() => setIsOpen(false)} // Click outside to close
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-50" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
        <div className="absolute inset-0 bg-radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)"></div>
      </div>

      {/* Main Interface Window */}
      <div 
        className="relative w-full h-[100dvh] md:h-[90vh] md:max-w-5xl bg-black md:bg-black/90 border-0 md:border border-gray-800 md:rounded-lg shadow-[0_0_50px_rgba(0,240,255,0.1)] flex flex-col overflow-hidden z-20 backdrop-filter backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()} // Prevent close on inner click
      >
        
        {/* Top HUD Bar */}
        <div className="flex items-center justify-between p-3 border-b border-gray-800 bg-gray-900/90 font-mono">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-cyber-primary">
              <Activity className="w-4 h-4" />
              <span className="font-bold tracking-[0.2em] text-[10px] md:text-xs">ELLA_INTERFACE_V1</span>
            </div>
            
            {/* System Stats HUD */}
            <div className="hidden lg:flex items-center gap-4 px-4 border-l border-gray-700 ml-4">
               <div className="flex items-center gap-2 text-[10px] text-gray-400">
                  <span>CPU</span>
                  <div className="w-12 h-1 bg-gray-800 rounded-full overflow-hidden">
                     <div className="h-full bg-cyber-primary transition-all duration-500" style={{width: `${cpuUsage}%`}}></div>
                  </div>
                  <span className="text-white w-6">{cpuUsage.toFixed(0)}%</span>
               </div>
               <div className="flex items-center gap-2 text-[10px] text-gray-400">
                  <span>MEM</span>
                  <div className="w-12 h-1 bg-gray-800 rounded-full overflow-hidden">
                     <div className="h-full bg-cyber-secondary transition-all duration-500" style={{width: `${memUsage}%`}}></div>
                  </div>
                  <span className="text-white w-6">{memUsage.toFixed(0)}GB</span>
               </div>
               <div className="flex items-center gap-2 text-[10px] text-gray-400">
                  <span>NET</span>
                  <span className={`w-2 h-2 rounded-full ${latency < 50 ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`}></span>
                  <span className="text-white w-6">{latency.toFixed(0)}ms</span>
               </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
             {/* Mode Toggle */}
             <button 
                onClick={toggleMode}
                className="hidden md:flex items-center gap-2 px-3 py-1 bg-gray-800 border border-gray-700 rounded hover:border-cyber-primary transition-colors group mr-2"
            >
                <Layers size={12} className="text-gray-400 group-hover:text-cyber-primary" />
                <span className="text-[10px] text-gray-300 group-hover:text-white">{mode} MODE</span>
            </button>

             {/* Audio Toggle */}
             <button onClick={() => setIsMuted(!isMuted)} className="text-gray-500 hover:text-cyber-primary transition-colors">
                 {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
             </button>

             <div className={`px-2 py-0.5 border ${getStatusColor()} rounded text-[10px] font-bold tracking-widest uppercase shadow-[0_0_5px_currentColor] transition-colors duration-300`}>
                {status}
             </div>
             
             <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-red-500 transition-colors p-2">
                <Power size={18} />
             </button>
          </div>
        </div>

        {/* Visualization Area */}
        <div className="relative h-24 md:h-32 bg-black/60 border-b border-gray-800 flex items-center justify-center overflow-hidden shrink-0 font-mono">
           {/* Scanlines */}
           <div className="absolute inset-0 opacity-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none"></div>
           
           <div className="relative z-10 w-full max-w-lg flex items-center justify-center gap-1 h-16">
              {status === 'IDLE' && (
                  <div className="relative flex items-center justify-center animate-[pulse_3s_infinite]">
                      <div className="absolute w-20 h-20 border border-cyber-primary/20 rotate-45"></div>
                      <div className="absolute w-16 h-16 border border-cyber-primary/40 -rotate-12"></div>
                      <div className="text-xs text-cyber-primary/80 tracking-widest">ELLA ONLINE</div>
                  </div>
              )}
              
              {status === 'ANALYZING' && (
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                 </div>
              )}

              {/* Audio Equalizer */}
              {(status === 'STREAMING') && [...Array(20)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-1.5 bg-cyber-primary rounded-sm transition-all duration-75 shadow-[0_0_5px_#00f0ff]"
                  style={{
                    height: `${Math.max(10, Math.random() * 100)}%`,
                    opacity: 0.8
                  }}
                />
              ))}
              {(status === 'EXECUTING') && (
                 <div className="text-red-500 font-bold animate-pulse text-lg tracking-widest">EXECUTING PROTOCOL...</div>
              )}
           </div>
        </div>

        {/* Chat Stream */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 custom-scrollbar bg-black/20 pb-20 md:pb-6 relative">
          <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-black to-transparent pointer-events-none z-10"></div>
          
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 md:gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-[slideIn_0.2s_ease-out]`}
            >
              {msg.role === 'model' && (
                <div className="w-8 h-8 rounded border border-cyber-primary/30 bg-cyber-primary/5 flex items-center justify-center shrink-0 mt-1">
                  <Hexagon size={16} className="text-cyber-primary" />
                </div>
              )}
              
              <div className={`max-w-[85%] relative`}>
                <div className={`p-3 md:p-4 rounded border backdrop-blur-sm ${
                  msg.role === 'user' 
                    ? 'bg-cyber-secondary/10 border-cyber-secondary/30 text-white text-right font-sans' 
                    : 'bg-gray-900/80 border-gray-700 text-gray-200 shadow-[0_0_15px_rgba(0,0,0,0.5)] font-mono text-sm tracking-wide'
                }`}>
                  <div className="text-[8px] md:text-[10px] text-gray-500 mb-1 opacity-50 uppercase tracking-widest flex items-center gap-2 font-mono">
                     {msg.role === 'model' ? 'ELLA_CORE' : 'USER_UPLINK'}
                  </div>
                  <div 
                    className="whitespace-pre-wrap leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.text) }}
                    style={msg.role === 'model' ? { textShadow: '0 0 2px rgba(0, 240, 255, 0.3)' } : {}}
                  />
                  {msg.isStreaming && <span className="inline-block w-2 h-4 bg-cyber-primary ml-1 animate-pulse"></span>}
                </div>
              </div>
            </div>
          ))}

          {/* Quick Action Chips */}
          {messages.length < 3 && status === 'IDLE' && (
             <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2 md:gap-3 mt-4 animate-[fadeIn_0.5s_ease-out]">
                {starterPrompts.map(prompt => (
                   <button
                     key={prompt.label}
                     onClick={() => handleSend(prompt.query)}
                     className="px-3 py-2 bg-gray-900/50 border border-gray-700 hover:border-cyber-primary hover:bg-cyber-primary/10 text-[10px] md:text-xs text-gray-400 hover:text-white rounded transition-all duration-300 flex items-center gap-2 group font-mono"
                   >
                     <Terminal size={12} className="group-hover:text-cyber-primary transition-colors" />
                     {prompt.label}
                   </button>
                ))}
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Command Input Area */}
        <div className="p-3 md:p-4 bg-black/95 md:bg-black/90 border-t border-gray-800 relative z-30 mb-safe">
          <div className="flex gap-2 md:gap-4 max-w-4xl mx-auto items-center">
            <div className="flex-1 relative group">
              <div className="relative flex items-center bg-black border border-gray-800 rounded overflow-hidden group-focus-within:border-cyber-primary/50 transition-colors">
                <div className="pl-3 pr-2 text-cyber-primary animate-pulse flex items-center gap-1 font-mono text-xs">
                    <ChevronRight size={14} />
                </div>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter command..."
                  className="w-full bg-transparent border-none text-white px-2 py-3 md:py-4 focus:ring-0 focus:outline-none font-mono tracking-wider placeholder-gray-700 text-sm"
                  autoFocus
                  disabled={status !== 'IDLE'}
                />
              </div>
            </div>
            
            <button 
              onClick={() => handleSend(input)}
              disabled={!input.trim() || status !== 'IDLE'}
              className="group relative px-4 py-3 md:px-6 md:py-4 bg-gray-900 border border-gray-700 text-cyber-primary hover:text-black transition-all duration-300 rounded font-mono uppercase text-xs md:text-sm disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden shrink-0"
            >
              <div className="absolute inset-0 bg-cyber-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative flex items-center gap-2 group-hover:text-black z-10">
                 <span className="hidden md:inline">EXECUTE</span> <Zap size={16} className={status === 'ANALYZING' ? 'animate-spin' : ''} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeuralInterface;