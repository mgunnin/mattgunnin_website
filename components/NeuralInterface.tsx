import React, { useState, useEffect, useRef } from 'react';
import { Send, X, Cpu, Activity, Zap, Terminal, Navigation as NavIcon, Power } from 'lucide-react';
import { sendMessageStream } from '../services/geminiService';
import { ChatMessage, AgentStatus } from '../types';
import { GenerateContentResponse } from '@google/genai';

const NeuralInterface: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<AgentStatus>('IDLE');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize with a welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: 'init',
        role: 'model',
        text: "NEURAL LINK ESTABLISHED.\nI am the digital construct of Matt Gunnin. \nMy primary function is to demonstrate Agentic Architecture. \n\nCommand me."
      }]);
    }
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
            // We don't necessarily break here because the model might text *and* tool call
            // But for this UI, if it navigates, we usually close.
            // Let's assume if it navigates, we append a system note.
             setMessages(prev => prev.map(msg => 
              msg.id === botMsgId 
                ? { ...msg, text: fullText + `\n[EXECUTING PROTOCOL: NAVIGATE TO ${fc.functionCall?.args['sectionId']?.toUpperCase()}]` } 
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

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 group flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-cyber-primary opacity-20 rounded-full animate-ping group-hover:opacity-40"></div>
        <div className="relative w-16 h-16 bg-black border-2 border-cyber-primary rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:scale-110 transition-transform duration-300 overflow-hidden">
           <Cpu className="text-cyber-primary w-8 h-8 animate-[pulse_3s_infinite]" />
           <div className="absolute inset-0 bg-gradient-to-t from-cyber-primary/20 to-transparent pointer-events-none"></div>
        </div>
        <span className="absolute right-20 bg-black border border-cyber-primary text-cyber-primary px-3 py-1 text-xs font-mono uppercase tracking-widest rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Initialize AI Agent
        </span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      {/* Background Grid & Scanlines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-primary/5 to-transparent animate-[scan_3s_linear_infinite]"></div>
      </div>

      {/* Main Interface Container */}
      <div className="relative w-full max-w-4xl h-[85vh] bg-black border border-gray-800 rounded-lg shadow-[0_0_100px_rgba(0,240,255,0.15)] flex flex-col overflow-hidden perspective-1000">
        
        {/* HUD Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900/50 backdrop-blur">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-cyber-primary">
              <Activity className="w-5 h-5 animate-pulse" />
              <span className="font-mono font-bold tracking-widest text-sm">NEURAL_INTERFACE // V.3.0.1</span>
            </div>
            <div className="h-4 w-px bg-gray-700"></div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${status === 'IDLE' ? 'bg-green-500' : 'bg-yellow-500 animate-ping'}`}></span>
              <span className="font-mono text-xs text-gray-400 uppercase">{status}</span>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-red-500/20 hover:text-red-500 text-gray-400 rounded transition-colors group"
          >
            <Power className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        {/* Dynamic Visualization Area (Top) */}
        <div className="h-32 bg-black/50 border-b border-gray-800 p-6 flex items-center justify-center relative overflow-hidden">
           {status === 'IDLE' && (
             <div className="text-center">
               <div className="text-cyber-primary/30 font-mono text-6xl font-black tracking-tighter opacity-20 select-none">MATT_GUNNIN</div>
               <div className="text-xs text-gray-500 font-mono mt-2 uppercase tracking-[0.5em]">System Ready</div>
             </div>
           )}
           {(status === 'ANALYZING' || status === 'STREAMING') && (
             <div className="w-full flex items-center justify-center gap-1">
                {[...Array(20)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-1 bg-cyber-primary shadow-[0_0_10px_#00f0ff]"
                    style={{
                      height: `${Math.random() * 100}%`,
                      animation: `equalizer 0.5s ease-in-out infinite alternate`,
                      animationDelay: `${i * 0.05}s`
                    }}
                  />
                ))}
             </div>
           )}
        </div>

        {/* Chat Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 font-mono custom-scrollbar">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'model' && (
                <div className="w-8 h-8 rounded bg-cyber-primary/10 border border-cyber-primary/30 flex items-center justify-center shrink-0 mt-1">
                  <Cpu size={16} className="text-cyber-primary" />
                </div>
              )}
              
              <div className={`max-w-[80%] p-4 rounded-sm border ${
                msg.role === 'user' 
                  ? 'bg-cyber-secondary/10 border-cyber-secondary/30 text-white text-right' 
                  : 'bg-gray-900/50 border-gray-700 text-cyber-primary shadow-[0_0_15px_rgba(0,0,0,0.5)]'
              }`}>
                <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed font-medium">
                  {msg.text}
                  {msg.isStreaming && <span className="inline-block w-2 h-4 bg-cyber-primary ml-1 animate-pulse">_</span>}
                </pre>
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded bg-cyber-secondary/10 border border-cyber-secondary/30 flex items-center justify-center shrink-0 mt-1">
                  <Terminal size={16} className="text-cyber-secondary" />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Command Input */}
        <div className="p-4 bg-black border-t border-gray-800">
          <form onSubmit={handleSubmit} className="flex gap-4 max-w-3xl mx-auto items-center">
            <div className="flex-1 relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyber-primary to-cyber-secondary rounded opacity-20 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <div className="relative flex items-center bg-black rounded">
                <span className="pl-4 text-cyber-primary animate-pulse">{'>'}</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter command or query..."
                  className="w-full bg-transparent border-none text-white px-4 py-4 focus:ring-0 focus:outline-none font-mono tracking-wider placeholder-gray-600"
                  autoFocus
                />
              </div>
            </div>
            <button 
              type="submit" 
              disabled={!input.trim() || status !== 'IDLE'}
              className="px-6 py-4 bg-gray-900 border border-gray-700 hover:border-cyber-primary text-cyber-primary hover:text-white hover:bg-cyber-primary/20 transition-all duration-300 rounded font-mono uppercase text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Execute <Zap size={14} />
            </button>
          </form>
          <div className="text-center mt-2">
            <span className="text-[10px] text-gray-600 font-mono uppercase">
              Powered by Gemini 3 Pro // Latency: 12ms // Encryption: AES-256
            </span>
          </div>
        </div>

      </div>
      
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes equalizer {
          0% { height: 10%; }
          100% { height: 100%; }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #000;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
        }
      `}</style>
    </div>
  );
};

export default NeuralInterface;
