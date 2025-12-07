import React, { useState, useEffect, useRef } from 'react';
import { Send, X, Cpu, Activity, Zap, Terminal, Navigation as NavIcon, Power, Wifi, Shield, Lock, ChevronRight, Minimize2, Maximize2 } from 'lucide-react';
import { sendMessageStream } from '../services/geminiService';
import { ChatMessage, AgentStatus } from '../types';
import { GenerateContentResponse } from '@google/genai';

const NeuralInterface: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<AgentStatus>('IDLE');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [randomData, setRandomData] = useState('0000');
  const [cpuUsage, setCpuUsage] = useState(12);
  
  // Refs for animation system
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const statusRef = useRef(status); // To access status inside requestAnimationFrame

  // Keep status ref in sync
  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  // Initialize with a welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: 'init',
        role: 'model',
        text: "NEURAL LINK ESTABLISHED.\nIDENTITY VERIFIED: GUEST_USER.\n\nI am the digital construct of Matt Gunnin (v3.0). \nI have full autonomous control over this portfolio. \n\nQuery my database or issue a navigational command."
      }]);
    }
  }, [isOpen]);

  // Decoration data updater
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
        setRandomData(Math.random().toString(16).substr(2, 4).toUpperCase());
        setCpuUsage(prev => status === 'ANALYZING' ? Math.min(99, prev + Math.random() * 10) : Math.max(12, prev + (Math.random() - 0.5) * 5));
    }, 500);
    return () => clearInterval(interval);
  }, [isOpen, status]);

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

    const particles: { x: number; y: number; size: number; speedX: number; speedY: number; baseSpeed: number }[] = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 2,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            baseSpeed: Math.random() * 0.5 + 0.1
        });
    }

    let animationFrameId: number;

    const render = () => {
        ctx.clearRect(0, 0, width, height);
        const currentStatus = statusRef.current;

        // Determine particle behavior based on status
        let speedMultiplier = 1;
        let particleColor = 'rgba(0, 240, 255, 0.3)'; // Default Cyan

        if (currentStatus === 'ANALYZING') {
            speedMultiplier = 5;
            particleColor = 'rgba(250, 204, 21, 0.4)'; // Yellow
        } else if (currentStatus === 'EXECUTING') {
            speedMultiplier = 8;
            particleColor = 'rgba(239, 68, 68, 0.4)'; // Red
        } else if (currentStatus === 'STREAMING') {
            speedMultiplier = 2;
            particleColor = 'rgba(16, 185, 129, 0.3)'; // Green
        }

        ctx.fillStyle = particleColor;

        particles.forEach(p => {
            p.x += p.speedX * speedMultiplier;
            p.y += p.speedY * speedMultiplier;

            // Wrap around screen
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            // Jitter effect during high load
            if (currentStatus === 'ANALYZING' || currentStatus === 'EXECUTING') {
                p.x += (Math.random() - 0.5) * 2;
                p.y += (Math.random() - 0.5) * 2;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });

        // Draw connecting lines if close
        ctx.strokeStyle = particleColor;
        ctx.lineWidth = 0.2;
        
        // Optimize: only draw connections for a subset or if status is active to save perf
        if (currentStatus !== 'IDLE') {
             for (let i = 0; i < particles.length; i++) {
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
            }
        }

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, status]);

  // Handle Function Calls (Client Side Execution)
  const handleToolCall = (functionCall: any) => {
    if (functionCall.name === 'navigate_site') {
      const args = functionCall.args;
      const sectionId = args.sectionId;
      setStatus('EXECUTING');
      
      // Execute the scroll
      const element = document.getElementById(sectionId);
      if (element) {
        setIsOpen(false); // Close interface to show the site
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
      return { result: 'Navigation successful' };
    }
    return { result: 'Unknown function' };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || status !== 'IDLE') return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setStatus('ANALYZING');

    try {
      const stream = await sendMessageStream(userMsg.text);
      
      const botMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: botMsgId, role: 'model', text: '', isStreaming: true }]);
      setStatus('STREAMING');

      let fullText = '';
      
      for await (const chunk of stream) {
        const content = chunk as GenerateContentResponse;
        
        // Handle Tool Calls in the stream
        const fc = content.candidates?.[0]?.content?.parts?.find(p => p.functionCall);
        if (fc && fc.functionCall) {
            await handleToolCall(fc.functionCall);
             const sectionId = fc.functionCall.args['sectionId'] as string;
             setMessages(prev => prev.map(msg => 
              msg.id === botMsgId 
                ? { ...msg, text: fullText + `\n[EXECUTING PROTOCOL: NAVIGATE TO ${sectionId?.toUpperCase()}]` } 
                : msg
            ));
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

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: "CONNECTION INTERRUPTED. RETRYING HANDSHAKE..." }]);
      setStatus('IDLE');
    }
  };

  // Status visual configurations
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
        <div className="relative w-16 h-16 bg-black border-2 border-cyber-primary rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:scale-110 transition-transform duration-300 overflow-hidden backdrop-blur-md">
           <Cpu className="text-cyber-primary w-8 h-8 animate-[pulse_3s_infinite]" />
           <div className="absolute inset-0 bg-gradient-to-t from-cyber-primary/20 to-transparent pointer-events-none"></div>
        </div>
        <div className="absolute right-20 bg-black/90 border border-cyber-primary text-cyber-primary px-4 py-2 text-xs font-mono uppercase tracking-widest rounded opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap translate-x-4 group-hover:translate-x-0 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            Initialize Agent
          </div>
        </div>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      {/* Immersive Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Particle Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-50" />

        {/* Dynamic CPU Heat Gradient */}
        <div 
            className="absolute inset-0 z-0 transition-opacity duration-1000"
            style={{
                background: `radial-gradient(circle at center, ${
                    status === 'ANALYZING' ? 'rgba(250, 204, 21, 0.1)' : 
                    status === 'EXECUTING' ? 'rgba(239, 68, 68, 0.15)' : 
                    'rgba(0, 240, 255, 0.05)'
                } 0%, transparent 70%)`,
                opacity: cpuUsage / 100
            }}
        />

        {/* Grid with Glitch Effect */}
        <div className={`absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] ${status === 'ANALYZING' ? 'animate-[pulse_0.1s_infinite]' : ''}`}></div>
        
        {/* Scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none z-10"></div>
        {/* Vignette */}
        <div className="absolute inset-0 bg-radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)"></div>
      </div>

      {/* Main Interface Window */}
      <div className="relative w-full max-w-5xl h-[90vh] bg-black/80 border border-gray-800 rounded-lg shadow-[0_0_50px_rgba(0,240,255,0.1)] flex flex-col overflow-hidden perspective-1000 z-20 backdrop-filter backdrop-blur-xl">
        
        {/* Top HUD Bar */}
        <div className="flex items-center justify-between p-3 border-b border-gray-800 bg-gray-900/80">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-cyber-primary">
              <Activity className="w-4 h-4" />
              <span className="font-mono font-bold tracking-[0.2em] text-xs">NEURAL_INTERFACE_V3</span>
            </div>
            
            <div className="hidden md:flex items-center gap-4 text-[10px] font-mono text-gray-500">
               <div className="flex items-center gap-1">
                 <Wifi size={12} className={status === 'IDLE' ? 'text-gray-600' : 'text-cyber-primary animate-pulse'} />
                 <span>NET: {status === 'IDLE' ? 'STABLE' : 'TRANSMITTING'}</span>
               </div>
               <div className="flex items-center gap-1">
                 <Cpu size={12} className={cpuUsage > 80 ? 'text-red-500' : 'text-gray-600'} />
                 <span>CPU: {Math.floor(cpuUsage)}%</span>
               </div>
               <div className="flex items-center gap-1">
                 <Shield size={12} className="text-green-500" />
                 <span>SECURE</span>
               </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <div className={`px-2 py-0.5 border ${getStatusColor()} rounded text-[10px] font-mono font-bold tracking-widest uppercase shadow-[0_0_10px_currentColor] transition-colors duration-300`}>
                {status}
             </div>
             <div className="h-4 w-px bg-gray-700"></div>
             <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-red-500 transition-colors">
                <Power size={18} />
             </button>
          </div>
        </div>

        {/* Visualization & Status Area */}
        <div className="relative h-48 bg-black/60 border-b border-gray-800 flex items-center justify-center overflow-hidden shrink-0">
           {/* Animated Background Mesh in Visualization */}
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] bg-[size:16px_16px]"></div>
           
           {/* Center Visualizer */}
           <div className="relative z-10 w-full max-w-lg flex items-center justify-center gap-1 h-24">
              {/* If IDLE, show a slow breathing circle or lines */}
              {status === 'IDLE' && (
                  <div className="relative flex items-center justify-center">
                      <div className="absolute w-32 h-32 border border-cyber-primary/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                      <div className="absolute w-24 h-24 border border-cyber-primary/40 rounded-full animate-[spin_5s_linear_infinite_reverse]"></div>
                      <div className="text-center font-mono">
                         <div className="text-2xl font-bold text-cyber-primary/80 tracking-widest animate-pulse">AWAITING INPUT</div>
                         <div className="text-[10px] text-gray-600 mt-2">MEM_ADDR: {randomData}</div>
                      </div>
                  </div>
              )}

              {/* If ACTIVE, show equalizer */}
              {(status !== 'IDLE') && [...Array(32)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1.5 bg-cyber-primary rounded-sm transition-all duration-75 ${
                    status === 'EXECUTING' ? 'bg-red-500 shadow-[0_0_5px_red]' : 'shadow-[0_0_5px_#00f0ff]'
                  }`}
                  style={{
                    height: `${Math.max(10, Math.random() * 100)}%`,
                    opacity: Math.max(0.3, Math.random())
                  }}
                />
              ))}
           </div>
           
           {/* Corner Decorations */}
           <div className="absolute top-2 left-2 text-[8px] font-mono text-gray-700">
              SEQ_ID: {randomData}<br/>
              BUFFER: CLEAR
           </div>
           <div className="absolute bottom-2 right-2 text-[8px] font-mono text-gray-700 text-right">
              LATENCY: 12ms<br/>
              GEMINI-3-PRO
           </div>
        </div>

        {/* Chat Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 font-mono custom-scrollbar bg-black/20">
          {messages.map((msg, idx) => (
            <div
              key={msg.id}
              className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-[slideIn_0.3s_ease-out]`}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              {msg.role === 'model' && (
                <div className="w-8 h-8 rounded bg-cyber-primary/10 border border-cyber-primary/30 flex items-center justify-center shrink-0 mt-1 shadow-[0_0_10px_rgba(0,240,255,0.1)]">
                  <Cpu size={16} className="text-cyber-primary" />
                </div>
              )}
              
              <div className={`max-w-[80%] relative group`}>
                <div className={`p-4 rounded-sm border backdrop-blur-sm ${
                  msg.role === 'user' 
                    ? 'bg-cyber-secondary/10 border-cyber-secondary/30 text-white text-right' 
                    : 'bg-gray-900/80 border-gray-700 text-cyber-primary shadow-[0_0_15px_rgba(0,0,0,0.5)]'
                }`}>
                  <div className="text-[10px] text-gray-500 mb-1 opacity-50 uppercase tracking-widest flex items-center gap-2">
                     {msg.role === 'model' ? 'AI_CORE' : 'USER_UPLINK'}
                     <span className="w-full h-px bg-gray-800/50"></span>
                  </div>
                  <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed font-medium font-sans">
                    {msg.text}
                    {msg.isStreaming && <span className="inline-block w-2 h-4 bg-cyber-primary ml-1 animate-pulse shadow-[0_0_5px_#00f0ff]"></span>}
                  </pre>
                </div>
                {/* Decorative corner markers for messages */}
                <div className={`absolute top-0 w-2 h-2 border-t border-l ${msg.role === 'user' ? 'border-cyber-secondary -right-1' : 'border-cyber-primary -left-1'}`}></div>
                <div className={`absolute bottom-0 w-2 h-2 border-b border-r ${msg.role === 'user' ? 'border-cyber-secondary -right-1' : 'border-cyber-primary -left-1'}`}></div>
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded bg-cyber-secondary/10 border border-cyber-secondary/30 flex items-center justify-center shrink-0 mt-1 shadow-[0_0_10px_rgba(112,0,255,0.1)]">
                  <Terminal size={16} className="text-cyber-secondary" />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Command Input Area */}
        <div className="p-4 bg-black/90 border-t border-gray-800 relative z-30">
          <form onSubmit={handleSubmit} className="flex gap-4 max-w-4xl mx-auto items-center">
            <div className="flex-1 relative group">
              {/* Input Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyber-primary to-cyber-secondary rounded opacity-20 group-hover:opacity-50 transition duration-500 blur-sm"></div>
              
              <div className="relative flex items-center bg-black border border-gray-800 rounded overflow-hidden">
                <div className="pl-4 pr-2 text-cyber-primary animate-pulse flex items-center gap-1 font-mono text-xs">
                    <ChevronRight size={14} />
                    <span>CMD:</span>
                </div>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter query or navigation protocol..."
                  className="w-full bg-transparent border-none text-white px-2 py-4 focus:ring-0 focus:outline-none font-mono tracking-wider placeholder-gray-700"
                  autoFocus
                  disabled={status !== 'IDLE'}
                />
                {/* Random decor inside input */}
                <div className="pr-4 text-[10px] text-gray-800 font-mono select-none">
                    {input.length}/128
                </div>
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={!input.trim() || status !== 'IDLE'}
              className="group relative px-6 py-4 bg-gray-900 border border-gray-700 text-cyber-primary hover:text-black transition-all duration-300 rounded font-mono uppercase text-sm disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            >
              <div className="absolute inset-0 bg-cyber-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative flex items-center gap-2 group-hover:text-black z-10">
                 EXECUTE <Zap size={14} className={status === 'ANALYZING' ? 'animate-spin' : ''} />
              </span>
            </button>
          </form>
          
          {/* Footer Metadata */}
          <div className="flex justify-between items-center mt-3 text-[10px] text-gray-600 font-mono px-2">
            <div>
                 SESSION_ID: {Date.now().toString(36).toUpperCase()}
            </div>
            <div className="flex gap-4">
                 <span>ENCRYPTION: AES-256-GCM</span>
                 <span>LATENCY: 14ms</span>
            </div>
          </div>
        </div>

      </div>
      
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.5);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #00f0ff;
        }
      `}</style>
    </div>
  );
};

export default NeuralInterface;