import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { streamChatResponse } from '../services/geminiService';
import { Send, Bot, User, RefreshCw, Loader2 } from 'lucide-react';

const CourseChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello! I'm the AI Teaching Assistant for T567. How can I help you with the syllabus, assignments, or course concepts today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    setIsLoading(true);

    // Add user message
    const newUserMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: userText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMsg]);

    // Create placeholder for AI response
    const aiMsgId = (Date.now() + 1).toString();
    const initialAiMsg: ChatMessage = {
      id: aiMsgId,
      role: 'model',
      text: '',
      timestamp: new Date(),
      isStreaming: true
    };
    
    setMessages(prev => [...prev, initialAiMsg]);

    try {
      // Call Gemini Service with streaming
      await streamChatResponse(
        messages.filter(m => !m.isStreaming), // Send history excluding the empty streaming placeholder
        userText,
        (currentText) => {
          setMessages(prev => 
            prev.map(msg => 
              msg.id === aiMsgId ? { ...msg, text: currentText } : msg
            )
          );
        }
      );
    } catch (error) {
       // Error handled in service, but we ensure loading state is off
    } finally {
      setIsLoading(false);
      setMessages(prev => 
        prev.map(msg => 
          msg.id === aiMsgId ? { ...msg, isStreaming: false } : msg
        )
      );
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">T567 AI Tutor</h3>
            <p className="text-xs text-slate-500">Powered by Gemini 3 Flash</p>
          </div>
        </div>
        <button 
          onClick={() => setMessages([messages[0]])}
          className="text-slate-400 hover:text-slate-600 transition-colors"
          title="Reset Chat"
        >
          <RefreshCw size={18} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50/50">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
              ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-indigo-600 text-white'}
            `}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            
            <div className={`
              max-w-[80%] rounded-2xl px-4 py-3 shadow-sm
              ${msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'}
            `}>
               {/* Minimal Markdown-like rendering for line breaks */}
               <div className="text-sm leading-relaxed whitespace-pre-wrap font-normal">
                  {msg.text || (msg.isStreaming && <span className="animate-pulse">Thinking...</span>)}
               </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-200">
        <div className="relative flex items-end gap-2 max-w-4xl mx-auto">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask about the syllabus, deadlines, or concepts..."
            className="w-full bg-slate-100 border-none rounded-xl py-3 px-4 pr-12 text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-none max-h-32 min-h-[50px] scrollbar-hide"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className={`
              absolute right-2 bottom-2 p-2 rounded-lg transition-all
              ${isLoading || !input.trim() 
                ? 'bg-slate-200 text-slate-400' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'}
            `}
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
        <p className="text-center text-xs text-slate-400 mt-2">
          AI can make mistakes. Please verify important details in the syllabus.
        </p>
      </div>
    </div>
  );
};

export default CourseChat;